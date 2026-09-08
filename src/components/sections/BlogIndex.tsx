"use client";

import { useMemo, useState } from "react";
import { Container, Eyebrow, Reveal } from "@/components/primitives";
import { BlogCard } from "@/components/sections/BlogCard";
import type { Lang } from "@/lib/i18n/config";
import type { BlogPost, Category } from "@/lib/cms/types";

/**
 * The "All Writing" section: a topic filter bar plus the post grid.
 *
 * Client-side because the filter is pure view state — every post is already
 * in the payload, so switching topics is a local array filter with no round
 * trip. The server page owns data fetching and passes the resolved lists
 * down.
 */
export function BlogIndex({
  lang,
  posts,
  categories,
  copy,
}: {
  lang: Lang;
  posts: BlogPost[];
  categories: Category[];
  copy: {
    heading: string;
    allTopics: string;
    readArticle: string;
    noArticles: string;
  };
}) {
  const [active, setActive] = useState<string>("all");

  const nameFor = useMemo(() => {
    const map = new Map(categories.map((c) => [c.slug, c.name]));
    return (slug: string) => map.get(slug) ?? slug;
  }, [categories]);

  // Only offer topics that actually have posts behind them.
  const topics = useMemo(() => {
    const used = new Set(posts.map((p) => p.category));
    return categories.filter((c) => used.has(c.slug));
  }, [posts, categories]);

  const visible =
    active === "all" ? posts : posts.filter((p) => p.category === active);

  return (
    <section className="border-t border-border bg-secondary/25 py-20 md:py-28">
      <Container>
        <Eyebrow>{copy.heading}</Eyebrow>

        <div className="mt-8 flex flex-wrap gap-2">
          {[{ slug: "all", name: copy.allTopics }, ...topics].map((topic) => {
            const isActive = active === topic.slug;
            return (
              <button
                key={topic.slug}
                type="button"
                onClick={() => setActive(topic.slug)}
                aria-pressed={isActive}
                className={`rounded-full border px-3.5 py-1.5 text-xs transition-colors ${
                  isActive
                    ? "border-accent bg-accent text-[#FBF6EF]"
                    : "border-border bg-background text-text-muted hover:border-accent hover:text-accent"
                }`}
              >
                {topic.name}
              </button>
            );
          })}
        </div>

        {visible.length > 0 ? (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((post, i) => (
              <BlogCard
                key={post.slug}
                lang={lang}
                post={post}
                categoryName={nameFor(post.category)}
                readArticleLabel={copy.readArticle}
                index={i}
              />
            ))}
          </div>
        ) : (
          <Reveal>
            <p className="mt-12 text-sm text-text-muted">{copy.noArticles}</p>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
