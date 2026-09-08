import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLang } from "@/lib/i18n/config";
import { getUi } from "@/i18n/ui";
import { getCheatSheets } from "@/content/cheatsheets";
import { PageHeader } from "@/components/sections/PageHeader";
import { CheatSheetBrowser } from "@/components/sections/CheatSheetBrowser";
import { ContactCTA } from "@/components/sections/ContactCTA";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};

  const ui = getUi(lang);
  return {
    title: ui.cheatSheets.header.eyebrow,
    description: ui.cheatSheets.header.description,
    alternates: {
      canonical: `/${lang}/cheatsheets`,
      languages: {
        en: "/en/cheatsheets",
        fa: "/fa/cheatsheets",
        "x-default": "/en/cheatsheets",
      },
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const ui = getUi(lang);
  const { stacks, comingSoon } = getCheatSheets(lang);
  // PDF export always renders from the English content — jsPDF's built-in
  // fonts carry no Persian glyphs, so a Persian PDF would render as boxes.
  // Excel has no such limitation, so it uses `stacks` (the active language)
  // directly inside CheatSheetBrowser.
  const pdfStacks = lang === "en" ? stacks : getCheatSheets("en").stacks;

  return (
    <>
      <PageHeader
        eyebrow={ui.cheatSheets.header.eyebrow}
        title={ui.cheatSheets.header.title}
        description={ui.cheatSheets.header.description}
      />

      <CheatSheetBrowser
        stacks={stacks}
        pdfStacks={pdfStacks}
        comingSoon={comingSoon}
        copy={ui.cheatSheets}
      />

      <ContactCTA lang={lang} copy={ui.contactCTA} />
    </>
  );
}
