export interface CaseStudySnapshot {
  customer: string;
  challenge: string;
  solution: string;
  result: string;
}

export interface CaseStudyEntry {
  slug: string;
  customerName: string;
  headline: string;
  seoTitle: string;
  seoDescription: string;
  snapshot: CaseStudySnapshot;
  challenge: string;
  whatTheyTriedBefore?: string;
  howSaysoHelped: string;
  results: string;
  whatsNext?: string;
  quotes: string[];
  relatedFeatures: { title: string; href: string }[];
  relatedPersona?: { title: string; href: string };
  ogImage?: string;
}
