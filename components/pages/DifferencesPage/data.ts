import type { TechCard } from './types';

/**
 * Names and services that fill the blank in the hero question
 * ("We already use ___"). Every tool or habit sales hears on calls.
 * Keep entries short so the drum stays a sane width.
 */
export const DRUM_WORDS: string[] = [
  'MaverickRE',
  'ChatGPT',
  'Shilo',
  'call recording',
  'coaching',
  'role play',
  'scripts',
  'CRM products',
  'a coach',
  'training',
  'call reviews',
  'our CRM notes',
];

/** The homework every other approach assigns before it can help. */
export const HOMEWORK_ITEMS: string[] = [
  'Listen to your recordings',
  'Read your scores',
  'Book a coaching call',
  'Sit through training',
  'Role play',
  'Memorize scripts',
  'Remember all of it three weeks later',
  'On a call that already went sideways',
];

/** The three pipeline steps shown as pills in the dark section. */
export const PIPELINE_STEPS: string[] = [
  'They say something',
  'Sayso understands it',
  'You see what to say',
];

/** Cards for the dark "how Sayso works while you are talking" grid. */
export const TECH_CARDS: TechCard[] = [
  {
    title: 'Sayso keeps up with the conversation',
    description:
      'The words go from their mouth to directions on your screen fast enough that you can use them in the next sentence.',
  },
  {
    title: 'Sayso understands what they mean',
    description:
      'Sayso listens for meaning, not just keywords. It can tell the difference between an objection, a condition, and a polite way of dismissing the caller, because each one is different.',
  },
  {
    title: 'Sayso speaks real estate',
    description:
      'Sayso is built using real prospecting calls, so it knows the best ways to convert every lead type, whether you are prospecting or following up: online leads, open house leads, expireds, FSBOs, and everyone else.',
  },
];

/** Copy for the two cards under the timeline bar. */
export const TIMELINE_CARDS = {
  sayso:
    'Sayso understands the conversation as it happens and displays what to say while you are still on the call. Sayso also takes notes for you in real time, structured for CRM entry.',
  everyoneElse:
    'They analyze the recording later and tell you what you should have said.',
};
