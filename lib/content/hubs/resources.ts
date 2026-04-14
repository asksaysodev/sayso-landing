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
    'Scripts, strategies, and insights to help you sound better on every call. Browse our library of resources built for real estate professionals.',
  childPages: [
    {
      title: 'Blog',
      slug: 'blog',
      description:
        'Tips, strategies, and insights on cold calling, prospecting, and closing more deals.',
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
  ],
  noKeyword: true,
};

registerHub(resourcesHub);

export { resourcesHub };
