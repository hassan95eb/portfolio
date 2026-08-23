import { NextResponse } from "next/server";
import { sendContactEmail, type ContactMessage } from "@/lib/email";

/**
 * POST /api/contact
 *
 * The form used to hand the message to the visitor's own mail client. This
 * replaces that: the message is sent server-side, so nothing about the send
 * depends on what the visitor has installed.
 *
 * The reason it is a route handler and not a client-side call to an email
 * service is the credential. A browser-side integration has to ship its key
 * in the bundle, where anyone can read it and spend the quota. Here the key
 * is an environment variable on the server and never reaches the client.
 *
 * Responses are deliberately coarse: `{ ok }` plus a short reason code the UI
 * maps to translated copy. Provider errors are logged, never returned.
 */

export const runtime = "nodejs";
/** Never prerendered or cached — it has side effects by definition. */
export const dynamic = "force-dynamic";

const LIMITS = {
  name: 120,
  email: 200,
  projectType: 120,
  message: 5000,
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;

/**
 * A speed bump, not a guarantee.
 *
 * This map lives in one server instance's memory. Vercel may run several, and
 * it resets on every cold start, so a determined sender gets through. It costs
 * nothing and it stops the ordinary case — a bot or a stuck submit button
 * firing the same form repeatedly. Anything stronger needs shared state
 * (Upstash, Vercel KV), which is not worth provisioning for a contact form.
 */
const recentByIp = new Map<string, number[]>();

function isRateLimited(ip: string, now: number) {
  const cutoff = now - WINDOW_MS;

  // Opportunistic sweep, so an instance that stays warm for weeks does not
  // accumulate an entry per visitor forever.
  for (const [key, times] of recentByIp) {
    const live = times.filter((time) => time > cutoff);
    if (live.length === 0) recentByIp.delete(key);
    else recentByIp.set(key, live);
  }

  const times = recentByIp.get(ip) ?? [];
  if (times.length >= MAX_PER_WINDOW) return true;

  recentByIp.set(ip, [...times, now]);
  return false;
}

function clientIp(request: Request) {
  // Vercel sets x-forwarded-for; the first entry is the client. Absent
  // locally, where the limiter then treats every request as one visitor —
  // which is correct, since locally there is only one.
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "local";
}

function text(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  // Honeypot: a field hidden from people and left empty by them, which a bot
  // filling every input will complete. Answered with a 200 on purpose — a
  // rejection tells the bot what tripped it and invites a second attempt.
  if (text(payload.company, 200)) {
    return NextResponse.json({ ok: true });
  }

  const message: ContactMessage = {
    name: text(payload.name, LIMITS.name),
    email: text(payload.email, LIMITS.email),
    projectType: text(payload.projectType, LIMITS.projectType) || undefined,
    message: text(payload.message, LIMITS.message),
  };

  if (!message.name || !message.email || !message.message) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }
  if (!EMAIL_PATTERN.test(message.email)) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  if (isRateLimited(clientIp(request), Date.now())) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429 },
    );
  }

  const result = await sendContactEmail(message);
  if (result.ok) return NextResponse.json({ ok: true });

  // 503 for a missing key: the endpoint is fine, the deployment is not
  // finished. 502 for a provider that took the request and failed it.
  return NextResponse.json(
    { ok: false, error: result.reason },
    { status: result.reason === "unconfigured" ? 503 : 502 },
  );
}
