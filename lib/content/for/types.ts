export interface UseCaseEntry {
  slug: string;
  persona: string;
  keyword: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  /** Each string renders as its own paragraph. */
  openingEmpathy: string[];
  /** Optional override for the "The Real Problem" H2. */
  theProblemHeading?: string;
  /** Each string renders as its own paragraph. */
  theProblem: string[];
  /** Optional override for the "What Most [Persona] Try" H2. */
  whatTheyTryHeading?: string;
  /** Each string renders as its own paragraph. */
  whatTheyTry: string[];
  /** Optional override for the "A Better Approach" H2. */
  betterApproachHeading?: string;
  /** Each string renders as its own paragraph. */
  betterApproach: string[];
  /** In-content "Get Started" closing section before FAQ. */
  getStarted?: string;
  howSaysoWorks: { feature: string; description: string; href?: string }[];
  faq: { question: string; answer: string }[];
  relatedFeatures: { title: string; href: string }[];
  relatedBlogPosts: { title: string; href: string }[];
  /** Links to relevant objection pages. */
  relatedObjections?: { title: string; href: string }[];
  ogImage?: string;
}
