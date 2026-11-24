import type { TopicHubId } from './topic-hubs';

/** Copy for the topic hub pages under /resources/<slug>/. */
export interface TopicHubPage {
  id: TopicHubId;
  slug: string;
  section: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  /** Intro paragraphs. Support [text](/url/) inline markdown. */
  intro: string[];
  /** Heading above the list of guides. */
  listHeading: string;
  /** Where to go next. Supports [text](/url/) inline markdown. */
  related: string;
  updatedAt: string;
}

export const TOPIC_HUB_PAGES: TopicHubPage[] = [
  {
    id: 'prospecting',
    slug: 'prospecting',
    section: 'Prospecting',
    seoTitle: 'Real Estate Prospecting Resources for Agents',
    seoDescription:
      'Every Sayso guide to real estate prospecting and cold calling in one place: lead sources, list building, calling rules, call reluctance and outsourcing.',
    h1: 'Real Estate Prospecting and Cold Calling Resources',
    intro: [
      'Prospecting is the work of starting conversations with people who have not reached out to you yet: expired listings, FSBO owners, neighbors of a recent sale, absentee owners and past contacts. This page collects every guide on the blog about finding those prospects, calling them within the rules, and keeping the habit going when the calls get hard.',
      'If you are new to calling, start with the [real estate cold calling guide](/blog/real-estate-cold-calling-guide/). For word-for-word scripts by lead source, use the [real estate script library](/resources/script-book/).',
    ],
    listHeading: 'Guides on prospecting and cold calling',
    related:
      'When prospects push back, the [objection library](/objections/) has a response for each common objection. Once a call turns into interest, the [appointment setting and follow-up resources](/resources/appointments-and-follow-up/) cover booking the meeting and staying in touch.',
    updatedAt: '2026-11-24',
  },
  {
    id: 'coaching',
    slug: 'coaching-and-training',
    section: 'Coaching and Training',
    seoTitle: 'Real Estate Call Training and Coaching Resources',
    seoDescription:
      'Guides on getting better on calls: coaching programs and costs, role play, practicing scripts, building rapport, guiding the conversation and live call guidance.',
    h1: 'Call Coaching and Training Resources for Real Estate Agents',
    intro: [
      'Most agents know what they should say on a call. The hard part is saying it while a prospect is talking. These guides cover the skills behind a good conversation, how to practice them, and the coaching options that help agents and teams improve: programs, coaches, role play, call review and guidance during the call.',
      'Team leaders can start with [how to coach real estate agents on calls](/blog/how-to-coach-real-estate-agents-on-calls/). Agents working on their own delivery can start with [how to not sound salesy](/blog/how-to-not-sound-salesy/).',
    ],
    listHeading: 'Guides on call skills, coaching and training',
    related:
      'For the words themselves, use the [real estate script library](/resources/script-book/) and the [objection library](/objections/). For the calls that lead to those conversations, see the [prospecting and cold calling resources](/resources/prospecting/).',
    updatedAt: '2026-11-24',
  },
  {
    id: 'appointments',
    slug: 'appointments-and-follow-up',
    section: 'Appointments and Follow-Up',
    seoTitle: 'Appointment Setting and Follow-Up Resources',
    seoDescription:
      'Every guide on booking real estate appointments and following up with leads: closing for the meeting, listing appointments, follow-up cadence and old leads.',
    h1: 'Real Estate Appointment Setting and Follow-Up Resources',
    intro: [
      'A good call ends with a booked appointment or a clear reason to talk again. These guides cover both halves: asking for the meeting without pressure, preparing for listing appointments, and following up with leads who are not ready yet, including the old leads already sitting in your database.',
      'Start with [how to book appointments in real estate](/blog/how-to-book-appointments-real-estate/) for the full process, or the [real estate follow-up scripts](/blog/real-estate-follow-up-scripts/) for what to say on the next call.',
    ],
    listHeading: 'Guides on appointments and follow-up',
    related:
      'If a prospect stalls before agreeing to meet, the [objection library](/objections/) covers the common reasons. For more scripts by situation, see the [real estate script library](/resources/script-book/).',
    updatedAt: '2026-11-24',
  },
];

export function getTopicHubPage(slug: string): TopicHubPage | null {
  return TOPIC_HUB_PAGES.find((page) => page.slug === slug) ?? null;
}
