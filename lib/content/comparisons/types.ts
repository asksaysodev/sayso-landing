export interface ComparisonTableRow {
  feature: string;
  sayso: string;
  competitor: string;
}

export interface ComparisonEntry {
  slug: string;
  competitor: string;
  keyword: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  tldr: string;
  whyLooking: string;
  comparisonTable: ComparisonTableRow[];
  whereSaysoWins: string;
  whereCompetitorWins: string;
  whoItsFor: string;
  pricing: string;
  faq: { question: string; answer: string }[];
  relatedComparisons: { title: string; slug: string }[];
  ogImage?: string;
  /** Optional H3 subsections within "Where Sayso Wins". */
  whereSaysoWinsDetails?: { heading: string; body: string }[];
  /** Links to persona pages - shown after "Who It's For" section. */
  personaLinks?: { title: string; href: string }[];
  /** Links to feature pages - shown after "Where Sayso Wins" section. */
  featureLinks?: { title: string; href: string }[];
  /** Feature list for SoftwareApplication JSON-LD schema. */
  featureList?: string[];
}
