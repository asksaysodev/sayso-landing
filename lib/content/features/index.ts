import type { FeatureEntry } from './types';
import { realTimeCoaching } from './real-time-coaching';
import { callNotes } from './call-notes';
import { pulse } from './pulse';
import { playbook } from './playbook';

const entries: FeatureEntry[] = [realTimeCoaching, callNotes, pulse, playbook];

export function getAllFeatureEntries(): FeatureEntry[] {
  return entries;
}

export function getFeatureBySlug(slug: string): FeatureEntry | null {
  return entries.find((e) => e.slug === slug) ?? null;
}

export function getAllFeatureSlugs(): string[] {
  return entries.map((e) => e.slug);
}

export type { FeatureEntry } from './types';
