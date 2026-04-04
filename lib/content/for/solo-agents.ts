import type { UseCaseEntry } from './types';

export const soloAgents: UseCaseEntry = {
  slug: 'solo-agents',
  persona: 'Solo Agents',
  keyword: 'how to be more efficient real estate agent',
  seoTitle: 'Sayso for Solo Agents — Be More Efficient',
  seoDescription:
    'Solo agents wear every hat. Sayso gives you real-time coaching on calls so you sound experienced, handle objections confidently, and book more appointments — without a team behind you.',
  h1: 'How to Be More Efficient as a Solo Real Estate Agent',
  openingEmpathy:
    'You do everything yourself — prospecting, showing, negotiating, paperwork, follow-ups. There is no ISA picking up your phone and no manager whispering in your ear during a tough call. When a prospect says "I\'m not ready yet," you are on your own. And at the end of a long day of calls, you still need to log everything to your CRM before the details fade.',
  theProblem:
    'The hardest part of being a solo agent is not the volume — it is the quality of each call when you are doing 30 of them a day. By call number 15, your energy drops. By call 25, you are running on autopilot. The calls where you freeze on an objection or forget to ask for the appointment — those are the ones that cost you listings.\n\nAnd then there is the admin. Every call needs notes. Every lead needs a follow-up task. Every conversation needs to be logged. The administrative work after a calling session often takes as long as the calls themselves.',
  whatTheyTry:
    'Most solo agents try to solve this with script binders, CRM templates, or sheer willpower. Some invest in expensive coaching programs that teach them what to say — but cannot help them in the actual moment on the call. Others record their calls and review them later, which is valuable for learning but does nothing to save the deal that just slipped away.\n\nThe common pattern is investing time and money in preparation, but having no support during the call itself — the exact moment where deals are won or lost.',
  betterApproach:
    'Real-time coaching changes the equation. Instead of preparing for every possible scenario before the call, you get guidance during the call — when it actually matters. Sayso listens to your conversation and shows you what to say next on your screen. When a prospect pushes back, the right response appears. When the conversation stalls, Sayso suggests the next question.\n\nFor solo agents, this means you can sound like a 10-year veteran on every call, even on the days when you are running on three hours of sleep. After the call, Sayso captures your notes automatically and syncs them to your CRM — so the admin work that used to take an hour now takes zero.',
  howSaysoWorks: [
    {
      feature: 'Real-Time Coaching',
      description: 'See what to say during live calls — objection responses, follow-up questions, appointment closes. No memorization needed.',
    },
    {
      feature: 'Automatic Call Notes',
      description: 'Sayso generates a call summary and logs it to your CRM after every conversation. Stop spending 30 minutes on notes after a calling session.',
    },
    {
      feature: 'Objection Handling',
      description: 'When a prospect pushes back, the right response appears on your screen — tuned to what they just said, not a generic script.',
    },
    {
      feature: 'Call Grading',
      description: 'See how your calls stack up over time. Identify patterns in the calls that convert and the ones that do not — without hiring a coach.',
    },
  ],
  faq: [
    {
      question: 'Can solo agents use Sayso without a team plan?',
      answer: 'Yes. Sayso has individual plans built specifically for solo agents. No team required.',
    },
    {
      question: 'Does Sayso replace a real estate coach?',
      answer: 'Sayso handles the in-the-moment coaching that a human coach cannot — real-time prompts during live calls. It complements coaching programs by giving you support on every single call, not just the ones you review later.',
    },
    {
      question: 'How much time does Sayso save per day?',
      answer: 'Most solo agents save 30–60 minutes per day on call notes alone. The real-time coaching also reduces the number of lost deals from fumbled objections, which compounds over time.',
    },
    {
      question: 'Do I need to change my dialer to use Sayso?',
      answer: 'No. Sayso works alongside any dialer or phone system you already use.',
    },
  ],
  relatedFeatures: [
    { title: 'Real-Time Coaching', href: '/features/real-time-coaching' },
    { title: 'Call Notes', href: '/features/call-notes' },
    { title: 'Call Grading', href: '/features/call-grading' },
  ],
  relatedBlogPosts: [
    { title: 'How to Not Freeze on Sales Calls', href: '/blog/how-to-not-freeze-on-calls' },
    { title: 'Real Estate Cold Call Scripts: Complete Guide', href: '/blog/real-estate-cold-calling-guide' },
  ],
};
