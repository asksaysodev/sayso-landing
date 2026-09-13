/** Illustrative conversations and existing customer logos for the homepage. */
export const callMoments = [
  {
    label: 'An objection comes up',
    prospect: 'We’re interested, but I think we’ll wait until next year.',
    signal: 'Understand the hesitation',
    cue: 'That makes sense. What would need to change for the timing to feel right?',
    noteLabel: 'Timeline',
    note: 'Considering a move next year. Timing is a concern.',
    explanation: 'A useful question, right when the conversation could stall.',
  },
  {
    label: 'A detail matters',
    prospect: 'We need more room, but staying near the kids’ school is the priority.',
    signal: 'Explore what matters',
    cue: 'Staying close to school sounds important. What would having more space change for your family?',
    noteLabel: 'Motivation',
    note: 'Needs more space. Staying near the children’s school is a priority.',
    explanation: 'Keep listening while Sayso captures the details worth remembering.',
  },
  {
    label: 'There’s a next step',
    prospect: 'It would help to talk through our options. We’re both free Thursday.',
    signal: 'Help make a plan',
    cue: 'Let’s find a time Thursday to go through your options together. Would the afternoon work for you both?',
    noteLabel: 'Next step',
    note: 'Wants to discuss options. Both available Thursday; time to confirm.',
    explanation: 'Recognize an opening and help the prospect take the next step.',
  },
];

export const customerLogos = [
  { name: 'eXp Realty', src: '/social-proof/exp-realty.png' },
  { name: 'Anderson Group', src: '/social-proof/anderson-group.png' },
  { name: 'Keller Williams Palo Alto', src: '/social-proof/kw-palo-alto.png' },
  { name: 'Coldwell Banker', src: '/social-proof/coldwell-banker.png' },
  { name: 'EXIT Realty', src: '/social-proof/exit-realty.png' },
  { name: 'Team Borham', src: '/social-proof/team-borham.png' },
];

export const workflowSteps = [
  { title: 'Open Sayso before you dial', description: 'Keep your existing calling workflow. Launch Sayso on your Mac alongside the tools you already use.' },
  { title: 'Give the conversation your attention', description: 'As you talk, Sayso suggests questions, helps with objections, and organizes important details into notes.' },
  { title: 'Leave with a clear next step', description: 'Review the captured notes, add them to your CRM, and follow up with the context fresh in front of you.' },
];

export const homepageFaqs = [
  { question: 'What is Sayso?', answer: 'Sayso is an AI call coach for real estate agents. It listens during your live conversations, suggests what to ask or say next, and captures structured notes so you can give the prospect your attention.' },
  { question: 'Does Sayso make calls for me?', answer: 'You make the calls and lead the conversation. Sayso gives you guidance on your screen. You choose which suggestions to use and put them in your own words.' },
  { question: 'Does it help with both buyers and sellers?', answer: 'Yes. Sayso supports conversations with buyers and sellers, including understanding their motivation, handling concerns, and discussing the next step.' },
  { question: 'Do I need to change my CRM or dialer?', answer: 'Sayso works alongside your existing calling tools. Smart Capture creates structured notes you can review and copy into your CRM. Visit our integrations page to see the available connections.', href: '/integrations', linkLabel: 'Explore integrations' },
  { question: 'Can I use Sayso on Windows?', answer: 'Sayso is currently available for Mac. The Windows version is coming soon. Select Windows through Download Sayso to join the waitlist.' },
  { question: 'How does Sayso handle conversation data?', answer: 'Sayso processes conversations to provide live guidance and notes. Session records can include transcripts, cues, notes, and summaries. Our privacy policy explains what is stored and how it is used.', href: '/privacy', linkLabel: 'Read the privacy policy' },
];
