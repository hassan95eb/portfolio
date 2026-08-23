"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Cards begin slightly enlarged and softly out of focus, then settle into
 * their resting size once they enter the viewport. The transition itself
 * lives in `globals.css` (`.skill-card-reveal`) — including the stagger,
 * which is `nth-child` there rather than a per-card delay prop, so the
 * section stays a server component.
 */
export function SkillCardReveal({ children }: { children: ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsRevealed(true);
        observer.unobserve(entry.target);
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`skill-card-reveal h-full ${isRevealed ? "skill-card-reveal--visible" : ""}`}
    >
      {children}
    </div>
  );
}
