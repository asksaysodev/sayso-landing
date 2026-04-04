export interface FeatureEntry {
  slug: string;
  keyword: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  heroDescription: string;
  howItWorks: { step: string; description: string }[];
  whoItsFor: string;
  differentiators: { title: string; body: string }[];
  socialProof?: string;
  faq: { question: string; answer: string }[];
  relatedFeatures: { title: string; slug: string }[];
  relatedBlogPosts: { title: string; href: string }[];
  /** Feature list for SoftwareApplication JSON-LD. */
  featureList: string[];
  /** Alt text for hero screenshot placeholder. */
  screenshotAlt: string;
  ogImage?: string;
}
