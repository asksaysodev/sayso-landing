import type { HubPageConfig } from './types';
import { registerHub } from './index';

const objectionsHub: HubPageConfig = {
  slug: 'objections',
  section: 'Objections',
  basePath: '/objections',
  seoTitle: 'Real Estate Objection Handling Scripts & Examples',
  seoDescription:
    'Scripts and response frameworks for every common real estate objection, "not ready yet," "already have an agent," "call me later," and more.',
  h1: 'Real Estate Objection Library',
  introduction:
    'Every common objection real estate agents hear on prospecting calls, with proven response scripts you can use today. Each page breaks down why prospects say it, how to respond at three confidence levels, and what to say next with confidence.',
  childPages: [
    {
      title: '"I\'m Not Ready Yet"',
      slug: 'not-ready-yet',
      description: 'How to keep the conversation going when a prospect says they are not ready to act.',
      keyword: 'how to handle "not ready yet" real estate',
      linkText: 'Handle the "not ready yet" objection',
    },
    {
      title: '"Already Working with an Agent"',
      slug: 'already-have-an-agent',
      description: 'What to say when a prospect tells you they already have representation.',
      keyword: 'how to handle "already working with agent"',
      linkText: 'What to say when they have an agent',
    },
    {
      title: '"Just Looking"',
      slug: 'just-looking',
      description: 'How to redirect a casual browser into a real conversation.',
      keyword: 'how to respond to "just looking" real estate',
      linkText: 'Respond to "just looking"',
    },
    {
      title: '"Call Me Later"',
      slug: 'call-me-later',
      description: 'Scripts for when a prospect tries to end the call with a vague follow-up.',
      keyword: 'real estate script for "call me later"',
      linkText: 'Get the "call me later" script',
    },
    {
      title: '"The Price Is Too High"',
      slug: 'price-too-high',
      description: 'How to handle pricing objections without getting defensive.',
      keyword: 'how to handle price objection real estate',
      linkText: 'Handle price objections confidently',
    },
    {
      title: '"We Want to Sell Ourselves"',
      slug: 'want-to-sell-ourselves',
      description: 'Response frameworks for FSBO-minded homeowners.',
      keyword: 'FSBO objection handling',
      linkText: 'FSBO objection scripts',
    },
    {
      title: '"I Need to Think About It"',
      slug: 'need-to-think-about-it',
      description: 'What to say when a prospect shuts down the conversation.',
      keyword: 'what to say when prospect shuts down',
      linkText: 'When a prospect needs to "think about it"',
    },
    {
      title: '"Not Interested"',
      slug: 'not-interested',
      description: 'How to distinguish between a real no and a reflexive brush-off.',
      keyword: 'what to say when lead is not interested',
      linkText: 'Overcome "not interested"',
    },
    {
      title: '"Already Listed"',
      slug: 'already-listed',
      description: 'Scripts for when a homeowner tells you their property is already on the market.',
      keyword: 'how to handle already listed objection',
      linkText: 'Handle the "already listed" pushback',
    },
    {
      title: '"Bad Experience with Agents"',
      slug: 'bad-experience-with-agents',
      description: 'How to rebuild trust with a prospect burned by a previous agent.',
      keyword: 'how to handle bad agent experience objection',
      linkText: 'Rebuild trust after a bad experience',
    },
    {
      title: '"The Market Is Bad"',
      slug: 'market-is-bad',
      description: 'How to reframe market concerns into motivation.',
      keyword: 'how to handle market objection real estate',
      linkText: 'Reframe the market objection',
    },
    {
      title: '"Just Send Me Listings"',
      slug: 'just-send-listings',
      description: 'How to redirect a passive request into an active conversation.',
      keyword: 'how to redirect a conversation real estate',
      linkText: 'Turn "send listings" into a conversation',
    },
    {
      title: '"How Much Is Your Commission?"',
      slug: 'how-much-is-your-commission',
      description: 'Scripts for handling the commission question without losing the deal.',
      keyword: 'how to handle commission question real estate',
      linkText: 'Navigate the commission question',
    },
    {
      title: '"We\'ll Wait for Spring"',
      slug: 'well-wait-for-spring',
      description: 'How to handle timing objections tied to market seasonality.',
      keyword: 'how to handle timing objection real estate',
      linkText: 'Handle timing objections',
    },
    {
      title: '"My Spouse Needs to Decide"',
      slug: 'my-spouse-needs-to-decide',
      description: 'What to say when the decision maker is not on the call.',
      keyword: 'how to handle third-party objection real estate',
      linkText: 'Handle the third-party objection',
    },
  ],
  howSaysoHelps:
    'Sayso coaches you through these objections in real time, the moment a prospect pushes back, the right response appears on your screen. No memorization required. You sound like you have been doing this for years, even if you\'re new on the phone.',
  faq: [
    {
      question: 'What are the most common real estate objections?',
      answer:
        '"Not ready yet," "already have an agent," "not interested," and "call me later" are the four most frequent objections agents hear on prospecting calls.',
    },
    {
      question: 'How do you handle objections in real estate?',
      answer:
        'The best approach is to validate the prospect\'s position first, then ask a follow-up question that reopens the conversation. Never argue or get defensive.',
    },
  ],
};

registerHub(objectionsHub);

export { objectionsHub };
