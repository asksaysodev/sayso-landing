import { Gauge, BrainCircuit, Radar, Building2 } from 'lucide-react';
import type { EngineDifference, CompetitorComparison } from './types';

/**
 * Names that cycle through the blank line in the hero question.
 * Ordered so the two most-asked-about competitors appear first.
 */
export const ROTATING_COMPETITORS: string[] = [
  'Shilo',
  'MaverickRE',
  'ChatGPT',
  'call recordings',
  'in-person coaching',
  'script binders',
  'post-call analytics',
];

/** Cards for the dark "Under the Hood" engine section. */
export const ENGINE_DIFFERENCES: EngineDifference[] = [
  {
    title: 'Sub-Second Transcription',
    description:
      'Sayso transcribes your conversation in real time, in under a second. By the time the prospect finishes a sentence, the engine has already processed it. Live guidance only works when the transcript keeps pace with the conversation, and that speed is the foundation everything else is built on.',
    icon: Gauge,
  },
  {
    title: 'Live Inference',
    description:
      'Transcription alone is not coaching. Sayso interprets what the prospect actually means, tracks where the conversation is heading, and decides what will help you most in that moment, the way a great coach listens for intent instead of keywords.',
    icon: BrainCircuit,
  },
  {
    title: 'Real-Time Signals',
    description:
      'Sayso recognizes the moments that decide a conversation: an objection forming, a buying signal, an opening to ask for the appointment. It surfaces the right move while the call is still winnable, instead of flagging it in a report the next day.',
    icon: Radar,
  },
  {
    title: 'Built for Real Estate Conversations',
    description:
      'Sayso is built for the conversations agents actually have, with buyers and sellers, from first contact to appointment set. Your own scripts and live market data are layered in, so the guidance sounds like you and fits your market.',
    icon: Building2,
  },
];

/** What most coaching tools do, shown in the "after the call" card. */
export const AFTER_CALL_POINTS: string[] = [
  'Wait for the recording once the call ends',
  'Grade what happened and score your performance',
  'Tell you what you should have said',
  'Help you prepare for the next conversation',
];

/** What Sayso does, shown in the "during the call" card. */
export const DURING_CALL_POINTS: string[] = [
  'Transcribes the conversation as it happens',
  'Understands the context and reads the moment',
  'Shows you what to say while the prospect is talking',
  'Helps you win the conversation you are in',
];

/** Cards for the side-by-side comparison section. */
export const COMPETITOR_COMPARISONS: CompetitorComparison[] = [
  {
    name: 'Shilo',
    siteUrl: 'https://shilo.ai',
    siteLabel: 'shilo.ai',
    theirApproach:
      'Shilo grades recorded calls, builds coaching playbooks from past conversations, and gives team leaders visibility into how their agents perform. It is review and analysis after the conversation ends.',
    saysoDifference:
      'Sayso works on the other side of the timeline. It coaches you during the live call, while there is still time to change the outcome. Plenty of teams get value from using both together.',
  },
  {
    name: 'MaverickRE',
    siteUrl: 'https://www.maverickre.com',
    siteLabel: 'maverickre.com',
    theirApproach:
      'MaverickRE scores calls after they end and lets agents practice against simulated prospects, with analytics for managers. Practice sessions and post-call grades both make your next conversation better.',
    saysoDifference:
      'Sayso helps the conversation you are in right now. When a real prospect pushes back, the right response is already on your screen.',
  },
  {
    name: 'ChatGPT',
    siteUrl: 'https://chatgpt.com',
    siteLabel: 'chatgpt.com',
    theirApproach:
      'General AI tools are useful for drafting scripts and preparing before you dial. But they cannot hear your conversation, and typing a question mid-call means losing the prospect while you wait for an answer.',
    saysoDifference:
      'Sayso listens to the live conversation and surfaces guidance on its own, without you touching the keyboard. The prompts are built for real estate conversations, not generic sales advice.',
  },
  {
    name: 'In-Person Coaching',
    theirApproach:
      'A great coach changes careers, and there is no substitute for a mentor who knows your market. But even the best coach cannot sit beside you for every conversation you have.',
    saysoDifference:
      'Sayso puts that guidance on every call you make. Agents who work with a coach keep working with them, and each session gets more productive because the fundamentals are handled live.',
  },
];
