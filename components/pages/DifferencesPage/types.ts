import type { LucideIcon } from 'lucide-react';

/** One card in the engine differentiators grid. */
export interface EngineDifference {
  title: string;
  description: string;
  icon: LucideIcon;
}

/** One card in the side-by-side comparison grid. */
export interface CompetitorComparison {
  name: string;
  /** The competitor's actual website. Omitted for non-software alternatives like in-person coaching. */
  siteUrl?: string;
  /** Short label shown for the external link (e.g. "shilo.ai"). */
  siteLabel?: string;
  theirApproach: string;
  saysoDifference: string;
}
