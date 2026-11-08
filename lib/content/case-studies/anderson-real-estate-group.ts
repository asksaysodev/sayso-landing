import type { CaseStudyEntry } from './types';

/**
 * Anderson Real Estate Group case study.
 *
 * Every number on this page comes from the team's one-page summary
 * (public/case-studies/areg-case-study.pdf). Do not add numbers, rates,
 * percentages, quotes, rollout dates, or per-market agent counts that are
 * not in that PDF. Always label the period: year to date is January to
 * mid-August 2026, and every change is compared with all of 2025.
 */
/** 2026 appointment pace, shared with the homepage teams section so the two can't drift. */
export const AREG_PACE = { appointments: '2,892', moreThan2025: '1,301' };

export const andersonRealEstateGroup: CaseStudyEntry = {
  slug: 'anderson-real-estate-group',
  updatedAt: '2026-11-08',
  customerName: 'Anderson Real Estate Group',
  headline: 'Real Estate Mega Team Case Study: More Conversations, More Appointments',
  subheadline: 'More focus on conversations in 2026, with agents using Sayso.',
  seoTitle: 'Real Estate Mega Team Case Study: 1,928 Appointments YTD',
  seoDescription:
    'How a 50-agent eXp mega team using Sayso booked 1,928 appointments from January to mid-August 2026, 337 more than in all of 2025.',
  snapshot: {
    customer:
      'Anderson Real Estate Group, a 50-agent mega team across Long Beach, the Inland Empire and Arizona. A Top 250 team at eXp.',
    challenge:
      'Keeping a large team on the phone and focused on conversations, when most coaching happens after the call is over.',
    approach:
      'Agents use Sayso for real-time call coaching, with coaching reminders shown directly on the call.',
    result:
      '1,928 appointments year to date (January to mid-August 2026), 337 more than the team booked in all of 2025.',
  },
  statsPeriod: 'Year to date: January to mid-August 2026. Each change is compared with all of 2025.',
  stats: [
    { label: 'Appointments, year to date', value: '1,928', change: '+337 vs. all of 2025' },
    { label: 'Conversations, year to date', value: '5,942', change: '+1,664 vs. all of 2025' },
    { label: 'Call attempts, year to date', value: '91,414', change: '+43,906 vs. all of 2025' },
    {
      label: '2026 appointment pace',
      value: AREG_PACE.appointments,
      change: `${AREG_PACE.moreThan2025} more than in 2025`,
    },
  ],
  aboutCustomer:
    'Anderson Real Estate Group (AREG) is a 50-agent real estate mega team working three markets: Long Beach, the Inland Empire and Arizona. The team is a Top 250 team at eXp.\n\nDisclosure: Sayso founder Kuvaal Patel is the Director of Agent Development at Anderson Real Estate Group. AREG agents use Sayso on their calls.',
  challenge:
    'Every team that prospects by phone runs into the same three problems, and they get harder as the team grows.\n\nFirst, coaching after the call only partly sticks. A team leader can review a recording, point out the moment the call turned, and role play a better answer. The agent agrees, and then the next prospect says something slightly different and the lesson is gone. The feedback arrives after the appointment was already won or lost.\n\nSecond, leaders cannot be on every call. With 50 agents across three markets, there is no way for one person, or even a small leadership group, to sit in on enough live conversations to make a difference in the moment. Most calls happen with no one there to help.\n\nThird, call reluctance. Agents who are unsure what to say next hesitate before they dial, keep calls short, or avoid the conversations that feel hardest. Dials can go up while the number of conversations stays flat, because the agent is not confident enough to stay on the phone and keep talking.',
  howSaysoHelped:
    'Agents on the team use Sayso during their calls. Sayso listens to the live conversation and shows coaching reminders on screen while the agent is talking, so the help shows up in the moment it is needed instead of in a review meeting afterward. The team summarized what changed in four points.',
  whatChanged: [
    {
      title: 'Less call reluctance, more appointments booked',
      body: 'When an agent knows help will be on the screen if the call goes sideways, picking up the phone is less of a hurdle. Less hesitation before the call means more calls get made, and more calls give agents more chances to ask for the appointment.',
    },
    {
      title: 'More conversations, not just more dials',
      body: 'Dialing more is easy to measure and easy to push. The harder part is turning dials into conversations where the agent stays on the line, asks questions, and moves toward a next step. The team\'s focus in 2026 was on conversations, not only on dial counts.',
    },
    {
      title: 'Confidence on every call',
      body: 'Confidence on the phone comes from knowing what to say next. Agents do not have to carry every script and objection response in their heads, because the cue they need shows up while they are talking.',
    },
    {
      title: 'Coaching reminders directly on the call',
      body: 'The coaching the team already teaches, from scripts to objection handling to asking for the appointment, appears as reminders during the live call. It is the same coaching, delivered at the moment it can still change how the call ends.',
    },
  ],
  results:
    'From January to mid-August 2026, Anderson Real Estate Group booked 1,928 appointments. That is 337 more appointments than the team booked in all of 2025, with the rest of 2026 still to go.\n\nOver the same period, agents had 5,942 conversations, 1,664 more than in all of 2025. They made 91,414 call attempts, 43,906 more than in all of 2025.\n\nThe team\'s 2026 pace is 2,892 appointments, which would be 1,301 more appointments than in 2025.\n\nThese are totals, not rates. The story they tell is volume and consistency: agents picking up the phone more, staying in more conversations, and booking more appointments, with coaching on the call.',
  whatThisMeans:
    'For a team leader, the lesson is that coaching volume does not have to depend on how many calls you can personally listen to. If the coaching shows up on the call, every agent gets it on every conversation, including the ones no leader would ever hear.\n\nFor agents and ISAs who prospect by phone, call reluctance is often a confidence problem, not an effort problem. Having the next line in front of you makes it easier to dial, easier to stay on the call, and easier to ask for the appointment.\n\nSayso works alongside the tools a team already runs, such as its CRM and dialer. It does not replace them, and it does not make calls for anyone. The agent makes the call. Sayso helps while they talk.',
  quotes: [],
  faqs: [
    {
      question: 'How many appointments did Anderson Real Estate Group book with Sayso?',
      answer:
        'From January to mid-August 2026, the team booked 1,928 appointments, 337 more than in all of 2025. The team\'s 2026 pace is 2,892 appointments, 1,301 more than in 2025.',
    },
    {
      question: 'How does real-time call coaching help with call reluctance?',
      answer:
        'Call reluctance often comes from not knowing what to say next. Real-time call coaching puts reminders on screen during the call, so agents do not have to remember everything on their own. Less call reluctance was one of the four changes Anderson Real Estate Group reported.',
    },
    {
      question: 'Does Sayso make calls for agents?',
      answer:
        'No. Sayso does not make the call. The agent does. Sayso listens to the live conversation and shows context-aware cues while the agent talks, so judgment and the client relationship stay with the agent.',
    },
    {
      question: 'Can ISAs and agents on a team both use Sayso?',
      answer:
        'Yes. Sayso is built for anyone on a real estate team who prospects by phone, including agents and ISAs. Team leaders use it to put the team\'s coaching on every call instead of only in reviews after the fact.',
    },
  ],
  pdf: {
    href: '/case-studies/areg-case-study.pdf',
    label: 'Download the one-page PDF',
  },
  relatedProducts: [{ title: 'Real-Time Guidance', href: '/products/cue' }],
  relatedPersona: {
    title: 'Sayso for Team Leaders',
    href: '/for/team-leaders',
  },
};
