import type { UseCaseEntry } from './types';
import { soloAgents } from './solo-agents';
import { teamLeaders } from './team-leaders';
import { newAgents } from './new-agents';
import { isas } from './isas';

const entries: UseCaseEntry[] = [soloAgents, teamLeaders, newAgents, isas];

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
