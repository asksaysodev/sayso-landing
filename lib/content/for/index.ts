import type { UseCaseEntry } from './types';
import { soloAgents } from './solo-agents';
import { teamLeaders } from './team-leaders';

const entries: UseCaseEntry[] = [soloAgents, teamLeaders];

export function getAllUseCaseEntries(): UseCaseEntry[] {
  return entries;
}

export function getUseCaseBySlug(slug: string): UseCaseEntry | null {
  return entries.find((e) => e.slug === slug) ?? null;
}

export function getAllUseCaseSlugs(): string[] {
  return entries.map((e) => e.slug);
}

export type { UseCaseEntry } from './types';
