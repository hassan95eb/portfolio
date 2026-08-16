import type { CmsAdapter } from "./adapter";
import { mockAdapter } from "./mock-adapter";

export type * from "./types";
export type { CmsAdapter } from "./adapter";

/**
 * The single switch between content sources.
 *
 * Step 10 adds:
 *
 *   import { wordpressAdapter } from "./wordpress";
 *   ...
 *   if (process.env.CMS_SOURCE === "wordpress") return wordpressAdapter;
 *
 * and nothing else in the codebase changes.
 */
export function cms(): CmsAdapter {
  return mockAdapter;
}
