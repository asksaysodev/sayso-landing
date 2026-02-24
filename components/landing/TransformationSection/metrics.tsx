import { CalendarCheck, TrendingUp, Rocket, ShieldCheck } from 'lucide-react';

const ICON_CONSTANTS = { size: 28, color: '#2367EE' };

export const metrics = [
  {
    icon: <CalendarCheck size={ICON_CONSTANTS.size} color={ICON_CONSTANTS.color} />,
    title: 'More Appointments',
    description: 'Book meetings at the right moment',
  },
  {
    icon: <TrendingUp size={ICON_CONSTANTS.size} color={ICON_CONSTANTS.color} />,
    title: 'Real Time Assistance',
    description: 'Higher quality conversations create higher quality appointments',
  },
  {
    icon: <Rocket size={ICON_CONSTANTS.size} color={ICON_CONSTANTS.color} />,
    title: 'Set up in minutes',
    description: 'Works in any CRM or dialer',
  },
  {
    icon: <ShieldCheck size={ICON_CONSTANTS.size} color={ICON_CONSTANTS.color} />,
    title: 'Always-On Guidance',
    description: 'Real-time support on every call',
  },
];
