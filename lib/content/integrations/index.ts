import type { IntegrationEntry } from './types';
import { followUpBoss } from './follow-up-boss';

const entries: IntegrationEntry[] = [followUpBoss];

export function getAllIntegrationEntries(): IntegrationEntry[] {
  return entries;
}

export function getIntegrationBySlug(slug: string): IntegrationEntry | null {
  return entries.find((e) => e.slug === slug) ?? null;
}

export function getAllIntegrationSlugs(): string[] {
  return entries.map((e) => e.slug);
}

export type { IntegrationEntry } from './types';
