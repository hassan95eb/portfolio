import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal, Tag } from "@/components/primitives";
import type { Lang } from "@/lib/i18n/config";
import type { Project } from "@/lib/cms/types";

/**
 * Grid card for the projects index.
 *
 * The visual area is a drawn mock tinted with the project's own accent —
 * the same no-screenshots approach as `home/ProjectPreview`, but flattened
 * to one generic composition because a grid of five distinct illustrations
 * would compete with the titles.
 */
export function ProjectCard({
  lang,
  project,
  viewCaseStudy,
  index = 0,
}: {
  lang: Lang;
  project: Project;
  viewCaseStudy: string;
  index?: number;
}) {
  return (
    <Reveal delay={index * 0.08}>
      <Link
        href={`/${lang}/projects/${project.slug}`}
        className="group block h-full overflow-hidden rounded-xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-xl"
      >
        <div
          className="relative h-44 overflow-hidden border-b border-border"
          style={{ backgroundColor: project.accent }}
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.18]"
            style={{
              color: "#FBF6EF",
              backgroundImage:
                "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          <div className="absolute inset-0 flex flex-col justify-between p-5">
            <div className="flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-white/70" />
              <span className="h-2 w-2 rounded-full bg-white/40" />
              <span className="h-2 w-2 rounded-full bg-white/40" />
            </div>
            <div>
              <div className="mb-2 h-1.5 w-2/3 rounded-full bg-white/40" />
              <div className="mb-2 h-1.5 w-1/2 rounded-full bg-white/25" />
              <div className="flex items-end gap-1.5">
                {[40, 65, 50, 80, 60].map((h, i) => (
                  <div
                    key={i}
                    className="w-3 rounded-sm bg-white/50"
                    style={{ height: `${h * 0.4}px` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 p-6">
          <div className="flex items-center justify-between text-xs text-text-muted">
            <span>{project.role}</span>
            <span>{project.year}</span>
          </div>
          <h2
            className="text-[1.35rem] text-text-main transition-colors group-hover:text-accent"
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 600,
              letterSpacing: "-0.01em",
            }}
          >
            {project.title}
          </h2>
          <p className="text-sm text-text-muted">{project.summary}</p>
          <div className="flex flex-wrap gap-2">
            {project.stack.slice(0, 4).map((s) => (
              <Tag key={s}>{s}</Tag>
            ))}
          </div>
          <span className="mt-1 inline-flex items-center gap-1 text-sm text-accent">
            {viewCaseStudy} <ArrowUpRight size={15} />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
