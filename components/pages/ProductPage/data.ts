import type { WidgetPreset } from '@/components/SaysoWidget/data';

/** Which static widget view each product page shows, and the caption under it. */
export const PRODUCT_VISUALS: Record<string, { preset: WidgetPreset; caption: string }> = {
  cue: { preset: 'cues', caption: 'Sample call: cues update as the prospect talks, with LPMAMA underneath.' },
  'smart-capture': { preset: 'smartCapture', caption: 'Sample call: captured letters take their color, and each one keeps its note.' },
  pulse: { preset: 'pulse', caption: 'Sample market data for one zip code.' },
  playbook: { preset: 'playbook', caption: 'Sample Playbook script for a buyer lead.' },
};

/** Fallback for a product without its own view: the toolbar mid-call. */
export const DEFAULT_VISUAL: { preset: WidgetPreset; caption: string } = { preset: 'bar', caption: 'Sample call.' };
