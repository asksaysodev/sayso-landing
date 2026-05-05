import type { HubPageConfig } from './types';
import { registerHub } from './index';

const productsHub: HubPageConfig = {
  slug: 'products',
  section: 'Products',
  basePath: '/products',
  seoTitle: 'Sayso Products: Real-Time Coaching for Agents',
  seoDescription:
    'Explore the Sayso products: real-time coaching, automatic call notes, live market data, and custom scripts for real estate agents.',
  h1: 'Products Built For You',
  introduction:
    'Every product in Sayso is designed for one thing: helping you sound better on prospecting calls. Real-time coaching, automatic notes, live market data, and more.',
  childPages: [
    {
      title: 'Real-Time Coaching',
      eyebrow: 'Cue',
      slug: 'cue',
      description:
        'Live guidance on every call. See how to handle objections and exactly what to ask or say the moment you need it.',
      keyword: 'real time sales help',
      linkText: 'See how Cue works',
    },
    {
      title: 'Call Notes',
      eyebrow: 'Smart Capture',
      slug: 'smart-capture',
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
  // featureRequestCard: {
  //   title: 'Have an Idea?',
  //   description:
  //     'Tell us what features you want next. We build Sayso based on what agents actually need.',
  //   linkText: 'Submit a feature request',
  //   href: '/feedback',
  //   bannerText: "We're all ears!",
  // }, // TODO: re-enable when feedback page is ready
};

registerHub(productsHub);

export { productsHub };
