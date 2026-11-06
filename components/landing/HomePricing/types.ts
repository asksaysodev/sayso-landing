/** Analytics ids on the pricing controls, so each page that shows pricing can report its own clicks. */
export interface PricingAnalyticsIds {
  monthly?: string;
  annual?: string;
  agent: string;
  teams: string;
}

/** The homepage ids (the billing toggle has none there). */
export const HOME_PRICING_IDS: PricingAnalyticsIds = {
  agent: 'cta-founder-pricing-home-pricing',
  teams: 'cta-book-demo-home-pricing-teams',
};
