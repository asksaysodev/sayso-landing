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
          'Sayso is [real-time call guidance](/blog/what-is-live-call-guidance/) for individual real estate agents, ISAs and real estate teams. It listens to your prospecting and follow-up calls and shows you what to ask or say next while the conversation is happening, so more of your conversations end in a booked appointment.',
      },
      {
        question: 'What problem does Sayso solve?',
        answer:
          'Agents freeze when a call goes off-script, and today leaders coach them the next day from a recording, after the appointment is already lost. Sayso brings that coaching into the call itself, at the moment the agent needs it.',
      },
      {
        question: 'How does Sayso work?',
        answer:
          'Sayso runs on your computer, next to your dialer, and understands your calls as they happen. When the prospect says something, it shows short Cues on screen with what to ask next and pulls up local market data. When the call ends, it writes clean, CRM-ready notes.',
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
          'Every time you are talking with a consumer, and only then. Sayso does not get more people to pick up and does not speed up anything outside the conversation. Most agents dial 10 to 30 numbers before they have a conversation, and that one conversation is where Sayso helps you.',
      },
      {
        question: 'How is Sayso different from call review tools, scripts and AI callers?',
        answer:
          'Call review tools tell you what went wrong after the call, scripts fall apart when the call goes off track, and AI callers replace the agent. Sayso guides the agent live, responds to what the prospect says, and keeps your agent on the phone.',
      },
      {
        question: 'Won’t AI callers replace this?',
        answer:
          'No. AI callers won’t replace Sayso because they are a different tool with a different job. An AI caller places calls instead of an agent. Sayso works for the agent who is on the call, helping them in the live conversation. If your team uses an AI caller, every conversation it hands to an agent is still one where Sayso helps.',
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
      {
        question: 'Do I need to be tech-savvy?',
        answer:
          'No. Sayso is a desktop app for Mac and Windows that installs and launches in under 60 seconds. Interactive onboarding and walkthrough videos get you started, and the [help center](/help/) and weekly office hours are there when you have questions. It works with any conversation your computer hears: Zoom, Google Meet, or any dialer that places calls through your browser or computer.',
      },
      {
        question: 'Does it work on my cell phone?',
        answer:
          'Not as a phone app yet; that is coming soon. Today Sayso works on calls your computer hears, and you can take your cell phone calls on your computer (see the next question). How would you use Sayso from your phone? Let us know at [support@asksayso.com](mailto:support@asksayso.com).',
      },
      {
        question: 'How do I take my cell phone calls on my computer?',
        answer:
          'On Windows, the Phone Link app connects your Android phone or iPhone over Bluetooth, so you can make and answer cell calls from your PC. On a Mac, turn on Calls from iPhone: sign in to the same Apple Account on both devices, connect them to the same Wi-Fi, and select Calls from iPhone in FaceTime settings. Calls then go through FaceTime or the Phone app on your Mac. iPhone Mirroring does not carry phone calls, so use Calls from iPhone instead. Either way the call audio is on your computer, which is where Sayso listens.',
      },
      {
        question: 'Does it support Spanish?',
        answer: 'Not yet. Spanish support is coming soon.',
      },
    ],
  },
  {
    title: 'On the call',
    items: [
      {
        question: 'Is it a script?',
        answer:
          'No. Cues are short prompts based on what the prospect just said, not canned replies. You can upload your own scripts to Playbook or use Sayso’s defaults.',
      },
      {
        question: 'Can it coach our method?',
        answer:
          'Yes, starting with your materials. Teams can load any scripts, frameworks and in-house objection handling manuals into Playbook today. Customizing the prompts to your own sales methodology is coming soon, estimated by the end of 2026.',
      },
      {
        question: 'How does Sayso handle objections?',
        answer:
          'Sayso uses the context of the conversation to find the concern behind the objection, then shows a short directional prompt to help you pivot. You still handle the objection your way, in your own words; Sayso points you in the right direction. For example responses to common objections, see the [objection library](/objections/).',
      },
      {
        question: 'Does it know my market?',
        answer:
          'Yes. Pulse shows local prices, days on market and inventory during the call, and its data, like Sayso Map’s, covers the whole United States.',
      },
    ],
  },
  {
    title: 'Privacy and security',
    items: [
      {
        question: 'How does Sayso handle my data?',
        answer: 'Our policies cover how call data is handled, stored and deleted: [Security](/security/) · [Privacy Policy](/privacy/)',
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
