/**
 * The four Sayso products in the Features section: tab label and subtitle,
 * panel headline and copy, product page link and the static widget view.
 */
import type { WidgetPreset } from '@/components/SaysoWidget/data';

export type FeatureIcon = 'bolt' | 'check' | 'search' | 'list';

export interface Feature {
  id: string;
  name: string;
  sub: string;
  title: string;
  body: string;
  href: string;
  icon: FeatureIcon;
  preset: WidgetPreset;
}

export const FEATURES: Feature[] = [
  {
    id: 'cue',
    name: 'Cue',
    sub: 'Real-time context based guidance',
    title: 'Know what to say the moment you need it.',
    body: 'Sayso listens to your live call, understands the context and shows a short cue for your next move, so you never have to memorize a script.',
    href: '/products/cue/',
    icon: 'bolt',
    preset: 'cues',
  },
  {
    id: 'smart-capture',
    name: 'Smart Capture',
    sub: 'Structured call notes',
    title: 'Notes that write themselves while you talk.',
    body: 'Smart Capture listens to the call and records key details in real time, sorted into LPMAMA, so you stay focused on the person on the line.',
    href: '/products/smart-capture/',
    icon: 'check',
    preset: 'smartCapture',
  },
  {
    id: 'pulse',
    name: 'Pulse',
    sub: 'Live market analysis mid-call',
    title: 'Answer market questions on the spot.',
    body: 'Enter a zip code during the call and see the numbers that matter: prices, days on market, inventory and trends.',
    href: '/products/pulse/',
    icon: 'search',
    preset: 'pulse',
  },
  {
    id: 'playbook',
    name: 'Playbook',
    sub: 'Custom scripts for every scenario',
    title: 'Your scripts, on screen during the call.',
    body: 'Upload your scripts, frameworks or talk tracks. They appear right alongside Cue, so there are no tabs to switch and no place to lose.',
    href: '/products/playbook/',
    icon: 'list',
    preset: 'playbook',
  },
];
