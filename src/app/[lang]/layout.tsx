import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LANGS, dirOf, isLang, type Lang } from "@/lib/i18n/config";
import { fontVariables } from "@/lib/fonts";
import { getUi } from "@/i18n/ui";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SITE_URL } from "@/lib/site";
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
    metadataBase: new URL(SITE_URL),
    title: {
      default: fa
        ? "حسن امینی — توسعه‌دهنده‌ی ارشد فول‌استک"
        : "Hassan Amini — Senior Full-Stack Developer",
      template: fa ? "%s | حسن امینی" : "%s | Hassan Amini",
    },
    description: fa
      ? "ساخت رابط‌های کاربری داده‌محور و سریع، به‌همراه APIها و سرویس‌های ASP.NET Core پشتِ آن‌ها."
      : "Building fast, data-heavy interfaces for complex products — and the ASP.NET Core APIs behind them.",
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
  const ui = getUi(typed);

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
        {/* Only the strings the header actually renders cross into the client
            bundle, rather than the whole ui object. */}
        <Header
          lang={typed}
          nav={ui.nav}
          common={ui.common}
          languageToggle={ui.languageToggle}
        />
        <main className="flex-1">{children}</main>
        <Footer lang={typed} />
      </body>
    </html>
  );
}
