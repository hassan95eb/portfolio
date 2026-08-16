import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LANG, LANGS, LANG_COOKIE, isLang } from "@/lib/i18n/config";

/**
 * Every page lives under /en or /fa. This sends anything that arrives
 * without a language prefix to the right one, preferring an earlier
 * explicit choice, then the browser's Accept-Language, then English.
 */

function pickLang(request: NextRequest): string {
  const cookie = request.cookies.get(LANG_COOKIE)?.value;
  if (isLang(cookie)) return cookie;

  const header = request.headers.get("accept-language") ?? "";
  // Good enough for a two-language site: does Persian outrank English?
  const fa = header.toLowerCase().indexOf("fa");
  const en = header.toLowerCase().indexOf("en");
  if (fa !== -1 && (en === -1 || fa < en)) return "fa";

  return DEFAULT_LANG;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLang = LANGS.some(
    (lang) => pathname === `/${lang}` || pathname.startsWith(`/${lang}/`),
  );
  if (hasLang) return NextResponse.next();

  const lang = pickLang(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${lang}${pathname === "/" ? "" : pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, the API surface, and anything with a file extension.
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
};
