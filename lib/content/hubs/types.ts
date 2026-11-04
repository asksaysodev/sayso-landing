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
  /** Comic-style banner text shown on the card (e.g. "Coming soon"). */
  bannerText?: string;
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
  /** Optional scannable list shown above the card grid: each item pairs a phrase with a one-line answer and links to its page at `basePath/slug`. */
  quickAnswers?: {
    heading: string;
    intro?: string;
    items: { slug: string; phrase: string; answer: string }[];
  };
  /** Optional related-reading block shown after the card grid. Each paragraph supports [text](/url/) inline markdown. */
  relatedReading?: { heading: string; paragraphs: string[] };
  faq?: { question: string; answer: string }[];
  /** Set true for hubs without a keyword target. */
  noKeyword?: boolean;
  /** Optional CTA card rendered as the last item in the card grid. */
  featureRequestCard?: {
    title: string;
    description: string;
    linkText: string;
    href: string;
    /** Comic-style banner text shown near the card. */
    bannerText?: string;
  };
}
