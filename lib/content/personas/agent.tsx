import { CalendarCheck, MessageCircle, ShieldCheck, Star } from 'lucide-react';
import type { PersonaContent } from './types';
import { ICON_CONSTANTS } from './constants';

export const agentContent: PersonaContent = {
  hero: {
    headline: 'Prospecting gets easier when you know what to say next.',
    headlineSize: 'text-3xl sm:text-4xl lg:text-5xl xl:text-5xl',
    tagline:
      'Sayso helps you ask better questions, handle objections, and turn conversations into appointments.',
  },
  transformation: {
    headline: 'With SaySo, You Sound Like a Pro',
    subheading:
      'Stop guessing what to say. Start booking appointments like the top agents do.',
    metrics: [
      {
        icon: <ShieldCheck size={ICON_CONSTANTS.size} color={ICON_CONSTANTS.color} />,
        title: 'Confidence on Every Call',
        description: "Never go blank or freeze when a prospect pushes back",
      },
      {
        icon: <MessageCircle size={ICON_CONSTANTS.size} color={ICON_CONSTANTS.color} />,
        title: 'Objections? No Problem',
        description: "Sayso shows you what top agents say — in real time, on the call",
      },
      {
        icon: <Star size={ICON_CONSTANTS.size} color={ICON_CONSTANTS.color} />,
        title: 'Built-In Coaching',
        description: 'No manager needed — get guidance on every single prospecting call',
      },
      {
        icon: <CalendarCheck size={ICON_CONSTANTS.size} color={ICON_CONSTANTS.color} />,
        title: 'More Appointments Booked',
        description: 'Turn uncomfortable conversations into meetings on your calendar',
      },
    ],
  },
  threeSteps: {
    headline: 'Sayso in 3 Easy Steps',
    subheading:
      'Real-time prompts that make every call feel like you have done it a thousand times.',
    steps: [
      {
        title: '1. Launch Coach',
        description:
          'Open Sayso before you dial. Works with any dialer or CRM you already use — takes minutes to set up.',
      },
      {
        title: '2. Follow the Prompts',
        description:
          "When a prospect pushes back or the conversation stalls, Sayso tells you exactly what to ask next — no more going blank.",
      },
      {
        title: '3. Book the Appointment',
        description:
          'Handle objections confidently and close more calls with a meeting on the calendar.',
      },
    ],
  },
};
