import type { ComparisonEntry } from './types';
import { saysoVsShilo } from './sayso-vs-shilo';

const entries: ComparisonEntry[] = [saysoVsShilo];

export function getAllComparisonEntries(): ComparisonEntry[] {
  return entries;
}

export function getComparisonBySlug(slug: string): ComparisonEntry | null {
  return entries.find((e) => e.slug === slug) ?? null;
}

export function getAllComparisonSlugs(): string[] {
  return entries.map((e) => e.slug);
}

export type { ComparisonEntry } from './types';
