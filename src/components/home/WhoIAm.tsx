"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Container, CTAButton, Eyebrow, Reveal } from "@/components/primitives";
import type { Lang } from "@/lib/i18n/config";
import type { Profile } from "@/content/profile";
import type { Ui } from "@/i18n/ui";

export function WhoIAm({
  lang,
  copy,
  focus,
  moreAboutMe,
}: {
  lang: Lang;
  copy: Ui["whoIAm"];
  focus: Profile["focus"];
  moreAboutMe: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [leftOrbY, setLeftOrbY] = useState(-20);

  useEffect(() => {
    const updateOrbPosition = () => {
      const section = sectionRef.current;
      if (!section) return;

      const { top, height } = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const progress = Math.min(
        1,
        Math.max(0, (viewportHeight - top) / (viewportHeight + height)),
      );

      setLeftOrbY(-20 + progress * 54);
    };

    updateOrbPosition();
    window.addEventListener("scroll", updateOrbPosition, { passive: true });
    window.addEventListener("resize", updateOrbPosition);

    return () => {
      window.removeEventListener("scroll", updateOrbPosition);
      window.removeEventListener("resize", updateOrbPosition);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate mx-4 overflow-hidden rounded-2xl border border-border bg-[#FBF6EF] py-20 md:mx-6 md:py-28 dark:bg-background"
    >
      {/* Background portrait: deliberately clear and placed behind the
          left-hand detail cards. Wrapped rather than given `fill` directly,
          because `fill` writes inset/size inline and would fight the 58% width. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-0 w-[58%] rtl:left-auto rtl:right-0"
      >
        <Image
          src="/portrait.png"
          alt=""
          fill
          sizes="(max-width: 768px) 58vw, 700px"
          className="object-cover object-[62%_center] opacity-95 rtl:object-[38%_center] dark:opacity-70"
        />
      </div>
      {/* Clear darkening filter over the portrait. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-[58%] bg-gradient-to-r from-[#25201C]/70 via-[#25201C]/40 to-transparent rtl:left-auto rtl:right-0 rtl:bg-gradient-to-l dark:from-black/80 dark:via-black/50"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(37,32,28,0.15)_0%,rgba(251,246,239,0.1)_30%,rgba(251,246,239,0.85)_44%,#FBF6EF_55%)] rtl:bg-[linear-gradient(270deg,rgba(37,32,28,0.15)_0%,rgba(251,246,239,0.1)_30%,rgba(251,246,239,0.85)_44%,#FBF6EF_55%)] dark:bg-[linear-gradient(90deg,rgba(14,11,8,0.14)_0%,rgba(23,18,14,0.16)_27%,rgba(23,18,14,0.85)_46%,#17120E_57%)] dark:rtl:bg-[linear-gradient(270deg,rgba(14,11,8,0.14)_0%,rgba(23,18,14,0.16)_27%,rgba(23,18,14,0.85)_46%,#17120E_57%)]"
      />
      {/* Cream spotlight: soft, glassy, translucent half-disc with parallax + breathing motion. */}
      <motion.div
        aria-hidden="true"
        style={{ y: leftOrbY }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-40 top-[calc(50%-19rem)] z-[2] h-[38rem] w-[38rem] rounded-full bg-secondary/25 blur-[2px] will-change-transform rtl:left-auto rtl:-right-40"
      />
      {/* Creative orbit: a self-drawing arc with dots that revolve along concentric rings. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-56 top-2 z-[2] h-[30rem] w-[30rem] rtl:right-auto rtl:-left-56"
      >
        <svg viewBox="0 0 400 400" className="h-full w-full overflow-visible">
          <motion.circle
            cx="200"
            cy="200"
            r="150"
            fill="none"
            stroke="var(--color-accent)"
            strokeOpacity="0.28"
            strokeWidth="1"
            pathLength={1}
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          />
          <circle
            cx="200"
            cy="200"
            r="108"
            fill="none"
            stroke="var(--color-accent)"
            strokeOpacity="0.14"
            strokeWidth="1"
            strokeDasharray="2 8"
          />
        </svg>

        {/* Outer revolving dot */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
        >
          <motion.span
            animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-[12.5%] top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_10px_24px_rgba(185,107,74,0.4)]"
          />
        </motion.div>

        {/* Inner counter-revolving dot */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: -360 }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        >
          <span className="absolute left-[77%] top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary" />
        </motion.div>
      </div>

      <Container className="relative z-10">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Left column is reserved for the portrait — no text sits over the face. */}
          <div className="hidden lg:block" aria-hidden="true" />

          <div className="space-y-8">
            <Reveal>
              <Eyebrow>{copy.eyebrow}</Eyebrow>
              <h2
                className="mt-6 max-w-lg text-[2.45rem] leading-[1.1] text-text-main md:text-[3.35rem]"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                }}
              >
                {copy.titleA}
                <span className="text-accent" style={{ fontWeight: 700 }}>
                  {copy.titleAccent}
                </span>
                {copy.titleB}
              </h2>
            </Reveal>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-md text-[0.95rem] leading-7 text-text-muted"
            >
              {copy.paragraph}
            </motion.p>

            <div className="divide-y divide-border/70 border-y border-border/70">
              {focus.map((item, index) => (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 + index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group flex items-baseline gap-4 py-4"
                >
                  <motion.span
                    aria-hidden="true"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.25 + index * 0.1 }}
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent transition-transform duration-300 group-hover:scale-150"
                  />
                  <div>
                    <h3
                      className="text-base text-text-main transition-colors duration-300 group-hover:text-accent"
                      style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                    >
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-text-muted">{item.body}</p>
                  </div>
                </motion.article>
              ))}
            </div>

            <div>
              <CTAButton
                href={`/${lang}/about`}
                variant="primary"
                className="who-i-am-cta"
              >
                {moreAboutMe}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="who-i-am-arrow h-4 w-4"
                >
                  <path className="who-i-am-arrow__line" pathLength="1" d="M4 16L16 4" />
                  <path className="who-i-am-arrow__tip" pathLength="1" d="M9 4H16V11" />
                </svg>
              </CTAButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
