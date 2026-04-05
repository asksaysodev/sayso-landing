import { CalendarCheck, TrendingUp, RefreshCw, ShieldCheck } from 'lucide-react';
import type { PersonaContent } from './types';
import { ICON_CONSTANTS } from './constants';

export const salesLeaderContent: PersonaContent = {
  hero: {
    headline: "Your agents don't need another script. They need help during the call.",
    headlineSize: 'text-3xl sm:text-4xl lg:text-4xl xl:text-5xl',
    tagline:
      'Sayso listens during prospect conversations and shows agents what to ask next, so they stay confident and in control when it matters most.',
  },
  transformation: {
    headline: 'With SaySo, Role-Play Finally Pays Off',
    subheading:
      'Stop watching great role-play fall apart the moment a real prospect pushes back.',
    metrics: [
      {
        icon: <ShieldCheck size={ICON_CONSTANTS.size} color={ICON_CONSTANTS.color} />,
        title: 'Agents Stop Freezing',
        description: 'Real-time prompts keep agents confident when objections hit',
      },
      {
        icon: <TrendingUp size={ICON_CONSTANTS.size} color={ICON_CONSTANTS.color} />,
        title: 'Scripts That Work Live',
        description: 'Guidance in the moment, not just in meetings',
      },
      {
        icon: <RefreshCw size={ICON_CONSTANTS.size} color={ICON_CONSTANTS.color} />,
        title: 'Coaching That Scales',
        description: 'Stop repeating the same sessions, Sayso coaches every call automatically',
      },
      {
        icon: <CalendarCheck size={ICON_CONSTANTS.size} color={ICON_CONSTANTS.color} />,
        title: 'More Booked Appointments',
        description: 'Consistent conversations lead to consistent results',
      },
    ],
  },
  threeSteps: {
    headline: 'Sayso in 3 Easy Steps',
    subheading:
      'Your agents get live coaching on every call, so role-play performance finally shows up in real results.',
    steps: [
      {
        title: '1. Launch Coach',
        description:
          'Agents turn Sayso on before dialing. Works with any CRM or dialer they already use, no new tools to learn.',
      },
      {
        title: '2. Live Prompts on Every Call',
        description:
          'When a prospect pushes back, Sayso shows agents exactly what to ask or say next, keeping the conversation on track.',
      },
      {
        title: '3. Role-Play Results in Real Calls',
        description:
          'Agents stay confident and in control, and you see the improvement in your booking numbers.',
      },
    ],
  },
};
