import type { Lang } from "@/lib/i18n/config";
import type { CmsAdapter } from "./adapter";
import { mockContent } from "./mock";

/** Reads the bundled content. No network, no latency, no failure modes. */
export const mockAdapter: CmsAdapter = {
  async getProjects(lang: Lang) {
    return mockContent[lang].projects;
  },
  async getProject(lang: Lang, slug: string) {
    return mockContent[lang].projects.find((p) => p.slug === slug) ?? null;
  },
  async getProjectSlugs(lang: Lang) {
    return mockContent[lang].projects.map((p) => p.slug);
  },

  async getPosts(lang: Lang) {
    return mockContent[lang].posts;
  },
  async getPost(lang: Lang, slug: string) {
    const { posts, featuredPost } = mockContent[lang];
    if (featuredPost.slug === slug) return featuredPost;
    return posts.find((p) => p.slug === slug) ?? null;
  },
  async getPostSlugs(lang: Lang) {
    const { posts, featuredPost } = mockContent[lang];
    return [featuredPost.slug, ...posts.map((p) => p.slug)];
  },
  async getFeaturedPost(lang: Lang) {
    return mockContent[lang].featuredPost;
  },
  async getCategories(lang: Lang) {
    return mockContent[lang].categories;
  },

  async getExperience(lang: Lang) {
    return mockContent[lang].experience;
  },
  async getAchievements(lang: Lang) {
    return mockContent[lang].achievements;
  },
  async getAchievementsPlaceholder(lang: Lang) {
    return mockContent[lang].achievementsPlaceholder;
  },
  async getTestimonials(lang: Lang) {
    return mockContent[lang].testimonials;
  },
  async getCertifications(lang: Lang) {
    return mockContent[lang].certifications;
  },
};
