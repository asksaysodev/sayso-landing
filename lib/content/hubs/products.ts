import type { HubPageConfig } from './types';
import { registerHub } from './index';

const productsHub: HubPageConfig = {
  slug: 'products',
  section: 'Products',
  basePath: '/products',
  seoTitle: 'Sayso Products: Real-Time Coaching for Agents',
  seoDescription:
    'Explore the Sayso products: real-time coaching, automatic call notes, live market data, and custom scripts for real estate agents.',
  h1: 'Sayso Products',
  introduction:
    'Every product in Sayso is designed for one thing: helping you sound better on prospecting calls. Real-time guidance, automatic notes, live market data, and more.',
  childPages: [
    {
      title: 'Real-Time Guidance',
      slug: 'cue',
      description:
        'Live guidance on every call. See how to handle objections and exactly what to ask or say the moment you need it.',
      keyword: 'real time sales help',
      linkText: 'See how Cue works',
    },
    {
      title: 'Call Notes',
      slug: 'smart-capture',
      description:
        'Automatic, instant, and structured conversation notes for your CRM.',
      keyword: 'automatic call notes real estate',
      linkText: 'See how Smart Capture works',
    },
    {
      title: 'Live Market Analysis',
      slug: 'pulse',
      description:
        'Be the expert when you know the market data for any zip or postal code live on the call.',
      keyword: 'real estate market data during calls',
      linkText: 'Explore Pulse',
    },
    {
      title: 'Custom Scripts',
      slug: 'playbook',
      description:
        'Never be lost for words with a custom script or framework for every call.',
      keyword: 'real estate call scripts',
      linkText: 'See how Playbook works',
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
