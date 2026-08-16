"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Languages } from "lucide-react";
import {
  LANG_COOKIE,
  otherLang,
  switchLangPath,
  type Lang,
} from "@/lib/i18n/config";

/**
 * A real <Link> to the other language's URL — not a state toggle.
 * That is the whole point of putting the language in the path: the
 * switch is a navigation, so it is crawlable and shareable.
 */
export function LangToggle({ lang, label }: { lang: Lang; label: string }) {
  const pathname = usePathname();
  const target = otherLang(lang);

  return (
    <Link
      href={switchLangPath(pathname, target)}
      hrefLang={target}
      onClick={() => {
        // Remember the choice so a later visit to "/" lands in the right place.
        document.cookie = `${LANG_COOKIE}=${target};path=/;max-age=31536000;samesite=lax`;
      }}
      className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm text-text-main transition-colors hover:border-accent hover:text-accent"
    >
      <Languages size={16} />
      <span>{label}</span>
    </Link>
  );
}
