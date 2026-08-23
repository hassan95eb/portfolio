"use client";

import { motion } from "motion/react";
import { ArrowUpRight, Download, MapPin } from "lucide-react";
import { Container, CTAButton, Eyebrow } from "@/components/primitives";
import { HeroVisual } from "./HeroVisual";
import { RESUME_PATH } from "@/lib/site";
import type { Lang } from "@/lib/i18n/config";
import type { Ui } from "@/i18n/ui";

export function Hero({
  lang,
  hero,
  heroVisual,
  common,
  location,
}: {
  lang: Lang;
  hero: Ui["hero"];
  heroVisual: Ui["heroVisual"];
  common: Ui["common"];
  /** From `content/profile.ts` — the city line under the CTAs. */
  location: string;
}) {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(1200px 600px at 80% -10%, rgba(191,175,159,0.35), transparent 60%)",
        }}
      />
      <Container className="grid items-center gap-14 py-16 md:py-24 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col gap-7">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Eyebrow>{hero.eyebrow}</Eyebrow>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="text-[2.6rem] leading-[1.05] text-text-main sm:text-[3.2rem] md:text-[3.8rem]"
            style={{ fontWeight: 600, letterSpacing: "-0.03em" }}
          >
            {hero.titleA}
            <span className="text-accent">{hero.titleAccent}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="max-w-xl text-lg text-text-muted"
          >
            {hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="flex flex-wrap items-center gap-3"
          >
            <CTAButton href={`/${lang}/projects`}>
              {common.viewProjects} <ArrowUpRight size={16} />
            </CTAButton>
            {/* `external` rather than `href`: the PDF is a static asset in
                public/, not a route, so it must not go through the client
                router. */}
            <CTAButton external={RESUME_PATH} download variant="outline">
              <Download size={16} /> {common.downloadResume}
            </CTAButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="flex items-center gap-2 text-sm text-text-muted"
          >
            <MapPin size={15} className="text-accent" />
            {location} · {hero.available}
          </motion.div>
        </div>

        <div className="lg:ps-6">
          <HeroVisual copy={heroVisual} />
        </div>
      </Container>
    </section>
  );
}
