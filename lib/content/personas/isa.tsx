import { CalendarCheck, Mic, ShieldCheck, Zap } from 'lucide-react';
import type { PersonaContent } from './types';
import { ICON_CONSTANTS } from './constants';

export const isaContent: PersonaContent = {
  hero: {
    headline: 'Never run out of what to say on a prospect call.',
    headlineSize: 'text-3xl sm:text-4xl lg:text-5xl xl:text-5xl',
    tagline:
      'Sayso gives you live prompts during prospecting calls so you always know what question to ask next.',
  },
  transformation: {
    headline: "With SaySo, You Always Know What to Say",
    subheading: 'Stay confident and in control, even when prospects push back.',
    metrics: [
      {
        icon: <ShieldCheck size={ICON_CONSTANTS.size} color={ICON_CONSTANTS.color} />,
        title: 'Handle Any Objection',
        description: "Never freeze on 'just looking,' price objections, or FSBO pushback again",
      },
      {
        icon: <Mic size={ICON_CONSTANTS.size} color={ICON_CONSTANTS.color} />,
        title: 'Stay in Control',
        description: 'Sayso keeps conversations moving toward a booked appointment',
      },
      {
        icon: <CalendarCheck size={ICON_CONSTANTS.size} color={ICON_CONSTANTS.color} />,
        title: 'Book More Appointments',
        description: 'More confident calls means more meetings on your calendar',
      },
      {
        icon: <Zap size={ICON_CONSTANTS.size} color={ICON_CONSTANTS.color} />,
        title: 'Works on Every Call',
        description: 'Live prompts for FSBOs, expireds, buyer leads, and any prospect type',
      },
    ],
  },
  threeSteps: {
    headline: 'Sayso in 3 Easy Steps',
    subheading:
      'Get real-time guidance on every call so you stop losing momentum when prospects push back.',
    steps: [
      {
        title: '1. Launch Coach',
        description:
          'Open Sayso before you dial. Works with whatever CRM or dialer you already use, no new setup.',
      },
      {
        title: '2. Get Your Next Question',
        description:
          "When a prospect pushes back or goes quiet, Sayso shows you exactly what to ask next, so you never run out of words.",
      },
      {
        title: '3. Book the Appointment',
        description:
          'Stay confident through objections and close more calls with a scheduled meeting.',
      },
    ],
  },
};
