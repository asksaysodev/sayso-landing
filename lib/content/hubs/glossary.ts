import type { HubPageConfig } from './types';
import { registerHub } from './index';

const glossaryHub: HubPageConfig = {
  slug: 'glossary',
  section: 'Glossary',
  basePath: '/glossary',
  seoTitle: 'Real Estate Glossary: Key Terms Explained',
  seoDescription:
    'Clear definitions of real estate prospecting terms, including circle prospecting, ISA, FSBO, expired listings, and more. Written for agents, not textbooks.',
  h1: 'Real Estate Glossary',
  introduction:
    'Clear, practical definitions of the terms real estate agents actually use every day. When you are on the phone with a prospect, it is important that you do not use industry jargon.',
  childPages: [
    {
      title: 'Circle Prospecting',
      slug: 'circle-prospecting',
      description: 'Calling homeowners in a specific area to generate new leads.',
      keyword: 'what is circle prospecting',
      linkText: 'What is circle prospecting?',
    },
    {
      title: 'ISA (Inside Sales Agent)',
      slug: 'isa-real-estate',
      description: 'A dedicated team member who handles inbound and outbound lead calls. An ISA\'s goal is to book appointments for agents.',
      keyword: 'what does ISA mean in real estate',
      linkText: 'Learn what ISA means in real estate',
    },
    {
      title: 'Listing Appointment',
      slug: 'listing-appointment',
      description: 'The meeting where an agent pitches to represent a seller.',
      keyword: 'what is a listing appointment',
      linkText: 'Understanding listing appointments',
    },
    {
      title: 'Expired Listing',
      slug: 'expired-listing',
      description: 'A property whose listing agreement ended without a sale.',
      keyword: 'what is an expired listing real estate',
      linkText: 'Expired listings explained',
    },
    {
      title: 'FSBO',
      slug: 'fsbo',
      description: 'For Sale By Owner, a homeowner selling without an agent.',
      keyword: 'what does FSBO mean',
      linkText: 'What does FSBO mean?',
    },
    {
      title: 'Cold Calling',
      slug: 'cold-calling-real-estate',
      description: 'Calling prospects you have no prior relationship with to generate new business.',
      keyword: 'what is cold calling in real estate',
      linkText: 'Get the cold calling definition',
    },
    {
      title: 'Lead Nurturing',
      slug: 'lead-nurturing',
      description: 'The process of building relationships with leads who are not ready to act yet.',
      keyword: 'what is lead nurturing real estate',
      linkText: 'How lead nurturing works',
    },
    {
      title: 'Sphere of Influence',
      slug: 'sphere-of-influence',
      description: 'Your personal network of people who know, like, and trust you.',
      keyword: 'what is sphere of influence real estate',
      linkText: 'Sphere of influence explained',
    },
    {
      title: 'Door Knocking',
      slug: 'door-knocking',
      description: 'Going door-to-door in a neighborhood to meet homeowners face to face.',
      keyword: 'what is door knocking real estate',
      linkText: 'What is door knocking?',
    },
    {
      title: 'Drip Campaign',
      slug: 'drip-campaign',
      description: 'An automated sequence of emails or texts sent to leads over time.',
      keyword: 'what is a drip campaign real estate',
      linkText: 'Drip campaigns for real estate',
    },
  ],
  noKeyword: true,
};

registerHub(glossaryHub);

export { glossaryHub };
