export interface FeatureEntry {
  slug: string;
  keyword: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  /** Each string renders as its own paragraph in the hero section. */
  heroDescription: string[];
  /** Optional override for the "How It Works" H2 heading. */
  howItWorksHeading?: string;
  howItWorks: { step: string; description: string }[];
  /** Each string renders as its own paragraph in the "Who This Is For" section. */
  whoItsFor: string[];
  /** Links to persona pages shown below the "Who This Is For" text. */
  personaLinks?: { title: string; href: string }[];
  /** Optional override for the "What Makes This Different" H2 heading. */
  differentiatorsHeading?: string;
  differentiators: { title: string; body: string }[];
  socialProof?: string;
  faq: { question: string; answer: string }[];
  relatedFeatures: { title: string; slug: string }[];
  relatedBlogPosts: { title: string; href: string }[];
  /** Feature list for SoftwareApplication JSON-LD. */
  featureList: string[];
  /** Alt text for hero screenshot placeholder. */
  screenshotAlt: string;
  /** Optional override for the inline CTA subheading. Set to empty string to hide. */
  inlineCTASubheading?: string;
  ogImage?: string;
}
