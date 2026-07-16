import type { OfferLineItem } from './types';

/**
 * Edit the offer here. The value total, savings, and percent-off shown on the
 * page are all derived from these numbers (see totals below), so changing a
 * price in one place keeps the whole page consistent.
 */
export const OFFER_LINE_ITEMS: OfferLineItem[] = [
  {
    name: 'Full Sayso platform, 12 months',
    detail: 'Cue, Smart Capture, Pulse, Playbook, Composer, and Analytics',
    value: 3500,
  },
  {
    name: 'Weekly live coaching, all year',
    detail: 'Every week for a full year, plus the private Skool group',
    value: 7500,
  },
  {
    name: '1-on-1 onboarding',
    detail: 'A dedicated setup session so you get value on day one',
    value: 175,
  },
  {
    name: 'Lead list + preferred realtor list',
    detail: 'A starting list of leads and a preferred realtor list to work',
    value: 6000,
  },
  {
    name: 'Close-a-home money-back guarantee',
    detail: "If you don't close, you don't pay. All the upside, none of the risk.",
    value: null,
    displayValue: 'Risk: $0',
  },
];

/** The one-time webinar price for the full year, everything included. */
export const TODAY_PRICE = 3000;

/** Sum of every priced line item. This is the real value of the offer. */
export const TOTAL_VALUE = OFFER_LINE_ITEMS.reduce(
  (sum, item) => sum + (item.value ?? 0),
  0,
);

/** What the attendee saves by claiming on the webinar. */
export const TOTAL_SAVINGS = TOTAL_VALUE - TODAY_PRICE;

/** Savings as a whole-number percent, for the "X% off" badge. */
export const SAVINGS_PERCENT = Math.round((TOTAL_SAVINGS / TOTAL_VALUE) * 100);

/**
 * Where "Claim your offer" sends people. The intended flow is:
 *   1. Claim offer on this page
 *   2. Book a time on the calendar (within the next 2 days)
 *   3. After confirming the time, Calendly redirects to create their account
 *
 * Step 3 is configured as a redirect on the Calendly event itself, pointed at
 * ACCOUNT_CREATION_URL below. Swap CLAIM_CALENDAR_URL for the dedicated webinar
 * booking event once it exists; it currently points at the standard demo event.
 */
export const CLAIM_CALENDAR_URL = 'https://calendly.com/asksayso/demo?hide_gdpr_banner=1';

/** Where the booking flow lands people to create their Sayso account. */
export const ACCOUNT_CREATION_URL = 'https://app.asksayso.com/login?signup=true';
