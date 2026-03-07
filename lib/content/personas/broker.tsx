import { CalendarCheck, TrendingUp, Users, Zap } from 'lucide-react';
import type { PersonaContent } from './types';
import { ICON_CONSTANTS } from './constants';

export const brokerContent: PersonaContent = {
  hero: {
    headline: "Your brokerage doesn't have a lead problem. It has a conversation problem.",
    headlineSize: 'text-3xl sm:text-4xl lg:text-4xl xl:text-5xl',
    tagline:
      'Sayso guides agents during live prospecting calls so they ask better questions, handle objections confidently, and convert more conversations into appointments.',
  },
  transformation: {
    headline: "With SaySo, Your Whole Team Wins",
    subheading: 'Turn wasted leads into booked appointments — across every agent, every call.',
    metrics: [
      {
        icon: <CalendarCheck size={ICON_CONSTANTS.size} color={ICON_CONSTANTS.color} />,
        title: 'Higher Conversion Rate',
        description: 'Stop losing the leads your agents already have',
      },
      {
        icon: <TrendingUp size={ICON_CONSTANTS.size} color={ICON_CONSTANTS.color} />,
        title: 'Consistent Conversations',
        description: 'Every agent sounds like your best agent — on every call',
      },
      {
        icon: <Users size={ICON_CONSTANTS.size} color={ICON_CONSTANTS.color} />,
        title: 'Faster Agent Ramp',
        description: 'New agents get productive in days, not months',
      },
      {
        icon: <Zap size={ICON_CONSTANTS.size} color={ICON_CONSTANTS.color} />,
        title: 'Coaching That Scales',
        description: "Real-time guidance on every call — without you having to be there",
      },
    ],
  },
  threeSteps: {
    headline: 'Sayso in 3 Easy Steps',
    subheading:
      'Your agents get real-time guidance on every call — so you stop leaving appointments on the table.',
    steps: [
      {
        title: '1. Deploy to Your Team',
        description:
          "Agents turn Sayso on while calling. No complex setup — works with any CRM or dialer they already use.",
      },
      {
        title: '2. Agents Get Live Prompts',
        description:
          'Sayso suggests the right question or response in real-time, keeping every conversation structured.',
      },
      {
        title: '3. More Appointments, Every Day',
        description:
          'Your team books more qualified meetings — and you see the difference in your conversion numbers.',
      },
    ],
  },
};
