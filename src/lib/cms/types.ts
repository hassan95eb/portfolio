/**
 * The shape the UI consumes.
 *
 * These types are the contract between the pages and whatever is behind
 * `getCms()` — today a mock module, later WPGraphQL. Nothing in `app/`
 * should ever import from a concrete source; it imports these types and
 * calls the adapter.
 */

export type BlogTone = "default" | "wide" | "dark";

export type Category = {
  /** Stable identifier. Never translated — filters and URLs key off this. */
  slug: string;
  /** Display name in the requested language. */
  name: string;
};

/** A real, dimensioned image — never a placeholder or a drawn mock. */
export type ProjectImage = {
  /** Path under `public/`. */
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Shown under the image. Must describe what is actually in the frame. */
  caption?: string;
};

export type ProjectFeature = {
  title: string;
  body: string;
};

export type ProjectFaqItem = {
  question: string;
  answer: string;
};

export type ProjectLink = {
  label: string;
  href: string;
};

/**
 * Long-form case-study content for a project's detail page, beyond the
 * summary/description/highlights every project already carries. Entirely
 * optional: a project without one renders the page exactly as it did
 * before this existed.
 */
export type ProjectCaseStudy = {
  /** Shown under the hero H1, instead of the shorter `summary`. */
  tagline?: string;
  /** Verified current release version, e.g. "2.7.0". Omit once stale. */
  version?: string;
  primaryCta?: ProjectLink;
  secondaryCta?: ProjectLink;
  gallery?: ProjectImage[];
  features?: ProjectFeature[];
  /** Ordered steps for a "how to use it" walkthrough. */
  howToUse?: string[];
  installNote?: string;
  privacy?: string;
  /** Caveats to read before trusting a score or a measurement. */
  limitations?: string[];
  roleNote?: string;
  faq?: ProjectFaqItem[];
};

/** Real, verifiable facts for a `SoftwareApplication` JSON-LD block. */
export type ProjectStructuredData = {
  applicationCategory: string;
  operatingSystem: string;
  softwareVersion: string;
  downloadUrl: string;
  license: string;
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  role: string;
  stack: string[];
  highlights: string[];
  /** Hex colour driving the card treatment. */
  accent: string;
  /**
   * Public source, when there is one. A repository, or a branch within one
   * for a contribution to somebody else's project.
   */
  repoUrl?: string;
  /**
   * Set instead of `repoUrl` when the work is real but the repository is
   * private. Mutually exclusive with it: the UI shows a plain "private
   * repository" note rather than a link that would 404 for every visitor.
   */
  sourcePrivate?: boolean;
  /**
   * A real screenshot to use in place of the drawn mock on the home stage
   * and the projects grid card. Keyed to the project record, not to its
   * position in the array, so reordering projects never changes which
   * image a card shows.
   */
  media?: {
    thumbnail: ProjectImage;
  };
  caseStudy?: ProjectCaseStudy;
  /** SEO overrides. Falls back to `title` / `summary` when absent. */
  seo?: {
    title?: string;
    description?: string;
  };
  structuredData?: ProjectStructuredData;
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  /** Category *slug*, not its label. Resolve with `getCategories()`. */
  category: string;
  readTime: string;
  date: string;
  /** Layout intent for the curated grid. */
  tone: BlogTone;
  accent: string;
};

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  summary: string;
  points: string[];
};

export type Achievement = {
  title: string;
  body: string;
};

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
};

export type Certification = {
  title: string;
  provider: string;
  date: string;
  /**
   * Issuer's public verification page. When set, the card's "Verify" label
   * becomes a real outbound link instead of inert text.
   */
  url?: string;
  /**
   * Path under `public/` to the certificate image. When set, the card shows
   * it as a preview that opens the full credential.
   */
  image?: string;
};

/** Everything one language's content set contains. */
export type CmsData = {
  projects: Project[];
  featuredPost: BlogPost;
  posts: BlogPost[];
  categories: Category[];
  experience: ExperienceItem[];
  achievements: Achievement[];
  achievementsPlaceholder: Achievement[];
  testimonials: Testimonial[];
  certifications: Certification[];
};
