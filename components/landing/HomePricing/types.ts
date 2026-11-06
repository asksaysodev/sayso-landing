/** Analytics ids on the pricing controls, so each page that shows pricing can report its own clicks. */
export interface PricingAnalyticsIds {
  monthly?: string;
  annual?: string;
  agent: string;
  teams: string;
}

/** The homepage ids (the billing toggle falls back to the shared toggle ids). */
export const HOME_PRICING_IDS: PricingAnalyticsIds = {
  agent: 'cta-download-pricing-individual',
  teams: 'cta-book-demo-home-pricing-teams',
};
