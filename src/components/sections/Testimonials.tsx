import { Quote } from "lucide-react";
import { Container, GridTexture, Reveal, SectionHeading } from "@/components/primitives";
import type { Testimonial } from "@/lib/cms/types";
import type { Ui } from "@/i18n/ui";

export function Testimonials({
  copy,
  items,
}: {
  copy: Ui["testimonials"]["section"];
  items: Testimonial[];
}) {
  return (
    <section className="relative overflow-hidden bg-primary py-20 text-[#F3EAE0] md:py-28">
      <div className="text-white/[0.04]">
        <GridTexture />
      </div>
      <Container className="relative">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
          invert
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {items.map((item, i) => (
            <Reveal key={item.name} delay={i * 0.06}>
              <figure className="flex h-full flex-col gap-5 rounded-xl border border-white/10 bg-white/[0.03] p-7">
                <Quote size={26} className="text-accent" />
                <blockquote className="flex-1 text-[#F3EAE0]/90">
                  “{item.quote}”
                </blockquote>
                <figcaption className="flex items-center gap-3 border-t border-white/10 pt-4">
                  <span
                    className="grid h-10 w-10 place-items-center rounded-full bg-secondary text-primary"
                    style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                  >
                    {item.name.charAt(0)}
                  </span>
                  <span>
                    <span
                      className="block text-sm text-[#F3EAE0]"
                      style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                    >
                      {item.name}
                    </span>
                    <span className="block text-xs text-[#BFAF9F]">{item.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
