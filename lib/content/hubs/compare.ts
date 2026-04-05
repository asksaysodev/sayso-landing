import type { HubPageConfig } from './types';
import { registerHub } from './index';

const compareHub: HubPageConfig = {
  slug: 'compare',
  section: 'Compare',
  basePath: '/compare',
  seoTitle: 'Compare Sayso: How We Stack Up',
  seoDescription:
    'See how Sayso compares to other real estate call coaching tools. Honest feature comparisons, pricing breakdowns, and use case analysis.',
  h1: 'How Sayso Compares',
  introduction:
    'Honest, side-by-side comparisons of Sayso and other call coaching tools. We break down features, pricing, and use cases so you can make the right choice for your team.',
  childPages: [
    {
      title: 'Sayso vs Shilo',
      slug: 'sayso-vs-shilo',
      description: 'Real-time coaching vs post-call analysis, which approach fits your workflow?',
      keyword: 'shilo alternative',
      linkText: 'Compare Sayso and Shilo',
    },
    {
      title: 'Sayso vs MaverickRE',
      slug: 'sayso-vs-maverickre',
      description: 'Feature-by-feature comparison for real estate call coaching.',
      keyword: 'maverickre alternative',
      linkText: 'See how Sayso stacks up against MaverickRE',
    },
    {
      title: 'Sayso vs Manual Coaching',
      slug: 'sayso-vs-manual-coaching',
      description: 'When does Sayso make more sense than a traditional coaching program?',
      keyword: 'real estate coaching AI vs manual',
      linkText: 'Sayso vs manual coaching, which is better?',
    },
  ],
  noKeyword: true,
};

registerHub(compareHub);

export { compareHub };
