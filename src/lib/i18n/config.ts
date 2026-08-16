/**
 * Language is part of the URL (/en/... , /fa/...), not client state.
 *
 * This is deliberate: it is the only way each language gets its own
 * indexable URL, its own <html lang>/<dir>, and a shareable link that
 * opens in the language the sender saw.
 */

export const LANGS = ["en", "fa"] as const;

export type Lang = (typeof LANGS)[number];

export const DEFAULT_LANG: Lang = "en";

/** Cookie used only to remember the choice for the bare "/" redirect. */
export const LANG_COOKIE = "ha-lang";

export function isLang(value: string | undefined): value is Lang {
  return value === "en" || value === "fa";
}

export function dirOf(lang: Lang): "ltr" | "rtl" {
  return lang === "fa" ? "rtl" : "ltr";
}

/** The other language — used by the toggle to build its href. */
export function otherLang(lang: Lang): Lang {
  return lang === "fa" ? "en" : "fa";
}

/**
 * Swap the language segment of a pathname, keeping the rest of the route.
 * "/fa/projects/foo" + "en" -> "/en/projects/foo"
 */
export function switchLangPath(pathname: string, lang: Lang): string {
  const segments = pathname.split("/");
  // segments[0] is "" because pathname starts with "/"
  if (isLang(segments[1])) {
    segments[1] = lang;
    return segments.join("/");
  }
  return `/${lang}${pathname}`;
}
