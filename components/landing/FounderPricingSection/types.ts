export type PricingTier = {
  hours: number;
  price: number;
};

export type FounderPricingConfig = {
  launchWindow: string;
  callsPerHour: number;
  tiers: PricingTier[];
};

export type IncludedProduct = {
  name: string;
  tag: string;
  description: string;
};

export type CaseStudyStat = {
  value: string;
  label: string;
};

export type CaseStudyCard = {
  title: string;
  body: string;
  stats: CaseStudyStat[];
  variant: 'light' | 'dark';
};

export type ComparisonColumn = {
  tag: string;
  title: string;
  bullets: string[];
  variant: 'now' | 'later';
};
