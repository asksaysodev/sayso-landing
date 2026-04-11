import type { ObjectionEntry } from './types';
import { alreadyHaveAnAgent } from './already-have-an-agent';
import { justLooking } from './just-looking';
import { notReadyYet } from './not-ready-yet';
import { priceTooHigh } from './price-too-high';

const entries: ObjectionEntry[] = [alreadyHaveAnAgent, justLooking, notReadyYet, priceTooHigh];

export function getAllObjectionEntries(): ObjectionEntry[] {
  return entries;
}

export function getObjectionBySlug(slug: string): ObjectionEntry | null {
  return entries.find((e) => e.slug === slug) ?? null;
}

export function getAllObjectionSlugs(): string[] {
  return entries.map((e) => e.slug);
}

export type { ObjectionEntry } from './types';
