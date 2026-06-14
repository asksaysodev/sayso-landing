import type { Chapter, FeatureMeta } from '../types';

/** Summary line Sayso writes into the CRM note alongside the Smart Capture data. */
export const CRM_NOTE_SUMMARY =
  'San Pedro seller, downsizing for a smaller mortgage, close to the water, open to next steps in about a week.';

/**
 * The four products shown in the tour, in pill order. Labels and captions echo
 * the /products hub so the demo stays consistent with the rest of the site.
 */
export const FEATURES: FeatureMeta[] = [
  {
    key: 'cue',
    shortLabel: 'Cue',
    label: 'Cue · Real-Time Coaching',
    caption: 'Sayso listens to the live call and shows the agent what to say the moment an objection lands.',
  },
  {
    key: 'smart-capture',
    shortLabel: 'Smart Capture',
    label: 'Smart Capture · Auto Notes',
    caption: 'Key details are captured into a structured LPMAMA framework, then logged straight to the CRM.',
  },
  {
    key: 'pulse',
    shortLabel: 'Pulse',
    label: 'Pulse · Live Market Data',
    caption: 'Look up a zip code mid-call and answer market questions with real numbers, no tab switching.',
  },
  {
    key: 'playbook',
    shortLabel: 'Playbook',
    label: 'Playbook · Custom Scripts',
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
    durationMs: 14000,
    baseCallSeconds: 47,
    leadType: 'Seller',
    transcript: [
      { at: 400, from: 'prospect', text: 'Honestly, we were thinking we would just wait until spring to list.' },
      { at: 4200, from: 'agent', text: 'Totally fair. What would waiting until spring change for you?' },
      { at: 7000, from: 'prospect', text: 'I guess we are worried about pricing it right in this market.' },
      { at: 10600, from: 'agent', text: 'That makes sense. I can pull live numbers for your area right now so we are working from real data.' },
    ],
    insights: [
      { at: 1500, text: 'Acknowledge the timing, then ask what spring actually changes for them. It surfaces the real motivation.' },
      { at: 7600, text: 'Pricing concern detected. Offer to walk them through recent numbers in their zip so they feel in control.' },
      { at: 11400, text: 'Strong pivot. Hand this to Pulse to show live market data without leaving the call.' },
    ],
    lpmama: [],
  },

  'smart-capture': {
    key: 'smart-capture',
    durationMs: 16000,
    baseCallSeconds: 61,
    leadType: 'Seller',
    transcript: [
      { at: 400, from: 'prospect', text: 'We are over in San Pedro, pretty close to the water.' },
      { at: 4000, from: 'prospect', text: 'We want to downsize so the mortgage is smaller every month.' },
      { at: 8200, from: 'agent', text: 'Got it. Are you working with another agent on this yet?' },
      { at: 10200, from: 'prospect', text: 'No, not yet. We could look at next steps in the next week or so.' },
    ],
    lpmama: [
      { at: 1600, field: 'location', value: 'San Pedro, close to the water' },
      { at: 3200, field: 'price', value: 'Worried about pricing right in this market' },
      { at: 5200, field: 'motivation', value: 'Downsizing for a smaller mortgage' },
      { at: 9000, field: 'agent', value: 'Not working with another agent yet' },
      { at: 6400, field: 'mortgage', value: 'Wants smaller monthly mortgage payments' },
      { at: 11200, field: 'appointment', value: 'Open to next steps in about a week' },
    ],
    insights: [],
    crmNoteAt: 13200,
  },

  pulse: {
    key: 'pulse',
    durationMs: 13000,
    baseCallSeconds: 78,
    leadType: 'Seller',
    transcript: [
      { at: 400, from: 'prospect', text: 'How is the market around here right now?' },
      { at: 6200, from: 'agent', text: 'Homes in your zip are moving in about 38 days and prices are trending up, so timing is actually on your side.' },
    ],
    insights: [],
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
    durationMs: 13000,
    baseCallSeconds: 92,
    leadType: 'Seller',
    transcript: [
      { at: 2600, from: 'agent', text: 'Hey Jordan, this is Alex. I am calling about your home on Marina Vista. Are you still planning to sell, or waiting on something?' },
      { at: 8000, from: 'prospect', text: 'Still planning to, we just want to get it right.' },
    ],
    insights: [],
    lpmama: [],
    playbook: {
      openAt: 1200,
      sections: [
        {
          heading: 'Introduction',
          bullets: [
            'Hey [Name], this is [Your first name]. I am calling about your home on [Street].',
            'Are you still planning to sell, or waiting for something to change?',
          ],
        },
        {
          heading: 'Discovery',
          bullets: [
            'When you first thought about selling, where were you planning to go?',
            'Is that move still important to you?',
            'On a scale of 1 to 7, how ready do you feel to make it happen?',
          ],
        },
      ],
    },
  },
};
