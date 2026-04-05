import type { HubPageConfig } from './types';
import { registerHub } from './index';

const caseStudiesHub: HubPageConfig = {
  slug: 'case-studies',
  section: 'Case Studies',
  basePath: '/case-studies',
  seoTitle: 'Sayso Case Studies: Real Results from Real Teams',
  seoDescription:
    'See how real estate teams use Sayso to handle more objections, book more appointments, and close more deals with real-time call coaching.',
  h1: 'Real Results from Real Teams',
  introduction:
    'See how real estate teams and agents use Sayso to book more appointments, handle objections confidently, and stop losing deals on the phone.',
  childPages: [
    {
      title: 'Example Real Estate Team',
      slug: 'example-team',
      description: 'A 6-agent team booked 40% more appointments in 30 days with real-time coaching.',
      linkText: 'Read the full story',
    },
  ],
  noKeyword: true,
};

registerHub(caseStudiesHub);

export { caseStudiesHub };
