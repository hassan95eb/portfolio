/**
 * Contact details and outbound links.
 *
 * Not in the CMS: these belong to the person, not to an editor workflow,
 * and a wrong value here breaks every page at once rather than one entry.
 */
export const CONTACT = {
  email: "hassanaminidev@gmail.com",
  github: "https://github.com/hassan95eb",
  // TODO: confirm — the Figma export carried a placeholder handle.
  linkedin: "https://www.linkedin.com/in/hassan-amini",
} as const;

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
