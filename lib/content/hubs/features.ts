import type { HubPageConfig } from './types';
import { registerHub } from './index';

const featuresHub: HubPageConfig = {
  slug: 'features',
  section: 'Features',
  basePath: '/features',
  seoTitle: 'Sayso Product: Real-Time Coaching for Agents',
  seoDescription:
    'Explore the Sayso product: real-time coaching, automatic call notes, live market data, and custom scripts for real estate agents.',
  h1: 'Features Built For You',
  introduction:
    'Every feature in Sayso is designed for one thing: helping you sound better on prospecting calls. Real-time coaching, automatic notes, live market data, and more.',
  childPages: [
    {
      title: 'Real-Time Coaching',
      eyebrow: 'Cue',
      slug: 'real-time-coaching',
      description:
        'Live guidance on every call. See how to handle objections and exactly what to ask or say the moment you need it.',
      keyword: 'real time sales help',
      linkText: 'See how Cue works',
    },
    {
      title: 'Call Notes',
      eyebrow: 'Smart Capture',
      slug: 'call-notes',
      description:
        'Automate, instant, and structured conversation notes for your CRM.',
      keyword: 'automatic call notes real estate',
      linkText: 'See how Smart Capture works',
    },
    {
      title: 'Live Market Analysis',
      eyebrow: 'Pulse',
      slug: 'pulse',
      description:
        'Be the expert when you know the market data for any zip or postal code live on the call.',
      keyword: 'real estate market data during calls',
      linkText: 'Explore Pulse',
      bannerText: 'Coming soon',
    },
    {
      title: 'Custom Scripts',
      eyebrow: 'Playbook',
      slug: 'playbook',
      description:
        'Never be lost for words with a custom script or framework for every call.',
      keyword: 'real estate call scripts',
      linkText: 'See how Playbook works',
      bannerText: 'Coming soon',
    },
  ],
  noKeyword: true,
  featureRequestCard: {
    title: 'Have an Idea?',
    description:
      'Tell us what features you want next. We build Sayso based on what agents actually need.',
    linkText: 'Submit a feature request',
    href: '/feedback',
    bannerText: "We're all ears!",
  },
};

registerHub(featuresHub);

export { featuresHub };
