import type { ObjectionEntry } from './types';

export const needToThinkAboutIt: ObjectionEntry = {
  slug: 'need-to-think-about-it',
  updatedAt: '2026-11-26',
  keyword: 'what to say when prospect shuts down',
  seoTitle: '"I Need to Think About It": 3 Scripts to Respond',
  seoDescription:
    'Three short scripts to say when a prospect shuts down with "I need to think about it" on a call, plus what the stall usually means and how to set the next step.',
  h1: '"I Need to Think About It": 3 Scripts to Respond',
  objectionQuote: 'I need to think about it.',
  openingParagraph:
    'This is a script card for the moment a prospect shuts down mid-call. Keep it open while you dial. Each script below is a few lines you can say word for word, and each one ends with a question so the prospect keeps talking instead of hanging up.',
  whyTheyTitle: 'What It Usually Means',
  whyTheySayThis:
    'Most of the time, "I need to think about it" is a way to step back from a commitment that feels big, not a plan to go away and weigh your offer. There is usually one unspoken concern behind it, such as timing, money, a partner who is not on the call, or doubt about whether you are the right agent.\n\nYour goal on the call is narrow: get the prospect to name that one concern out loud. Once it has a name, you can answer it or book a time to talk it through.',
  responses: {
    safe: {
      label: 'Script 1: Name the Concern',
      script:
        '"That makes sense, it\'s a big step. Help me understand where your head is at. Is it more the timing, or more about being sure this is the right move for you?"',
      whyItWorks:
        'Two simple choices are easier to answer than an open question. The prospect picks one, and now you know which conversation to have next.',
    },
    stronger: {
      label: 'Script 2: Ask for the One Thing',
      script:
        '"Fair enough. When people tell me that, there\'s usually one piece they\'re stuck on. What\'s that piece for you?"',
      whyItWorks:
        'It tells the prospect that hesitating is normal, then asks for one specific thing. A single item feels small enough to say out loud.',
    },
    advanced: {
      label: 'Script 3: Think It Through Together',
      script:
        '"Of course. Since we\'re both on the line right now, let\'s think it through together, and I can answer anything that comes up. Which part feels least clear to you?"',
      whyItWorks:
        'It turns thinking it over from something they do alone, after the call, into something you do with them while you can still help.',
    },
  },
  whatToSayNext:
    'If they name the concern, answer it in a sentence or two and ask for the appointment again. If they still want time, pick the next call before you hang up: "Let\'s set a time to pick this back up. Is Thursday at 2 or Friday morning better for you?" A set day and time keeps the lead warm.',
  commonMistakes: [
    'Saying "no problem, take your time" and ending the call with nothing on the calendar',
    'Answering the stall with a longer pitch instead of a question',
    'Asking two questions in a row, which gives the prospect an easy way to dodge both',
  ],
  howSaysoHelps:
    'Sayso listens to your live calls and puts a question like these on your screen the moment a prospect stalls, so you ask instead of retreating. After the call, it logs what came up so your next touch picks up where the conversation left off.',
  relatedObjections: [
    { title: '"Not Ready Yet"', slug: 'not-ready-yet', keyword: 'how to handle "not ready yet" real estate' },
    { title: '"Not Interested"', slug: 'not-interested', keyword: 'what to say when lead is not interested' },
    { title: '"Call Me Later"', slug: 'call-me-later', keyword: 'real estate script for "call me later"' },
    { title: '"My Spouse Needs to Decide"', slug: 'my-spouse-needs-to-decide', keyword: 'how to handle third-party objection real estate' },
  ],
  faq: [
    {
      question: 'Which of the three scripts should I start with?',
      answer:
        'Start with Script 1 on most calls, since the two choices make it the easiest to answer. Use Script 2 if the prospect has been chatty and open, and Script 3 when they seem close to yes but nervous about deciding on the spot.',
    },
    {
      question: 'Do these scripts work with both buyers and sellers?',
      answer:
        'Yes. None of the lines assume which side of the move the prospect is on, so you can use them word for word with buyers, sellers, or someone who has not decided yet.',
    },
  ],
  relatedBlogPost: {
    title: 'The full guide to handling "I need to think about it"',
    href: '/blog/think-about-it-objection',
  },
  relatedFeature: {
    title: 'Real-Time Guidance',
    href: '/products/cue',
  },
};
