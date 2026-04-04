import type { FeatureEntry } from './types';

export const realTimeCoaching: FeatureEntry = {
  slug: 'real-time-coaching',
  keyword: 'real time sales help',
  seoTitle: 'Real-Time Coaching for Real Estate Calls',
  seoDescription:
    'Sayso listens to your prospecting calls and shows you what to say next — in real time. Handle objections, ask better questions, and book more appointments.',
  h1: 'Real-Time Coaching That Tells You What to Say Next',
  heroDescription:
    'Sayso listens to your live prospecting calls and shows you exactly what to say — the moment you need it. When a prospect pushes back, you see the right response on your screen. When the conversation stalls, Sayso suggests the next question to keep it moving. No memorizing scripts. No post-call regret. Just real-time help on every call.',
  screenshotAlt: 'Screenshot: Sayso coaching prompt during a live prospecting call',
  howItWorks: [
    {
      step: 'Start your call with Sayso open',
      description:
        'Launch Sayso before you dial. It works alongside any dialer or CRM you already use — no integrations required to get started.',
    },
    {
      step: 'Sayso listens and analyzes the conversation',
      description:
        'As you and the prospect talk, Sayso processes the conversation in real time to understand what is happening — objections, questions, buying signals.',
    },
    {
      step: 'Coaching prompts appear on screen',
      description:
        'When the moment calls for it, Sayso shows you what to say next: a response to an objection, a follow-up question, or a transition to close for the appointment.',
    },
    {
      step: 'Notes are captured automatically',
      description:
        'After the call, Sayso generates a summary and logs key details to your CRM — so you can move straight to the next call.',
    },
  ],
  whoItsFor:
    'Real-time coaching is built for agents who prospect on the phone every day — whether you are a solo agent doing your own cold calls, an ISA handling inbound leads, or a new agent who wants to sound experienced from day one. Team leaders also use it to onboard new hires faster, replacing ride-alongs and script binders with live, on-call guidance.',
  differentiators: [
    {
      title: 'Live, not after-the-fact',
      body: 'Most coaching tools analyze calls after they end. Sayso coaches you during the call — when it actually matters.',
    },
    {
      title: 'Context-aware responses',
      body: 'Sayso does not show generic tips. It listens to what the prospect just said and gives you a response that fits that exact moment.',
    },
    {
      title: 'No script memorization',
      body: 'You do not need to memorize scripts or flip through a binder. The right words appear on your screen when you need them.',
    },
    {
      title: 'Works with your existing tools',
      body: 'Sayso runs alongside your dialer and CRM. No switching platforms, no complicated setup.',
    },
  ],
  featureList: [
    'Real-time call coaching',
    'Live objection handling prompts',
    'Automatic call notes',
    'CRM integration',
    'Conversation analysis',
  ],
  faq: [
    {
      question: 'How does real-time coaching work during a call?',
      answer:
        'Sayso listens to your live call and displays coaching prompts on your screen — like the right response to an objection or a question to ask next. You see the guidance in real time, not after the call ends.',
    },
    {
      question: 'Do I need to memorize scripts to use Sayso?',
      answer:
        'No. Sayso shows you what to say in the moment. You can follow the prompts naturally instead of trying to recall memorized lines.',
    },
    {
      question: 'Does Sayso work with my existing dialer?',
      answer:
        'Yes. Sayso works alongside any dialer or phone system. There is no hardware to install and no integrations required to start.',
    },
    {
      question: 'Is real-time coaching useful for experienced agents?',
      answer:
        'Yes. Even experienced agents benefit from having a safety net on tough calls. Sayso catches the moments when you might freeze or default to a weaker response.',
    },
  ],
  relatedFeatures: [
    { title: 'Objection Handling', slug: 'objection-handling' },
    { title: 'Call Notes', slug: 'call-notes' },
    { title: 'Call Grading', slug: 'call-grading' },
  ],
  relatedBlogPosts: [
    { title: 'What Real-Time Call Coaching Looks Like', href: '/blog/what-real-time-call-coaching-looks-like' },
    { title: 'Real Estate Cold Call Scripts: Complete Guide', href: '/blog/real-estate-cold-calling-guide' },
  ],
};
