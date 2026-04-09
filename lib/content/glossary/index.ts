import type { GlossaryEntry } from './types';
import { circleProspecting } from './circle-prospecting';
import { coldCallingRealEstate } from './cold-calling-real-estate';
import { doorKnocking } from './door-knocking';
import { fsbo } from './fsbo';
import { isaRealEstate } from './isa-real-estate';
import { leadNurturing } from './lead-nurturing';
import { listingAppointment } from './listing-appointment';
import { sphereOfInfluence } from './sphere-of-influence';

const entries: GlossaryEntry[] = [circleProspecting, coldCallingRealEstate, doorKnocking, fsbo, isaRealEstate, leadNurturing, listingAppointment, sphereOfInfluence];

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
