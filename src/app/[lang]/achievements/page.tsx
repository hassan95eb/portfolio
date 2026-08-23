import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Award, Plus } from "lucide-react";
import { isLang } from "@/lib/i18n/config";
import { getUi } from "@/i18n/ui";
import { cms } from "@/lib/cms";
import { Container, Reveal, SectionHeading } from "@/components/primitives";
import { PageHeader } from "@/components/sections/PageHeader";
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
    title: ui.achievements.header.eyebrow,
    description: ui.achievements.header.description,
    alternates: {
      canonical: `/${lang}/achievements`,
      languages: {
        en: "/en/achievements",
        fa: "/fa/achievements",
        "x-default": "/en/achievements",
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
  const content = cms();
  const [achievements, placeholder] = await Promise.all([
    content.getAchievements(lang),
    content.getAchievementsPlaceholder(lang),
  ]);

  return (
    <>
      <PageHeader
        eyebrow={ui.achievements.header.eyebrow}
        title={ui.achievements.header.title}
        description={ui.achievements.header.description}
      />

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {achievements.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05}>
                <div className="group h-full rounded-xl border border-border bg-surface p-7 transition-colors hover:border-accent/50">
                  <span className="mb-5 grid h-11 w-11 place-items-center rounded-lg bg-accent/10 text-accent">
                    <Award size={20} />
                  </span>
                  <h3
                    className="mb-2 text-lg text-text-main"
                    style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-muted">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-secondary/25 py-20 md:py-28">
        <Container>
          <SectionHeading
            eyebrow={ui.achievements.comingSoon.eyebrow}
            title={ui.achievements.comingSoon.title}
            description={ui.achievements.comingSoon.description}
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {placeholder.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05}>
                <div className="flex h-full flex-col gap-3 rounded-xl border border-dashed border-border bg-background/50 p-7">
                  <span className="grid h-11 w-11 place-items-center rounded-lg border border-dashed border-border text-text-muted">
                    <Plus size={18} />
                  </span>
                  <h3
                    className="text-text-main"
                    style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-muted">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <ContactCTA lang={lang} copy={ui.contactCTA} />
    </>
  );
}
