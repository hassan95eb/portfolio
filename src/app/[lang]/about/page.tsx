import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight, Gauge, GraduationCap, Layers, Target, Users } from "lucide-react";
import { isLang } from "@/lib/i18n/config";
import { getUi } from "@/i18n/ui";
import { getProfile } from "@/content/profile";
import { Container, CTAButton, Reveal, SectionHeading } from "@/components/primitives";
import { PageHeader } from "@/components/sections/PageHeader";
import { Skills } from "@/components/sections/Skills";

/** Paired with `profile.principles` by position, as in the Figma export. */
const PRINCIPLE_ICONS = [Target, Gauge, Layers, Users];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};

  const ui = getUi(lang);
  return {
    title: ui.about.header.eyebrow,
    description: ui.about.header.description,
    alternates: {
      canonical: `/${lang}/about`,
      languages: { en: "/en/about", fa: "/fa/about", "x-default": "/en/about" },
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
  const profile = getProfile(lang);

  return (
    <>
      <PageHeader
        eyebrow={ui.about.header.eyebrow}
        title={ui.about.header.title}
        description={ui.about.header.description}
      />

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr]">
            <Reveal>
              <div className="flex flex-col gap-6 text-text-muted">
                <p
                  className="text-[1.4rem] leading-[1.5] text-text-main"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 500 }}
                >
                  {ui.about.intro[0]}
                </p>
                {ui.about.intro.slice(1).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <div className="pt-2">
                  <CTAButton href={`/${lang}/contact`}>
                    {ui.about.workWithMe} <ArrowUpRight size={16} />
                  </CTAButton>
                </div>
              </div>
            </Reveal>

            <div className="flex flex-col gap-5">
              <Reveal delay={0.1}>
                <div className="rounded-xl border border-border bg-surface p-7">
                  <h2
                    className="mb-5 text-text-main"
                    style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                  >
                    {ui.about.atAGlance}
                  </h2>
                  <dl className="flex flex-col divide-y divide-border">
                    {profile.glance.map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between gap-4 py-3">
                        <dt className="text-sm text-text-muted">{key}</dt>
                        <dd
                          className="text-end text-sm text-text-main"
                          style={{ fontFamily: "var(--font-heading)", fontWeight: 500 }}
                        >
                          {value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="rounded-xl border border-border bg-surface p-7">
                  <h2
                    className="mb-4 flex items-center gap-2.5 text-text-main"
                    style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                  >
                    <GraduationCap size={18} className="text-accent" />
                    {ui.about.education}
                  </h2>
                  <p
                    className="text-sm text-text-main"
                    style={{ fontFamily: "var(--font-heading)", fontWeight: 500 }}
                  >
                    {profile.education.degree}
                  </p>
                  <p className="mt-1 text-sm text-text-muted">{profile.education.field}</p>
                  <p className="mt-3 text-sm text-text-muted">
                    {profile.education.institution}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-accent">
                    {profile.education.period}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-secondary/25 py-20 md:py-28">
        <Container>
          <SectionHeading eyebrow={ui.about.howIWork} title={ui.about.principlesTitle} />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {profile.principles.map(({ title, body }, i) => {
              const Icon = PRINCIPLE_ICONS[i];
              return (
                <Reveal key={title} delay={i * 0.05}>
                  <div className="h-full rounded-xl border border-border bg-surface p-6">
                    <span className="mb-4 grid h-11 w-11 place-items-center rounded-lg bg-accent/10 text-accent">
                      <Icon size={20} />
                    </span>
                    <h3
                      className="mb-2 text-text-main"
                      style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                    >
                      {title}
                    </h3>
                    <p className="text-sm text-text-muted">{body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <Skills copy={ui.skills} groups={profile.skillGroups} />
    </>
  );
}
