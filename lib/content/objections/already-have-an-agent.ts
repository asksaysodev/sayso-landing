import type { ObjectionEntry } from './types';

export const alreadyHaveAnAgent: ObjectionEntry = {
  slug: 'already-have-an-agent',
  keyword: 'how to handle "already working with agent"',
  seoTitle: 'How to Handle "Already Working with Agent"',
  seoDescription:
    'Learn how to handle "already working with agent" in real estate with 3 proven response scripts. Find out if prospects are committed and book more appointments.',
  h1: 'How to Handle "Already Working with Agent" in Real Estate',
  objectionQuote: 'I already have an agent.',
  openingParagraph:
    'Knowing how to handle "already working with agent" in real estate starts with one question: did they actually sign an agreement? Most of the time, they have not. Here is how to find out and keep the conversation moving toward an appointment.',
  whyTheyTitle: 'Why Prospects Say "I Already Have an Agent"',
  whyTheySayThis:
    'Most of the time, "I already have an agent" is not a firm commitment. It could mean they met someone at an open house, got a referral from a friend, or had one conversation weeks ago and assumed that counted. Many prospects genuinely believe they are "with" an agent after a single interaction.\n\nSometimes the relationship is real and they are under a signed agreement. Other times, it is a reflex to end the conversation. Knowing how to handle "already working with agent" situations means learning to tell the difference, and one direct question is all it takes.',
  responses: {
    safe: {
      label: 'The Safe Response',
      script:
        '"That\'s great, I always respect that. Quick question, have you signed any type of agreement with them?"',
      whyItWorks:
        'This validates their relationship and avoids confrontation. The agreement question is a low-pressure way to find out whether their commitment is real or assumed.',
    },
    stronger: {
      label: 'The Stronger Response',
      script:
        '"Got it. And how\'s that been going so far? Are they keeping you in the loop, or has it been kind of quiet?"',
      whyItWorks:
        'This shifts the focus from loyalty to satisfaction. If the experience has been mediocre, the prospect will tell you, and that opens the door to offer something better.',
    },
    advanced: {
      label: 'The Advanced Response',
      script:
        '"I respect that. Most people I talk to think they\'re committed when they haven\'t actually signed anything. If you are locked in, no worries at all. But if not, it\'s worth ten minutes to compare what you\'re getting."',
      whyItWorks:
        'This normalizes the gap between perceived and actual commitment. You position yourself as a comparison, not a replacement, which lowers defensiveness.',
    },
  },
  whatToSayNext:
    'If they confirm there is no agreement, treat it like a fresh conversation. Ask what they are looking for and what their timeline looks like. If they are under contract, respect it and ask if you can follow up when it expires. Log the details so you have context when you call back. Agents who handle "already working with agent" objections this way stay top of mind for when the current relationship fades.',
  commonMistakes: [
    'Arguing or badmouthing the other agent, which destroys trust immediately',
    'Hanging up without asking whether they actually signed an agreement',
    'Assuming the objection is real when it is often a polite brush-off',
    'Launching into your value pitch before understanding their current situation',
    'Failing to follow up later when the other relationship ends',
  ],
  howSaysoHelps:
    'Sayso detects when a prospect mentions another agent and instantly displays the agreement question on your screen, so you never freeze or skip the most important follow-up. After the call, Sayso logs the details and the prospect\'s commitment status to your CRM automatically, making it easy to time your next outreach perfectly.',
  relatedObjections: [
    { title: '"Not Ready Yet"', slug: 'not-ready-yet', keyword: 'how to handle "not ready yet" real estate' },
    { title: '"Just Looking"', slug: 'just-looking', keyword: 'how to respond to "just looking" real estate' },
    { title: '"Not Interested"', slug: 'not-interested', keyword: 'what to say when lead is not interested' },
    { title: '"Bad Experience with Agents"', slug: 'bad-experience-with-agents', keyword: 'how to handle bad agent experience objection' },
  ],
  faq: [
    {
      question: 'What does "I already have an agent" really mean in real estate?',
      answer:
        'It usually means the prospect had a casual interaction with another agent and assumes they are committed. In most cases, there is no signed agreement. Asking about the agreement reveals whether the commitment is real or assumed.',
    },
    {
      question: 'How do you tell if a prospect is actually committed to another agent?',
      answer:
        'Ask directly: "Have you signed any type of agreement with them?" If yes, respect the relationship and offer to follow up when it expires. If no, you have an opening to share your approach.',
    },
    {
      question: 'Should you compete with another real estate agent for a prospect?',
      answer:
        'Never badmouth another agent. Instead, focus on what you bring to the table. If the prospect has no formal agreement, a brief comparison of your approach is fair and expected.',
    },
    {
      question: 'How can AI help when a prospect says they have an agent?',
      answer:
        'Tools like Sayso coach you in real time during the call, prompting the right questions the moment you hear this objection. You get the exact script on screen so you can respond confidently without memorizing every scenario.',
    },
  ],
  relatedBlogPost: {
    title: 'Real Estate Cold Call Scripts: The Complete Guide',
    href: '/blog/real-estate-cold-calling-guide',
  },
  relatedFeature: {
    title: 'Real-Time Coaching',
    href: '/features/cue',
  },
};
