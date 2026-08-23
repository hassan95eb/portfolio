import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLang } from "@/lib/i18n/config";
import { getUi } from "@/i18n/ui";
import { cms } from "@/lib/cms";
import { Container } from "@/components/primitives";
import { PageHeader } from "@/components/sections/PageHeader";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { ContactCTA } from "@/components/sections/ContactCTA";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};

  const ui = getUi(lang);
  return {
    title: ui.nav.projects,
    description: ui.projects.header.description,
    alternates: {
      canonical: `/${lang}/projects`,
      languages: {
        en: "/en/projects",
        fa: "/fa/projects",
        "x-default": "/en/projects",
      },
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const ui = getUi(lang);
  const projects = await cms().getProjects(lang);

  return (
    <>
      <PageHeader
        eyebrow={ui.projects.header.eyebrow}
        title={ui.projects.header.title}
        description={ui.projects.header.description}
      />
      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <ProjectCard
                key={project.slug}
                lang={lang}
                project={project}
                viewCaseStudy={ui.projects.card.viewCaseStudy}
                index={i}
              />
            ))}
          </div>
        </Container>
      </section>
      <ContactCTA lang={lang} copy={ui.contactCTA} />
    </>
  );
}
