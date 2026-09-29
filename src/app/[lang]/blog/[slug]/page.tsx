import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check, ExternalLink, PenLine } from "lucide-react";
import { isLang, LANGS } from "@/lib/i18n/config";
import { getUi } from "@/i18n/ui";
import { cms } from "@/lib/cms";
import { Container, CTAButton, Reveal } from "@/components/primitives";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { SITE_URL } from "@/lib/site";

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

  const article = post.article;

  return {
    title: article?.seoTitle ?? post.title,
    description: article?.seoDescription ?? post.description,
    keywords: article?.keywords,
    robots: { index: Boolean(article), follow: true },
    alternates: {
      canonical: `/${lang}/blog/${slug}`,
      languages: {
        en: `/en/blog/${slug}`,
        fa: `/fa/blog/${slug}`,
        "x-default": `/en/blog/${slug}`,
      },
    },
    openGraph: article
      ? {
          type: "article",
          title: article.seoTitle,
          description: article.seoDescription,
          url: `/${lang}/blog/${slug}`,
          publishedTime: article.publishedAt,
          modifiedTime: article.modifiedAt,
          authors: ["Hassan Amini"],
          tags: article.keywords,
          locale: lang === "fa" ? "fa_IR" : "en_US",
        }
      : undefined,
    twitter: article
      ? {
          card: "summary_large_image",
          title: article.seoTitle,
          description: article.seoDescription,
        }
      : undefined,
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

  const article = post.article;
  const articleUrl = `${SITE_URL}/${lang}/blog/${slug}`;
  const structuredData = article
    ? {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Article",
            headline: post.title,
            description: article.seoDescription,
            datePublished: article.publishedAt,
            dateModified: article.modifiedAt ?? article.publishedAt,
            inLanguage: lang,
            mainEntityOfPage: articleUrl,
            author: {
              "@type": "Person",
              name: "Hassan Amini",
              url: `${SITE_URL}/${lang}/about`,
            },
            publisher: {
              "@type": "Person",
              name: "Hassan Amini",
              url: `${SITE_URL}/${lang}`,
            },
            keywords: article.keywords.join(", "),
          },
          {
            "@type": "FAQPage",
            mainEntity: article.faq.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          },
        ],
      }
    : null;

  return (
    <>
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
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
              {article ? (
                <article className="min-w-0 text-text-main">
                  <div className="mb-12 border-b border-border pb-10">
                    <p className="text-xl leading-9 text-text-main">{post.description}</p>
                    <div className="mt-7 space-y-6 text-[1.06rem] leading-9 text-text-muted">
                      {article.intro.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </div>

                  <nav
                    aria-label={lang === "fa" ? "فهرست مقاله" : "Table of contents"}
                    className="mb-14 rounded-xl border border-border bg-surface p-6 md:p-8"
                  >
                    <h2 className="mb-5 text-lg font-semibold text-text-main">
                      {lang === "fa" ? "در این مقاله می‌خوانید" : "In this article"}
                    </h2>
                    <ol className="grid gap-x-8 gap-y-3 md:grid-cols-2">
                      {article.sections.map((section, index) => (
                        <li key={section.id}>
                          <a
                            href={`#${section.id}`}
                            className="group flex gap-3 text-sm leading-6 text-text-muted transition-colors hover:text-accent"
                          >
                            <span className="text-accent">{index + 1}.</span>
                            <span>{section.title}</span>
                          </a>
                        </li>
                      ))}
                    </ol>
                  </nav>

                  <div className="space-y-16">
                    {article.sections.map((section) => (
                      <section key={section.id} id={section.id} className="scroll-mt-24">
                        <h2
                          className="mb-6 text-2xl leading-10 text-text-main md:text-[1.75rem]"
                          style={{ fontFamily: "var(--font-heading)", fontWeight: 650 }}
                        >
                          {section.title}
                        </h2>
                        <div className="space-y-6 text-[1.03rem] leading-9 text-text-muted">
                          {section.paragraphs.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                          ))}
                        </div>

                        {section.bullets && (
                          <ul className="mt-7 space-y-3 rounded-xl border border-border bg-surface p-6">
                            {section.bullets.map((item) => (
                              <li key={item} className="flex items-start gap-3 leading-8 text-text-main">
                                <Check size={18} className="mt-1.5 shrink-0 text-accent" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {section.table && (
                          <div className="mt-8 overflow-x-auto rounded-xl border border-border">
                            <table className="w-full min-w-[760px] border-collapse text-sm">
                              {section.table.caption && (
                                <caption className="border-b border-border bg-surface px-5 py-4 text-start font-medium text-text-main">
                                  {section.table.caption}
                                </caption>
                              )}
                              <thead className="bg-surface">
                                <tr>
                                  {section.table.headers.map((header) => (
                                    <th key={header} className="border-b border-border px-5 py-4 text-start font-semibold text-text-main">
                                      {header}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {section.table.rows.map((row) => (
                                  <tr key={row.join("|")} className="border-b border-border last:border-0">
                                    {row.map((cell, index) => (
                                      <td key={`${cell}-${index}`} className="px-5 py-4 align-top leading-7 text-text-muted first:font-medium first:text-text-main">
                                        {cell}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}

                        {section.note && (
                          <p className="mt-7 border-s-4 border-accent bg-accent/5 px-5 py-4 leading-8 text-text-main">
                            {section.note}
                          </p>
                        )}
                      </section>
                    ))}
                  </div>

                  <section className="mt-16 rounded-xl bg-[#25201C] p-7 text-[#FBF6EF] md:p-10">
                    <h2 className="mb-5 text-2xl font-semibold">
                      {lang === "fa" ? "نتیجه نهایی" : "Final takeaway"}
                    </h2>
                    <div className="space-y-5 leading-8 text-white/75">
                      {article.conclusion.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </section>

                  <section className="mt-16" aria-labelledby="article-faq">
                    <h2 id="article-faq" className="mb-7 text-2xl font-semibold text-text-main">
                      {lang === "fa" ? "پرسش‌های متداول" : "Frequently asked questions"}
                    </h2>
                    <div className="divide-y divide-border rounded-xl border border-border bg-surface px-6">
                      {article.faq.map((item) => (
                        <details key={item.question} className="group py-5">
                          <summary className="cursor-pointer list-none font-medium leading-7 text-text-main">
                            {item.question}
                          </summary>
                          <p className="pt-4 leading-8 text-text-muted">{item.answer}</p>
                        </details>
                      ))}
                    </div>
                  </section>

                  <section className="mt-14 border-t border-border pt-8" aria-labelledby="article-sources">
                    <h2 id="article-sources" className="mb-5 text-xl font-semibold text-text-main">
                      {lang === "fa" ? "منابع رسمی و تاریخ بررسی" : "Official sources"}
                    </h2>
                    <p className="mb-5 text-sm leading-7 text-text-muted">
                      {lang === "fa"
                        ? "قابلیت‌ها و قیمت‌ها در ۷ مهر ۱۴۰۵ بررسی شده‌اند و ممکن است بعداً تغییر کنند."
                        : "Features and prices were checked on September 29, 2026 and may change."}
                    </p>
                    <ul className="grid gap-3 md:grid-cols-2">
                      {article.sources.map((source) => (
                        <li key={source.href}>
                          <a
                            href={source.href}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-start gap-2 text-sm leading-6 text-accent hover:underline"
                          >
                            <ExternalLink size={14} className="mt-1 shrink-0" />
                            {source.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </section>
                </article>
              ) : (
                <div className="flex flex-col gap-8">
                  <p className="text-lg leading-relaxed text-text-main">{post.description}</p>
                  <div className="flex flex-col items-start gap-5 rounded-xl border border-dashed border-border bg-surface p-7 md:p-9">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent/10 text-accent">
                      <PenLine size={22} />
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 px-3 py-1 text-xs uppercase tracking-[0.18em] text-accent">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                      {soon.badge}
                    </span>
                    <h2 className="text-xl text-text-main" style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}>
                      {soon.title}
                    </h2>
                    <p className="text-text-muted">{soon.description}</p>
                    <p className="text-sm text-text-muted">{soon.meanwhile}</p>
                    <CTAButton href={`/${lang}/projects`} variant="outline">
                      {soon.seeProjects} <ArrowUpRight size={16} className="rtl:rotate-180" />
                    </CTAButton>
                  </div>
                </div>
              )}
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
