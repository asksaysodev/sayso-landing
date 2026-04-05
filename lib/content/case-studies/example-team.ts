import type { CaseStudyEntry } from './types';

export const exampleTeam: CaseStudyEntry = {
  slug: 'example-team',
  customerName: 'Example Real Estate Team',
  headline: '40% More Appointments in 30 Days',
  seoTitle: 'Case Study: Example Team Booked 40% More Appointments',
  seoDescription:
    'See how a 6-agent real estate team used Sayso to book 40% more appointments in their first 30 days with real-time call coaching.',
  snapshot: {
    customer: 'Example Real Estate Team, 6 agents, Midwest market',
    challenge: 'New agents freezing on objections, losing appointments on prospecting calls.',
    solution: 'Sayso real-time coaching + automatic call notes synced to Follow Up Boss.',
    result: '40% more appointments booked in the first 30 days.',
  },
  challenge:
    'The Example Real Estate Team had six agents making prospecting calls every day, but their newer agents were struggling. They knew the scripts, but when a prospect pushed back with something unexpected, they froze. Calls ended without appointments. Follow-ups fell through the cracks because call notes were inconsistent, some agents logged everything, others logged nothing.\n\nThe team leader spent hours each week listening to recorded calls and giving feedback, but the coaching always came after the deal was already lost.',
  whatTheyTriedBefore:
    'Before Sayso, the team tried script binders, weekly role play sessions, and post-call review meetings. The script binders helped with preparation but could not help in the moment. Role play sessions were useful but only happened once a week. The post-call reviews identified problems but could not prevent them.',
  howSaysoHelped:
    'Sayso changed the team\'s approach from after-the-fact review to in-the-moment coaching. When a prospect said "I\'m not ready yet" or "I already have an agent," the right response appeared on the agent\'s screen immediately, tuned to what the prospect just said.\n\nThe automatic call notes eliminated the inconsistency problem. Every call got a summary logged to Follow Up Boss, regardless of which agent made the call. The team leader could see call activity and coaching data without sitting in on every conversation.',
  results:
    'In the first 30 days with Sayso, the team booked 40% more appointments from their prospecting calls. The biggest improvement came from new agents, who went from converting 1 in 15 calls to 1 in 9. Call note completeness went from roughly 60% to 100% because notes were automatic.\n\nThe team leader estimated saving 5+ hours per week that had previously been spent on call reviews and manual coaching sessions.',
  whatsNext:
    'The team is expanding Sayso to their ISA team and plans to use the call grading feature to identify top-performer patterns they can share across the brokerage.',
  quotes: [
    'My new agents sound like they have been doing this for years. That was not happening before Sayso.',
    'The call notes alone saved me an hour a day. I actually follow up on every conversation now.',
    'I used to dread objections. Now I almost look forward to them because I know exactly what to say.',
  ],
  relatedFeatures: [
    { title: 'Real-Time Coaching', href: '/features/real-time-coaching' },
    { title: 'Call Notes', href: '/features/call-notes' },
  ],
  relatedPersona: {
    title: 'Sayso for Team Leaders',
    href: '/for/team-leaders',
  },
};
