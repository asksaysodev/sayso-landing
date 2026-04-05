export interface WhySaysoContent {
  seoTitle: string;
  seoDescription: string;
  h1: string;
  opening: string;
  problemToday: string;
  differentiators: { title: string; description: string }[];
  whoItsFor: { persona: string; description: string; href: string }[];
  socialProof: string[];
  integrationsBlurb: string;
  faq: { question: string; answer: string }[];
}

export const whySaysoContent: WhySaysoContent = {
  seoTitle: 'Why Teams Are Switching to Sayso',
  seoDescription:
    'Sayso gives real estate agents real-time coaching during live calls, not after them. See why teams are switching from script binders and post-call reviews.',
  h1: 'Why Teams Are Switching to Sayso',
  opening:
    'Real estate agents lose deals every day, not because they do not know the scripts, but because they freeze in the moment. Sayso fixes that by coaching you during the call, not after it. Real-time prompts, automatic notes, and objection handling that works when you need it most.',
  problemToday:
    'Most agents learn through script binders, ride-alongs, and post-call reviews. These methods teach you what to say, but they cannot help you when the prospect is on the phone and you have three seconds to respond. The gap between preparation and performance is where deals die.\n\nPost-call tools tell you what went wrong. Real-time coaching prevents it from going wrong in the first place.',
  differentiators: [
    {
      title: 'Coaching happens during the call, not after',
      description: 'Sayso listens to your live conversation and shows you what to say next, the moment you need it. No more reviewing a recording to find out what you should have said.',
    },
    {
      title: 'No scripts to memorize',
      description: 'The right response appears on your screen when the prospect pushes back. You follow the prompt naturally instead of trying to recall memorized lines.',
    },
    {
      title: 'Call notes are automatic',
      description: 'After every call, Sayso generates a summary and syncs it to your CRM. No more spending 30 minutes logging notes after a calling session.',
    },
    {
      title: 'Works with your existing tools',
      description: 'Sayso runs alongside your dialer and CRM, including Follow Up Boss, Sierra Interactive, kvCORE, and more. Nothing changes about how you work.',
    },
    {
      title: 'Built for real estate prospecting',
      description: 'Sayso is not a generic sales tool. It is built for the conversations real estate agents have every day, including calls, follow-ups, objection handling, and appointment setting.',
    },
  ],
  whoItsFor: [
    {
      persona: 'Solo Agents',
      description: 'Sound experienced on every call, even without a team or coach behind you.',
      href: '/for/solo-agents',
    },
    {
      persona: 'Team Leaders',
      description: 'Scale your coaching without sitting in on every call. See how your team sounds and where they need help.',
      href: '/for/team-leaders',
    },
    {
      persona: 'New Agents',
      description: 'Skip the trial-and-error phase. Real-time prompts replace months of learning the hard way.',
      href: '/for/new-agents',
    },
    {
      persona: 'ISAs',
      description: 'Convert more leads with consistent coaching on every inbound and outbound call.',
      href: '/for/isas',
    },
  ],
  socialProof: [
    'My new agents sound like they have been doing this for years.',
    'The call notes alone saved me an hour a day.',
    'I used to dread objections. Now I know exactly what to say.',
  ],
  integrationsBlurb:
    'Sayso connects to the CRMs real estate teams already use, including Follow Up Boss, Sierra Interactive, kvCORE, and more. Call notes sync automatically. No platform switching, no manual logging.',
  faq: [
    {
      question: 'What makes Sayso different from other coaching tools?',
      answer: 'Sayso coaches you during the call, not after it. Most tools analyze recordings after the conversation ends. Sayso gives you real-time prompts while the prospect is on the phone.',
    },
    {
      question: 'Is Sayso only for new agents?',
      answer: 'No. Solo agents, team leaders, experienced agents, and ISAs all use Sayso. Even experienced agents benefit from having a safety net on tough calls.',
    },
    {
      question: 'Do I need to change my dialer or CRM?',
      answer: 'No. Sayso works alongside your existing tools. There is nothing to switch.',
    },
    {
      question: 'How fast can I get started?',
      answer: 'Most agents are set up and coaching on calls within minutes. There is no training period or onboarding program, just open Sayso and start your next call.',
    },
    {
      question: 'Is there a free trial?',
      answer: 'Yes. You can try Sayso free before committing. Visit the pricing page for details.',
    },
  ],
};
