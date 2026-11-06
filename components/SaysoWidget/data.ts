/**
 * Static content for the Sayso widget: LPMAMA letters and colors, sample
 * notes, Playbook scripts, sample cues, sample market data and ready-made
 * static views (presets) for pages that show one moment of a call.
 *
 * All market numbers are sample data; pages showing them should say so.
 */

import type { LeadType, MarketSample, PlaybookScript, SaysoWidgetProps } from './types';

export const LPMAMA = [
  { letter: 'L', name: 'Location' },
  { letter: 'P', name: 'Price' },
  { letter: 'M', name: 'Motivation' },
  { letter: 'A', name: 'Agent' },
  { letter: 'M', name: 'Mortgage' },
  { letter: 'A', name: 'Appointment' },
] as const;

export const DOT_COLORS = ['#6253B0', '#2F7F8A', '#9A7843', '#879843', '#4E6BA8', '#A5566E'];

export const SAMPLE_NOTES = [
  'Location: Closer to downtown, for a shorter commute to work.',
  'Price: Comfortable up to about $650K.',
  'Motivation: Less time in the car, more time with the kids.',
  'Agent: Not working with an agent yet.',
  'Mortgage: Pre-approved with a local lender.',
  'Appointment: Touring Saturday at 10 AM.',
];

export const LEAD_LABELS: Record<LeadType, string> = { B: 'Buyer', S: 'Seller' };

export const PLAYBOOKS: Record<LeadType, PlaybookScript> = {
  B: {
    title: 'Buyer: online inquiry',
    sections: [
      {
        heading: 'Introduction',
        lines: [
          'Hey [Name], this is [Your first name] with [Brokerage]. I saw you were looking at homes near [Neighborhood]. Are you still looking, or did you find something?',
        ],
      },
      {
        heading: 'If still looking:',
        lines: [
          'Got it.',
          'What has you looking right now?',
          'What would the new place have that your current one doesn’t?',
          'When would you ideally like to be moved in?',
          'Are you working with an agent yet?',
        ],
      },
      {
        heading: 'Transition',
        lines: [
          'Got it.',
          'The fastest way to see what fits is to walk a couple of homes together.',
          'I can do [Day] at [Time] or [Day] at [Time]. Which works better?',
        ],
      },
    ],
  },
  S: {
    title: 'Expired Script',
    sections: [
      {
        heading: 'Introduction',
        lines: [
          'Hey [Name], this is [Your first name]. I’m calling about your home on [Street]. Are you still trying to sell it, or are you waiting for something to change?',
        ],
      },
      {
        heading: 'If still trying to sell:',
        lines: [
          'Got it.',
          'On a scale of 1 to 7, how frustrated are you with how it played out?',
          'When you first listed, where were you planning on going?',
          'Is that move still important?',
          'If you had to do it again, what would you change?',
        ],
      },
      {
        heading: 'Transition',
        lines: [
          'Got it.',
          'What would you need to see from the next agent to feel good about listing again?',
          'I can come by [Day] at [Time] or [Day] at [Time]. Which works better?',
        ],
      },
    ],
  },
};

export const SAMPLE_CUES: Record<LeadType, string[]> = {
  B: [
    'Ask what a shorter commute would change',
    'Ask why being closer to work matters',
    'Ask why downtown is important to them',
  ],
  S: [
    'Ask what got in the way last time',
    'Acknowledge their frustration, ask about expectations',
    'Explore what got them thinking about selling',
  ],
};

/** Sample data only, not live market numbers. */
export const SAMPLE_MARKET: MarketSample = {
  zip: '33331',
  place: 'Miami, FL',
  daysOnMarket: 90,
  priceTrend: 'Up',
  pricePerSqft: 412,
  inventory: 'Low',
};

const caps = (...on: number[]) => [0, 1, 2, 3, 4, 5].map((i) => on.includes(i));

/** Ready-made static views. Spread one into `<SaysoWidget />` and override what you need. */
export const WIDGET_PRESETS = {
  /** Call alert with Start and X. */
  alert: { view: 'alert' },
  /** Toolbar only, mid-call. */
  bar: { live: true, time: '0:02:41' },
  /** Cues flowing, Location captured. */
  cues: { live: true, insightOpen: true, time: '0:00:41', cues: SAMPLE_CUES.B, captured: caps(0) },
  /** Four letters captured with the Motivation note showing. */
  notes: {
    live: true,
    insightOpen: true,
    time: '0:02:14',
    cues: ['Validate it, ask about their price range'],
    captured: caps(0, 1, 2, 3),
    note: 2,
    showCursor: true,
  },
  /** Five letters captured with the Motivation note showing. */
  smartCapture: {
    live: true,
    insightOpen: true,
    time: '0:02:14',
    cues: ['Validate it, ask about their price range'],
    captured: caps(0, 1, 2, 3, 4),
    note: 2,
    showCursor: true,
  },
  /** Pulse open with sample market data. */
  pulse: { live: true, pulseOpen: true, time: '0:01:15' },
  /** Playbook open under the toolbar. */
  playbook: { live: true, playbookOpen: true, time: '0:01:42', stacked: true },
} satisfies Record<string, SaysoWidgetProps>;

export type WidgetPreset = keyof typeof WIDGET_PRESETS;
