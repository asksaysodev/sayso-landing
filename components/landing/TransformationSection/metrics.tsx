import { CalendarCheck, TrendingUp, Rocket, ShieldCheck } from 'lucide-react';

const ICON_CONSTANTS = { size: 28, color: '#2367EE' };

export const metrics = [
  {
    icon: <CalendarCheck size={ICON_CONSTANTS.size} color={ICON_CONSTANTS.color} />,
    title: 'More Appointments Booked',
    description: 'Agents using Sayso book appointments up to 12x more efficiently from the same call list.',
  },
  {
    icon: <TrendingUp size={ICON_CONSTANTS.size} color={ICON_CONSTANTS.color} />,
    title: 'Handle Any Objection',
    description: 'Real-time prompts surface the right response before you stumble, so the conversation keeps moving.',
  },
  {
    icon: <Rocket size={ICON_CONSTANTS.size} color={ICON_CONSTANTS.color} />,
    title: 'Automatic Notes',
    description: 'Your conversations are captured and organized automatically.',
  },
  {
    icon: <ShieldCheck size={ICON_CONSTANTS.size} color={ICON_CONSTANTS.color} />,
    title: 'Works With Your Tech',
    description: 'Set up in minutes with any dialer or CRM',
  },
];
