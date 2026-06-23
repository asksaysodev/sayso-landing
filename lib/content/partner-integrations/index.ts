import type { PartnerIntegrationEntry } from './types';
import { suresend } from './suresend';
import { followUpBoss } from './follow-up-boss';

const entries: PartnerIntegrationEntry[] = [followUpBoss, suresend];

export function getAllPartnerIntegrations(): PartnerIntegrationEntry[] {
  return entries;
}

export function getPartnerIntegrationBySlug(
  slug: string,
): PartnerIntegrationEntry | null {
  return entries.find((e) => e.slug === slug) ?? null;
}

export function getAllPartnerIntegrationSlugs(): string[] {
  return entries.map((e) => e.slug);
}

export type { PartnerIntegrationEntry } from './types';
