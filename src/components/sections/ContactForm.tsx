"use client";

import { useState, type FormEvent } from "react";
import { Download, Loader2, Send } from "lucide-react";
import { CTAButton } from "@/components/primitives";
import { CONTACT, RESUME_PATH } from "@/lib/site";
import type { Ui } from "@/i18n/ui";

/**
 * The contact form.
 *
 * It posts to `/api/contact`, which sends the mail server-side — the visitor
 * needs no mail client configured, and nothing about the send depends on what
 * their machine has installed.
 *
 * Every failure path ends with the address on screen. A contact form that
 * swallows a message is worse than no form at all, so when the send fails the
 * copy says so and hands over the direct route rather than leaving the
 * visitor to guess whether it arrived.
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "done"; tone: "error" | "success"; text: string };

export function ContactForm({
  copy,
  projectTypes,
}: {
  copy: Ui["contact"];
  /** From `content/profile.ts`, already in the active language. */
  projectTypes: readonly string[];
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState("");
  const [message, setMessage] = useState("");
  // Honeypot. Never shown, never filled by a person; a bot that completes
  // every input gives itself away.
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const sending = status.state === "sending";

  function fail(template: string) {
    setStatus({
      state: "done",
      tone: "error",
      text: template.replace("{email}", CONTACT.email),
    });
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;

    const trimmed = {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    };

    // Checked here for a fast, translated answer, and again on the server,
    // which is the only check that actually protects anything.
    if (!trimmed.name || !trimmed.email || !trimmed.message) {
      setStatus({ state: "done", tone: "error", text: copy.toastError });
      return;
    }
    if (!EMAIL_PATTERN.test(trimmed.email)) {
      setStatus({ state: "done", tone: "error", text: copy.toastInvalidEmail });
      return;
    }

    setStatus({ state: "sending" });

    let response: Response;
    try {
      response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...trimmed, projectType, company }),
      });
    } catch {
      // Offline, or the request never left the machine.
      fail(copy.toastFailed);
      return;
    }

    if (response.ok) {
      setStatus({ state: "done", tone: "success", text: copy.toastSuccess });
      setName("");
      setEmail("");
      setProjectType("");
      setMessage("");
      return;
    }

    const error = await response
      .json()
      .then((body: { error?: string }) => body.error)
      .catch(() => undefined);

    if (error === "rate_limited") fail(copy.toastRateLimited);
    else if (error === "invalid") setStatus({ state: "done", tone: "error", text: copy.toastError });
    else fail(copy.toastFailed);
  }

  const field =
    "w-full rounded-md border border-border bg-background px-4 py-2.5 text-sm text-text-main outline-none transition-colors placeholder:text-text-muted/70 focus:border-accent disabled:opacity-60";
  const label = "mb-2 block text-xs uppercase tracking-[0.16em] text-text-muted";

  return (
    <form onSubmit={submit} noValidate className="relative flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="contact-name">
            {copy.form.name}
          </label>
          <input
            id="contact-name"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={copy.form.namePlaceholder}
            autoComplete="name"
            maxLength={120}
            disabled={sending}
            required
            className={field}
          />
        </div>

        <div>
          <label className={label} htmlFor="contact-email">
            {copy.form.email}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            // The address is Latin-script whichever language the page is in,
            // so it stays LTR under an RTL document.
            dir="ltr"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={copy.form.emailPlaceholder}
            autoComplete="email"
            maxLength={200}
            disabled={sending}
            required
            className={`${field} text-start`}
          />
        </div>
      </div>

      <div>
        <label className={label} htmlFor="contact-project-type">
          {copy.form.projectType}
        </label>
        <select
          id="contact-project-type"
          name="projectType"
          value={projectType}
          onChange={(event) => setProjectType(event.target.value)}
          disabled={sending}
          className={field}
        >
          <option value="">{copy.form.projectTypePlaceholder}</option>
          {projectTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={label} htmlFor="contact-message">
          {copy.form.message}
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder={copy.form.messagePlaceholder}
          maxLength={5000}
          disabled={sending}
          required
          className={`${field} resize-y`}
        />
      </div>

      {/* Honeypot. `aria-hidden` and `tabIndex={-1}` keep it away from screen
          readers and the tab order; it is positioned off-screen rather than
          `display: none`, which some bots skip. */}
      <div aria-hidden className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden">
        <label htmlFor="contact-company">Company</label>
        <input
          id="contact-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <CTAButton type="submit" disabled={sending}>
          {sending ? (
            <>
              {copy.form.sending}
              <Loader2 size={16} className="animate-spin" />
            </>
          ) : (
            <>
              {copy.form.send} <Send size={16} />
            </>
          )}
        </CTAButton>
        <CTAButton external={RESUME_PATH} download variant="ghost">
          <Download size={16} /> {copy.form.downloadResume}
        </CTAButton>
      </div>

      <p className="text-xs text-text-muted">{copy.formNote}</p>

      {/* Always in the DOM so a screen reader announces the change rather
          than a region appearing from nowhere. */}
      <p
        role="status"
        aria-live="polite"
        className={`min-h-5 text-sm ${
          status.state === "done" && status.tone === "error"
            ? "text-accent"
            : "text-text-main"
        }`}
      >
        {status.state === "done" ? status.text : ""}
      </p>
    </form>
  );
}
