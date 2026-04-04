export interface IntegrationEntry {
  slug: string;
  crmName: string;
  keyword: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  openingDescription: string;
  howItWorks: { step: string; description: string }[];
  benefits: { title: string; body: string }[];
  whyChoose: string;
  getStarted: string;
  faq: { question: string; answer: string }[];
  relatedIntegrations: { name: string; slug: string }[];
  /** Feature list for SoftwareApplication JSON-LD. */
  featureList: string[];
  /** Alt text for partner logo placeholder. */
  logoAlt: string;
  ogImage?: string;
}
