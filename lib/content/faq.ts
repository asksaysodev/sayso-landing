/**
 * FAQ copy for /faq (every question, grouped) and the homepage (a short set).
 *
 * Answers may contain links written as [text](href). Use `FaqAnswer` to render
 * them and `faqPlainText` for structured data, which needs plain text.
 */

export interface FaqItem {
  question: string;
  answer: string;
  /** Optional screenshot shown under the answer on /faq. */
  image?: { src: string; alt: string; width: number; height: number };
}

export interface FaqGroup {
  title: string;
  items: FaqItem[];
}

const SIGNUP_HREF = 'https://app.asksayso.com/signup?signup=true';

const q = {
  dialer: {
    question: 'Do I need to change my dialer or CRM?',
    answer: 'No. Sayso works alongside your existing browser-based dialer; you don’t need to change your workflow.',
  },
  twoParty: {
    question: 'Can I use it in a two-party consent state?',
    answer:
      'Yes. You still need to give the notice your state requires, like if you were using call recording or other note-taking apps.',
  },
} satisfies Record<string, FaqItem>;

export const FAQ_GROUPS: FaqGroup[] = [
  {
    title: 'About Sayso',
    items: [
      {
        question: 'What does Sayso do, and who is it for?',
        answer:
          'Sayso is real-time call guidance that helps real estate teams and brokerages with 5 or more agents book more appointments from their outbound prospecting and follow-up calls.',
      },
      {
        question: 'What problem does Sayso solve?',
        answer:
          'Agents freeze when a call goes off-script, and today leaders coach them the next day from a recording, after the appointment is already lost.',
      },
      {
        question: 'How does Sayso work?',
        answer:
          'Sayso works on your computer, next to your dialer, and understands your calls. When the prospect says something, it shows you what to ask next, takes your notes, and pulls up local market data so you can stay focused on the conversation.',
      },
      {
        question: 'What does Sayso look like on a call?',
        answer:
          'Short lines on screen based on what the prospect says, and clean, CRM-ready notes when it ends.',
        image: {
          src: '/full-widget.png',
          alt: 'The Sayso window during a call, with a Cue and Smart Capture notes',
          width: 1778,
          height: 792,
        },
      },
      {
        question: 'How is Sayso different from call review tools, scripts and AI callers?',
        answer:
          'Call review tools tell you what went wrong after the call, scripts fall apart when the call goes off track, and AI callers replace the agent. Sayso guides the agent live, responds to what the prospect says, and keeps your agent on the phone.',
      },
      {
        question: 'Who is behind Sayso?',
        answer:
          'I’m Kuvaal Patel, Director of Agent Development at Anderson Real Estate Group, a 50-agent team, and I built Sayso because the coaching I gave after the call didn’t stick during the next one. Learn more here: [About Sayso](/about/)',
      },
    ],
  },
  {
    title: 'Setup and fit',
    items: [
      q.dialer,
      {
        question: 'Does it work on my cell phone?',
        answer:
          'Not yet. Sayso is built for dial blocks on your laptop or desktop, and a phone app is on our radar. How would you use Sayso from your phone? Let us know at [support@asksayso.com](mailto:support@asksayso.com).',
      },
      {
        question: 'Do agents have to remember to turn it on?',
        answer: 'No. Sayso detects when a call starts.',
      },
      {
        question: 'Does it work for ISAs?',
        answer: 'Yes.',
      },
      {
        question: 'Does it support Spanish?',
        answer: 'Not yet.',
      },
      {
        question: 'Do I need to be tech-savvy?',
        answer:
          'No. Most agents are set up in under 5 minutes, and onboarding includes a launch guide, a help center, and a support team.',
      },
    ],
  },
  {
    title: 'On the call',
    items: [
      {
        question: 'Is it a script?',
        answer:
          'You can upload custom scripts to Sayso or use Sayso’s defaults. The Cues are not canned replies, they are context based prompts.',
      },
      {
        question: 'Does it help with objections?',
        answer: 'Yes. Sayso shows you how to handle and move forward from the objection.',
      },
      {
        question: 'Can it coach our method?',
        answer: 'Load your scripts into Playbook today, and team-specific prompts are coming.',
      },
      {
        question: 'Does it know my market?',
        answer: 'Yes. Pulse shows local prices, days on market, and inventory during the call.',
      },
      {
        question: 'Won’t AI callers replace this?',
        answer: 'AI replaces the agent, and Sayso makes the agent better.',
      },
      {
        question: 'Do I need to click anything to get a cue?',
        answer:
          'No. Cues come in automatically as the prospect talks, so you can stay focused on the conversation.',
      },
      {
        question: 'Will it distract me on a live call?',
        answer:
          'You can minimize or hide Sayso at any point during a call, and agents find on-screen guidance less stressful than remembering a script.',
      },
    ],
  },
  {
    title: 'Privacy and compliance',
    items: [
      {
        question: 'Is my data safe, and who owns it?',
        answer:
          'Sayso never records call audio, and transcripts and notes are encrypted, stored in the US, and never used to train outside AI models. You can request a copy or deletion anytime. See more: [Security](/security/) · [Privacy](/privacy/)',
      },
      {
        question: 'Does it record my calls or my screen?',
        answer: 'No. The setup permission only lets Sayso hear the call, and we don’t save audio recordings.',
      },
      q.twoParty,
    ],
  },
  {
    title: 'Teams and pricing',
    items: [
      {
        question: 'How do I get started, and what does it cost?',
        answer: `[Get Sayso here](${SIGNUP_HREF}). Early Access Team pricing starts at $369/month based on team size and includes implementation, train-the-trainer, and the company dashboard. Individual agents pay $125/month, billed annually.`,
      },
      {
        question: 'Can I see if my agents are using it?',
        answer: 'Yes. The company dashboard shows usage agent by agent.',
      },
      {
        question: 'My agents won’t use another tool. Why is this different?',
        answer: 'Sayso starts when the call starts, so there’s not much to remember.',
      },
      {
        question: 'Can I cancel?',
        answer: 'Yes. You can cancel anytime; there are no contracts.',
      },
    ],
  },
];

