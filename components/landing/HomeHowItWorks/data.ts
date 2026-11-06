/** The three How it works cards: a headline and the static widget view shown above it. */
import type { WidgetPreset } from '@/components/SaysoWidget/data';

export const HOW_STEPS: { title: string; preset: WidgetPreset }[] = [
  { title: 'Press Start when Sayso spots your call', preset: 'alert' },
  { title: 'Sayso guides the conversation in real time', preset: 'cues' },
  { title: 'While you talk, Sayso takes notes for your CRM', preset: 'notes' },
];

