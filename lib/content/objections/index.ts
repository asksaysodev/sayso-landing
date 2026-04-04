import type { ObjectionEntry } from './types';
import { notReadyYet } from './not-ready-yet';

const entries: ObjectionEntry[] = [notReadyYet];

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
