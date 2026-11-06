/**
 * Single source for Sayso plan pricing and plan features. Used by the homepage
 * pricing section (components/landing/HomePricing) and the /pricing and
 * /founderpricing pricing section (components/landing/PricingSection.tsx).
 * Change prices and features here only.
 */

export const INDIVIDUAL_PLAN_NAME = 'Individual Agent+';

/** Individual Agent+ price per month, by billing period. */
export const INDIVIDUAL_PRICE = { annual: '$125', monthly: '$179' } as const;

/** Yearly saving on annual billing: 12 x ($179 - $125). */
export const ANNUAL_SAVINGS = '$649';

/** Sayso products in Individual Agent+. `summary` is the short homepage line, `detail` the /pricing bullet. */
export const PLAN_PRODUCTS: { name: string; summary: string; detail: string }[] = [
  { name: 'Cue', summary: 'real-time cues during the call', detail: 'real-time conversation intelligence' },
  { name: 'Playbook', summary: 'your scripts on screen, next to Cue', detail: 'your custom scripts on screen, right next to Cue' },
  {
    name: 'Pulse',
    summary: 'market data mid-call, including prices, days on market and inventory',
    detail: 'live market data mid-call, including prices, days on market, and inventory',
  },
  {
    name: 'Smart Capture',
    summary: 'call notes sorted and synced to your CRM',
    detail: 'automatic call notes sorted and synced to your CRM',
  },
  {
    name: 'Composer',
    summary: 'custom script generator',
    detail: 'custom script generator, built on NLP, psychology, proven frameworks',
  },
];

/** Production plan lines, shown on both pricing sections. */
export const ONBOARDING_LINE = '1-on-1 onboarding';
export const IMPACT_REVIEWS_LINE = '1-on-1 quarterly impact reviews with leadership';

/** Agent support in Individual Agent+. */
export const AGENT_SUPPORT = ['Weekly Virtual Office Hours', ONBOARDING_LINE, 'Dashboard analytics', 'Email Support'];
export const AGENT_SUPPORT_SUMMARY = 'Weekly office hours, dashboard analytics and email support';

export const TEAM_PLAN_NAME = 'Teams and Brokerages';

/** What Teams and Brokerages add on top of Individual Agent+ (full list for /pricing). */
export const TEAM_FEATURES = [
  'Custom team implementation + train-the-trainer',
  'Leadership dashboard with unlimited teams and groups',
  'Priority Support',
  'Dedicated CSM',
  IMPACT_REVIEWS_LINE,
  'Conversion Benchmarking',
];

/** Short Teams and Brokerages list for the homepage card. */
export const TEAM_FEATURES_SUMMARY = [
  'Everything in Individual Agent+ for every agent',
  'Leadership dashboard with unlimited teams and groups',
  'Team implementation and train-the-trainer',
  'Dedicated CSM, priority support and conversion benchmarking',
  IMPACT_REVIEWS_LINE,
];

/** GTM ids for the billing toggle, shared by both pricing sections. */
export const BILLING_TOGGLE_ANALYTICS = {
  annual: 'pricing-billing-toggle-annual',
  monthly: 'pricing-billing-toggle-monthly',
} as const;
