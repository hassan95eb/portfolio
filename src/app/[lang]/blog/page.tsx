import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight, PenLine } from "lucide-react";
import { isLang } from "@/lib/i18n/config";
import { getUi } from "@/i18n/ui";
import { getProfile } from "@/content/profile";
import { Container, CTAButton, Reveal, SectionHeading } from "@/components/primitives";
import { PageHeader } from "@/components/sections/PageHeader";
import { ContactCTA } from "@/components/sections/ContactCTA";

/**
 * Placeholder while the blog is built.
 *
 * Deliberately `noindex`: a "coming soon" page competing for the same terms
 * as the real blog would be the wrong result to rank. It is also left out of
 * `sitemap.ts` for the same reason. Both come off when step 7 lands.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};

  const ui = getUi(lang);
  return {
    title: ui.nav.blog,
    description: ui.blog.hero.description,
    robots: { index: false, follow: true },
    alternates: {
      canonical: `/${lang}/blog`,
      languages: { en: "/en/blog", fa: "/fa/blog", "x-default": "/en/blog" },
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
  const { writingPillars } = getProfile(lang);
  const soon = ui.blog.comingSoon;

  return (
    <>
      <PageHeader
        eyebrow={ui.blog.hero.eyebrow}
        title={ui.blog.hero.title}
        description={ui.blog.hero.description}
      />

      <section className="py-20 md:py-28">
        <Container>
          <Reveal>
            <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 rounded-2xl border border-dashed border-border bg-surface p-10 text-center md:p-14">
              <span className="grid h-14 w-14 place-items-center rounded-xl bg-accent/10 text-accent">
                <PenLine size={24} />
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 px-3 py-1 text-xs uppercase tracking-[0.18em] text-accent">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                {soon.badge}
              </span>
              <h2
                className="text-[1.9rem] leading-[1.15] text-text-main md:text-[2.4rem]"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                }}
              >
                {soon.title}
              </h2>
              <p className="text-text-muted">{soon.description}</p>
              <p className="text-sm text-text-muted">{soon.meanwhile}</p>
              <CTAButton href={`/${lang}/projects`} variant="outline">
                {soon.seeProjects} <ArrowUpRight size={16} />
              </CTAButton>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* The pillars are real standing content, not placeholder text — they
          say what the writing will cover, which is the one thing a reader
          landing here actually wants to know. */}
      <section className="border-y border-border bg-secondary/25 py-20 md:py-28">
        <Container>
          <SectionHeading
            eyebrow={ui.blog.pillars.eyebrow}
            title={ui.blog.pillars.title}
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {writingPillars.map(({ title, body }, i) => (
              <Reveal key={title} delay={i * 0.05}>
                <div className="h-full rounded-xl border border-border bg-surface p-7">
                  <span className="mb-4 block h-1.5 w-1.5 rounded-full bg-accent" />
                  <h3
                    className="mb-2 text-text-main"
                    style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                  >
                    {title}
                  </h3>
                  <p className="text-sm text-text-muted">{body}</p>
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
