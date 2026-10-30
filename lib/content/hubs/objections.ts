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
    'Practical response scripts for common objections real estate agents hear on prospecting calls. Each page explains what the concern may mean, how to respond without arguing, and which follow-up question can keep the conversation useful.',
  quickAnswers: {
    heading: 'Common Real Estate Objections and a One-Line Answer to Each',
    intro:
      'Each line below is the short version of the response on that objection\'s page. Open a page for the full scripts, the reasoning behind them, and what to say next.',
    items: [
      {
        slug: 'not-ready-yet',
        phrase: '"I\'m not ready yet."',
        answer: 'Agree without pushing, then ask whether they mean not ready this month or not ready this year.',
      },
      {
        slug: 'already-have-an-agent',
        phrase: '"I already have an agent."',
        answer: 'Respect it, then ask whether they have signed an agreement and how the experience has been so far.',
      },
      {
        slug: 'just-looking',
        phrase: '"I\'m just looking."',
        answer: 'Ask what caught their eye, which turns browsing into a conversation about their timing and needs.',
      },
      {
        slug: 'call-me-later',
        phrase: '"Can you call me later?"',
        answer: 'Offer to be quick, or agree on a specific time and set a reminder to call then.',
      },
      {
        slug: 'price-too-high',
        phrase: '"The price is too high."',
        answer: 'Ask what they are comparing it to before you defend anything.',
      },
      {
        slug: 'want-to-sell-ourselves',
        phrase: '"We want to sell it ourselves."',
        answer: 'Say you are not calling to change their mind, then ask how it has been going so far.',
      },
      {
        slug: 'need-to-think-about-it',
        phrase: '"I need to think about it."',
        answer: 'Ask whether it is about timing or about making sure it is the right move.',
      },
      {
        slug: 'not-interested',
        phrase: '"I\'m not interested."',
        answer: 'Accept it, then ask whether anything in their situation has them considering a change.',
      },
      {
        slug: 'bad-experience-with-agents',
        phrase: '"I had a bad experience with an agent."',
        answer: 'Thank them for telling you and ask what happened before you say anything about yourself.',
      },
      {
        slug: 'market-is-bad',
        phrase: '"The market is bad right now."',
        answer: 'Ask what specifically concerns them: prices, rates, or the general uncertainty.',
      },
      {
        slug: 'just-send-listings',
        phrase: '"Just send me some listings."',
        answer: 'Agree, then ask what is behind the move so what you send is relevant.',
      },
      {
        slug: 'how-much-is-your-commission',
        phrase: '"How much is your commission?"',
        answer: 'Call it a fair question, promise to walk through it, and first ask what matters most to them in an agent.',
      },
      {
        slug: 'well-wait-for-spring',
        phrase: '"We\'ll wait for spring."',
        answer: 'Ask whether spring is when they want to move or when they want to start exploring options.',
      },
      {
        slug: 'my-spouse-needs-to-decide',
        phrase: '"My spouse needs to decide."',
        answer: 'Agree it should be a joint decision and offer a short summary they can share at home.',
      },
    ],
  },
  relatedReading: {
    heading: 'Go Deeper on Objection Handling',
    paragraphs: [
      'For the framework behind all of these responses, read our [real estate objection handling guide](/blog/real-estate-objection-handling/), which walks through a response for each common pushback. When the pushback comes up during a conversation about price, terms, or commission, see our [real estate negotiation scripts](/blog/real-estate-negotiation-scripts/).',
    ],
  },
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
      description: 'Scripts for handling the commission question without losing the prospect.',
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
        '"Not ready yet," "already have an agent," "not interested," and "call me later" come up constantly on prospecting calls. The list at the top of this page covers 14 common objections with a one-line answer to each.',
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
