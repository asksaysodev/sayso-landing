/** Pricing plans and the monthly / annual prices for Individual Agent+. */

export const AGENT_PRICE = { annual: '$125', monthly: '$179' };

export const AGENT_FEATURES: { name?: string; text: string }[] = [
  { name: 'Cue', text: 'real-time cues during the call' },
  { name: 'Playbook', text: 'your scripts on screen, next to Cue' },
  { name: 'Pulse', text: 'market data mid-call, including prices, days on market and inventory' },
  { name: 'Smart Capture', text: 'call notes sorted and synced to your CRM' },
  { name: 'Composer', text: 'custom script generator' },
  { text: 'Weekly office hours, dashboard analytics and email support' },
];

export const TEAM_FEATURES = [
  'Everything in Individual Agent+ for every agent',
  'Leadership dashboard with unlimited teams and groups',
  'Team implementation and train-the-trainer',
  'Dedicated CSM, priority support and conversion benchmarking',
];
