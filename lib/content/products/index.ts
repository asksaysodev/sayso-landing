import type { ProductEntry } from './types';
import { cue } from './cue';
import { smartCapture } from './smart-capture';
import { pulse } from './pulse';
import { playbook } from './playbook';

const entries: ProductEntry[] = [cue, smartCapture, pulse, playbook];

export function getAllProductEntries(): ProductEntry[] {
  return entries;
}

export function getProductBySlug(slug: string): ProductEntry | null {
  return entries.find((e) => e.slug === slug) ?? null;
}

export function getAllProductSlugs(): string[] {
  return entries.map((e) => e.slug);
}

export type { ProductEntry } from './types';
