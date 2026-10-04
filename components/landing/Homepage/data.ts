/**
 * Static copy for the homepage sections. Edit wording here, not in the components.
 */

import type { AudienceLine, Feature, PainPoint, Role } from './types';

export const audienceLines: AudienceLine[] = [
  {
    label: 'For agents',
    text: 'Know what to say next, book more appointments, and skip the post-call regret.',
  },
  {
    label: 'For team leaders',
    text: 'Every agent sounds like your best agent, without you sitting in on every call.',
  },
];

export const painPoints: PainPoint[] = [
  {
    title: 'Freeze on objections',
    body: 'When the lead says an objection, your mind goes blank, you stumble, and start overselling. The lead tunes out and the conversation ends.',
  },
  {
    title: "Don't remember scripts",
    body: "You've got scripts and taken courses, but for some reason can't remember what you need during the conversation.",
  },
  {
    title: 'Post-call regret',
    body: 'You realize what you should have said after the call ends. It feels like a gut punch because you knew what you should have done.',
  },
];

export const features: Feature[] = [
  {
    name: 'Cue',
    tag: 'Live prompts',
    body: 'Prompts appear during the call based on the conversation to help you dig deeper and book next steps.',
    href: '/products/cue',
  },
  {
    name: 'Smart Capture',
    tag: 'Automatic notes',
    body: 'Notes transcribed mid-call in the framework you want, organized for cleaner lead handoffs and faster reviews.',
    href: '/products/smart-capture',
  },
  {
    name: 'Pulse',
    tag: 'Live market data',
    body: 'Sound like the local expert you are, with market data for any zip code mid-call.',
    href: '/products/pulse',
  },
  {
    name: 'Playbook',
    tag: 'Your frameworks',
    body: 'Use your own scripts with guidance that adapts to where the conversation goes.',
    href: '/products/playbook',
  },
];

export const steps: string[] = ['Launch Sayso', 'Start dialing'];

export const roles: Role[] = [
  {
    id: 'team',
    tab: 'Team leader',
    title: 'Team leaders',
    body: "You can't be on every call, but Sayso can. Get consistent conversations across your whole team and reinforce your standards on every call, not just in the weekly meeting.",
    href: '/for/team-leaders',
    linkLabel: 'Sayso for team leaders',
  },
  {
    id: 'new',
    tab: 'New agent',
    title: 'New agents',
    body: 'Every call feels like starting from scratch. Sayso guides you live, so you ramp faster than with training and scripts alone.',
    href: '/for/new-agents',
    linkLabel: 'Sayso for new agents',
  },
  {
    id: 'solo',
    tab: 'Solo agent',
    title: 'Solo agents',
    body: "You're making calls and booking some appointments, but you know you're leaving appointments on the table. Sayso closes the gap.",
    href: '/for/solo-agents',
    linkLabel: 'Sayso for solo agents',
  },
  {
    id: 'isa',
    tab: 'ISA',
    title: 'ISAs',
    body: 'High call volume means more objections. Live prompts keep every conversation moving toward a qualified appointment.',
    href: '/for/isas',
    linkLabel: 'Sayso for ISAs',
  },
];
