import { ThemeToggle } from "@/components/ThemeToggle";
import { LangToggle } from "@/components/LangToggle";
import { dirOf, isLang, type Lang } from "@/lib/i18n/config";
import { notFound } from "next/navigation";

/**
 * Scaffold verification page — step 1 only.
 *
 * It exists to prove four things work before any component is ported:
 * brand tokens, both font stacks, dark mode without a flash, and RTL.
 * Step 5 replaces this file with the real Home page.
 */

const copy = {
  en: {
    eyebrow: "Scaffold check",
    title: "Next.js scaffold is up.",
    body: "Brand tokens, fonts, dark mode and RTL are wired. Component migration starts next.",
    theme: "Toggle theme",
    lang: "فارسی",
    tokens: "Brand tokens",
    heading: "Heading font — Space Grotesk",
    bodyFont: "Body font — Manrope",
  },
  fa: {
    eyebrow: "بررسی اسکلت",
    title: "اسکلت Next.js بالا آمد.",
    body: "توکن‌های برند، فونت‌ها، حالت تاریک و راست‌به‌چپ وصل شده‌اند. مرحله‌ی بعد انتقال کامپوننت‌هاست.",
    theme: "تغییر تم",
    lang: "English",
    tokens: "توکن‌های برند",
    heading: "فونت عنوان — وزیرمتن",
    bodyFont: "فونت متن — وزیرمتن",
  },
} satisfies Record<Lang, Record<string, string>>;

const TOKENS = [
  "background",
  "surface",
  "primary",
  "secondary",
  "accent",
  "border",
] as const;

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const t = copy[lang];

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-24">
      <p className="mb-3 text-sm uppercase tracking-widest text-accent">
        {t.eyebrow}
      </p>

      <h1 className="mb-4 font-heading text-4xl leading-tight text-text-main">
        {t.title}
      </h1>

      <p className="mb-10 font-body text-lg text-text-muted">{t.body}</p>

      <div className="mb-12 flex flex-wrap gap-3">
        <ThemeToggle label={t.theme} />
        <LangToggle lang={lang} label={t.lang} />
      </div>

      <section className="mb-12">
        <h2 className="mb-4 font-heading text-xl text-text-main">{t.tokens}</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {TOKENS.map((token) => (
            <div
              key={token}
              className="rounded-lg border border-border bg-surface p-4"
            >
              <div
                className="mb-3 h-12 w-full rounded-md border border-border"
                style={{ background: `var(--${token})` }}
              />
              <code dir="ltr" className="inline-block font-body text-xs text-text-muted">
                --{token}
              </code>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-border bg-surface p-6">
        <p className="mb-2 font-heading text-2xl text-text-main">{t.heading}</p>
        <p className="font-body text-text-muted">{t.bodyFont}</p>
        <p className="mt-4 font-body text-sm text-text-muted">
          dir=<code className="text-accent">{dirOf(lang)}</code> · lang=
          <code className="text-accent">{lang}</code>
        </p>
      </section>
    </div>
  );
}
