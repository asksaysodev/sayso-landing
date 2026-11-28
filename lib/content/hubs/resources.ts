import type { HubPageConfig } from './types';

const resourcesHub: HubPageConfig = {
  slug: 'resources',
  section: 'Resources',
  basePath: '/resources',
  seoTitle: 'Sayso Resources: Scripts and Guides for Agents',
  seoDescription:
    'Browse Sayso resources: blog articles, objection scripts, and glossary terms to help real estate agents sound better on every call.',
  h1: 'Resources for Real Estate Agents',
  groups: [
    { label: 'Sayso tools', slugs: ['sayso-map', 'sayso-composer', 'prospecting-calculator'] },
    {
      label: 'Learn',
      slugs: ['script-book', 'prospecting', 'coaching-and-training', 'appointments-and-follow-up', 'blog', 'objections', 'glossary', 'help-center'],
    },
    { label: 'About Sayso', slugs: ['why-sayso', 'differences', 'pricing'] },
  ],
  childPages: [
    {
      title: 'Sayso Map',
      slug: 'sayso-map',
      description: 'Type any address to see similar homes for sale nearby and build a Comp Report to text or email.',
      linkText: 'Open Sayso Map',
      href: 'https://map.asksayso.com',
    },
    {
      title: 'Sayso Composer',
      slug: 'sayso-composer',
      description: 'Answer six questions about your lead and get a one-page prospecting script.',
      linkText: 'Build a script',
      href: 'https://composer.asksayso.com',
    },
    {
      title: 'Prospecting Calculator',
      slug: 'prospecting-calculator',
      description: 'Enter your yearly client goal to see the dials, conversations and appointments you need each day.',
      linkText: 'Run the numbers',
      href: '/tools/prospecting-calculator',
    },
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
      title: 'Help Center',
      slug: 'help-center',
      description: 'Setup guides, how-to articles and answers for agents and admins.',
      linkText: 'Visit the Help Center',
      href: '/help',
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
