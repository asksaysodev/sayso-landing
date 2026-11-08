import type { HubPageConfig } from './types';
import { registerHub } from './index';

const caseStudiesHub: HubPageConfig = {
  slug: 'case-studies',
  section: 'Case Studies',
  basePath: '/case-studies',
  seoTitle: 'Sayso Case Studies: Real Estate Teams Using Sayso',
  seoDescription:
    'Case studies from real estate teams using Sayso for real-time call coaching, with the period behind every number labeled.',
  h1: 'Sayso Case Studies',
  introduction:
    'How real estate teams use Sayso on their calls, told with their own numbers and the time period each number covers.',
  childPages: [
    {
      title: 'Anderson Real Estate Group',
      slug: 'anderson-real-estate-group',
      eyebrow: '50-agent mega team',
      description:
        '1,928 appointments from January to mid-August 2026, 337 more than in all of 2025, with agents using Sayso on their calls.',
      linkText: 'Read the AREG case study',
    },
  ],
  noKeyword: true,
};

registerHub(caseStudiesHub);

export { caseStudiesHub };
