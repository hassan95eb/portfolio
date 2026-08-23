import { CONTACT } from "@/lib/site";

/**
 * Outbound mail for the contact form.
 *
 * Everything provider-specific is behind this file. Moving to WordPress, SES,
 * or anything else means rewriting `sendContactEmail` and touching nothing
 * above it — the route handler and the form both speak `ContactMessage` and
 * `SendResult`.
 *
 * Resend is called over its REST API rather than through the `resend` npm
 * package. The whole integration is a single POST; a dependency here would
 * have to be installed, audited and upgraded for the life of the project to
 * save a dozen lines, and it would need a fresh `npm install` on every
 * machine that checks the repo out.
 *
 * The body is sent as plain text, never HTML. A contact form is untrusted
 * input by definition, and text has no markup for a visitor to inject.
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

/**
 * Resend's shared sender. It needs no domain verification, but it will only
 * deliver to the address that owns the Resend account — which is exactly the
 * shape of a personal contact form, so it is the default until a real domain
 * is verified. Set CONTACT_FROM once `hassanamini.dev` is verified there.
 */
const DEFAULT_FROM = "Portfolio Contact <onboarding@resend.dev>";

/** Where the enquiry lands. Falls back to the address the site already shows. */
function recipient() {
  return process.env.CONTACT_TO ?? CONTACT.email;
}

export function isConfigured() {
  return Boolean(process.env.RESEND_API_KEY);
}

export async function sendContactEmail(
  message: ContactMessage,
): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { ok: false, reason: "unconfigured" };

  const subject = message.projectType
    ? `${message.projectType} — ${message.name}`
    : `Portfolio enquiry — ${message.name}`;

  const body = [
    message.message,
    "",
    "—",
    `From: ${message.name} <${message.email}>`,
    message.projectType ? `Project type: ${message.projectType}` : null,
    "Sent from the contact form on hassanamini.dev",
  ]
    .filter((line) => line !== null)
    .join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM ?? DEFAULT_FROM,
        to: [recipient()],
        subject,
        text: body,
        // The point of the whole exercise: hitting reply goes to the visitor,
        // not to the sending address.
        reply_to: message.email,
      }),
    });

    if (!response.ok) {
      // Logged, not returned. The provider's message can name the account or
      // the sending domain, and none of that belongs in a public response.
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
