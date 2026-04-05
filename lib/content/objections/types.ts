export interface ObjectionResponse {
  label: string;
  script: string;
  whyItWorks: string;
}

export interface ObjectionEntry {
  slug: string;
  keyword: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  /** The exact words the prospect says (e.g., "I'm not ready yet"). */
  objectionQuote: string;
  openingParagraph: string;
  whyTheyTitle: string;
  whyTheySayThis: string;
  responses: {
    safe: ObjectionResponse;
    stronger: ObjectionResponse;
    advanced: ObjectionResponse;
  };
  whatToSayNext: string;
  commonMistakes: string[];
  howSaysoHelps: string;
  relatedObjections: { title: string; slug: string; keyword: string }[];
  faq: { question: string; answer: string }[];
  /** Link to a related blog post for down-funnel linking. */
  relatedBlogPost?: { title: string; href: string };
  /** Link to a related feature page for cross-section linking. */
  relatedFeature?: { title: string; href: string };
  /** Optional hero/inline image with alt text for keyword placement. */
  heroImage?: { src: string; alt: string };
  ogImage?: string;
}
