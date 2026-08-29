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
