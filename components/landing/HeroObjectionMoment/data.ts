/**
 * The objection -> coaching-line pairs that cycle in the hero "wow moment".
 * Kept lead-type agnostic on purpose (a mix of buyer and seller moments) so the
 * hero speaks to every agent, per the global writing rules.
 */
export interface ObjectionMoment {
  /** What the prospect says: the moment that throws agents off. */
  objection: string;
  /** The line Sayso surfaces in real time, while you are still on the call. */
  response: string;
}

export const OBJECTIONS: ObjectionMoment[] = [
  {
    objection: 'I already have an agent.',
    response:
      "Totally fair. When was the last time they brought you something that actually fit what you're looking for?",
  },
  {
    objection: 'We want to sell it ourselves.',
    response:
      'A lot of owners start there. What would have to happen for you to consider letting someone handle it?',
  },
  {
    objection: 'Just send me some listings.',
    response:
      'Happy to. So I send the right ones and not forty that miss, what is the one thing it has to have?',
  },
  {
    objection: "We'll just wait until spring.",
    response: "Makes sense. What changes for you in spring that doesn't work right now?",
  },
  {
    objection: "I'm just looking right now.",
    response: 'Love it, no pressure at all. What got you thinking about a move in the first place?',
  },
];
