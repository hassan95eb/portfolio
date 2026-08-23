"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { ProjectPreview } from "./ProjectPreview";
import type { Lang } from "@/lib/i18n/config";
import type { Project } from "@/lib/cms/types";
import type { Ui } from "@/i18n/ui";

/**
 * One palette per stage. The section is a single sticky panel that recolours
 * as the reader passes invisible full-height spacers behind it, so the stage
 * count has to match the number of featured projects.
 */
const FEATURED_PROJECT_STAGES = [
  { background: "#25201C", foreground: "#FBF6EF", muted: "#D8CBBE", buttonBackground: "#FBF6EF", buttonForeground: "#25201C" },
  { background: "#BFAF9F", foreground: "#1C1815", muted: "#746A62", buttonBackground: "#25201C", buttonForeground: "#FBF6EF" },
  { background: "#B96B4A", foreground: "#FBF6EF", muted: "#FBF6EF", buttonBackground: "#25201C", buttonForeground: "#FBF6EF" },
  { background: "#FBF6EF", foreground: "#1C1815", muted: "#746A62", buttonBackground: "#B96B4A", buttonForeground: "#FBF6EF" },
  { background: "#1C1815", foreground: "#FBF6EF", muted: "#BFAF9F", buttonBackground: "#BFAF9F", buttonForeground: "#1C1815" },
] as const;

export function FeaturedProjects({
  lang,
  copy,
  projects,
  showAllLink = true,
}: {
  lang: Lang;
  copy: Ui["featuredProjects"];
  projects: Project[];
  showAllLink?: boolean;
}) {
  const stages = projects.slice(0, FEATURED_PROJECT_STAGES.length);
  const stageRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

    const observers = stageRefs.current.map((stage, index) => {
      if (!stage) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(index);
        },
        { threshold: 0.58 },
      );
      observer.observe(stage);
      return observer;
    });

    return () => observers.forEach((observer) => observer?.disconnect());
  }, []);

  if (stages.length === 0) return null;

  const activeProject = stages[activeIndex];
  const activeStage = FEATURED_PROJECT_STAGES[activeIndex];

  return (
    <section className="relative" aria-label={copy.eyebrow}>
      <div
        className="sticky top-0 z-0 h-[100svh] overflow-hidden transition-colors duration-700 ease-out"
        style={{ backgroundColor: activeStage.background, color: activeStage.foreground }}
      >
        <div aria-hidden className="absolute inset-0 opacity-30">
          <div className="absolute left-[8%] top-[23%] h-44 w-44 rounded-full border border-current opacity-20 md:h-64 md:w-64" />
          <div className="absolute right-[7%] top-[18%] h-[44%] w-px bg-current opacity-30" />
        </div>

        <div className="relative mx-auto h-full w-full max-w-[1440px] px-6 md:px-10">
          <div className="absolute left-1/2 top-8 -translate-x-1/2 text-center md:top-10">
            <p
              className="text-xs uppercase tracking-[0.24em]"
              style={{ color: activeStage.muted }}
            >
              {copy.eyebrow}
            </p>
            <div className="mx-auto mt-3 flex gap-2">
              {stages.map((project, index) => (
                <span
                  key={project.slug}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    index === activeIndex ? "w-7" : "w-1.5"
                  }`}
                  style={{
                    backgroundColor: activeStage.foreground,
                    opacity: index === activeIndex ? 1 : 0.36,
                  }}
                />
              ))}
            </div>
          </div>

          <motion.div
            key={activeProject.slug}
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
            className="grid h-full grid-rows-[auto_auto] content-center gap-7 px-1 pt-24 pb-8 sm:gap-9 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:grid-rows-1 md:items-center md:gap-10 md:px-[3%] md:pt-16 md:pb-12"
          >
            <div className="relative z-10 min-w-0 max-w-xl md:justify-self-start">
              <p
                dir="ltr"
                className="mb-3 text-[10px] uppercase tracking-[0.18em] md:text-xs rtl:text-right"
                style={{ color: activeStage.muted }}
              >
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(stages.length).padStart(2, "0")}
              </p>
              <h2
                className="max-w-full break-words text-[clamp(2.6rem,5.2vw,6.25rem)] leading-[0.9] md:max-w-[9.5ch]"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 500,
                  letterSpacing: "-0.055em",
                }}
              >
                {activeProject.title}
              </h2>
            </div>

            <div className="flex min-w-0 flex-col items-center md:items-start">
              <div className="w-full max-w-[580px]">
                <ProjectPreview project={activeProject} variant={activeIndex} />
              </div>
              <p
                className="mt-3 w-full max-w-[620px] text-xs leading-relaxed md:text-sm"
                style={{ color: activeStage.muted }}
              >
                {activeProject.role}
              </p>
              <div className="mt-5 flex flex-col items-center gap-3 self-center md:self-start">
                <Link
                  href={`/${lang}/projects/${activeProject.slug}`}
                  className="inline-flex min-w-40 items-center justify-center gap-2 rounded-md px-5 py-3 text-sm transition-transform duration-200 hover:-translate-y-0.5"
                  style={{
                    backgroundColor: activeStage.buttonBackground,
                    color: activeStage.buttonForeground,
                  }}
                >
                  {copy.viewProject} <ArrowUpRight size={16} />
                </Link>
                {showAllLink && (
                  <Link
                    href={`/${lang}/projects`}
                    className="text-sm underline decoration-current/50 underline-offset-4 transition-opacity hover:opacity-70"
                  >
                    {copy.viewAll}
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll track: one viewport-height spacer per stage, pulled back up
          behind the sticky panel. Purely a scroll driver — nothing renders. */}
      <div className="relative z-10 -mt-[100svh] pointer-events-none" aria-hidden>
        {stages.map((project, index) => (
          <div
            key={project.slug}
            ref={(node) => {
              stageRefs.current[index] = node;
            }}
            className="h-[100svh]"
          />
        ))}
      </div>
    </section>
  );
}
