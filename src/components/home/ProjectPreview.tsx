import type { Project } from "@/lib/cms/types";

/**
 * A drawn mock of each project's interface — no screenshots.
 *
 * One variant per featured project, keyed by position rather than by slug,
 * because the illustration belongs to the stage in the scroll sequence, not
 * to the project record. The chrome labels inside are deliberately generic
 * and stay untranslated: they are part of the drawing, like the fake bars.
 */
export function ProjectPreview({
  project,
  variant,
}: {
  project: Project;
  variant: number;
}) {
  const bars = [34, 56, 44, 72, 60, 82];

  return (
    <div className="relative aspect-[16/8.5] overflow-hidden rounded-xl border border-black/15 bg-surface shadow-[0_24px_60px_rgba(28,24,21,0.28)]">
      <div className="flex h-9 items-center gap-1.5 border-b border-border bg-background px-4">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
        <span className="h-1.5 w-1.5 rounded-full bg-border" />
        <span className="ml-3 text-[9px] uppercase tracking-[0.14em] text-text-muted">
          {project.title}
        </span>
      </div>

      {variant === 0 && (
        <div className="grid h-[calc(100%-2.25rem)] grid-cols-[22%_1fr]">
          <div className="border-r border-border bg-primary p-3">
            <div className="mb-5 h-3 w-12 rounded bg-secondary/70" />
            {["Overview", "Operations", "Analytics", "Settings"].map((item, index) => (
              <div
                key={item}
                className={`mb-2 h-2 rounded ${index === 0 ? "w-full bg-accent" : "w-4/5 bg-white/15"}`}
              />
            ))}
          </div>
          <div className="p-4">
            <div className="grid grid-cols-3 gap-2">
              {["2.4M", "42ms", "99.9%"].map((value) => (
                <div key={value} className="rounded border border-border bg-background p-2.5">
                  <span className="block text-[8px] uppercase tracking-[0.12em] text-text-muted">
                    Metric
                  </span>
                  <span
                    className="mt-1 block text-sm text-text-main"
                    style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-3 flex h-[48%] items-end gap-2 rounded border border-border bg-background p-3">
              {bars.map((height, index) => (
                <span
                  key={index}
                  className="flex-1 rounded-t-sm bg-accent/75"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {variant === 1 && (
        <div className="grid h-[calc(100%-2.25rem)] grid-cols-[1.15fr_0.85fr] bg-primary">
          <div className="relative overflow-hidden border-r border-white/10 p-4">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #BFAF9F 1px, transparent 1px), linear-gradient(to bottom, #BFAF9F 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
            <div className="relative flex h-full items-center justify-center">
              <span className="h-3 w-3 rounded-full border-2 border-background bg-accent shadow-[0_0_0_8px_rgba(185,107,74,0.18)]" />
              <span className="absolute h-24 w-24 rounded-full border border-secondary/60" />
              <span className="absolute h-44 w-44 rounded-full border border-secondary/30" />
            </div>
          </div>
          <div className="bg-[#FBF6EF] p-4">
            <span className="text-[8px] uppercase tracking-[0.14em] text-text-muted">
              Network snapshot
            </span>
            <div className="mt-4 space-y-3">
              {["IP address", "Location", "ISP", "Latency"].map((label, index) => (
                <div key={label} className="border-b border-border pb-2">
                  <span className="block text-[8px] text-text-muted">{label}</span>
                  <span className="block text-xs text-text-main">
                    {index === 3 ? "42 ms" : "Resolved"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {variant === 2 && (
        <div className="flex h-[calc(100%-2.25rem)] flex-col justify-between bg-secondary p-5">
          <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.14em] text-primary/70">
            <span>Typing session</span>
            <span>01:24</span>
          </div>
          <div>
            <p
              className="max-w-[78%] text-lg leading-tight text-primary md:text-2xl"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
            >
              Build interfaces that feel fast, clear, and intentional.
            </p>
            <div className="mt-4 h-1.5 w-3/5 rounded-full bg-primary/15">
              <div className="h-full w-[58%] rounded-full bg-accent" />
            </div>
          </div>
          <div className="flex gap-2">
            {["68 WPM", "98% Accuracy", "Stable"].map((value) => (
              <span
                key={value}
                className="rounded border border-primary/15 bg-background/55 px-2.5 py-1.5 text-[9px] text-primary"
              >
                {value}
              </span>
            ))}
          </div>
        </div>
      )}

      {variant === 3 && (
        <div className="grid h-[calc(100%-2.25rem)] grid-cols-[0.75fr_1.25fr] bg-background">
          <div className="border-r border-border p-4">
            <span className="text-[8px] uppercase tracking-[0.14em] text-text-muted">
              Live queues
            </span>
            <div className="mt-4 space-y-2">
              {["Priority", "In review", "In progress", "Resolved"].map((label, index) => (
                <div
                  key={label}
                  className="flex items-center justify-between rounded border border-border bg-surface px-2 py-1.5 text-[9px] text-text-main"
                >
                  <span>{label}</span>
                  <span className={index === 0 ? "text-accent" : "text-text-muted"}>
                    {12 - index * 2}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-end justify-between">
              <span
                className="text-sm text-text-main"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
              >
                Signal overview
              </span>
              <span className="text-[9px] text-accent">Live</span>
            </div>
            <div className="mt-4 grid h-[58%] grid-cols-8 items-end gap-1.5 rounded border border-border bg-surface p-3">
              {[28, 52, 44, 68, 82, 58, 74, 92].map((height, index) => (
                <span
                  key={index}
                  className="rounded-t-sm bg-primary/75"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {variant === 4 && (
        <div className="flex h-[calc(100%-2.25rem)] flex-col bg-surface p-4">
          <div className="flex items-center justify-between">
            <span className="text-[9px] uppercase tracking-[0.14em] text-text-muted">
              Component library
            </span>
            <span className="rounded bg-primary px-2 py-1 text-[8px] text-[#FBF6EF]">
              v2.0
            </span>
          </div>
          <div className="mt-4 grid flex-1 grid-cols-3 gap-2">
            {["Button", "Input", "Select", "Badge", "Avatar", "Tooltip"].map(
              (label, index) => (
                <div
                  key={label}
                  className="flex flex-col justify-between rounded border border-border bg-background p-2.5"
                >
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  <span className="text-[9px] text-text-main">{label}</span>
                  <span
                    className={`h-1.5 rounded-full ${index % 2 === 0 ? "w-4/5 bg-primary/20" : "w-3/5 bg-secondary"}`}
                  />
                </div>
              ),
            )}
          </div>
        </div>
      )}
    </div>
  );
}
