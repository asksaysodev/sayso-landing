import type { GlossaryEntry } from './types';
import { circleProspecting } from './circle-prospecting';

const entries: GlossaryEntry[] = [circleProspecting];

export function getAllGlossaryEntries(): GlossaryEntry[] {
  return entries;
}

export function getGlossaryBySlug(slug: string): GlossaryEntry | null {
  return entries.find((e) => e.slug === slug) ?? null;
}

export function getAllGlossarySlugs(): string[] {
  return entries.map((e) => e.slug);
}

export type { GlossaryEntry } from './types';
