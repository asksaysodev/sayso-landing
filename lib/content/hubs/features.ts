import type { HubPageConfig } from './types';
import { registerHub } from './index';

const featuresHub: HubPageConfig = {
  slug: 'features',
  section: 'Features',
  basePath: '/features',
  seoTitle: 'Sayso Features — Real-Time Coaching for Agents',
  seoDescription:
    'Explore Sayso features: real-time coaching, objection handling, automatic call notes, call grading, and role play practice for real estate agents.',
  h1: 'Features Built for the Phone',
  introduction:
    'Every feature in Sayso is designed for one thing — helping you sound better on prospecting calls. Real-time coaching, automatic notes, objection handling, and more.',
  childPages: [
    {
      title: 'Real-Time Coaching',
      slug: 'real-time-coaching',
      description: 'Live guidance on every call — see what to say the moment you need it.',
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
      slug: 'call-notes',
      description: 'Automatic call summaries synced to your CRM after every conversation.',
      keyword: 'automatic call notes real estate',
      linkText: 'How automatic call notes work',
    },
    {
      title: 'Call Grading',
      slug: 'call-grading',
      description: 'See how your calls stack up and where to improve — without a manager listening in.',
      keyword: 'how to improve call performance real estate',
      linkText: 'Improve your call performance',
    },
    {
      title: 'Role Play',
      slug: 'role-play',
      description: 'Practice scripts and objection handling before you pick up the phone.',
      keyword: 'how to practice scripts real estate',
      linkText: 'Practice with AI role play',
    },
  ],
  noKeyword: true,
};

registerHub(featuresHub);

export { featuresHub };
