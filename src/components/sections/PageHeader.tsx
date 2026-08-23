"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Container, Eyebrow, GridTexture } from "@/components/primitives";

/**
 * Types on mount rather than on scroll — a page header is above the fold by
 * definition, so there is nothing to wait for.
 */
function TypewriterText({
  text,
  delay = 0,
  speed = 30,
}: {
  text: string;
  delay?: number;
  speed?: number;
}) {
  const reduceMotion = useReducedMotion();
  const [characters, setCharacters] = useState(0);

  useEffect(() => {
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
  }, [delay, reduceMotion, speed, text]);

  const isTyping = characters < text.length;

  return (
    <span aria-label={text}>
      {text.slice(0, characters)}
      {isTyping && (
        <span
          aria-hidden
          className="ms-0.5 inline-block h-[0.9em] w-px translate-y-[0.08em] bg-accent"
        />
      )}
    </span>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  typewriter = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  typewriter?: boolean;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-surface">
      <div className="text-border/60">
        <GridTexture />
      </div>
      <Container className="relative py-20 md:py-28">
        <div className="flex max-w-2xl flex-col gap-5">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1
            className="text-[2.4rem] leading-[1.1] text-text-main md:text-[3.4rem]"
            style={{ fontWeight: 600, letterSpacing: "-0.025em" }}
          >
            {typewriter ? <TypewriterText text={title} delay={120} speed={32} /> : title}
          </h1>
          {description && (
            <p className="max-w-xl text-lg text-text-muted">
              {typewriter ? (
                <TypewriterText text={description} delay={1550} speed={15} />
              ) : (
                description
              )}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
