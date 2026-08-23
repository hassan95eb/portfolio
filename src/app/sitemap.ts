import type { MetadataRoute } from "next";
import { LANGS, DEFAULT_LANG, type Lang } from "@/lib/i18n/config";
import { SITE_URL } from "@/lib/site";
import { cms } from "@/lib/cms";

/**
 * Sitemap.
 *
 * Every entry carries `alternates.languages`, which emits the `xhtml:link`
 * hreflang pairs. That is the part that matters here: without it a crawler
 * sees /en/about and /fa/about as competing pages rather than as two
 * languages of one page.
 *
 * Only routes that exist and are indexable are listed. `/blog` stays out
 * while it is a placeholder carrying `noindex` — listing it would advertise
 * a URL that should not rank.
 *
 * The /fa entries stay listed even though the header's language switch is
 * hidden: the routes are still built and served, and dropping them from the
 * sitemap would orphan pages a crawler has already seen.
 */

/** Paths without a language prefix. "" is the home page. */
const STATIC_PATHS = [
  "",
  "/about",
  "/projects",
  "/experience",
  "/achievements",
  "/testimonials",
  "/certifications",
  "/contact",
] as const;

function urlFor(lang: Lang, path: string) {
  return `${SITE_URL}/${lang}${path}`;
}

/** The hreflang set for one language-independent path. */
function alternatesFor(path: string) {
  const languages = Object.fromEntries(
    LANGS.map((lang) => [lang, urlFor(lang, path)]),
  );
  return { languages: { ...languages, "x-default": urlFor(DEFAULT_LANG, path) } };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Slugs are identical across languages, so one read covers both.
  const projectSlugs = await cms().getProjectSlugs(DEFAULT_LANG);

  const paths = [
    ...STATIC_PATHS,
    ...projectSlugs.map((slug) => `/projects/${slug}`),
  ];

  const lastModified = new Date();

  return paths.flatMap((path) =>
    LANGS.map((lang) => ({
      url: urlFor(lang, path),
      lastModified,
      changeFrequency: "monthly" as const,
      // The home page is the entry point; project detail pages are the
      // deepest useful content. Everything else sits between.
      priority: path === "" ? 1 : path.startsWith("/projects/") ? 0.6 : 0.8,
      alternates: alternatesFor(path),
    })),
  );
}
