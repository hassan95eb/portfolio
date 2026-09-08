import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/primitives";
import type { Lang } from "@/lib/i18n/config";
import type { BlogPost } from "@/lib/cms/types";

/**
 * Grid / featured card for the blog index.
 *
 * Same no-screenshots language as `ProjectCard`: an accent band tinted with
 * the post's own colour, carrying a drawn "page of text" motif rather than
 * an image. The title link stretches over the whole card with a
 * pseudo-element so the entire surface is clickable while the title stays
 * the link's accessible name.
 */
export function BlogCard({
  lang,
  post,
  categoryName,
  readArticleLabel,
  featuredLabel,
  featured = false,
  index = 0,
}: {
  lang: Lang;
  post: BlogPost;
  /** Resolved display name for `post.category`. */
  categoryName: string;
  readArticleLabel: string;
  /** Shown as a pill on the featured card only. */
  featuredLabel?: string;
  featured?: boolean;
  index?: number;
}) {
  const dark = post.tone === "dark";

  return (
    <Reveal delay={index * 0.06} className={featured ? "" : "h-full"}>
      <article
        className={`group relative h-full overflow-hidden rounded-xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-xl ${
          featured ? "md:grid md:grid-cols-2" : ""
        }`}
      >
        <div
          className={`relative overflow-hidden border-b border-border ${
            featured ? "h-52 md:h-full md:border-b-0 md:border-e" : "h-40"
          }`}
          style={{ backgroundColor: post.accent }}
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.18]"
            style={{
              color: dark ? "#FBF6EF" : "#1C1815",
              backgroundImage:
                "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
              backgroundSize: "26px 26px",
            }}
          />
          <div className="absolute inset-0 flex flex-col justify-between p-5">
            <span
              className={`text-[10px] uppercase tracking-[0.16em] ${
                dark ? "text-white/70" : "text-black/50"
              }`}
            >
              {categoryName}
            </span>
            <div className="space-y-2">
              {[92, 78, 85, 60].map((w, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full ${dark ? "bg-white/35" : "bg-black/20"}`}
                  style={{ width: `${w}%` }}
                />
              ))}
            </div>
          </div>
        </div>

        <div
          className={`flex flex-col gap-3 p-6 ${featured ? "md:justify-center md:p-8" : ""}`}
        >
          {featured && featuredLabel && (
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-accent/40 px-2.5 py-0.5 text-xs uppercase tracking-[0.14em] text-accent">
              {featuredLabel}
            </span>
          )}

          <h3
            className={`text-text-main transition-colors group-hover:text-accent ${
              featured ? "text-[1.6rem] leading-[1.15] md:text-[2rem]" : "text-[1.3rem]"
            }`}
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 600,
              letterSpacing: "-0.01em",
            }}
          >
            <Link
              href={`/${lang}/blog/${post.slug}`}
              className="after:absolute after:inset-0 after:content-['']"
            >
              {post.title}
            </Link>
          </h3>

          <p className={`text-text-muted ${featured ? "text-base" : "text-sm"}`}>
            {post.description}
          </p>

          <div className="mt-1 flex items-center justify-between gap-3 text-xs text-text-muted">
            <span>
              {post.date} · {post.readTime}
            </span>
            <span className="inline-flex items-center gap-1 text-accent">
              {readArticleLabel} <ArrowUpRight size={14} className="rtl:rotate-180" />
            </span>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
