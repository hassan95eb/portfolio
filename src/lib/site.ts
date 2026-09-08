/**
 * Contact details and outbound links.
 *
 * Not in the CMS: these belong to the person, not to an editor workflow,
 * and a wrong value here breaks every page at once rather than one entry.
 */
/**
 * Absolute origin, no trailing slash.
 *
 * Sitemap URLs and canonical tags are only honoured as absolute URLs, so this
 * has to be set in the deploy environment. The localhost fallback keeps `next
 * build` working locally; it would be wrong in production, which is why the
 * value belongs in one place rather than inlined at each call site.
 */
export const SITE_URL = (
    process.env.NEXT_PUBLIC_SITE_URL ??
    "http://localhost:3000"
).replace(/\/$/, "");

export const CONTACT = {
    email: "hassanaminidev@gmail.com",
    github: "https://github.com/hassan95eb",
    // TODO: confirm — the Figma export carried a placeholder handle.
    linkedin: "https://www.linkedin.com/in/hassanaminidev",
} as const;

/**
 * The CV, served straight out of `public/`.
 *
 * Language-independent on purpose: it is one English PDF, so /en and /fa
 * both link to the same file rather than 404ing on a Persian variant that
 * does not exist.
 */
export const RESUME_PATH = "/Hassan_Amini_Resume.pdf";

/**
 * Whether the header shows the EN / فارسی switch.
 *
 * Off while the Persian copy is still being reviewed. The /fa routes stay
 * built and reachable by URL — this hides the control, it does not remove
 * the language, so nothing already shared breaks. Flipping it back to
 * `true` is the whole of re-enabling it.
 *
 * Annotated `boolean` rather than inferred: as a literal `false` TypeScript
 * narrows the guard at the call site to dead code and lint flags it.
 */
export const SHOW_LANGUAGE_TOGGLE: boolean = false;

/** Nav order, shared by the header and the footer. Paths exclude the language. */
export const NAV_PATHS = [
    { key: "home", path: "" },
    { key: "about", path: "/about" },
    { key: "projects", path: "/projects" },
    { key: "experience", path: "/experience" },
    { key: "achievements", path: "/achievements" },
    { key: "blog", path: "/blog" },
    { key: "contact", path: "/contact" },
] as const;

export type NavKey = (typeof NAV_PATHS)[number]["key"];
