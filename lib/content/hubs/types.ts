export interface HubChildPage {
  title: string;
  slug: string;
  description: string;
  /** Optional eyebrow label displayed above the card title. */
  eyebrow?: string;
  keyword?: string;
  /** Visible anchor text for the link - MUST vary across items for SEO. */
  linkText: string;
  /** Override the default `basePath/slug` link (e.g. when children live at non-standard paths). */
  href?: string;
}

export interface HubPageConfig {
  slug: string;
  section: string;
  basePath: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  introduction: string;
  childPages: HubChildPage[];
  groups?: { label: string; slugs: string[] }[];
  howSaysoHelps?: string;
  faq?: { question: string; answer: string }[];
  /** Set true for hubs without a keyword target. */
  noKeyword?: boolean;
}
