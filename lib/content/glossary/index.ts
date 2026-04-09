import type { GlossaryEntry } from './types';
import { circleProspecting } from './circle-prospecting';
import { coldCallingRealEstate } from './cold-calling-real-estate';
import { fsbo } from './fsbo';
import { isaRealEstate } from './isa-real-estate';
import { listingAppointment } from './listing-appointment';

const entries: GlossaryEntry[] = [circleProspecting, coldCallingRealEstate, fsbo, isaRealEstate, listingAppointment];

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
