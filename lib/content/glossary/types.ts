export interface GlossaryEntry {
  slug: string;
  term: string;
  keyword: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  /** Short definition - 2-3 sentences, featured snippet target. Sentence 1 under 45 words: "[Term] is [definition]." */
  definition: string;
  /** Each string renders as its own paragraph. Target: 2-3 paragraphs, max 3 sentences each. */
  howItWorks: string[];
  /** Each string renders as its own paragraph. Target: 2-3 paragraphs, max 3 sentences each. */
  whyItMatters: string[];
  tips: { title: string; body: string }[];
  /** Each string renders as its own paragraph. Supports [text](/url/) inline markdown for CTA links. */
  howSaysoHelps: string[];
  relatedTerms: { term: string; slug: string }[];
  /** Link to a deeper blog post. Optional - omit if the post does not exist yet. */
  deeperLink?: { title: string; href: string };
  faq: { question: string; answer: string }[];
  /** Optional hero/inline image with alt text for keyword placement. */
  heroImage?: { src: string; alt: string };
  /** Cross-section link to a feature page. */
  relatedFeature?: { title: string; href: string };
  /** Cross-section link to a persona page. */
  relatedPersona?: { title: string; href: string };
  ogImage?: string;
}
