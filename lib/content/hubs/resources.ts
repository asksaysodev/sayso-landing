import type { HubPageConfig } from './types';

const resourcesHub: HubPageConfig = {
  slug: 'resources',
  section: 'Resources',
  basePath: '/resources',
  seoTitle: 'Sayso Resources: Scripts and Guides for Agents',
  seoDescription:
    'Browse Sayso resources: blog articles, objection scripts, and glossary terms to help real estate agents sound better on every call.',
  h1: 'Resources for Real Estate Agents',
  childPages: [
    {
      title: 'Ultimate Real Estate Script Book',
      slug: 'script-book',
      linkText: 'Get the free script book',
    },
    {
      title: 'Prospecting and Cold Calling',
      slug: 'prospecting',
      description: 'Lead sources, calling rules, call reluctance and every prospecting guide.',
      linkText: 'Browse prospecting guides',
    },
    {
      title: 'Call Coaching and Training',
      slug: 'coaching-and-training',
      description: 'Coaching programs, role play, call skills and live call guidance.',
      linkText: 'Browse coaching and training guides',
    },
    {
      title: 'Appointments and Follow-Up',
      slug: 'appointments-and-follow-up',
      description: 'Booking the meeting, listing appointments and following up with leads.',
      linkText: 'Browse appointment and follow-up guides',
    },
    {
      title: 'Blog',
      slug: 'blog',
      linkText: 'Read the blog',
      href: '/blog',
    },
    {
      title: 'Objection Library',
      slug: 'objections',
      linkText: 'Browse objection scripts',
      href: '/objections',
    },
    {
      title: 'Glossary',
      slug: 'glossary',
      linkText: 'Explore the glossary',
      href: '/glossary',
    },
    {
      title: 'Why Sayso',
      slug: 'why-sayso',
      linkText: 'See why agents choose Sayso',
      href: '/why-sayso',
    },
    {
      title: 'How Sayso Compares',
      slug: 'differences',
      linkText: 'Compare Sayso to the alternatives',
      href: '/differences',
    },
    {
      title: 'Pricing',
      slug: 'pricing',
      linkText: 'View plans and pricing',
      href: '/pricing',
    },
  ],
  noKeyword: true,
};


export { resourcesHub };
