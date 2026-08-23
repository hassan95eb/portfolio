"use client";

import { useState, type FormEvent } from "react";
import { Download, Send } from "lucide-react";
import { CTAButton } from "@/components/primitives";
import { CONTACT, RESUME_PATH } from "@/lib/site";
import type { Ui } from "@/i18n/ui";

/**
 * The contact form, backed by `mailto:` rather than by a server.
 *
 * There is no backend yet — WordPress is still to be connected — and a form
 * that POSTs nowhere while showing "message sent" loses real enquiries
 * silently. Handing the composed message to the visitor's own mail client
 * keeps the copy honest: nothing is claimed as delivered, and the message
 * survives in their Sent folder either way.
 *
 * When the API lands, `submit` is the only function that changes.
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = { tone: "error" | "success"; text: string } | null;

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
  const [status, setStatus] = useState<Status>(null);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmed = {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    };

    if (!trimmed.name || !trimmed.email || !trimmed.message) {
      setStatus({ tone: "error", text: copy.toastError });
      return;
    }
    if (!EMAIL_PATTERN.test(trimmed.email)) {
      setStatus({ tone: "error", text: copy.toastInvalidEmail });
      return;
    }

    const subject = projectType
      ? `${projectType} — ${trimmed.name}`
      : copy.mailSubject.replace("{name}", trimmed.name);

    // A blank line before the signature so it reads as a signature and not
    // as another paragraph of the message.
    const body = [trimmed.message, "", `— ${trimmed.name}`, trimmed.email].join(
      "\n",
    );

    const href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    try {
      window.location.href = href;
      setStatus({ tone: "success", text: copy.toastSuccess });
    } catch {
      // Some hardened browsers refuse to hand off protocol links at all.
      setStatus({
        tone: "error",
        text: copy.toastBlocked.replace("{email}", CONTACT.email),
      });
    }
  }

  const field =
    "w-full rounded-md border border-border bg-background px-4 py-2.5 text-sm text-text-main outline-none transition-colors placeholder:text-text-muted/70 focus:border-accent";
  const label = "mb-2 block text-xs uppercase tracking-[0.16em] text-text-muted";

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-5">
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
          required
          className={`${field} resize-y`}
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <CTAButton type="submit">
          {copy.form.send} <Send size={16} />
        </CTAButton>
        <CTAButton external={RESUME_PATH} download variant="ghost">
          <Download size={16} /> {copy.form.downloadResume}
        </CTAButton>
      </div>

      <p className="text-xs text-text-muted">{copy.mailtoNote}</p>

      {/* Always in the DOM so a screen reader announces the change rather
          than a region appearing from nowhere. */}
      <p
        role="status"
        aria-live="polite"
        className={`min-h-5 text-sm ${
          status?.tone === "error" ? "text-accent" : "text-text-main"
        }`}
      >
        {status?.text ?? ""}
      </p>
    </form>
  );
}
