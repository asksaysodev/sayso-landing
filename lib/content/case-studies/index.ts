import type { CaseStudyEntry } from './types';
import { exampleTeam } from './example-team';

const entries: CaseStudyEntry[] = [exampleTeam];

export function getAllCaseStudyEntries(): CaseStudyEntry[] {
  return entries;
}

export function getCaseStudyBySlug(slug: string): CaseStudyEntry | null {
  return entries.find((e) => e.slug === slug) ?? null;
}

export function getAllCaseStudySlugs(): string[] {
  return entries.map((e) => e.slug);
}

export type { CaseStudyEntry } from './types';
