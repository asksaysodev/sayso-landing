import type { FeatureEntry } from './types';
import { cue } from './cue';
import { smartCapture } from './smart-capture';
import { pulse } from './pulse';
import { playbook } from './playbook';

const entries: FeatureEntry[] = [cue, smartCapture, pulse, playbook];

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
