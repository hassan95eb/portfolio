import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLang } from "@/lib/i18n/config";
import { getUi } from "@/i18n/ui";
import { cms } from "@/lib/cms";
import { PageHeader } from "@/components/sections/PageHeader";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
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
    title: ui.experience.header.eyebrow,
    description: ui.experience.header.description,
    alternates: {
      canonical: `/${lang}/experience`,
      languages: {
        en: "/en/experience",
        fa: "/fa/experience",
        "x-default": "/en/experience",
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
  const experience = await cms().getExperience(lang);

  return (
    <>
      <PageHeader
        eyebrow={ui.experience.header.eyebrow}
        title={ui.experience.header.title}
        description={ui.experience.header.description}
        typewriter
      />
      {/* Not `compact`: this is the page the home timeline links out to, so it
          shows every role and drops the "Full Timeline" button. */}
      <ExperienceTimeline
        lang={lang}
        copy={ui.experience.timeline}
        items={experience}
      />
      <ContactCTA lang={lang} copy={ui.contactCTA} />
    </>
  );
}
