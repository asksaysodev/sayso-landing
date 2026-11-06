/** Analytics ids on the pricing controls, so each page that shows pricing can report its own clicks. */
export interface PricingAnalyticsIds {
  monthly?: string;
  annual?: string;
  agent: string;
  teams: string;
}

/** The homepage ids. /pricing passes its own production ids, so GTM can tell the two pages apart by id alone. */
export const HOME_PRICING_IDS: PricingAnalyticsIds = {
  monthly: 'home-pricing-billing-toggle-monthly',
  annual: 'home-pricing-billing-toggle-annual',
  agent: 'cta-download-home-pricing-individual',
  teams: 'cta-book-demo-home-pricing-teams',
};
