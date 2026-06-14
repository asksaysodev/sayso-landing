import type { Chapter, FeatureMeta } from '../types';

/** Summary line Sayso writes into the CRM note alongside the Smart Capture data. */
export const CRM_NOTE_SUMMARY =
  'San Pedro buyer, looking for a smaller place with an ocean view, open to next steps in about a week.';

/**
 * The four products shown in the tour, in pill order. Labels and captions echo
 * the /products hub so the demo stays consistent with the rest of the site.
 */
export const FEATURES: FeatureMeta[] = [
  {
    key: 'cue',
    shortLabel: 'Cue',
    label: 'Cue · Real-Time Coaching',
    tagline: 'Real-time coaching, so you never lose your words.',
    caption: 'Sayso listens to the live call and shows the agent what to say the moment an objection lands.',
  },
  {
    key: 'smart-capture',
    shortLabel: 'Smart Capture',
    label: 'Smart Capture · Auto Notes',
    tagline: 'Automatic notes, logged to your CRM.',
    caption: 'Key details are captured into a structured LPMAMA framework, then logged straight to the CRM.',
  },
  {
    key: 'pulse',
    shortLabel: 'Pulse',
    label: 'Pulse · Live Market Data',
    tagline: 'Live market data.',
    caption: 'Look up a zip code mid-call and answer market questions with real numbers, no tab switching.',
  },
  {
    key: 'playbook',
    shortLabel: 'Playbook',
    label: 'Playbook · Custom Scripts',
    tagline: 'The exact scripts you want agents following.',
    caption: 'Your own scripts stay on screen beside the live coaching, so agents stay on track without memorizing.',
  },
];

/**
 * The scripted timeline for each chapter. Times are milliseconds from the start
 * of the chapter. The clock engine derives every visual from these.
 */
