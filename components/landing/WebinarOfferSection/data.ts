import type { OfferColumn } from './types';

/**
 * The offer, split into two columns like the webinar slide:
 *   - PLATFORM_COLUMN: the Sayso product itself, included for 12 months
 *   - WEBINAR_COLUMN:  the bonuses you only get by buying on the webinar
 *
 * Each column carries a combined dollar value. The full value, savings, and
 * percent-off shown on the page are all derived from these numbers (see totals
 * below), so changing a value in one place keeps the whole page consistent.
 */
export const PLATFORM_COLUMN: OfferColumn = {
  label: 'The full Sayso platform, 12 months',
  variant: 'light',
  value: 3500,
  items: [
    { name: 'Cue', detail: 'real-time conversation intelligence on every call' },
    {
      name: 'Smart Capture',
      detail: 'automatic call notes sorted into LPMAMA, synced to your CRM',
    },
    {
      name: 'Pulse',
      detail: 'live market data mid-call: prices, days on market, inventory',
    },
    { name: 'Playbook', detail: 'your custom scripts on screen, right next to Cue' },
    { name: 'Composer', detail: 'generate custom scripts on the fly' },
    { name: 'Dashboard analytics + email support' },
  ],
};

export const WEBINAR_COLUMN: OfferColumn = {
  label: 'When you buy on this webinar',
  variant: 'dark',
  value: 13675,
  items: [
    { name: 'Weekly coaching', detail: 'live group coaching, every week, all year' },
    {
      name: '1-on-1 onboarding',
      detail: "personal setup so you're live on your next call block",
    },
    { name: 'Lead list', detail: 'so the coaching has calls to point at' },
    {
      name: 'Skool community',
      detail: 'scripts, practice, call breakdown, reviews, and more',
    },
    { name: 'Preferred realtor list', detail: 'placement on the list we refer from' },
  ],
};

export const OFFER_COLUMNS: OfferColumn[] = [PLATFORM_COLUMN, WEBINAR_COLUMN];

/** The money-back guarantee, shown as its own banner under the columns. */
export const GUARANTEE_TEXT =
  'close at least one home using Sayso this year, or you get your money back.';

/** The one-time webinar price for the full year, everything included. */
export const TODAY_PRICE = 3000;

/** Sum of every column's value. This is the real value of the offer. */
export const TOTAL_VALUE = OFFER_COLUMNS.reduce((sum, col) => sum + col.value, 0);

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
