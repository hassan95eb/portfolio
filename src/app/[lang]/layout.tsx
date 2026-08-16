import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LANGS, dirOf, isLang, type Lang } from "@/lib/i18n/config";
import { fontVariables } from "@/lib/fonts";
import "../globals.css";

/**
 * This is the root layout. There is deliberately no `app/layout.tsx`:
 * `lang` and `dir` have to be on the <html> tag and they come from the
 * URL segment, so the segment layout has to own the document shell.
 */

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

/**
 * Runs before paint, before React hydrates. Without it the page renders in
 * the server's theme and then snaps to the stored one — a visible flash on
 * every cold load. Kept inline and tiny on purpose.
 */
const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem('ha-theme');
    var dark = stored
      ? stored === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (dark) document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const fa = lang === "fa";

  return {
    // Canonical and hreflang have to be absolute URLs to be honoured.
    // Set NEXT_PUBLIC_SITE_URL in Vercel to the real domain.
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    ),
    title: {
      default: fa
        ? "حسن امینی — مهندس ارشد فرانت‌اند"
        : "Hassan Amini — Senior Frontend Engineer",
      template: fa ? "%s | حسن امینی" : "%s | Hassan Amini",
    },
    description: fa
      ? "طراحی و ساخت رابط‌های کاربری داده‌محور، سریع و قابل اتکا."
      : "Building fast, reliable, data-heavy interfaces for complex products.",
    alternates: {
      canonical: `/${lang}`,
      languages: {
        en: "/en",
        fa: "/fa",
        "x-default": "/en",
      },
    },
    openGraph: {
      type: "website",
      locale: fa ? "fa_IR" : "en_US",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const typed: Lang = lang;

  return (
    <html
      lang={typed}
      dir={dirOf(typed)}
      suppressHydrationWarning
      className={fontVariables}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-screen flex-col bg-background antialiased">
        {/* Header goes here in step 3 */}
        <main className="flex-1">{children}</main>
        {/* Footer goes here in step 3 */}
      </body>
    </html>
  );
}
