"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Container, CTAButton, SectionHeading } from "@/components/primitives";
import type { Lang } from "@/lib/i18n/config";
import type { ExperienceItem } from "@/lib/cms/types";
import type { Ui } from "@/i18n/ui";

function TimelineTypewriter({
  text,
  delay = 0,
  speed = 28,
}: {
  text: string;
  delay?: number;
  speed?: number;
}) {
  const textRef = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();
  const [hasEntered, setHasEntered] = useState(false);
  const [characters, setCharacters] = useState(0);

  useEffect(() => {
    const node = textRef.current;
    if (!node) return;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      setHasEntered(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setHasEntered(true);
        observer.disconnect();
      },
      { threshold: 0.45, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduceMotion]);

  useEffect(() => {
    if (!hasEntered) return;
    if (reduceMotion) {
      setCharacters(text.length);
      return;
    }

    let characterTimer: number | undefined;
    let index = 0;
    const startTimer = window.setTimeout(() => {
      const typeNextCharacter = () => {
        index += 1;
        setCharacters(index);
        if (index < text.length) {
          characterTimer = window.setTimeout(typeNextCharacter, speed);
        }
      };
      typeNextCharacter();
    }, delay);

    return () => {
      window.clearTimeout(startTimer);
      if (characterTimer) window.clearTimeout(characterTimer);
    };
  }, [delay, hasEntered, reduceMotion, speed, text]);

  const isTyping = hasEntered && characters < text.length;

  return (
    <span ref={textRef} aria-label={text} className="inline-block min-h-[1em] min-w-px">
      {text.slice(0, characters)}
      {isTyping && (
        <motion.span
          aria-hidden
          animate={{ opacity: [1, 1, 0, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          className="ms-1 inline-block h-[0.88em] w-px translate-y-[0.08em] bg-accent"
        />
      )}
    </span>
  );
}

export function ExperienceTimeline({
  lang,
  copy,
  items,
  compact = false,
}: {
  lang: Lang;
  copy: Ui["experience"]["timeline"];
  items: ExperienceItem[];
  /** Home shows the three most recent roles and links out to the full page. */
  compact?: boolean;
}) {
  const entries = compact ? items.slice(0, 3) : items;

  return (
    <section className={`${compact ? "bg-secondary/25" : ""} py-20 md:py-28`}>
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow={copy.eyebrow}
            title={
              <TimelineTypewriter key={copy.title} text={copy.title} delay={100} speed={38} />
            }
            description={
              <TimelineTypewriter
                key={copy.description}
                text={copy.description}
                delay={1280}
                speed={17}
              />
            }
          />
          {compact && (
            <CTAButton
              href={`/${lang}/experience`}
              variant="outline"
              className="border-accent/60 text-accent hover:!border-accent hover:!bg-accent hover:!text-[#FBF6EF] dark:border-accent/70"
            >
              {copy.fullTimeline} <ArrowUpRight size={16} />
            </CTAButton>
          )}
        </div>

        <div className="relative mt-14">
          <div className="absolute start-[7px] top-2 bottom-2 w-0.5 bg-accent/35 dark:bg-accent/50 md:start-1/2" />
          <div className="flex flex-col gap-10">
            {entries.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 32, scale: 0.985 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.55, margin: "0px 0px -12% 0px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="relative ps-8 md:ps-0">
                  <span className="absolute start-0 top-7 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-background bg-accent rtl:translate-x-1/2 md:start-1/2" />
                  <div className="rounded-xl border border-border/70 bg-background/55 p-5 backdrop-blur-[3px] md:grid md:grid-cols-2 md:gap-12 md:p-6">
                    <div
                      className={i % 2 === 0 ? "md:pe-12 md:text-end" : "md:order-2 md:ps-12"}
                    >
                      <motion.span
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.38, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                        className="block text-xs uppercase tracking-[0.16em] text-accent"
                      >
                        {exp.period}
                      </motion.span>
                      <motion.h3
                        initial={{ opacity: 0, y: 12, clipPath: "inset(0 0 100% 0)" }}
                        whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.56, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-2 text-xl text-text-main"
                        style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                      >
                        {exp.role}
                      </motion.h3>
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.42, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
                        className="text-sm text-text-muted"
                      >
                        {exp.company}
                      </motion.div>
                    </div>
                    <div
                      className={`mt-4 md:mt-0 ${i % 2 === 0 ? "md:order-2 md:ps-12" : "md:pe-12"}`}
                    >
                      <motion.p
                        initial={{ opacity: 0, y: 12, clipPath: "inset(0 0 100% 0)" }}
                        whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
                        viewport={{ once: true, amount: 0.35 }}
                        transition={{ duration: 0.52, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                        className="mb-3 text-sm text-text-main"
                      >
                        {exp.summary}
                      </motion.p>
                      <ul className="flex flex-col gap-2">
                        {exp.points.map((p, pointIndex) => (
                          <motion.li
                            key={p}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.35 }}
                            transition={{
                              duration: 0.42,
                              delay: 0.32 + pointIndex * 0.07,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="flex gap-2 text-sm text-text-muted"
                          >
                            <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                            {p}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
