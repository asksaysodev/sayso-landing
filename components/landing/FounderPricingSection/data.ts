import type {
  CaseStudyCard,
  ComparisonColumn,
  FounderPricingConfig,
  IncludedProduct,
} from './types';

/**
 * Edit pricing here. Change a number and the calculator updates.
 *   hours        conversation hours per month included in the plan
 *   price        monthly price in USD (no commas)
 *   callsPerHour dials per conversation hour, from the case study
 *                (67,782 dials / 1,079 conversation hours)
 */
export const FOUNDER_PRICING_CONFIG: FounderPricingConfig = {
  launchWindow: 'expected fall 2026',
  callsPerHour: 63,
  tiers: [
    { hours: 150, price: 369 },
    { hours: 225, price: 519 },
    { hours: 450, price: 999 },
    { hours: 700, price: 1449 },
  ],
};

export const HOURS_CASE_STUDIES: CaseStudyCard[] = [
  {
    title: 'Will your team run out of hours? No.',
    body: 'We looked at 18 months of call history data from a growing 20 agent team. Here is what we found:',
    variant: 'light',
    stats: [
      { value: '67,782', label: 'Calls made' },
      { value: '6,529', label: 'Conversations' },
      { value: '1,079', label: 'Conversation hours' },
    ],
  },
  {
    title: 'What about my full time ISA?',
    body: "The team's full-time ISA was in seat for 6 months before this data was pulled. Here are the stats from his first 6 months:",
    variant: 'dark',
    stats: [
      { value: '29,172', label: 'Calls in 6 months' },
      { value: '15.5', label: 'Conversation hrs / month' },
      { value: '141', label: 'Appointments booked' },
    ],
  },
];

export const INCLUDED_PRODUCTS: IncludedProduct[] = [
  {
    name: 'Cue',
    tag: 'Real-Time Coaching',
    description:
      'Listens to the call and shows your agent what to say the moment they need it. The objection handler, the next question, the line that books the appointment.',
  },
  {
    name: 'Smart Capture',
    tag: 'Structured Notes',
    description:
      'Writes the call notes automatically, sorted into LPMAMA and ready for your CRM. No more scribbling while the lead is still talking.',
  },
  {
    name: 'Pulse',
    tag: 'Live Market Data',
    description:
      'Pulls live market data mid-call, prices, days on market, inventory, and more, so your agent sounds like the expert instead of guessing.',
  },
  {
    name: 'Playbook',
    tag: 'Custom Scripts',
    description:
      'Puts your scripts right on the screen next to Cue, so nobody is digging through a Google Doc or scripts binder.',
  },
];

export const LAUNCH_COMPARISON: ComparisonColumn[] = [
  {
    tag: 'Founder Pricing · now',
    title: 'One price, one org',
    variant: 'now',
    bullets: [
      'One flat monthly price for the whole team',
      'Every product included for every agent',
    ],
  },
  {
    tag: 'A la carte · at launch',
    title: 'Buy it by the product',
    variant: 'later',
    bullets: [
      'Each product is priced on its own',
      'Increased pricing to match the market',
    ],
  },
];
