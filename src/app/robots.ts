import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * A portfolio wants to be crawled, so the rule is "allow everything" with two
 * exceptions:
 *
 * - `/_next/` is build output. Blocking it saves crawl budget on hashed
 *   chunks that will never be a search result.
 * - Unprefixed paths are not blocked: `/about` redirects to `/en/about` via
 *   middleware, and a crawler following that redirect lands on the canonical
 *   URL, which is the behaviour we want.
 *
 * Individual blog articles are kept out of the index by their own `robots`
 * metadata rather than here — a per-page `noindex` survives being linked to,
 * whereas a Disallow only stops the crawl.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/_next/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
