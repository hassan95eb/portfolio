import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check, Github, Lock } from "lucide-react";
import { isLang, LANGS } from "@/lib/i18n/config";
import { getUi } from "@/i18n/ui";
import { cms } from "@/lib/cms";
import { SITE_URL } from "@/lib/site";
import { Container, CTAButton, Eyebrow, Reveal, Tag } from "@/components/primitives";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { ProjectGalleryImage } from "@/components/sections/ProjectGalleryImage";

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

  const title = project.seo?.title ?? project.title;
  const description = project.seo?.description ?? project.summary;
  const url = `/${lang}/projects/${slug}`;
  const ogImage = `/projects/${slug}/og-${lang}.png`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `/en/projects/${slug}`,
        fa: `/fa/projects/${slug}`,
        "x-default": `/en/projects/${slug}`,
      },
    },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      locale: lang === "fa" ? "fa_IR" : "en_US",
      images: project.media?.thumbnail
        ? [{ url: ogImage, width: 1200, height: 630, alt: project.media.thumbnail.alt }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: project.media?.thumbnail ? [ogImage] : undefined,
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
  const caseStudy = project.caseStudy;
  const features = caseStudy?.features;
  const jsonLd = project.structuredData
    ? {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "SoftwareApplication",
            name: project.title,
            description: project.summary,
            url: `${SITE_URL}/${lang}/projects/${slug}`,
            applicationCategory: project.structuredData.applicationCategory,
            operatingSystem: project.structuredData.operatingSystem,
            softwareVersion: project.structuredData.softwareVersion,
            downloadUrl: project.structuredData.downloadUrl,
            license: project.structuredData.license,
            ...(project.repoUrl ? { codeRepository: project.repoUrl } : {}),
            author: { "@type": "Person", name: "Hassan Amini", url: SITE_URL },
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: detail.allProjects, item: `${SITE_URL}/${lang}/projects` },
              { "@type": "ListItem", position: 2, name: project.title, item: `${SITE_URL}/${lang}/projects/${slug}` },
            ],
          },
        ],
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          // Every field above is read from `project`, which is verified,
          // real data — never user input — so this is safe to serialise
          // directly.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
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
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs uppercase tracking-[0.2em] text-white/70">
                {project.role}
              </span>
              {caseStudy?.version && (
                <span
                  dir="ltr"
                  className="rounded-full border border-white/30 px-2.5 py-0.5 text-xs text-white/80"
                >
                  {detail.version} {caseStudy.version}
                </span>
              )}
            </div>
            <h1
              className="text-[2.4rem] leading-[1.1] text-[#FBF6EF] md:text-[3.4rem]"
              style={{ fontWeight: 600, letterSpacing: "-0.025em" }}
            >
              {project.title}
            </h1>
            <p className="text-lg text-white/90">
              {caseStudy?.tagline ?? project.summary}
            </p>
            {(caseStudy?.primaryCta || caseStudy?.secondaryCta) && (
              <div className="mt-2 flex flex-wrap items-center gap-3">
                {caseStudy.primaryCta && (
                  <CTAButton external={caseStudy.primaryCta.href} variant="light">
                    {caseStudy.primaryCta.label} <ArrowUpRight size={16} />
                  </CTAButton>
                )}
                {caseStudy.secondaryCta && (
                  <Link
                    href={caseStudy.secondaryCta.href}
                    className="inline-flex items-center justify-center gap-2 rounded-md border px-5 py-2.5 text-sm text-white transition-colors hover:bg-white/10"
                    style={{ borderColor: "rgba(255,255,255,0.4)" }}
                  >
                    {caseStudy.secondaryCta.label}
                  </Link>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-white/80 underline decoration-white/40 underline-offset-4 transition-colors hover:text-white"
                  >
                    {detail.viewSource}
                  </a>
                )}
              </div>
            )}
          </div>
        </Container>
      </section>

      {project.media?.thumbnail && (
        <section className="border-b border-border bg-surface py-14 md:py-20">
          <Container>
            <Reveal>
              <div className="mx-auto max-w-4xl">
                <ProjectGalleryImage
                  image={project.media.thumbnail}
                  viewLargerLabel={detail.viewLarger}
                  closeLabel={detail.closeImage}
                  priority
                />
              </div>
            </Reveal>
          </Container>
        </section>
      )}

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.4fr_0.6fr]">
            <Reveal>
              <div className="flex flex-col gap-14">
                <div>
                  <Eyebrow>{caseStudy ? detail.whyBuilt : detail.overview}</Eyebrow>
                  <p className="mt-4 text-lg leading-relaxed text-text-main">
                    {project.description}
                  </p>
                </div>

                {features && features.length > 0 ? (
                  <div>
                    <Eyebrow>{detail.keyFeatures}</Eyebrow>
                    <ol className="mt-5 grid gap-4 sm:grid-cols-2">
                      {features.map((feature, i) => (
                        <li
                          key={feature.title}
                          className="rounded-lg border border-border bg-surface p-5"
                        >
                          <span className="text-xs text-accent">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <h3
                            className="mt-1 text-base text-text-main"
                            style={{ fontWeight: 600 }}
                          >
                            {feature.title}
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-text-muted">
                            {feature.body}
                          </p>
                        </li>
                      ))}
                    </ol>
                  </div>
                ) : (
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
                )}

                {caseStudy?.gallery && caseStudy.gallery.length > 0 && (
                  <div>
                    <Eyebrow>{detail.screenshots}</Eyebrow>
                    <div className="mt-5 grid gap-6 sm:grid-cols-2">
                      {caseStudy.gallery.map((image) => (
                        <ProjectGalleryImage
                          key={image.src}
                          image={image}
                          viewLargerLabel={detail.viewLarger}
                          closeLabel={detail.closeImage}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {caseStudy?.howToUse && caseStudy.howToUse.length > 0 && (
                  <div id="install">
                    <Eyebrow>{detail.howToUse}</Eyebrow>
                    <ol className="mt-5 flex flex-col gap-3">
                      {caseStudy.howToUse.map((step, i) => (
                        <li
                          key={step}
                          className="flex gap-3 rounded-lg border border-border bg-surface p-4 text-sm text-text-main"
                        >
                          <span className="flex-shrink-0 text-accent" style={{ fontWeight: 600 }}>
                            {i + 1}.
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                    {caseStudy.installNote && (
                      <p className="mt-3 text-sm text-text-muted">
                        <strong className="text-text-main">{detail.installNote}:</strong>{" "}
                        {caseStudy.installNote}
                      </p>
                    )}
                  </div>
                )}

                {caseStudy?.privacy && (
                  <div>
                    <Eyebrow>{detail.privacy}</Eyebrow>
                    <p className="mt-4 text-sm leading-relaxed text-text-muted">
                      {caseStudy.privacy}
                    </p>
                  </div>
                )}

                {caseStudy?.limitations && caseStudy.limitations.length > 0 && (
                  <div>
                    <Eyebrow>{detail.limitations}</Eyebrow>
                    <ul className="mt-5 flex flex-col gap-2">
                      {caseStudy.limitations.map((note) => (
                        <li
                          key={note}
                          className="flex gap-2.5 text-sm leading-relaxed text-text-muted"
                        >
                          <span aria-hidden className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-text-muted" />
                          {note}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {caseStudy?.faq && caseStudy.faq.length > 0 && (
                  <div>
                    <Eyebrow>{detail.faq}</Eyebrow>
                    <div className="mt-5 flex flex-col gap-2">
                      {caseStudy.faq.map((item) => (
                        <details
                          key={item.question}
                          className="group rounded-lg border border-border bg-surface p-4"
                        >
                          <summary className="cursor-pointer list-none text-sm text-text-main marker:content-none" style={{ fontWeight: 600 }}>
                            {item.question}
                          </summary>
                          <p className="mt-3 text-sm leading-relaxed text-text-muted">
                            {item.answer}
                          </p>
                        </details>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <aside className="flex h-fit flex-col gap-6 rounded-xl border border-border bg-surface p-6 lg:sticky lg:top-24">
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
                    {project.sourcePrivate && (
                      <div className="flex justify-between gap-4">
                        <dt className="text-text-muted">{detail.source}</dt>
                        <dd className="inline-flex items-center gap-1.5 text-end text-text-main">
                          <Lock size={13} className="text-text-muted" />
                          {detail.privateRepo}
                        </dd>
                      </div>
                    )}
                  </dl>
                  {caseStudy?.roleNote && (
                    <p className="mt-4 border-t border-border pt-4 text-sm leading-relaxed text-text-muted">
                      <strong className="block text-xs uppercase tracking-[0.14em] text-text-main">
                        {detail.roleImplementation}
                      </strong>
                      <span className="mt-2 block">{caseStudy.roleNote}</span>
                    </p>
                  )}
                </div>
                {project.repoUrl && (
                  <CTAButton
                    external={project.repoUrl}
                    variant="outline"
                    className="w-full"
                  >
                    <Github size={16} /> {detail.viewSource}
                  </CTAButton>
                )}
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
