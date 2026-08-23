import { Container, SectionHeading, Tag } from "@/components/primitives";
import { SkillCardReveal } from "./SkillCardReveal";
import type { Profile } from "@/content/profile";
import type { Ui } from "@/i18n/ui";

export function Skills({
  copy,
  groups,
}: {
  copy: Ui["skills"];
  groups: Profile["skillGroups"];
}) {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <SkillCardReveal key={group.title}>
              <div className="group h-full rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent/50">
                <div className="mb-4 flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <h3
                    className="text-text-main"
                    style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                  >
                    {group.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Tag key={item}>{item}</Tag>
                  ))}
                </div>
              </div>
            </SkillCardReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
