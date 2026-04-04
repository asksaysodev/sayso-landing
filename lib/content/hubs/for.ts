import type { HubPageConfig } from './types';
import { registerHub } from './index';

const forHub: HubPageConfig = {
  slug: 'for',
  section: 'Solutions',
  basePath: '/for',
  seoTitle: 'Sayso Solutions — Built for Every Role',
  seoDescription:
    'See how Sayso helps solo agents, team leaders, new agents, and ISAs sound better on every prospecting call with real-time coaching.',
  h1: 'Built for How You Work',
  introduction:
    'Whether you are a solo agent grinding through your own calls, a team leader trying to level up 10 reps at once, a brand new agent learning the ropes, or an ISA converting leads all day — Sayso adapts to your role.',
  childPages: [
    {
      title: 'Solo Agents',
      slug: 'solo-agents',
      description: 'Real-time coaching for agents who do everything themselves — prospecting, objections, follow-ups.',
      keyword: 'how to be more efficient real estate agent',
      linkText: 'How Sayso helps solo agents',
    },
    {
      title: 'Team Leaders',
      slug: 'team-leaders',
      description: 'Scale your coaching without being on every call. See how your team sounds and where they need help.',
      keyword: 'how to manage high volume leads real estate',
      linkText: 'Sayso for team leaders',
    },
    {
      title: 'New Agents',
      slug: 'new-agents',
      description: 'Sound experienced from day one. Real-time prompts replace months of trial-and-error learning.',
      keyword: 'how to get better at cold calling real estate',
      linkText: 'Get better at cold calling faster',
    },
    {
      title: 'ISAs',
      slug: 'isas',
      description: 'Convert more leads with real-time coaching on every inbound and outbound call.',
      keyword: 'ISA conversion scripts real estate',
      linkText: 'ISA conversion scripts and coaching',
    },
  ],
  noKeyword: true,
};

registerHub(forHub);

export { forHub };