export const CHAPTERS: Record<FeatureMeta['key'], Chapter> = {
  cue: {
    key: 'cue',
    // Prompts are spaced ~1s further apart, then the full stack holds ~5s.
    durationMs: 18000,
    baseCallSeconds: 47,
    leadType: 'Buyer',
    transcript: [
      { at: 400, from: 'prospect', text: 'Honestly, we are just browsing right now, seeing what is out there.' },
      { at: 5200, from: 'agent', text: 'Totally fair. What would make this feel more helpful for you right now?' },
      { at: 9200, from: 'prospect', text: 'I think we want something smaller, ideally with an ocean view.' },
      { at: 13000, from: 'agent', text: 'Love it. Would later today or tomorrow work for a quick call to explore options?' },
    ],
    cue: {
      condensed: [
        { at: 1200, text: 'Dig into what prompted their search now' },
        { at: 5200, text: 'Explore their timeline for needing more space' },
        { at: 9200, text: 'Explore how space needs affect their lifestyle' },
        { at: 13000, text: 'Suggest an appointment today or tomorrow' },
      ],
      full: [
        { at: 1200, text: 'I get it, just browsing can feel overwhelming at times. What would make this feel more relevant or helpful for you right now?' },
        { at: 5200, text: 'That makes sense! What would a smaller house provide that you currently feel you’re missing?' },
        { at: 9200, text: 'Given your interest in a smaller place with ocean views, how about we schedule a quick call to explore options? Does later today or tomorrow work for you?' },
      ],
    },
    lpmama: [],
  },

  'smart-capture': {
    key: 'smart-capture',
    // Each captured field holds ~4s before the next, so the banners don't flash.
    durationMs: 21000,
    baseCallSeconds: 61,
    leadType: 'Buyer',
    transcript: [
      { at: 200, from: 'prospect', text: 'We are over in San Pedro, pretty close to the water.' },
      { at: 4200, from: 'prospect', text: 'We want something smaller so the payments are lower every month.' },
      { at: 9000, from: 'agent', text: 'Got it. Are you working with another agent on this yet?' },
      { at: 12600, from: 'prospect', text: 'No, not yet. We could look at next steps in the next week or so.' },
    ],
    lpmama: [
      { at: 900, field: 'location', value: 'San Pedro, close to the water' },
      { at: 3700, field: 'price', value: 'Worried about pricing right in this market' },
      { at: 6500, field: 'motivation', value: 'Wants a smaller place with an ocean view' },
      { at: 9300, field: 'mortgage', value: 'Wants lower monthly payments' },
      { at: 12100, field: 'agent', value: 'Not working with another agent yet' },
      { at: 14900, field: 'appointment', value: 'Open to next steps in about a week' },
    ],
    syncAt: 16600,
    crmNoteAt: 17600,
  },

  pulse: {
    key: 'pulse',
    durationMs: 13000,
    baseCallSeconds: 78,
    leadType: 'Buyer',
    transcript: [
      { at: 400, from: 'prospect', text: 'How is the market around here right now?' },
      { at: 6200, from: 'agent', text: 'Homes in your zip are moving in about 38 days and prices are trending up, so timing is actually on your side.' },
    ],
    lpmama: [],
    pulse: {
      zipValidAt: 2600,
      openAt: 3200,
      resultsAt: 5400,
      zip: '90731',
      city: 'San Pedro, CA',
      facts: [
        { label: 'Avg. days on market', value: '38' },
        { label: 'Price trend (90d)', value: 'Up', trend: 'up' },
        { label: 'Avg. price / ft²', value: '$642' },
        { label: 'Inventory level', value: 'Low' },
      ],
    },
  },

  playbook: {
    key: 'playbook',
    durationMs: 15000,
    baseCallSeconds: 92,
    leadType: 'Buyer',
    transcript: [
      { at: 2400, from: 'agent', text: 'Hey Jordan, this is Alex. We met at the open house on Main Street. Are you still visiting open houses, or have you found the one?' },
      { at: 8000, from: 'prospect', text: 'Still looking, honestly. Nothing has felt right yet.' },
    ],
    lpmama: [],
    playbook: {
      openAt: 1000,
      sections: [
        {
          heading: 'Opening',
          bullets: [
            'Hey [Prospect Name]?',
            'This is [Agent Name]. We met at the open house on [Street Name]! Are you still visiting open houses or have you found the one?',
          ],
        },
        {
          heading: 'If still looking',
          bullets: [
            'What type of home are you looking for? Tell me more about it!',
            'Just curious what didn’t work for you about the open house that we met at?',
          ],
        },
        {
          heading: 'Location',
          bullets: ['Are you trying to stay close to that neighborhood or open to other areas?'],
        },
        {
          heading: 'Price',
          bullets: ['Have you been looking in that same price range consistently?'],
        },
        {
          heading: 'Motivation',
          bullets: ['What’s pushing the move right now? (Lease ending? Family change? Just ready?)'],
        },
        {
          heading: 'Agent',
          bullets: ['Are you working with anyone already or still early in the process?'],
        },
        {
          heading: 'Mortgage',
          bullets: ['Have you been pre approved yet or still figuring out financing?'],
        },
        {
          heading: 'Timing',
          bullets: ['If the right home popped up, how soon would you want to move?'],
        },
        {
          heading: 'Transition',
          bullets: [
            'Most open house visitors either need better options or better clarity. Could you relate to either? Which one?',
            'I usually sit down for 20 to 25 minutes and map out what’s realistic in today’s market. Would that help?',
          ],
        },
        {
          heading: 'Booking',
          bullets: [
            'Are you more morning, afternoon, or evening people?',
            'And would that work for [Spouse or Decision Maker] too?',
            'We can do a quick 20 to 25 minute sit down. Office or coffee, we’ll be done before the coffee gets cold.',
            'Zoom works if needed, but if we do that, I like the next one to be in person.',
          ],
        },
        {
          heading: 'Confirm',
          bullets: ['Let me confirm your email. What other email should I send the invite to?'],
        },
        {
          heading: 'Close',
          bullets: [
            'And if anything changes, just shoot me a text, even if we need to push a few minutes or reschedule.',
            'Sound good?',
          ],
        },
      ],
    },
  },
};
