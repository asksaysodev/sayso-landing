import type { ToolRow, Timing } from './types';

/**
 * Copy for /differences, written for team leaders who ask whether Sayso
 * duplicates a tool they already pay for.
 */

/** Tools leaders name when they say "We already use ___". Short entries keep the drum a sane width. */
export const DRUM_WORDS: string[] = [
  'Follow Up Boss',
  'Lofty',
  'MaverickRE',
  'Battr',
  'PLACE',
  'call recording',
  'a coach',
  'role play',
  'ChatGPT',
  'scripts',
];

/** The comparison headline's drum: "Doesn't ___ already do this?" reads wrong with "scripts". */
export const COMPARE_DRUM_WORDS: string[] = DRUM_WORDS.filter((w) => w !== 'scripts');

export const TIMING = {
  sayso:
    'Sayso hears the conversation and shows the agent what to ask next while the client is still on the line. It takes the notes too.',
  everyoneElse:
    'Recordings, scores, summaries and coaching sessions review the call once it’s over and tell the agent what they should have said.',
};

export const TIMING_LABEL: Record<Timing, string> = {
  during: 'During the call',
  before: 'Before the call',
  after: 'After the call',
  beforeAfter: 'Before and after',
};

export const SAYSO_ROW: ToolRow = {
  tool: 'Sayso',
  timing: 'during',
  agent: 'Live prompts, script on screen, notes as they talk',
  leader: 'More productive agents and ISAs',
};

export const TOOL_ROWS: ToolRow[] = [
  { tool: 'CRM summary', timing: 'after', agent: 'Recap of the call', leader: 'Call record' },
  {
    tool: 'MaverickRE / Shilo / other tools',
    timing: 'beforeAfter',
    agent: 'Follow-up nudges, call grades, role play',
    leader: 'Follow-up rules, call grading',
  },
  { tool: 'Battr', timing: 'before', agent: 'Lead rules, shared pools', leader: 'At-risk leads flagged' },
  { tool: 'Call recording', timing: 'after', agent: 'Feedback after the fact', leader: 'Call library' },
  { tool: 'A sales coach', timing: 'beforeAfter', agent: 'Skills, role play', leader: 'Team standards' },
  { tool: 'ChatGPT', timing: 'beforeAfter', agent: 'Script and message drafts', leader: '—' },
];

/** Section 5: the same call, as a typical summary and as Sayso notes. Mock content, no client data. */
export const SUMMARY_LINES: string[] = [
  'Caller said hello and asked how the agent’s week was going.',
  'Talked about the rain this week and her two dogs.',
  'She mentioned her sister lives nearby and they visit often.',
  'Discussed a long story about a past rental and a landlord issue.',
  'She said they might want a bigger place at some point.',
  'Agent offered to send some listings.',
];

export const SAYSO_NOTES: { label: string; value: string }[] = [
  { label: 'Location', value: 'Near her sister, same school district' },
  { label: 'Price', value: 'Stay under $2,800 a month' },
  { label: 'Motivation', value: 'Lease ends in May, needs a yard for the dogs' },
  { label: 'Agent', value: 'Not working with anyone' },
  { label: 'Mortgage', value: 'Not pre-approved yet, open to a lender call' },
  { label: 'Next step', value: 'Showing Saturday at 10' },
];

export const AVAILABLE_TODAY: string[] = [
  'Live guidance on every coached call',
  'Structured notes on every coached call',
  'Works inside your existing CRM / dialer workflow',
  'Sayso detects inbound and outbound calls and starts on its own; the agent acknowledges it',
];

export const COMING_SOON: string[] = [
  'Call grading against your team’s own frameworks and standards',
  'General discovery grading: how deep the agent went and what opportunities they missed',
  'Daily grading report emailed to each agent',
  'AI role play',
];

/** Support every team gets from Sayso. */
export const SUPPORT_ITEMS: { title: string; body: string }[] = [
  {
    title: 'Weekly office hours',
    body: 'Every week at 2pm ET. Open to every agent and leader on your team.',
  },
  {
    title: 'Leadership meetings',
    body: 'Regular check-ins with your leaders to keep a pulse on how the team is using Sayso.',
  },
  {
    title: 'A group chat with the founder',
    body: 'Your team and the Sayso founder in a group chat or platform of your choice, so questions and bugs are handled in minutes, not days.',
  },
];

export const PROOF_STATS: { value: string; label: string }[] = [
  { value: '+43,906', label: 'call attempts' },
  { value: '+1,664', label: 'conversations' },
  { value: '+337', label: 'appointments booked' },
];

export const LEADER_FAQ: { question: string; answer: string }[] = [
  { question: 'Do we have to change CRMs or dialers?', answer: 'No.' },
  {
    question: 'What if my top agent doesn’t want it?',
    answer: 'They don’t turn it on, and their calls don’t use hours.',
  },
  {
    question: 'Does it work for ISAs on inbound calls?',
    answer: 'Yes, Sayso detects inbound and outbound calls.',
  },
  { question: 'How long does setup take?', answer: 'Most agents are set up in under 5 minutes.' },
];
