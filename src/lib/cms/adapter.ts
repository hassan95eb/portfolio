import type { Lang } from "@/lib/i18n/config";
import type {
  Achievement,
  BlogPost,
  Category,
  Certification,
  ExperienceItem,
  Project,
  Testimonial,
} from "./types";

/**
 * The seam between the site and its content source.
 *
 * Every method is async even though the mock resolves instantly. That is
 * the entire point: when WordPress replaces the mock, no call site has to
 * change from sync to async, so the swap touches one file instead of ten.
 */
export interface CmsAdapter {
  getProjects(lang: Lang): Promise<Project[]>;
  getProject(lang: Lang, slug: string): Promise<Project | null>;
  /** Slugs for `generateStaticParams`. */
  getProjectSlugs(lang: Lang): Promise<string[]>;

  getPosts(lang: Lang): Promise<BlogPost[]>;
  getPost(lang: Lang, slug: string): Promise<BlogPost | null>;
  getPostSlugs(lang: Lang): Promise<string[]>;
  getFeaturedPost(lang: Lang): Promise<BlogPost | null>;
  getCategories(lang: Lang): Promise<Category[]>;

  getExperience(lang: Lang): Promise<ExperienceItem[]>;
  getAchievements(lang: Lang): Promise<Achievement[]>;
  getAchievementsPlaceholder(lang: Lang): Promise<Achievement[]>;
  getTestimonials(lang: Lang): Promise<Testimonial[]>;
  getCertifications(lang: Lang): Promise<Certification[]>;
}
