import { ArrowUpRight } from "lucide-react";
import { Container, CTAButton, Reveal, SectionHeading } from "@/components/primitives";
import type { Lang } from "@/lib/i18n/config";
import type { Ui } from "@/i18n/ui";

export function ContactCTA({ lang, copy }: { lang: Lang; copy: Ui["contactCTA"] }) {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-border bg-surface p-10 text-center md:p-16">
            <div
              aria-hidden
              className="absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-30 blur-3xl rtl:right-auto rtl:-left-16"
              style={{
                background:
                  "radial-gradient(circle, rgba(185,107,74,0.5), transparent 65%)",
              }}
            />
            <div className="relative mx-auto flex max-w-xl flex-col items-center gap-6">
              <SectionHeading
                align="center"
                eyebrow={copy.eyebrow}
                title={copy.title}
                description={copy.description}
              />
              <div className="flex flex-wrap items-center justify-center gap-3">
                <CTAButton href={`/${lang}/contact`}>
                  {copy.startProject} <ArrowUpRight size={16} />
                </CTAButton>
                <CTAButton href={`/${lang}/projects`} variant="outline">
                  {copy.viewProjects}
                </CTAButton>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
