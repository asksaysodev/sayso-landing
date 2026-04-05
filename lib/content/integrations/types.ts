export interface IntegrationEntry {
  slug: string;
  crmName: string;
  keyword: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  openingDescription: string;
  /** Optional override for the "How It Works" H2 heading. */
  howItWorksHeading?: string;
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
  /** Cross-section internal links (features, personas, pricing, blog). */
  relatedLinks?: { label: string; title: string; href: string }[];
  /** Override headline for the inline CTA. */
  inlineCtaHeadline?: string;
  /** Override subheading for the inline CTA. */
  inlineCtaSubheading?: string;
}
