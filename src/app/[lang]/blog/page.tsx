import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLang } from "@/lib/i18n/config";
import { getUi } from "@/i18n/ui";
import { getProfile } from "@/content/profile";
import { cms } from "@/lib/cms";
import { Container, Eyebrow, Reveal, SectionHeading } from "@/components/primitives";
import { PageHeader } from "@/components/sections/PageHeader";
import { BlogCard } from "@/components/sections/BlogCard";
import { BlogIndex } from "@/components/sections/BlogIndex";
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
    title: ui.nav.blog,
    description: ui.blog.hero.description,
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
  const content = cms();

  const [featuredPost, posts, categories] = await Promise.all([
    content.getFeaturedPost(lang),
    content.getPosts(lang),
    content.getCategories(lang),
  ]);

  // The index is built around a featured post; without one the page has no
  // shape to render, so treat it as missing content rather than half-draw it.
  if (!featuredPost) notFound();

  const categoryName = (slug: string) =>
    categories.find((c) => c.slug === slug)?.name ?? slug;

  return (
    <>
      <PageHeader
        eyebrow={ui.blog.hero.eyebrow}
        title={ui.blog.hero.title}
        description={ui.blog.hero.description}
      />

      <section className="py-20 md:py-24">
        <Container>
          <Eyebrow>{ui.blog.featured}</Eyebrow>
          <div className="mt-8">
            <BlogCard
              lang={lang}
              post={featuredPost}
              categoryName={categoryName(featuredPost.category)}
              readArticleLabel={ui.blog.readArticle}
              featuredLabel={ui.blog.featured}
              featured
            />
          </div>
        </Container>
      </section>

      <BlogIndex
        lang={lang}
        posts={posts}
        categories={categories}
        copy={{
          heading: ui.blog.allWriting,
          allTopics: ui.blog.allTopics,
          readArticle: ui.blog.readArticle,
          noArticles: ui.blog.noArticles,
        }}
      />

      {/* The pillars are real standing content, not placeholder text — they
          say what the writing covers, which is the one thing a reader
          landing here actually wants to know. */}
      <section className="py-20 md:py-28">
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
