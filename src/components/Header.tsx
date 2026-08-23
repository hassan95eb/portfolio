"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { CTAButton } from "./primitives";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { NAV_PATHS, SHOW_LANGUAGE_TOGGLE } from "@/lib/site";
import type { Lang } from "@/lib/i18n/config";
import type { Ui } from "@/i18n/ui";

/**
 * A loose, hand-drawn oval that loops around a nav item — like circling a word
 * in a notebook. Each variant is slightly imperfect and overshoots where it
 * closes, so it never reads as mechanical or as a strike-through.
 */
const CIRCLE_PATHS = [
  "M18 33 C4 27, 5 12, 26 7 C52 1, 83 4, 93 15 C100 24, 86 35, 58 37 C33 39, 13 35, 16 20",
  "M16 31 C3 24, 7 10, 28 6 C55 1, 84 5, 92 16 C98 25, 84 36, 56 37 C31 38, 12 34, 20 18",
  "M20 34 C5 28, 4 13, 25 7 C51 2, 82 3, 94 14 C101 23, 87 35, 59 37 C34 39, 11 36, 15 21",
];

export function Header({
  lang,
  nav,
  common,
  languageToggle,
}: {
  lang: Lang;
  nav: Ui["nav"];
  common: Ui["common"];
  languageToggle: Ui["languageToggle"];
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const items = NAV_PATHS.map((item) => ({
    label: nav[item.key],
    href: `/${lang}${item.path}`,
  }));

  const home = `/${lang}`;
  const isActive = (href: string) =>
    href === home ? pathname === home : pathname.startsWith(href);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page behind the mobile menu.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Navigating with the menu open would otherwise leave it covering the page.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const toggleTarget = lang === "en" ? "fa" : "en";

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-6 py-3 md:px-8">
        <Link href={home} aria-label={nav.home}>
          <Logo height={40} />
        </Link>

        {/* Shared hand-drawn "colored pencil" filter for the nav hover strokes. */}
        <svg width="0" height="0" className="absolute" aria-hidden="true">
          <filter id="nav-crayon" x="-20%" y="-40%" width="140%" height="180%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="2"
              seed="7"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="2.4"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </svg>

        <nav className="hidden items-center gap-8 lg:flex">
          {items.map((item, index) => {
            const active = isActive(item.href);
            const strokeColor =
              index % 2 === 0 ? "var(--accent)" : "var(--text-main)";

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`group/nav relative isolate inline-flex items-center text-sm transition-colors ${
                  active ? "text-accent" : "text-text-main"
                }`}
              >
                <span className="relative z-10">
                  {item.label}
                  {active && (
                    <span className="absolute -bottom-1.5 left-0 h-px w-full bg-accent" />
                  )}
                </span>

                <svg
                  className="nav-stroke pointer-events-none absolute left-1/2 top-1/2 z-0 h-[260%] w-[150%] -translate-x-1/2 -translate-y-1/2 overflow-visible"
                  viewBox="0 0 100 40"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d={CIRCLE_PATHS[index % CIRCLE_PATHS.length]}
                    pathLength={1}
                    stroke={strokeColor}
                    filter="url(#nav-crayon)"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {/* Hidden, not deleted — see SHOW_LANGUAGE_TOGGLE in lib/site.ts.
              /fa stays reachable by URL, so links already shared keep
              working while the Persian copy is under review. */}
          {SHOW_LANGUAGE_TOGGLE && (
            <LanguageToggle
              lang={lang}
              label={languageToggle[toggleTarget]}
              ariaLabel={
                toggleTarget === "fa"
                  ? languageToggle.switchToPersian
                  : languageToggle.switchToEnglish
              }
            />
          )}
          <ThemeToggle toLight={common.themeToLight} toDark={common.themeToDark} />
          <div className="hidden lg:block">
            <CTAButton href={`/${lang}/contact`}>
              {common.letsTalk} <ArrowUpRight size={16} />
            </CTAButton>
          </div>
          <button
            className="grid h-10 w-10 place-items-center rounded-md border border-border text-text-main lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? common.closeMenu : common.openMenu}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-x-0 bottom-0 top-18 z-40 bg-primary lg:hidden">
          <nav className="flex flex-col gap-1 px-6 py-8">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`border-b border-white/10 py-4 font-heading text-lg ${
                  isActive(item.href) ? "text-accent" : "text-[#F3EAE0]"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-6">
              <CTAButton href={`/${lang}/contact`} className="w-full">
                {common.letsTalk} <ArrowUpRight size={16} />
              </CTAButton>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
