import { notFound } from "next/navigation";
import { isLang } from "@/lib/i18n/config";
import { getUi } from "@/i18n/ui";
import { getProfile } from "@/content/profile";
import { cms } from "@/lib/cms";

/**
 * Scaffold + content-layer check — steps 1 and 2 only.
 *
 * It reads through the same three sources the real pages will use, so a
 * regression in the split shows up here immediately. Step 5 replaces this
 * file with the real Home page.
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

  const [projects, posts, categories, experience, testimonials, certifications] =
    await Promise.all([
      content.getProjects(lang),
      content.getPosts(lang),
      content.getCategories(lang),
      content.getExperience(lang),
      content.getTestimonials(lang),
      content.getCertifications(lang),
    ]);

  const rows = [
    { source: "lib/cms", label: ui.nav.projects, count: projects.length },
    { source: "lib/cms", label: ui.nav.blog, count: posts.length },
    { source: "lib/cms", label: ui.nav.experience, count: experience.length },
    { source: "lib/cms", label: ui.testimonials.header.eyebrow, count: testimonials.length },
    { source: "lib/cms", label: ui.certifications.header.eyebrow, count: certifications.length },
    { source: "content", label: ui.skills.eyebrow, count: profile.skillGroups.length },
    { source: "content", label: ui.about.atAGlance, count: profile.glance.length },
  ];

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-24">
      <p className="mb-3 text-sm uppercase tracking-widest text-accent">
        {ui.hero.eyebrow}
      </p>

      <h1 className="mb-4 font-heading text-4xl leading-tight text-text-main">
        {ui.hero.titleA}
        <span className="text-accent">{ui.hero.titleAccent}</span>
      </h1>

      <p className="mb-10 font-body text-lg text-text-muted">
        {ui.hero.description}
      </p>


      <section className="mb-12">
        <h2 className="mb-4 font-heading text-xl text-text-main">
          {ui.common.viewAllProjects}
        </h2>
        <div className="overflow-hidden rounded-lg border border-border">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between gap-4 border-b border-border bg-surface px-4 py-3 last:border-b-0"
            >
              <span className="font-body text-sm text-text-main">{row.label}</span>
              <span className="flex items-center gap-3">
                <code
                  dir="ltr"
                  className="rounded bg-muted px-2 py-0.5 font-body text-xs text-text-muted"
                >
                  {row.source}
                </code>
                <span className="font-heading text-sm text-accent">{row.count}</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 font-heading text-xl text-text-main">
          {ui.blog.allWriting}
        </h2>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-accent bg-accent px-3 py-1 font-body text-xs text-accent-foreground">
            {ui.blog.allTopics}
          </span>
          {categories.map((category) => (
            <span
              key={category.slug}
              title={category.slug}
              className="rounded-full border border-border px-3 py-1 font-body text-xs text-text-muted"
            >
              {category.name}
            </span>
          ))}
        </div>
        <p className="mt-3 font-body text-xs text-text-muted">
          {/* The point of the slug: the label above is translated, the filter key is not. */}
          <code dir="ltr" className="text-accent">
            {categories.map((c) => c.slug).join(" · ")}
          </code>
        </p>
      </section>

      <section className="rounded-lg border border-border bg-surface p-6">
        <p className="mb-3 font-heading text-lg text-text-main">
          {ui.projects.header.eyebrow}
        </p>
        <ul className="space-y-2">
          {projects.map((project) => (
            <li
              key={project.slug}
              className="flex items-baseline justify-between gap-4 font-body text-sm"
            >
              <span className="text-text-main">{project.title}</span>
              <code dir="ltr" className="shrink-0 text-xs text-text-muted">
                /{lang}/projects/{project.slug}
              </code>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
