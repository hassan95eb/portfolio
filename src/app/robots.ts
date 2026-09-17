import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * A portfolio wants to be crawled, so the rule is "allow everything" with two
 * exceptions:
 *
 * - `/_next/` is build output. Blocking it saves crawl budget on hashed
 *   chunks that will never be a search result. `/_next/image` is carved
 *   back out: it is the image-optimisation endpoint, not a build chunk, and
 *   blocking it stops crawlers from ever fetching an optimised `next/image`
 *   — including project screenshots — even though the page itself is
 *   allowed.
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
      allow: ["/", "/_next/image"],
      disallow: ["/_next/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
