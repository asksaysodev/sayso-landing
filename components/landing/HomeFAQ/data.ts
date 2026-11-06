/**
 * Homepage FAQ, grouped. The same list feeds the visible FAQ and the FAQPage
 * structured data in app/page.tsx, so they always match.
 */

export interface FaqGroup {
  title: string;
  items: { question: string; answer: string }[];
}

export const FAQ_GROUPS: FaqGroup[] = [
  {
    title: 'THE PRODUCT',
    items: [
      {
        question: 'How is Sayso different from other coaching tools?',
        answer:
          'Sayso guides you during the call, not after it. Most tools analyze recordings once the conversation ends. Sayso gives you cues while the prospect is on the phone.',
      },
      {
        question: 'Do I need to click anything to get a cue?',
        answer:
          'No. Cues come in on their own as the prospect talks. You stay focused on the conversation and glance over when you want.',
      },
      {
        question: 'Do I need to change my dialer or CRM?',
        answer:
          'No. Sayso works alongside your existing browser-based dialer.',
      },
      {
        question: 'Will it distract me on a live call?',
        answer:
          'You can minimize or hide Sayso at any point during a call. Agents find that having guidance visible is less stressful than trying to remember scripts on the fly.',
      },
    ],
  },
  {
    title: 'PRIVACY',
    items: [
      {
        question: 'Does Sayso record my calls?',
        answer:
          'Sayso uses the conversation transcript in real time. It does not record call audio.',
      },
    ],
  },
  {
    title: 'GETTING STARTED',
    items: [
      {
        question: 'How fast can I get started?',
        answer:
          'Many agents are set up in less than 5 minutes, with an interactive launch guide, a self-service help center and a responsive support team.',
      },
      {
        question: 'How does pricing work for teams?',
        answer:
          'Teams and brokerages get custom pricing based on team size, with implementation, train-the-trainer and a leadership dashboard included.',
      },
    ],
  },
];

export const FAQ_ITEMS = FAQ_GROUPS.flatMap((group) => group.items);
