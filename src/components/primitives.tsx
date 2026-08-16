"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Shared layout and typography primitives, ported from the Figma export.
 *
 * Marked "use client" because `Reveal` uses motion. The rest are plain markup
 * and could be server components, but splitting the file would mean two
 * imports for one visual vocabulary — not worth it while the client cost is a
 * few hundred bytes.
 */

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-6 md:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-8 bg-accent" />
      <span className="text-xs uppercase tracking-[0.22em] text-accent">
        {children}
      </span>
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  invert = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  invert?: boolean;
}) {
  return (
    <div
      className={`flex flex-col gap-4 ${
        align === "center" ? "items-center text-center" : "items-start"
      }`}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2
        className={`max-w-2xl text-[2rem] leading-[1.15] md:text-[2.6rem] ${
          invert ? "text-[#FBF6EF]" : "text-text-main"
        }`}
        style={{ fontWeight: 600, letterSpacing: "-0.02em" }}
      >
        {title}
      </h2>
      {description && (
        <p className={`max-w-xl ${invert ? "text-[#BFAF9F]" : "text-text-muted"}`}>
          {description}
        </p>
      )}
    </div>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-xs text-text-muted">
      {children}
    </span>
  );
}

type ButtonProps = {
  children: ReactNode;
  /** Internal route. Must already include the language prefix. */
  href?: string;
  /** External or protocol link (mailto:, https://…). Opens in a new tab. */
  external?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "ghost" | "light";
  className?: string;
  type?: "button" | "submit";
};

export function CTAButton({
  children,
  href,
  external,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm transition-all duration-200 select-none";
  const styles: Record<string, string> = {
    primary:
      "bg-accent text-[#FBF6EF] hover:brightness-95 hover:-translate-y-0.5 shadow-sm",
    outline:
      "border border-border text-text-main hover:border-accent hover:text-accent bg-transparent",
    ghost: "text-text-main hover:text-accent bg-transparent",
    light: "bg-[#FBF6EF] text-primary hover:-translate-y-0.5 hover:brightness-95",
  };
  const cls = `${base} ${styles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={cls} onClick={onClick}>
        {children}
      </Link>
    );
  }
  if (external) {
    return (
      <a href={external} className={cls} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Subtle grid texture for premium dark/light sections. */
export function GridTexture({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        maskImage: "radial-gradient(ellipse at center, black 0%, transparent 75%)",
      }}
    />
  );
}
