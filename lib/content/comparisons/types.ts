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
}
