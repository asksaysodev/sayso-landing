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
  ogImage?: string;
}
