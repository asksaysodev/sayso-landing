export interface GlossaryEntry {
  slug: string;
  term: string;
  keyword: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  /** Short definition — under 45 words, featured snippet target. Format: "[Term] is [definition]." */
  definition: string;
  howItWorks: string;
  whyItMatters: string;
  tips: { title: string; body: string }[];
  howSaysoHelps: string;
  relatedTerms: { term: string; slug: string }[];
  deeperLink: { title: string; href: string };
  faq: { question: string; answer: string }[];
  ogImage?: string;
}
