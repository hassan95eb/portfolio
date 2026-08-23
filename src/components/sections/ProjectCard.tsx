import Link from "next/link";
import { ArrowUpRight, Github, Lock } from "lucide-react";
import { Reveal, Tag } from "@/components/primitives";
import type { Lang } from "@/lib/i18n/config";
import type { Project } from "@/lib/cms/types";
import type { Ui } from "@/i18n/ui";

/**
 * Grid card for the projects index.
 *
 * The visual area is a drawn mock tinted with the project's own accent —
 * the same no-screenshots approach as `home/ProjectPreview`, but flattened
 * to one generic composition because a grid of distinct illustrations would
 * compete with the titles.
 *
 * The card itself is no longer a link. It now carries a second one — the
 * repository — and an anchor nested inside another anchor is invalid HTML
 * that browsers silently unnest. Instead the title link stretches over the
 * card with a pseudo-element: the whole surface stays clickable while the
 * title remains the link's accessible name, and the repo link sits above it.
 */
export function ProjectCard({
  lang,
  project,
  copy,
  index = 0,
}: {
  lang: Lang;
  project: Project;
  copy: Ui["projects"]["card"];
  index?: number;
}) {
  return (
    <Reveal delay={index * 0.08}>
      <div className="group relative h-full overflow-hidden rounded-xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-xl">
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
          <div className="flex items-center justify-between gap-3 text-xs text-text-muted">
            <span>{project.role}</span>
            {project.sourcePrivate && (
              <span className="inline-flex items-center gap-1.5">
                <Lock size={12} /> {copy.privateRepo}
              </span>
            )}
          </div>

          <h2
            className="text-[1.35rem] text-text-main transition-colors group-hover:text-accent"
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 600,
              letterSpacing: "-0.01em",
            }}
          >
            <Link
              href={`/${lang}/projects/${project.slug}`}
              className="after:absolute after:inset-0 after:content-['']"
            >
              {project.title}
            </Link>
          </h2>

          <p className="text-sm text-text-muted">{project.summary}</p>

          <div className="flex flex-wrap gap-2">
            {project.stack.slice(0, 4).map((s) => (
              <Tag key={s}>{s}</Tag>
            ))}
          </div>

          <div className="mt-1 flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1 text-sm text-accent">
              {copy.viewCaseStudy} <ArrowUpRight size={15} />
            </span>
            {project.repoUrl && (
              /* `relative z-10` lifts this above the title link's stretched
                 pseudo-element, which would otherwise swallow the click. */
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={copy.viewSource}
                title={copy.viewSource}
                className="relative z-10 grid h-8 w-8 place-items-center rounded-md border border-border text-text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <Github size={15} />
              </a>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
