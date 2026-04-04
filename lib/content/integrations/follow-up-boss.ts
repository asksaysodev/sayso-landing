import type { IntegrationEntry } from './types';

export const followUpBoss: IntegrationEntry = {
  slug: 'follow-up-boss',
  crmName: 'Follow Up Boss',
  keyword: 'follow up boss AI integration',
  seoTitle: 'Sayso + Follow Up Boss Integration',
  seoDescription:
    'Connect Sayso with Follow Up Boss to get real-time coaching on calls and automatic note syncing to your CRM. Setup takes minutes.',
  h1: 'Sayso + Follow Up Boss — Real-Time Coaching Meets Your CRM',
  logoAlt: 'Follow Up Boss and Sayso logos',
  openingDescription:
    'Follow Up Boss is where your leads live. Sayso is where your calls get better. Together, they give you real-time coaching on every prospecting call and automatic note syncing back to your FUB contact records — so nothing falls through the cracks.',
  howItWorks: [
    {
      step: 'Connect your Follow Up Boss account',
      description: 'Link your FUB workspace to Sayso in Settings. The setup takes under two minutes — no developer needed.',
    },
    {
      step: 'Start a prospecting call',
      description: 'Open Sayso and dial from your normal workflow. Sayso recognizes the contact from your FUB records.',
    },
    {
      step: 'Get coached in real time',
      description: 'Sayso listens to the conversation and shows you what to say — objection responses, follow-up questions, appointment closes.',
    },
    {
      step: 'Notes sync automatically',
      description: 'After the call, Sayso generates a summary and pushes it to the contact\'s FUB timeline. No copy-pasting, no manual logging.',
    },
  ],
  benefits: [
    {
      title: 'Call notes appear in FUB automatically',
      body: 'Every conversation gets logged to the right contact record with a summary, key details, and next steps — without you touching your CRM.',
    },
    {
      title: 'No context switching',
      body: 'You do not need to leave FUB or open a separate app. Sayso runs alongside your existing workflow.',
    },
    {
      title: 'Better follow-ups from better notes',
      body: 'When notes are accurate and automatic, your follow-up calls start with context instead of "remind me what we talked about last time."',
    },
    {
      title: 'Team visibility',
      body: 'Team leaders can see call activity and coaching data alongside FUB pipeline metrics — one place for everything.',
    },
  ],
  whyChoose:
    'Follow Up Boss users choose Sayso because it fits into the workflow they already have. You do not need to learn a new system or change how you dial. Sayso adds a coaching layer on top of FUB — real-time prompts during calls and automatic notes after. The agents who get the most value are those making 20+ calls a day where consistent follow-up is the difference between a pipeline and a graveyard.',
  getStarted:
    'Connecting Sayso to Follow Up Boss takes under two minutes. Sign up, link your FUB account in Settings, and start your next call with real-time coaching.',
  featureList: [
    'Follow Up Boss CRM integration',
    'Automatic call note syncing',
    'Real-time call coaching',
    'Contact record matching',
  ],
  faq: [
    {
      question: 'Does Sayso integrate with Follow Up Boss?',
      answer: 'Yes. Sayso connects directly to your Follow Up Boss account and syncs call notes to your contact records automatically.',
    },
    {
      question: 'How long does the Follow Up Boss integration take to set up?',
      answer: 'Under two minutes. Connect your FUB account in Sayso Settings — no developer or IT support needed.',
    },
    {
      question: 'Will Sayso slow down my Follow Up Boss workflow?',
      answer: 'No. Sayso runs alongside your existing dialer and CRM. It adds coaching and notes without changing how you work.',
    },
  ],
  relatedIntegrations: [
    { name: 'Sierra Interactive', slug: 'sierra-interactive' },
    { name: 'kvCORE', slug: 'kvcore' },
  ],
};
