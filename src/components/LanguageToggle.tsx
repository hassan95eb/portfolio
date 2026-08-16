"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LANG_COOKIE,
  otherLang,
  switchLangPath,
  type Lang,
} from "@/lib/i18n/config";

/**
 * Compact EN / فارسی switch matching the header's outlined controls.
 *
 * A real link to the other language's URL, not a state toggle — that is the
 * point of keeping language in the path. It is crawlable, it can be opened in
 * a new tab, and it keeps the reader on the page they were already on.
 */
export function LanguageToggle({
  lang,
  label,
  ariaLabel,
  className = "",
}: {
  lang: Lang;
  /** Text shown on the control: the name of the language being switched to. */
  label: string;
  ariaLabel: string;
  className?: string;
}) {
  const pathname = usePathname();
  const target = otherLang(lang);

  return (
    <Link
      href={switchLangPath(pathname, target)}
      hrefLang={target}
      aria-label={ariaLabel}
      dir="ltr"
      onClick={() => {
        // Remembered only so a later visit to "/" lands in the same language.
        document.cookie = `${LANG_COOKIE}=${target};path=/;max-age=31536000;samesite=lax`;
      }}
      className={`font-body text-xs tracking-wide text-text-muted transition-colors hover:text-accent ${className}`}
    >
      {label}
    </Link>
  );
}
