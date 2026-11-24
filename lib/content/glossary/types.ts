export interface GlossaryEntry {
  slug: string;
  /** Date of the last meaningful content change (YYYY-MM-DD). Used as the sitemap lastmod. */
  updatedAt: string;
  term: string;
  keyword: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  /** Short definition - 2-3 sentences, featured snippet target. Sentence 1 under 45 words: "[Term] is [definition]." */
  definition: string;
  /** Optional paragraph rendered right under the definition, such as a link to the deeper guide. Supports [text](/url/) inline markdown. */
  definitionFollowUp?: string;
  /** Each string renders as its own paragraph. Target: 2-3 paragraphs, max 3 sentences each. */
  howItWorks: string[];
  /** Optional extra H2 sections rendered after How It Works, in order (e.g. when to use it, pros and cons, a worked example). */
  sections?: GlossarySection[];
  /** Each string renders as its own paragraph. Target: 2-3 paragraphs, max 3 sentences each. Omit to drop the section. */
  whyItMatters?: string[];
  /** Omit to drop the Tips section. */
  tips?: { title: string; body: string }[];
  /** Each string renders as its own paragraph. Supports [text](/url/) inline markdown for CTA links. */
  howSaysoHelps: string[];
  /** href overrides the /glossary/<slug>/ link, for terms merged into another page. */
  relatedTerms: { term: string; slug: string; href?: string }[];
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

export interface GlossarySection {
  heading: string;
  /** Each string renders as its own paragraph. Supports [text](/url/) inline markdown. */
  paragraphs?: string[];
  /** Optional simple table rendered after the paragraphs. */
  table?: { headers: string[]; rows: string[][] };
}
