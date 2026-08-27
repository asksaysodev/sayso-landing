import type { HubPageConfig } from './types';
import { registerHub } from './index';

const resourcesHub: HubPageConfig = {
  slug: 'resources',
  section: 'Resources',
  basePath: '/resources',
  seoTitle: 'Sayso Resources: Guides, Scripts & Insights for Real Estate Agents',
  seoDescription:
    'Browse Sayso resources: blog articles, objection scripts, and glossary terms to help real estate agents sound better on every call.',
  h1: 'Resources for Real Estate Agents',
  introduction:
    'Scripts, strategies, and insights to help you sound better on every call, plus everything you need to understand how Sayso works and what it costs.',
  childPages: [
    {
      title: 'Blog',
      slug: 'blog',
      description:
        'Tips, strategies, and insights on prospecting, handling objections, and booking more appointments.',
      linkText: 'Read the blog',
      href: '/blog',
    },
    {
      title: 'Objection Library',
      slug: 'objections',
      description:
        'Proven scripts for the most common objections you hear on prospecting calls.',
      linkText: 'Browse objection scripts',
      href: '/objections',
    },
    {
      title: 'Glossary',
      slug: 'glossary',
      description:
        'Key terms and definitions every real estate agent should know.',
      linkText: 'Explore the glossary',
      href: '/glossary',
    },
    {
      title: 'Why Sayso',
      slug: 'why-sayso',
      description:
        'What sets Sayso apart from generic sales tools, and why it was built specifically for the calls real estate agents make every day.',
      linkText: 'See why agents choose Sayso',
      href: '/why-sayso',
    },
    {
      title: 'How Sayso Compares',
      slug: 'differences',
      description:
        'A side by side look at how Sayso stacks up against other coaching tools and general purpose AI assistants.',
      linkText: 'Compare Sayso to the alternatives',
      href: '/differences',
    },
    {
      title: 'Pricing',
      slug: 'pricing',
      description:
        'Plans for individual agents and teams, with a full breakdown of what is included at each tier.',
      linkText: 'View plans and pricing',
      href: '/pricing',
    },
  ],
  noKeyword: true,
};

registerHub(resourcesHub);

export { resourcesHub };
