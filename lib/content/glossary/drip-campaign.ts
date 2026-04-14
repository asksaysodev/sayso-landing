import type { GlossaryEntry } from './types';

export const dripCampaign: GlossaryEntry = {
  slug: 'drip-campaign',
  term: 'Drip Campaign',
  keyword: 'what is a drip campaign real estate',
  seoTitle: 'What Is a Drip Campaign in Real Estate',
  seoDescription:
    'A drip campaign is a series of automated emails or texts sent to real estate leads over time. Learn how it works, tips to get started, and how Sayso helps.',
  h1: 'What Is a Drip Campaign?',
  definition:
    'A drip campaign is a series of pre-written, automated emails or messages sent to real estate leads on a set schedule to keep you top of mind and move prospects closer to booking an appointment. Most agents use drip campaigns to nurture leads who are not ready to act today but may convert in weeks or months.',
  howItWorks: [
    'A drip campaign in real estate typically starts when a lead enters your CRM, whether from a call, a website inquiry, or an open house sign-in. You assign them to a sequence of emails that go out automatically over days, weeks, or months. Each message delivers something useful: a market update, a neighborhood report, or a simple check-in.',
    'The timing and content vary based on the lead type. A new buyer lead might get a welcome email followed by weekly listing alerts. A homeowner you spoke with during circle prospecting might receive monthly market updates for their neighborhood. The key is matching the message to where the prospect is in their decision.',
    'Most CRMs and email platforms let you build drip sequences with templates, so you write the emails once and reuse them across hundreds of leads.',
  ],
  whyItMatters: [
    'Most real estate leads do not convert on the first conversation. The average prospect needs multiple touches before booking an appointment. A drip campaign keeps those touches happening automatically, so you stay in front of leads even on days when you are focused on calls or showings.',
    'For agents making 50 or more calls a day, manual follow-up is not realistic. Drip campaigns handle the long-term nurture while you focus on live conversations. Fewer leads slip through the cracks, and more appointments get booked over time.',
    'Consistent follow-up also builds trust. When a prospect finally decides to move forward, the agent who has been showing up in their inbox is the one they call.',
  ],
  tips: [
    {
      title: 'Segment leads by source and intent',
      body: 'A buyer from Zillow and a homeowner from a circle prospecting call need different messages. Group leads by where they came from and what they are looking for, then tailor each sequence.',
    },
    {
      title: 'Send the first email within 24 hours',
      body: 'Speed matters. Leads are most engaged right after they interact with you. A fast first email reinforces the conversation and sets expectations for future messages.',
    },
    {
      title: 'Keep emails short and useful',
      body: 'Two to three paragraphs is enough. Include one clear call to action per email. Long emails get skimmed or deleted, especially on mobile.',
    },
    {
      title: 'Mix content types across the sequence',
      body: 'Alternate between market updates, helpful tips, and personal check-ins. Variety keeps your emails from feeling repetitive and gives prospects multiple reasons to engage.',
    },
    {
      title: 'Set a realistic sending cadence',
      body: 'Weekly for the first month, then every two to four weeks after that. Too many emails and prospects unsubscribe. Too few and they forget you.',
    },
  ],
  howSaysoHelps: [
    'Drip campaigns work best when they build on real conversations. Sayso\'s [Call Notes](/features/smart-capture/) automatically capture what was discussed on every call and sync it to your CRM, so your follow-up emails can reference specific details instead of sending generic templates.',
    'When a lead re-engages after receiving your drip emails, Sayso\'s [Real-Time Coaching](/features/cue/) helps you pick up the conversation right where it left off. You see prompts based on the prospect\'s history, so you sound prepared instead of starting from scratch. [Book a demo](/demo/) to see how Sayso connects your calls to your follow-up.',
  ],
  relatedTerms: [
    { term: 'Circle Prospecting', slug: 'circle-prospecting' },
    { term: 'Cold Calling', slug: 'cold-calling-real-estate' },
    { term: 'Lead Nurturing', slug: 'lead-nurturing' },
    { term: 'Sphere of Influence', slug: 'sphere-of-influence' },
  ],
  relatedFeature: {
    title: 'Call Notes',
    href: '/features/smart-capture',
  },
  relatedPersona: {
    title: 'Sayso for Solo Agents',
    href: '/for/solo-agents',
  },
  faq: [
    {
      question: 'What is a drip campaign in real estate?',
      answer:
        'A drip campaign is a series of automated emails sent to leads over time to keep you top of mind and nurture prospects toward booking an appointment. Messages are pre-written and delivered on a schedule, so follow-up happens without manual effort.',
    },
    {
      question: 'How long should a real estate drip campaign last?',
      answer:
        'Most effective drip campaigns last 8 to 16 weeks for active leads. For long-term nurture, a monthly email can continue indefinitely. The right length depends on how quickly your typical lead converts.',
    },
    {
      question: 'How is a drip campaign different from a newsletter?',
      answer:
        'A drip campaign is a fixed sequence triggered when a lead enters your system. A newsletter goes to your entire list on the same schedule. Drip campaigns are personalized by lead type and timing, while newsletters deliver the same content to everyone.',
    },
    {
      question: 'How many emails should be in a real estate drip campaign?',
      answer:
        'Start with 5 to 8 emails spread across the first two months. After the initial sequence, transition leads to a monthly check-in. More important than the number is making each email useful and relevant to the prospect.',
    },
  ],
};
