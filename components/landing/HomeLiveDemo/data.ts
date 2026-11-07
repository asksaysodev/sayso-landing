/**
 * Script for the homepage guided demo: the tour steps shown in the step card
 * and the scripted buyer call that drives the cues and Smart Capture.
 * The call and the market numbers are sample data.
 */
import type { Beat, DemoState, TourStep } from './types';

export const HINT_START = 'Press the button with the yellow ring to start';
export const HINT_DISMISS = 'Press Start to try the demo';

export const STEPS: TourStep[] = [
  {
    key: 'start',
    title: 'Sayso spots your call',
    body: 'Your buyer lead picks up and Sayso shows a call alert. Press the yellow-ringed Start button on the alert.',
  },
  {
    key: 'watch',
    title: 'Cues come in on their own',
    body: 'Just talk. As the prospect speaks, short cues flow into Sayso. There is nothing to click.',
  },
  {
    key: 'dot',
    title: 'Smart Capture takes the notes',
    body: 'L turned purple when Sayso heard where they want to live. Hover over L, or tap it on your phone, to read the note it wrote for your CRM.',
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
    key: 'reset',
    title: 'Reset between calls',
    body: 'Watch the rest of the letters fill in as the call wraps up. Then press the yellow reset button so Sayso starts fresh for your next call.',
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

/** Zip step: the Pulse cue appears. After step 2 there is no talking, only cues and letters. */
export const PHASE_B: Beat[] = [C(300, 'Open Pulse, share days on market and price trend')];

/** The call wraps up (reset step): the remaining letters fill in. */
export const PHASE_C: Beat[] = [
  K(400, 2),
  C(500, 'Validate it, ask if they’re working with an agent'),
  K(900, 3),
  C(500, 'Ask what price range feels comfortable'),
  K(900, 1),
  K(400, 4),
  C(500, 'Offer two times to tour this weekend'),
  K(900, 5),
  C(500, 'Confirm the tour and send the listings'),
];

/** Demo state before the visitor starts the call. */
export const fresh = (): DemoState => ({
  lead: 'B', live: false, detect: true, starting: false, nudge: 0, insight: false, pulse: false,
  pulseShown: false, zipText: null, play: false, cues: [], caps: [false, false, false, false, false, false],
  tip: null, secs: 0, step: 0, phaseADone: false, caption: { kind: 'hint', text: HINT_START },
});

/** A new call after the yellow reset button: clock at zero, nothing captured, every panel closed. */
export const NEW_CALL: Partial<DemoState> = {
  live: true, detect: false, starting: false, insight: false, pulse: false, pulseShown: false, zipText: null, play: false,
  cues: [], caps: [false, false, false, false, false, false], tip: null, secs: 0, caption: { kind: 'none' },
};

/** State after Skip tour: the widget stays on screen with everything closed. */
export const STOPPED: Partial<DemoState> = {
  live: false, starting: false, insight: false, pulse: false, pulseShown: false, zipText: null, play: false, tip: null,
  caption: { kind: 'none' },
};
