/**
 * Types for the guided live demo on the homepage.
 */
import type { LeadType } from '@/components/SaysoWidget/types';

/** Guided tour step keys. Each key matches the widget control the step points at. */
export type StepKey = 'start' | 'watch' | 'dot' | 'zip' | 'play' | 'reset';

export interface TourStep {
  key: StepKey;
  title: string;
  body: string;
}

/**
 * One moment of the scripted call. `delay` is milliseconds after the previous
 * beat. Spoken lines are not shown on screen (only a "Prospect is talking"
 * indicator); the text documents the call the cues respond to.
 */
export type Beat =
  | { delay: number; kind: 'prospect' | 'you'; text: string }
  | { delay: number; kind: 'cue'; text: string }
  | { delay: number; kind: 'capture'; index: number }
  | { delay: number; kind: 'openCues' };

export type Caption = { kind: 'none' } | { kind: 'hint'; text: string } | { kind: 'talk' };

export interface DemoState {
  lead: LeadType;
  live: boolean;
  /** Call alert showing (before Start). */
  detect: boolean;
  /** Alert exit animation playing. */
  starting: boolean;
  nudge: number;
  insight: boolean;
  /** Pulse toggled on (the zip may still be typing). */
  pulse: boolean;
  /** Pulse panel open. */
  pulseShown: boolean;
  zipText: string | null;
  play: boolean;
  cues: string[];
  caps: boolean[];
  tip: number | null;
  secs: number;
  step: number;
  phaseADone: boolean;
  caption: Caption;
}
