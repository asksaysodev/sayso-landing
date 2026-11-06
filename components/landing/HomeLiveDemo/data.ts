/**
 * Script for the homepage guided demo: the tour steps shown in the step card
 * and the scripted buyer call that drives the cues and Smart Capture.
 * The call and the market numbers are sample data.
 */
import type { Beat, TourStep } from './types';

export const HINT_START = 'Press the button with the yellow ring to start';
export const HINT_DISMISS = 'Press Start to try the demo';

export const STEPS: TourStep[] = [
  {
    key: 'start',
    title: 'Sayso spots your call',
    body: 'Your buyer lead picks up and Sayso shows a call alert. Press Start on the alert, where it says Click here.',
  },
  {
    key: 'watch',
    title: 'Cues come in on their own',
    body: 'Just talk. As the prospect speaks, short cues flow into Sayso. There is nothing to click. Watch the newest cue at the top.',
  },
  {
    key: 'dot',
    title: 'Smart Capture takes the notes',
    body: 'L changed color when Sayso heard where they want to live. Hover or tap L to read the note it wrote for your CRM.',
  },
  {
    key: 'zip',
    title: 'They ask about the market',
    body: 'Click Zip Code. Pulse drops in local numbers you can share on the spot.',
  },
  {
    key: 'play',
    title: 'Pull up your script',
    body: 'Click the list icon to open your Playbook. The check icon beside it hides or shows your cues.',
  },
  {
    key: 'stop',
    title: 'Hang up when you’re done',
    body: 'Watch the rest of the letters fill in as the call wraps up, then press the red button. Sayso closes back down to the bar.',
  },
];

const P = (delay: number, text: string): Beat => ({ delay, kind: 'prospect', text });
const Y = (delay: number, text: string): Beat => ({ delay, kind: 'you', text });
const C = (delay: number, text: string): Beat => ({ delay, kind: 'cue', text });
const K = (delay: number, index: number): Beat => ({ delay, kind: 'capture', index });

/** Opening of the call, right after Start. */
export const PHASE_A: Beat[] = [
  P(700, 'Hi, yes, I filled that out. We’re hoping to get closer to downtown.'),
  { delay: 900, kind: 'openCues' },
  C(1100, 'Ask why being closer to downtown is important'),
  Y(1700, 'Got it. What has you wanting to be closer to downtown?'),
  P(1800, 'My commute is over an hour each way right now.'),
  C(1000, 'Ask why being closer to work matters to them'),
  Y(1700, 'That’s a lot of driving. Why is being closer to work a big deal for you?'),
  P(1900, 'I’m barely home before the kids go to bed.'),
  K(900, 0),
  C(700, 'Acknowledge it, ask what a shorter commute would change'),
];

/** The prospect asks about the market (zip step). */
export const PHASE_B: Beat[] = [
  P(200, 'What’s the market like over there right now?'),
  C(900, 'Open Pulse, share days on market and price trend'),
];

/** The agent answers with Pulse numbers. */
export const PHASE_B2: Beat[] = [Y(1200, 'Homes there sell in about 90 days, and prices are trending up.')];

/** The call wraps up (stop step): the remaining letters fill in. */
export const PHASE_C: Beat[] = [
  P(600, 'Honestly, I just want less time in the car and more time with my kids.'),
  K(900, 2),
  C(600, 'Validate it, ask if they’re working with an agent'),
  Y(1600, 'That makes sense. Are you working with an agent yet?'),
  P(1600, 'No, you’re the first one I’ve talked to.'),
  K(800, 3),
  C(600, 'Ask what price range feels comfortable'),
  Y(1600, 'What price range feels comfortable for you?'),
  P(1700, 'We’re pre-approved with our bank, up to about $650K.'),
  K(800, 1),
  K(500, 4),
  C(700, 'Offer two times to tour this weekend'),
  Y(1600, 'I can show you a few places Saturday at 10 or Sunday at 1. Which works?'),
  P(1600, 'Saturday at 10 works.'),
  K(800, 5),
  C(600, 'Confirm the tour and send the listings'),
];
