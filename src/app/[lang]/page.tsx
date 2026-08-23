import { notFound } from "next/navigation";
import { isLang } from "@/lib/i18n/config";
import { getUi } from "@/i18n/ui";
import { getProfile } from "@/content/profile";
import { cms } from "@/lib/cms";
import { Hero } from "@/components/home/Hero";
import { WhoIAm } from "@/components/home/WhoIAm";
import { Skills } from "@/components/home/Skills";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { ExperienceTimeline } from "@/components/home/ExperienceTimeline";
import { Testimonials } from "@/components/home/Testimonials";
import { ContactCTA } from "@/components/home/ContactCTA";

/**
 * Home.
 *
 * Stays a server component: it is the one place that reads all three content
 * layers, and each section receives only the slice it renders. That is what
 * keeps the client bundle to the sections that genuinely need an effect —
 * the hero visual, the sticky project stage, the timeline typewriter.
 */

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const ui = getUi(lang);
  const profile = getProfile(lang);
  const content = cms();

  const [projects, experience, testimonials] = await Promise.all([
    content.getProjects(lang),
    content.getExperience(lang),
    content.getTestimonials(lang),
  ]);

  return (
    <>
      <Hero
        lang={lang}
        hero={ui.hero}
        heroVisual={ui.heroVisual}
        common={ui.common}
        location={profile.location}
      />
      <WhoIAm
        lang={lang}
        copy={ui.whoIAm}
        focus={profile.focus}
        moreAboutMe={ui.common.moreAboutMe}
      />
      <Skills copy={ui.skills} groups={profile.skillGroups} />
      <FeaturedProjects
        lang={lang}
        copy={ui.featuredProjects}
        projects={projects}
      />
      <ExperienceTimeline
        lang={lang}
        copy={ui.experience.timeline}
        items={experience}
        compact
      />
      <Testimonials copy={ui.testimonials.section} items={testimonials} />
      <ContactCTA lang={lang} copy={ui.contactCTA} />
    </>
  );
}
