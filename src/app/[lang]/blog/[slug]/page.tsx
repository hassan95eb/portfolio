import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, PenLine } from "lucide-react";
import { isLang, LANGS } from "@/lib/i18n/config";
import { getUi } from "@/i18n/ui";
import { cms } from "@/lib/cms";
import { Container, CTAButton, Reveal } from "@/components/primitives";
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
  const slugs = await cms().getPostSlugs(lang);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLang(lang)) return {};

  const post = await cms().getPost(lang, slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    // The article body is still being written; the page is a rich preview
    // until it lands. `follow` keeps the links live for crawlers.
    robots: { index: false, follow: true },
    alternates: {
      canonical: `/${lang}/blog/${slug}`,
      languages: {
        en: `/en/blog/${slug}`,
        fa: `/fa/blog/${slug}`,
        "x-default": `/en/blog/${slug}`,
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
  const detail = ui.blog.detail;
  const soon = ui.blog.comingSoon;
  const content = cms();

  const [post, featuredPost, posts, categories] = await Promise.all([
    content.getPost(lang, slug),
    content.getFeaturedPost(lang),
    content.getPosts(lang),
    content.getCategories(lang),
  ]);

  // An unknown slug is a real 404, never a 200 page that says "not found".
  if (!post) notFound();

  const all = featuredPost ? [featuredPost, ...posts] : posts;
  const index = all.findIndex((p) => p.slug === slug);
  const next = all[(index + 1) % all.length];

  const categoryName = (s: string) =>
    categories.find((c) => c.slug === s)?.name ?? s;

  const moreInTopic = all
    .filter((p) => p.category === post.category && p.slug !== slug)
    .slice(0, 4);

  return (
    <>
      <section
        className="relative overflow-hidden border-b border-border"
        style={{ backgroundColor: post.accent }}
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
            href={`/${lang}/blog`}
            className="mb-8 inline-flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white"
          >
            <ArrowLeft size={16} className="rtl:rotate-180" /> {detail.allArticles}
          </Link>
          <div className="flex max-w-3xl flex-col gap-5">
            <span className="text-xs uppercase tracking-[0.2em] text-white/70">
              {categoryName(post.category)}
            </span>
            <h1
              className="text-[2.2rem] leading-[1.12] text-[#FBF6EF] md:text-[3.1rem]"
              style={{ fontWeight: 600, letterSpacing: "-0.025em" }}
            >
              {post.title}
            </h1>
            <p className="text-sm text-white/70">
              {post.date} · {post.readTime}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.5fr_0.5fr]">
            <Reveal>
              <div className="flex flex-col gap-8">
                <p className="text-lg leading-relaxed text-text-main">
                  {post.description}
                </p>

                <div className="flex flex-col items-start gap-5 rounded-xl border border-dashed border-border bg-surface p-7 md:p-9">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent/10 text-accent">
                    <PenLine size={22} />
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 px-3 py-1 text-xs uppercase tracking-[0.18em] text-accent">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                    {soon.badge}
                  </span>
                  <h2
                    className="text-xl text-text-main"
                    style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                  >
                    {soon.title}
                  </h2>
                  <p className="text-text-muted">{soon.description}</p>
                  <p className="text-sm text-text-muted">{soon.meanwhile}</p>
                  <CTAButton href={`/${lang}/projects`} variant="outline">
                    {soon.seeProjects} <ArrowUpRight size={16} className="rtl:rotate-180" />
                  </CTAButton>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <aside className="flex flex-col gap-6 rounded-xl border border-border bg-surface p-6">
                <div>
                  <h2 className="mb-3 text-sm uppercase tracking-[0.16em] text-text-muted">
                    {detail.details}
                  </h2>
                  <dl className="flex flex-col gap-2 text-sm">
                    <div className="flex justify-between gap-4">
                      <dt className="text-text-muted">{detail.topic}</dt>
                      <dd className="text-end text-text-main">
                        {categoryName(post.category)}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-text-muted">{detail.published}</dt>
                      <dd className="text-end text-text-main">{post.date}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-text-muted">{detail.readTime}</dt>
                      <dd className="text-end text-text-main">{post.readTime}</dd>
                    </div>
                  </dl>
                </div>

                {moreInTopic.length > 0 && (
                  <div className="border-t border-border pt-5">
                    <h2 className="mb-3 text-sm uppercase tracking-[0.16em] text-text-muted">
                      {detail.moreInTopic}
                    </h2>
                    <ul className="flex flex-col gap-3">
                      {moreInTopic.map((p) => (
                        <li key={p.slug}>
                          <Link
                            href={`/${lang}/blog/${p.slug}`}
                            className="group flex items-start gap-2 text-sm text-text-main transition-colors hover:text-accent"
                          >
                            <ArrowUpRight
                              size={14}
                              className="mt-0.5 flex-shrink-0 text-accent rtl:rotate-180"
                            />
                            {p.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </aside>
            </Reveal>
          </div>

          <div className="mt-16 border-t border-border pt-8">
            <Link
              href={`/${lang}/blog/${next.slug}`}
              className="group flex items-center justify-between gap-4"
            >
              <div>
                <span className="text-xs uppercase tracking-[0.16em] text-text-muted">
                  {detail.nextArticle}
                </span>
                <div
                  className="text-xl text-text-main transition-colors group-hover:text-accent"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                >
                  {next.title}
                </div>
              </div>
              <ArrowUpRight className="flex-shrink-0 text-accent rtl:rotate-180" />
            </Link>
          </div>
        </Container>
      </section>

      <ContactCTA lang={lang} copy={ui.contactCTA} />
    </>
  );
}
