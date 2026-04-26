import type { ObjectionEntry } from './types';

export const priceTooHigh: ObjectionEntry = {
  slug: 'price-too-high',
  keyword: 'how to handle price objection real estate',
  seoTitle: 'How to Handle Price Objections in Real Estate',
  seoDescription:
    'Learn how to handle price objection real estate calls with 3 proven response scripts. Redirect pricing concerns into booked appointments with confidence.',
  h1: 'How to Handle "The Price Is Too High" in Real Estate',
  objectionQuote: 'The price is too high.',
  openingParagraph:
    'Knowing how to handle a price objection in real estate is one of the most valuable skills an agent can sharpen, because "the price is too high" is rarely about the actual number. It usually signals uncertainty about market conditions, affordability, or the value of working with an agent. Here is how to respond without getting defensive.',
  whyTheyTitle: 'Why Prospects Say "The Price Is Too High"',
  whyTheySayThis:
    'Price objections are usually about more than the number. When a prospect says the price is too high, they are often expressing uncertainty about whether now is the right time to act, whether the market supports the price, or whether they can comfortably afford the next step. The surface objection is about money, but the real concern is usually risk.\n\nSome prospects have done their own research online and are comparing numbers without full context. Others are testing you to see if you will fold or if you actually understand the market. Knowing how to handle the price objection in real estate starts with recognizing that your job is not to defend a number but to understand what is driving their concern and help them see the full picture.',
  responses: {
    safe: {
      label: 'The Safe Response',
      script:
        '"I hear you, and that\'s a fair concern. A lot of people I talk to feel the same way right now. Can I ask, is it the overall price that feels off, or is it more about what the monthly payment would look like?"',
      whyItWorks:
        'This validates the concern without agreeing or disagreeing. By asking whether it is the total price or the monthly payment, you shift the conversation from a vague objection to a specific one you can actually address.',
    },
    stronger: {
      label: 'The Stronger Response',
      script:
        '"Totally fair. When you say the price is too high, what are you comparing it to?"',
      whyItWorks:
        'This forces the prospect to define their objection. Most people have not done a real comparison, and once they admit that, you can introduce market context and reframe the conversation around value.',
    },
    advanced: {
      label: 'The Advanced Response',
      script:
        '"I get it. And honestly, that\'s exactly why it\'s worth sitting down together. Most people are surprised when they see what the market actually looks like right now versus what they expected. What if we took 20 minutes to map out the numbers so you\'re not guessing?"',
      whyItWorks:
        'This reframes the objection as a reason to meet. Instead of arguing about price on the call, you position yourself as the person who brings clarity. The prospect goes from resisting to considering a low-commitment next step.',
    },
  },
  whatToSayNext:
    'After the initial response, keep asking discovery questions about what prompted them to start thinking about buying or selling and what their timeline looks like. The more you understand their motivation, the easier it becomes to show how the price fits into the bigger picture. Agents who handle price objections in real estate well do not argue numbers on the first call. They book the meeting where they can walk through the data together.',
  commonMistakes: [
    'Immediately justifying the price instead of asking what specifically concerns them',
    'Quoting market stats before understanding the prospect\'s actual situation',
    'Getting defensive or taking the objection personally',
    'Dropping the lead because you assume they cannot afford it',
    'Sending listings or CMAs over email instead of booking a conversation',
  ],
  howSaysoHelps:
    'When a prospect pushes back on price, Sayso\'s Pulse feature gives you real-time market data right on your screen so you can speak confidently about current conditions without scrambling for numbers. Cue coaches you through the moment with the right response framework, so you redirect the conversation instead of getting stuck defending a price point.',
  relatedObjections: [
    { title: '"The Market Is Bad"', slug: 'market-is-bad', keyword: 'how to handle market objection real estate' },
    { title: '"How Much Is Your Commission?"', slug: 'how-much-is-your-commission', keyword: 'how to handle commission question real estate' },
    { title: '"I Need to Think About It"', slug: 'need-to-think-about-it', keyword: 'what to say when prospect shuts down' },
    { title: '"Not Ready Yet"', slug: 'not-ready-yet', keyword: 'how to handle "not ready yet" real estate' },
    { title: '"We\'ll Wait for Spring"', slug: 'well-wait-for-spring', keyword: 'how to handle timing objection real estate' },
  ],
  faq: [
    {
      question: 'What does "the price is too high" really mean in real estate?',
      answer:
        'It usually means the prospect is uncertain about market conditions, affordability, or the value of taking action right now. Most of the time, they need more information and context, not a lower price.',
    },
    {
      question: 'How do you respond to a price objection without lowering the price?',
      answer:
        'Ask what specifically concerns them. Is it the total price, the monthly cost, or something they saw online? Once you understand the real concern, you can address it with data and context instead of making concessions.',
    },
    {
      question: 'Should you send market data before or after a price objection comes up?',
      answer:
        'After. Sending data before you understand their situation feels like a lecture. Use the objection as a reason to book a meeting where you can walk through the numbers together.',
    },
    {
      question: 'How can AI help agents handle pricing objections on calls?',
      answer:
        'Tools like Sayso surface real-time market data and coaching prompts while you are on the call, so you can respond to pricing concerns with confidence instead of scrambling for numbers or freezing up.',
    },
  ],
  relatedBlogPost: {
    title: 'Real Estate Cold Call Scripts: The Complete Guide',
    href: '/blog/real-estate-cold-calling-guide',
  },
  relatedFeature: {
    title: 'Real-Time Market Data',
    href: '/products/pulse',
  },
};
