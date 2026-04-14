import type { HubPageConfig } from './types';

const hubConfigs: Record<string, HubPageConfig> = {};

export function registerHub(config: HubPageConfig) {
  hubConfigs[config.slug] = config;
}

export function getHubConfig(slug: string): HubPageConfig | null {
  return hubConfigs[slug] ?? null;
}

export function getAllHubConfigs(): HubPageConfig[] {
  return Object.values(hubConfigs);
}
