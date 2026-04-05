import type { HubPageConfig } from './types';
import { registerHub } from './index';

const featuresHub: HubPageConfig = {
  slug: 'features',
  section: 'Features',
  basePath: '/features',
  seoTitle: 'Sayso Product: Real-Time Coaching for Agents',
  seoDescription:
    'Explore the Sayso product: real-time coaching, objection handling, and automatic call notes for real estate agents.',
  h1: 'Features Built For You',
  introduction:
    'Every feature in Sayso is designed for one thing: helping you sound better on prospecting calls. Real-time coaching, automatic notes, objection handling, and more.',
  childPages: [
    {
      title: 'Real-Time Coaching',
      eyebrow: 'Cue',
      slug: 'real-time-coaching',
      description: 'Live guidance on every call. See what to say the moment you need it.',
      keyword: 'real time sales help',
      linkText: 'See how real-time coaching works',
    },
    {
      title: 'Objection Handling',
      slug: 'objection-handling',
      description: 'Proven response frameworks delivered in real time when prospects push back.',
      keyword: 'real estate objection handling scripts',
      linkText: 'Explore objection handling',
    },
    {
      title: 'Call Notes',
      eyebrow: 'Smart Capture',
      slug: 'call-notes',
      description: 'Automatic call summaries synced to your CRM.',
      keyword: 'automatic call notes real estate',
      linkText: 'How automatic call notes work',
    },
    {
      title: 'Pulse',
      slug: 'pulse',
      description: 'Live market analysis delivered mid-call so you always have the data you need.',
      keyword: 'real estate market data during calls',
      linkText: 'Explore Pulse',
    },
    {
      title: 'Playbook',
      slug: 'playbook',
      description: 'Custom scripts for every scenario so you never freeze on a call.',
      keyword: 'real estate call scripts',
      linkText: 'See how Playbook works',
    },
  ],
  noKeyword: true,
};

registerHub(featuresHub);

export { featuresHub };
