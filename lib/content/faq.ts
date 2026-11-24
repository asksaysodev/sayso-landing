/**
 * FAQ copy for /faq (every question, grouped), the homepage (a short set) and
 * /pricing (a short pricing set).
 *
 * Answers may contain links written as [text](href). `FaqList` renders them via
 * `faqAnswerParts`; `faqSchemaItems` strips them for structured data.
 */

import { INDIVIDUAL_PRICE } from '@/lib/content/pricing';

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

/** Homepage questions reused word for word elsewhere. */
const shared = {
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

/**
 * /faq: questions the homepage FAQ does not already answer. The homepage keeps
 * dialers, recording, consent, distraction, adoption, pricing and cancelling.
 */
export const FAQ_GROUPS: FaqGroup[] = [
  {
    title: 'About Sayso',
    items: [
      {
        question: 'What does Sayso do, and who is it for?',
        answer:
          'Sayso is [real-time call guidance](/blog/what-is-live-call-guidance/): it shows you what to ask or say next during prospecting and follow-up calls. It’s for individual agents, ISAs and real estate teams.',
      },
      {
        question: 'What problem does Sayso solve?',
        answer:
          'Agents freeze when a call goes off-script. Leaders coach them the next day from a recording, after the appointment is already lost. Sayso coaches during the call.',
      },
      {
        question: 'How does Sayso work?',
        answer:
          'Sayso is a desktop app that listens to your call. As the prospect talks, Cue suggests what to ask or say next in the Coach widget. Type a ZIP code and Pulse shows local market data. When the call ends, Smart Capture writes your notes, ready for your CRM. See [Cue](/help/desktop-app/cue/).',
        image: {
          src: '/full-widget.png',
          alt: 'The Sayso window during a call, with a Cue and Smart Capture notes',
          width: 1778,
          height: 792,
        },
      },
      {
        question: 'How often will Sayso help me?',
        answer:
          'Only while you’re talking with a consumer. Sayso doesn’t get more people to pick up or speed up anything outside the conversation. Most agents dial 10 to 30 numbers before they have a conversation, and Sayso helps in that conversation.',
      },
      {
        question: 'How is Sayso different from call review tools, scripts and AI callers?',
        answer:
          'Call review tools tell you what went wrong after the call. Scripts fall apart when the call goes off track. AI callers replace the agent. Sayso coaches the agent live, based on what the prospect says.',
      },
      {
        question: 'Won’t AI callers replace this?',
        answer:
          'No. They’re different tools with different jobs. An AI caller makes calls instead of an agent; Sayso coaches the agent who’s on the call. When an AI caller hands a conversation to an agent, Sayso coaches that conversation.',
      },
      {
        question: 'Who is behind Sayso?',
        answer:
          'I’m Kuvaal Patel, Director of Agent Development at Anderson Real Estate Group, a 50-agent team. I built Sayso because the coaching I gave after the call didn’t stick during the next one. See [About Sayso](/about/).',
      },
    ],
  },
  {
    title: 'Setup and fit',
    items: [
      {
        question: 'Do I need to be tech-savvy?',
        answer:
          'No. The desktop app installs in under 60 seconds on Mac (macOS 13 or newer) or Windows 10 or 11. You need headphones, and a dialer, Zoom or Google Meet that plays the call through your computer. Interactive onboarding, walkthrough videos, the [help center](/help/) and weekly [office hours](/help/support/office-hours/) cover the rest. See [System requirements](/help/support/system-requirements/).',
      },
      {
        question: 'Does it work on my cell phone?',
        answer:
          'Not yet; a phone app is coming soon. You can take your cell calls on your computer instead with Windows Phone Link or Calls from iPhone on a Mac.',
      },
      {
        question: 'How do I take my cell phone calls on my computer?',
        answer:
          'On Windows, use Phone Link. It connects your Android phone or iPhone over Bluetooth, and you make and answer calls on your PC. On a Mac, turn on Calls from iPhone: use the same Apple Account and Wi-Fi on both devices, then select Calls from iPhone in FaceTime settings. iPhone Mirroring does not carry calls. Either way the call plays on your computer, and Sayso coaches it.',
      },
      {
        question: 'Does it support Spanish?',
        answer: 'Not yet. Spanish is coming soon.',
      },
    ],
  },
  {
    title: 'On the call',
    items: [
      {
        question: 'Is it a script?',
        answer:
          'No. Cue suggests short prompts based on what the prospect just said, not canned replies. Add your own scripts as Playbooks, or use Sayso’s defaults.',
      },
      {
        question: 'Can it coach our method?',
        answer:
          'Yes, with your materials. Upload your scripts, frameworks and objection manuals to Playbooks as PDF, Word or text files. Prompts tuned to your sales methodology are coming, estimated by the end of 2026. See [Upload playbooks](/help/desktop-app/upload-playbooks/).',
      },
      {
        question: 'How does Sayso handle objections?',
        answer:
          'Sayso reads the conversation to find the concern behind the objection, then gives you a short prompt to pivot. You respond in your own words. For sample responses, see the [objection library](/objections/).',
      },
      {
        question: 'Does it know my market?',
        answer:
          'Yes. Type a ZIP code during a call and Pulse shows median price, price per square foot, days on market, new listings and the market trend. Pulse and Sayso Map cover the whole United States. See [Pulse](/help/desktop-app/pulse/).',
      },
    ],
  },
  {
    title: 'Privacy and security',
    items: [
      {
        question: 'How does Sayso handle my data?',
        answer:
          'Our [Security](/security/) page and [Privacy Policy](/privacy/) cover it. For what Sayso saves after a call, see [What’s saved](/help/web-app/what-is-saved/).',
      },
    ],
  },
];

export const FAQ_ITEMS: FaqItem[] = FAQ_GROUPS.flatMap((group) => group.items);

/** Homepage set: the questions people ask right before booking, some merged. */
export const HOME_FAQ_ITEMS: FaqItem[] = [
  shared.dialer,
  {
    question: 'Does it record my calls or my screen?',
    answer:
      'No. The setup permission only lets Sayso hear the call, and we don’t save audio recordings. Transcripts and notes are encrypted, stored in the US, and never used to train outside AI models. You can request a copy or deletion anytime. See more: [Security](/security/) · [Privacy](/privacy/)',
  },
  shared.twoParty,
  {
    question: 'Will it distract me on a live call?',
    answer:
      'No. Cues come in automatically as the prospect talks, so you don’t need to click anything and can stay focused on the conversation. You can minimize or hide Sayso at any point during a call, and agents find [on-screen guidance](/blog/what-is-live-call-guidance/) less stressful than remembering a script.',
  },
  {
    question: 'My agents won’t use another tool. Why is this different?',
    answer:
      'Sayso starts when the call starts, so there’s not much to remember. The company dashboard shows usage agent by agent, so you can see who’s using it.',
  },
  {
    question: 'How do I get started, and what does it cost?',
    answer: `[Get Sayso here](${SIGNUP_HREF}). Early Access Team pricing starts at $369/month based on usage and includes implementation, train-the-trainer, and the company dashboard. Individual agents pay ${INDIVIDUAL_PRICE.annual}/month, billed annually. You can cancel anytime; there are no contracts.`,
  },
];

/**
 * /pricing set: questions people ask next to the price. Every answer restates
 * copy already on the site (/faq, the homepage FAQ and the plan cards).
 */
export const PRICING_FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Can I cancel anytime?',
    answer: 'Yes. You can cancel anytime; there are no contracts.',
  },
  {
    question: 'Is there a contract?',
    answer: 'No. There are no contracts, and you can cancel anytime.',
  },
  {
    question: 'How long does setup take?',
    answer:
      'Most agents are set up in under 5 minutes, and onboarding includes a launch guide, a help center, and a support team. Every plan includes a custom setup and training.',
  },
  {
    question: 'Does it work with my dialer and CRM?',
    answer:
      'Yes. Sayso works alongside your existing browser-based dialer, so you don’t need to change your workflow, and Smart Capture syncs your call notes to your CRM.',
  },
  {
    question: 'How does team pricing work?',
    answer:
      'Teams and Brokerages pricing is custom and based on usage. Early Access Team pricing starts at $369/month and includes implementation, train-the-trainer, and the company dashboard. [Book a demo](/demo/) to get pricing for your team.',
  },
];

const LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g;

/** FAQ items as FAQPage JSON-LD input: answers as plain text, links reduced to their text. */
export function faqSchemaItems(items: FaqItem[]) {
  return items.map((item) => ({ question: item.question, answer: item.answer.replace(LINK_PATTERN, '$1') }));
}

type FaqAnswerPart = { text: string; href?: string };

/** Splits an answer into text and link parts for rendering. */
export function faqAnswerParts(answer: string): FaqAnswerPart[] {
  const parts: FaqAnswerPart[] = [];
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
