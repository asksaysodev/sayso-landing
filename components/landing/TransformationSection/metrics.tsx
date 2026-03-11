import { CalendarCheck, TrendingUp, Rocket, ShieldCheck } from 'lucide-react';

const ICON_CONSTANTS = { size: 28, color: '#2367EE' };

export const metrics = [
  {
    icon: <CalendarCheck size={ICON_CONSTANTS.size} color={ICON_CONSTANTS.color} />,
    title: 'More Appointments',
    description: 'Turn better conversations into more qualified meetings.',
  },
  {
    icon: <TrendingUp size={ICON_CONSTANTS.size} color={ICON_CONSTANTS.color} />,
    title: 'Better Conversations',
    description: 'Real-time guidance to help agents be the expert in every scenario.',
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
