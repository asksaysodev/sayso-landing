/**
 * Shared types for the Product Tour: an autoplaying, browser-realistic demo of
 * Sayso working as an overlay on top of a Follow Up Boss-style dialer.
 *
 * The tour is a set of feature "chapters". One chapter is spotlighted at a time
 * (selected by the pill bar or auto-advanced). Each chapter is driven by a single
 * clock (see hooks/useTourClock.ts): every visual is derived from `elapsed`.
 */

export type FeatureKey = 'cue' | 'smart-capture' | 'pulse' | 'playbook';

export type LeadType = 'Buyer' | 'Seller';

export type Speaker = 'agent' | 'prospect';

export type LpmamaField =
  | 'location'
  | 'price'
  | 'motivation'
  | 'agent'
  | 'mortgage'
  | 'appointment';

/** Pill-bar metadata for a feature. */
export interface FeatureMeta {
  key: FeatureKey;
  /** Short name shown on the pill, e.g. "Cue". */
  shortLabel: string;
  /** Product name + descriptor, e.g. "Cue · Real-Time Coaching". */
  label: string;
  /** Short line shown directly under the pills, e.g. "Custom scripts, on screen". */
  tagline: string;
  /** One-line caption (longer form, kept for reference / future use). */
  caption: string;
}

/** A line of the live transcript, revealed at `at` ms into the chapter. */
export interface TranscriptEvent {
  at: number;
  from: Speaker;
  text: string;
}

/** A Cue coaching prompt that appears at `at` ms (stacked, stays on screen). */
export interface PromptEvent {
  at: number;
  text: string;
}

/**
 * Cue prompts in two forms the viewer can toggle between: condensed coaching
 * directives, or the full suggested wording.
 */
export interface CuePrompts {
  condensed: PromptEvent[];
  full: PromptEvent[];
}

/** A Smart Capture LPMAMA field that fills in at `at` ms. */
export interface LpmamaEvent {
  at: number;
  field: LpmamaField;
  /** The captured quote/value, shown in the dot tooltip and the CRM note. */
  value: string;
}

/** A single market-data fact shown in the Pulse dropdown. */
export interface PulseFact {
  label: string;
  value: string;
  trend?: 'up' | 'down';
}

/** Pulse (live market data) scene timing + content. */
export interface PulseScene {
  /** When the agent finishes typing the zip (pill becomes active). */
  zipValidAt: number;
  /** When the dropdown opens. */
  openAt: number;
  /** When the "Processing" spinner resolves to results. */
  resultsAt: number;
  zip: string;
  city: string;
  facts: PulseFact[];
}

/** Playbook (custom script overlay) scene content. */
export interface PlaybookScene {
  /** When the playbook panel slides in. */
  openAt: number;
  sections: { heading: string; bullets: string[] }[];
}

/** One feature chapter of the tour. */
export interface Chapter {
  key: FeatureKey;
  /** Total length of the chapter in ms before auto-advancing. */
  durationMs: number;
  /** Call timer value (seconds) the chapter starts at, for a continuous-call feel. */
  baseCallSeconds: number;
  /** Lead type shown in the toolbar for this chapter. */
  leadType: LeadType;
  transcript: TranscriptEvent[];
  /** Cue coaching prompts (condensed + full), shown stacked. */
  cue?: CuePrompts;
  lpmama: LpmamaEvent[];
  pulse?: PulseScene;
  playbook?: PlaybookScene;
  /** When the "Sync to Follow Up Boss" button is pressed (Smart Capture). */
  syncAt?: number;
  /**
   * When set, the chapter ends by showing the call wrap up and the Sayso note
   * being written into the Follow Up Boss timeline (the "auto-log to CRM" payoff).
   */
  crmNoteAt?: number;
}

/** The made-up prospect/contact shown in the Follow Up Boss frame. */
export interface DemoProspect {
  name: string;
  phone: string;
  email: string;
  address: string[];
  leadSource: string;
  stage: string;
  lastCommunication: string;
  initials: string;
}
