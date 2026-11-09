/**
 * Single source for Sayso plan pricing and plan features. Used by the pricing
 * section (components/landing/HomePricing) on the homepage and on /pricing.
 * Change prices and features here only.
 */

export const INDIVIDUAL_PLAN_NAME = 'Individual Agent+';

/** Individual Agent+ price per month, by billing period. */
export const INDIVIDUAL_PRICE = { annual: '$125', monthly: '$179' } as const;

/** Annual discount badge, derived from the two prices so it cannot drift. */
export const ANNUAL_DISCOUNT_PERCENT = Math.round(
  (1 - Number(INDIVIDUAL_PRICE.annual.slice(1)) / Number(INDIVIDUAL_PRICE.monthly.slice(1))) * 100,
);

/** Sayso products in Individual Agent+, with the short line shown on the plan card. */
export const PLAN_PRODUCTS: { name: string; summary: string }[] = [
  { name: 'Cue', summary: 'real-time cues during the call' },
  { name: 'Playbook', summary: 'your scripts on screen, next to Cue' },
  { name: 'Pulse', summary: 'market data mid-call, including prices, days on market and inventory' },
  { name: 'Smart Capture', summary: 'call notes sorted and synced to your CRM' },
  { name: 'Composer', summary: 'custom script generator' },
];

/** Production plan lines, shown on the plan cards. */
export const ONBOARDING_LINE = '1-on-1 onboarding';
export const IMPACT_REVIEWS_LINE = '1-on-1 quarterly impact reviews with leadership';

/** Agent support in Individual Agent+. */
export const AGENT_SUPPORT_SUMMARY = 'Weekly office hours, analytics and email support';

export const TEAM_PLAN_NAME = 'Teams and Brokerages';

/** Teams and Brokerages list for the plan card. */
export const TEAM_FEATURES_SUMMARY = [
  'Individual Agent+ for every agent',
  'Leadership dashboard with unlimited teams and groups',
  'Team implementation and train-the-trainer',
  'Dedicated CSM, priority support, benchmarking',
  IMPACT_REVIEWS_LINE,
];

