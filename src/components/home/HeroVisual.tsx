"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { Activity, TrendingUp, Zap } from "lucide-react";
import type { Ui } from "@/i18n/ui";

const CODE_PARTS = [
  { text: "const", className: "text-accent" },
  { text: " ui = build(", className: "text-text-main" },
  { text: "system", className: "text-text-muted" },
  { text: ")", className: "text-text-main" },
] as const;

const CODE_LINE = CODE_PARTS.map((part) => part.text).join("");

function LoopingCodeLine() {
  const reduceMotion = useReducedMotion();
  const [characters, setCharacters] = useState(0);
  const [phase, setPhase] = useState<"waiting" | "typing" | "holding" | "deleting">(
    "waiting",
  );

  useEffect(() => {
    if (reduceMotion) {
      setCharacters(CODE_LINE.length);
      return;
    }

    const timer = window.setTimeout(
      () => {
        if (phase === "waiting") {
          setPhase("typing");
          return;
        }

        if (phase === "typing") {
          if (characters < CODE_LINE.length) {
            setCharacters((current) => current + 1);
          } else {
            setPhase("holding");
          }
          return;
        }

        if (phase === "holding") {
          setPhase("deleting");
          return;
        }

        if (characters > 0) {
          setCharacters((current) => current - 1);
        } else {
          setPhase("waiting");
        }
      },
      phase === "waiting" ? 900 : phase === "typing" ? 78 : phase === "holding" ? 2400 : 32,
    );

    return () => window.clearTimeout(timer);
  }, [characters, phase, reduceMotion]);

  let remaining = characters;

  return (
    <code
      aria-label={CODE_LINE}
      dir="ltr"
      className="min-w-[182px] whitespace-nowrap text-xs text-text-main"
      style={{ fontFamily: "var(--font-heading)" }}
    >
      {CODE_PARTS.map((part) => {
        const visibleText = part.text.slice(0, Math.max(0, remaining));
        remaining -= part.text.length;
        return (
          <span key={part.text} className={part.className}>
            {visibleText}
          </span>
        );
      })}
      <motion.span
        aria-hidden
        animate={reduceMotion ? { opacity: 1 } : { opacity: [1, 1, 0, 0] }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: 0.86, repeat: Infinity, ease: "linear" }
        }
        className="ml-px inline-block w-[2px] translate-y-[2px] bg-accent"
        style={{ height: "0.9em" }}
      />
    </code>
  );
}

/**
 * Abstract dashboard composition for the hero — no stock photos.
 * Layered cards, a live-looking chart, and a code caret detail.
 */
export function HeroVisual({ copy }: { copy: Ui["heroVisual"] }) {
  const bars = [38, 54, 46, 68, 58, 82, 74, 92];

  return (
    <div className="relative">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 70% 30%, rgba(185,107,74,0.35), transparent 60%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-xl border border-border bg-primary p-5 shadow-2xl"
      >
        {/* Window chrome */}
        <div className="mb-5 flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#B96B4A]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#BFAF9F]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#746A62]" />
          <span className="ml-3 font-[var(--font-heading)] text-xs tracking-wide text-[#BFAF9F]">
            {copy.chrome}
          </span>
        </div>

        {/* Metric row */}
        <div className="mb-4 grid grid-cols-3 gap-3">
          {[
            { icon: TrendingUp, label: copy.throughput, value: "2.4M" },
            { icon: Zap, label: copy.latency, value: "42ms" },
            { icon: Activity, label: copy.uptime, value: "99.9%" },
          ].map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="rounded-lg border border-white/10 bg-white/[0.03] p-3"
            >
              <Icon size={15} className="mb-2 text-accent" />
              <div
                className="text-[#F3EAE0]"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
              >
                {value}
              </div>
              <div className="text-[10px] uppercase tracking-wider text-[#BFAF9F]">
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs text-[#BFAF9F]">{copy.liveTraffic}</span>
            <span className="text-xs text-accent">+40%</span>
          </div>
          <div className="flex h-28 items-end gap-2">
            {bars.map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 0.7, delay: 0.4 + i * 0.06 }}
                className="flex-1 rounded-sm"
                style={{
                  background:
                    i === bars.length - 1
                      ? "var(--accent)"
                      : "rgba(191,175,159,0.45)",
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Floating code caret card */}
      <motion.div
        initial={{ opacity: 0, x: 20, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute -bottom-6 -left-6 hidden rounded-lg border border-border bg-surface p-4 shadow-xl rtl:left-auto rtl:-right-6 sm:block"
      >
        <LoopingCodeLine />
      </motion.div>
    </div>
  );
}