export const FAQ_ITEMS: FaqItem[] = FAQ_GROUPS.flatMap((group) => group.items);

/** Homepage set: the questions people ask right before booking, some merged. */
export const HOME_FAQ_ITEMS: FaqItem[] = [
  q.dialer,
  {
    question: 'Does it record my calls or my screen?',
    answer:
      'No. The setup permission only lets Sayso hear the call, and we don’t save audio recordings. Transcripts and notes are encrypted, stored in the US, and never used to train outside AI models. You can request a copy or deletion anytime. See more: [Security](/security/) · [Privacy](/privacy/)',
  },
  q.twoParty,
  {
    question: 'Will it distract me on a live call?',
    answer:
      'No. Cues come in automatically as the prospect talks, so you don’t need to click anything and can stay focused on the conversation. You can minimize or hide Sayso at any point during a call, and agents find on-screen guidance less stressful than remembering a script.',
  },
  {
    question: 'My agents won’t use another tool. Why is this different?',
    answer:
      'Sayso starts when the call starts, so there’s not much to remember. The company dashboard shows usage agent by agent, so you can see who’s using it.',
  },
  {
    question: 'How do I get started, and what does it cost?',
    answer: `[Get Sayso here](${SIGNUP_HREF}). Early Access Team pricing starts at $369/month based on team size and includes implementation, train-the-trainer, and the company dashboard. Individual agents pay $125/month, billed annually. You can cancel anytime; there are no contracts.`,
  },
];

const LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g;

/** Answer text with [text](href) links reduced to their text, for JSON-LD. */
export function faqPlainText(answer: string): string {
  return answer.replace(LINK_PATTERN, '$1');
}

/** Splits an answer into text and link parts for rendering. */
export function faqAnswerParts(answer: string): ({ text: string } | { text: string; href: string })[] {
  const parts: ({ text: string } | { text: string; href: string })[] = [];
  let last = 0;
  for (const match of answer.matchAll(LINK_PATTERN)) {
    const index = match.index ?? 0;
    if (index > last) parts.push({ text: answer.slice(last, index) });
    parts.push({ text: match[1], href: match[2] });
    last = index + match[0].length;
  }
  if (last < answer.length) parts.push({ text: answer.slice(last) });
  return parts;
}
