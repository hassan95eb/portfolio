import { CONTACT } from "@/lib/site";

/**
 * Outbound mail for the contact form.
 *
 * Everything provider-specific is behind this file. The route handler and the
 * form both speak `ContactMessage` and `SendResult` and know nothing about how
 * the message actually leaves.
 *
 * Three transports, chosen from the environment:
 *
 *   smtp    Any SMTP server — a mailbox on your own domain, an Iranian host,
 *           or Gmail with an App Password. Nothing to sign up for that is
 *           unavailable from Iran, and the connection is made by the server
 *           the site is deployed on, not by the visitor.
 *   resend  Resend's REST API. One POST, no dependency.
 *   log     Development only. Prints the message to the server console and
 *           reports success, so the form can be exercised end to end with no
 *           provider and no outbound network at all.
 *
 * `log` is refused when NODE_ENV is production, and that refusal is the whole
 * point of it existing. A contact form that reports "sent" while dropping the
 * message is worse than having no form: the visitor believes they reached you,
 * and neither of you ever finds out they did not. In production an
 * unconfigured transport returns `unconfigured`, the endpoint answers 503, and
 * the page tells the visitor the send failed and shows the direct address.
 */

export type ContactMessage = {
  name: string;
  email: string;
  projectType?: string;
  message: string;
};

export type SendResult =
  | { ok: true }
  | { ok: false; reason: "unconfigured" | "failed" };

type Transport = "smtp" | "resend" | "log";

/**
 * Resend's shared sender. It needs no domain verification, but it will only
 * deliver to the address that owns the Resend account — which is exactly the
 * shape of a personal contact form.
 */
const RESEND_DEFAULT_FROM = "Portfolio Contact <onboarding@resend.dev>";

/**
 * Which transport to use.
 *
 * `CONTACT_TRANSPORT` forces one; otherwise the first configured transport
 * wins. `null` means nothing is set up, which callers must surface rather
 * than paper over.
 */
function selectTransport(): Transport | null {
  const forced = process.env.CONTACT_TRANSPORT?.trim().toLowerCase();

  if (forced === "log") {
    if (process.env.NODE_ENV === "production") {
      console.error(
        "[contact] CONTACT_TRANSPORT=log is refused in production — " +
          "set SMTP_HOST or RESEND_API_KEY instead",
      );
      return null;
    }
    return "log";
  }
  if (forced === "smtp") return "smtp";
  if (forced === "resend") return "resend";

  if (process.env.SMTP_HOST) return "smtp";
  if (process.env.RESEND_API_KEY) return "resend";
  return null;
}

/** Where the enquiry lands. Falls back to the address the site already shows. */
function recipient() {
  return process.env.CONTACT_TO ?? CONTACT.email;
}

function subjectFor(message: ContactMessage) {
  return message.projectType
    ? `${message.projectType} — ${message.name}`
    : `Portfolio enquiry — ${message.name}`;
}

/**
 * Plain text, never HTML. A contact form is untrusted input by definition and
 * text has no markup for a visitor to inject.
 */
function bodyFor(message: ContactMessage) {
  return [
    message.message,
    "",
    "—",
    `From: ${message.name} <${message.email}>`,
    message.projectType ? `Project type: ${message.projectType}` : null,
    "Sent from the contact form on hassanamini.dev",
  ]
    .filter((line) => line !== null)
    .join("\n");
}

export function isConfigured() {
  return selectTransport() !== null;
}

export async function sendContactEmail(
  message: ContactMessage,
): Promise<SendResult> {
  switch (selectTransport()) {
    case "smtp":
      return sendViaSmtp(message);
    case "resend":
      return sendViaResend(message);
    case "log":
      return sendViaLog(message);
    default:
      return { ok: false, reason: "unconfigured" };
  }
}

/**
 * SMTP.
 *
 * `from` is your own mailbox, not the visitor's address. Sending as somebody
 * else's domain fails SPF and DKIM, and the message is rejected or filed as
 * spam — so the visitor's address goes in `replyTo` instead. Hitting reply
 * then answers them directly, which is the behaviour people actually want
 * from a contact form.
 *
 * nodemailer is imported lazily so it is only pulled in when SMTP is the
 * chosen transport.
 */
async function sendViaSmtp(message: ContactMessage): Promise<SendResult> {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;

  if (!host || !user || !pass) {
    console.error("[contact] SMTP selected but host, user or password is unset");
    return { ok: false, reason: "unconfigured" };
  }

  const port = Number(process.env.SMTP_PORT ?? 465);

  try {
    const { createTransport } = await import("nodemailer");

    await createTransport({
      host,
      port,
      // 465 is implicit TLS; 587 starts plain and upgrades with STARTTLS.
      secure: port === 465,
      auth: { user, pass },
    }).sendMail({
      from: process.env.CONTACT_FROM ?? `Portfolio Contact <${user}>`,
      to: recipient(),
      subject: subjectFor(message),
      text: bodyFor(message),
      replyTo: `${message.name} <${message.email}>`,
    });

    return { ok: true };
  } catch (error) {
    // Logged, not returned: SMTP errors name the host and the account.
    console.error("[contact] SMTP send failed", error);
    return { ok: false, reason: "failed" };
  }
}

/**
 * Resend over its REST API rather than the `resend` package: the integration
 * is a single POST, and a dependency would need auditing and upgrading for the
 * life of the project to save a dozen lines.
 */
async function sendViaResend(message: ContactMessage): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { ok: false, reason: "unconfigured" };

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM ?? RESEND_DEFAULT_FROM,
        to: [recipient()],
        subject: subjectFor(message),
        text: bodyFor(message),
        reply_to: message.email,
      }),
    });

    if (!response.ok) {
      // Logged, not returned. Resend's message can name the account and the
      // sending domain, and none of that belongs in a public response.
      console.error(
        "[contact] Resend rejected the message",
        response.status,
        await response.text().catch(() => ""),
      );
      return { ok: false, reason: "failed" };
    }

    return { ok: true };
  } catch (error) {
    console.error("[contact] could not reach Resend", error);
    return { ok: false, reason: "failed" };
  }
}

/**
 * Development transport. Never reachable in production — `selectTransport`
 * refuses it there before this function is ever called.
 */
async function sendViaLog(message: ContactMessage): Promise<SendResult> {
  console.info(
    [
      "",
      "─".repeat(60),
      "[contact] CONTACT_TRANSPORT=log — nothing was actually sent.",
      `To:      ${recipient()}`,
      `Subject: ${subjectFor(message)}`,
      `Reply-To: ${message.name} <${message.email}>`,
      "",
      bodyFor(message),
      "─".repeat(60),
      "",
    ].join("\n"),
  );
  return { ok: true };
}
