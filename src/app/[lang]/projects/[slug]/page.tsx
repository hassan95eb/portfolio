import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { isLang, LANGS } from "@/lib/i18n/config";
import { getUi } from "@/i18n/ui";
import { cms } from "@/lib/cms";
import { Container, CTAButton, Eyebrow, Reveal, Tag } from "@/components/primitives";
import { ContactCTA } from "@/components/sections/ContactCTA";

/**
 * Slugs are identical across languages by design, so one language's list
 * would do — but asking per language keeps the contract honest for the day
 * WordPress supplies them and that stops being true.
 */
export async function generateStaticParams({
  params,
}: {
  params: { lang: string };
}) {
  const lang = isLang(params.lang) ? params.lang : LANGS[0];
  const slugs = await cms().getProjectSlugs(lang);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLang(lang)) return {};

  const project = await cms().getProject(lang, slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    alternates: {
      canonical: `/${lang}/projects/${slug}`,
      languages: {
        en: `/en/projects/${slug}`,
        fa: `/fa/projects/${slug}`,
        "x-default": `/en/projects/${slug}`,
      },
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLang(lang)) notFound();

  const ui = getUi(lang);
  const detail = ui.projects.detail;
  const content = cms();

  const [project, projects] = await Promise.all([
    content.getProject(lang, slug),
    content.getProjects(lang),
  ]);

  // A real 404 rather than a 200 page saying "not found" — an unknown slug
  // should never be indexable.
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <section
        className="relative overflow-hidden border-b border-border"
        style={{ backgroundColor: project.accent }}
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.15]"
          style={{
            color: "#FBF6EF",
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <Container className="relative py-20 md:py-28">
          <Link
            href={`/${lang}/projects`}
            className="mb-8 inline-flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white"
          >
            <ArrowLeft size={16} className="rtl:rotate-180" /> {detail.allProjects}
          </Link>
          <div className="flex max-w-2xl flex-col gap-5">
            <span className="text-xs uppercase tracking-[0.2em] text-white/70">
              {project.role} · {project.year}
            </span>
            <h1
              className="text-[2.4rem] leading-[1.1] text-[#FBF6EF] md:text-[3.4rem]"
              style={{ fontWeight: 600, letterSpacing: "-0.025em" }}
            >
              {project.title}
            </h1>
            <p className="text-lg text-white/90">{project.summary}</p>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.4fr_0.6fr]">
            <Reveal>
              <div className="flex flex-col gap-8">
                <div>
                  <Eyebrow>{detail.overview}</Eyebrow>
                  <p className="mt-4 text-lg leading-relaxed text-text-main">
                    {project.description}
                  </p>
                </div>
                <div>
                  <Eyebrow>{detail.keyHighlights}</Eyebrow>
                  <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                    {project.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex gap-3 rounded-lg border border-border bg-surface p-4 text-sm text-text-main"
                      >
                        <Check size={18} className="mt-0.5 flex-shrink-0 text-accent" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <aside className="flex flex-col gap-6 rounded-xl border border-border bg-surface p-6">
                <div>
                  <h2 className="mb-3 text-sm uppercase tracking-[0.16em] text-text-muted">
                    {detail.techStack}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((s) => (
                      <Tag key={s}>{s}</Tag>
                    ))}
                  </div>
                </div>
                <div className="border-t border-border pt-5">
                  <h2 className="mb-3 text-sm uppercase tracking-[0.16em] text-text-muted">
                    {detail.details}
                  </h2>
                  <dl className="flex flex-col gap-2 text-sm">
                    <div className="flex justify-between gap-4">
                      <dt className="text-text-muted">{detail.role}</dt>
                      <dd className="text-end text-text-main">{project.role}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-text-muted">{detail.year}</dt>
                      <dd className="text-end text-text-main">{project.year}</dd>
                    </div>
                  </dl>
                </div>
                <CTAButton href={`/${lang}/contact`} className="w-full">
                  {detail.discussSimilar} <ArrowUpRight size={16} />
                </CTAButton>
              </aside>
            </Reveal>
          </div>

          <div className="mt-16 border-t border-border pt-8">
            <Link
              href={`/${lang}/projects/${next.slug}`}
              className="group flex items-center justify-between gap-4"
            >
              <div>
                <span className="text-xs uppercase tracking-[0.16em] text-text-muted">
                  {detail.nextProject}
                </span>
                <div
                  className="text-xl text-text-main transition-colors group-hover:text-accent"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                >
                  {next.title}
                </div>
              </div>
              <ArrowUpRight className="flex-shrink-0 text-accent" />
            </Link>
          </div>
        </Container>
      </section>

      <ContactCTA lang={lang} copy={ui.contactCTA} />
    </>
  );
}
