export interface CaseStudySnapshot {
  customer: string;
  challenge: string;
  approach: string;
  result: string;
}

export interface CaseStudyStat {
  label: string;
  value: string;
  /** Change line under the value, e.g. "+337 vs. all of 2025". */
  change?: string;
}

export interface CaseStudyFaq {
  question: string;
  answer: string;
}

export interface CaseStudyEntry {
  slug: string;
  /** Last meaningful content change (YYYY-MM-DD), used as the sitemap lastmod. */
  updatedAt: string;
  customerName: string;
  headline: string;
  /** Optional line under the H1. */
  subheadline?: string;
  seoTitle: string;
  seoDescription: string;
  snapshot: CaseStudySnapshot;
  /** "At a glance" stats, rendered as text. */
  stats?: CaseStudyStat[];
  /** Exact time period the stats cover. Shown with the stats. */
  statsPeriod?: string;
  aboutCustomer?: string;
  challenge: string;
  whatTheyTriedBefore?: string;
  /** Intro paragraphs. Heading is "What Changed" when whatChanged is set, else "How Sayso Helped". */
  howSaysoHelped: string;
  whatChanged?: { title: string; body: string }[];
  results: string;
  whatThisMeans?: string;
  whatsNext?: string;
  quotes: string[];
  faqs?: CaseStudyFaq[];
  pdf?: { href: string; label: string };
  relatedProducts: { title: string; href: string }[];
  relatedPersona?: { title: string; href: string };
  ogImage?: string;
}
