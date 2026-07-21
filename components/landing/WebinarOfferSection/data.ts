import type { Bonus, PriceAnchor, StackItem, Step } from './types';

/**
 * Where "Claim your offer" sends people: the create-account page. Confirm the
 * exact URL with the app team and swap it here if it differs.
 */
export const ACCOUNT_CREATION_URL = 'https://app.asksayso.com/login?signup=true';

/** Link for the "talk it through" CTA in the FAQ. */
export const KUVAAL_CALL_URL = 'https://calendly.com/asksayso/sayso-webinar';
/** Link for the team / brokerage inquiry in the FAQ. */
export const REQUEST_DEMO_URL = 'https://www.asksayso.com/request-demo/';

/** The webinar price and total anchor value. Edit here to update the page. */
export const PRICE = '$2,700';
export const TOTAL_VALUE = '$8,350+';

/** Everything included, each with its standalone value. */
export const STACK_ITEMS: StackItem[] = [
  {
    name: 'Sayso, full platform, full year',
    detail:
      'Cue live guidance, Smart Capture notes synced to your CRM, Pulse market data, Playbook frameworks, Composer custom scripts, dashboard analytics, post-call coaching',
    value: '$4,200',
  },
  {
    name: 'Weekly live group coaching, every week, all year',
    detail: 'Real call breakdowns, script drills, objection work. 48+ live sessions',
    value: '$2,850',
  },
  {
    name: 'Curated lead list',
    detail: 'You leave onboarding with real numbers loaded and ready to dial',
    value: '$500',
  },
  {
    name: '1-on-1 onboarding',
    detail: "Personal setup with our team so you're live on your very next call block",
    value: '$300',
  },
  {
    name: 'Referral map, preferred realtor placement',
    detail: 'Placement on the list we refer from. Not sold separately',
    value: 'Included',
  },
  {
    name: 'Skool community access',
    detail: 'Scripts, practice partners, call reviews between sessions',
    value: '$500',
  },
  {
    name: 'Email support + dashboard analytics',
    detail: 'Direct line to the team, performance tracking on every call',
    value: 'Included',
  },
];

/** The three webinar-only bonuses. */
export const BONUSES: Bonus[] = [
  {
    title: '2x your lead list',
    body: 'Everyone gets a curated lead list, but claiming the webinar offer means we double the number of leads you get.',
  },
  {
    title: '$300 discount',
    body: 'The full year at $2,700 instead of $3,000, and your price stays locked in and does not increase.',
  },
  {
    title: 'The signed-client guarantee',
    body: 'Sign 1 client, a buyer agreement or listing agreement, in your first 12 months as a Sayso user, or your money back.',
  },
];

/** Value comparisons shown above the price. */
export const PRICE_ANCHORS: PriceAnchor[] = [
  { label: 'Value with bonuses', value: '$8,850+' },
  { label: 'Paid monthly', value: '$4,200/yr' },
  { label: 'Regular annual', value: '$3,000' },
];

/** The three-step "what happens next" flow. */
export const STEPS: Step[] = [
  {
    title: 'Claim your offer',
    body: 'Tap the button and lock in the webinar price before Friday 5:00 PM PT.',
  },
  {
    title: 'Create your account',
    body: 'Takes two minutes. We start building your lead list immediately.',
  },
  {
    title: 'Book your onboarding',
    body: "You'll get an email to schedule your 1-on-1 setup right after creating your account.",
  },
];
