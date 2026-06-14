import type { Chapter, LpmamaField, PromptEvent, Speaker } from '../types';

/** Rough speaking duration for a transcript line, used for the speaking indicator. */
function speakMs(text: string): number {
  // ~45ms per character, clamped so short lines still read as "speaking".
  return Math.max(1400, Math.min(6000, text.length * 45));
}

const LPMAMA_FIELDS: LpmamaField[] = [
  'location',
  'price',
  'motivation',
  'agent',
  'mortgage',
  'appointment',
];

const LPMAMA_LABELS: Record<LpmamaField, string> = {
  location: 'Location',
  price: 'Price',
  motivation: 'Motivation',
  agent: 'Agent',
  mortgage: 'Mortgage',
  appointment: 'Appointment',
};

/** How long a Smart Capture "just captured" bubble stays on screen. */
const CAPTURE_BUBBLE_MS = 2800;

export interface DerivedScene {
  /** Call timer value (seconds) shown in the FUB call bar and Sayso timer. */
  callSeconds: number;
  /** Who is talking right now, for the speaking indicator (null = silence). */
  speaker: Speaker | null;
  /** Cue prompts revealed so far, in both forms (null outside the Cue chapter). */
  cuePrompts: { condensed: PromptEvent[]; full: PromptEvent[] } | null;
  /** Captured LPMAMA values keyed by field (null until captured). */
  lpmama: Record<LpmamaField, string | null>;
  /** The field captured most recently, for the transient capture bubble. */
  recentCapture: { field: LpmamaField; label: string; value: string } | null;
  /** True once every LPMAMA field is captured (drives the Copy state). */
  lpmamaComplete: boolean;
  /** Whether the "Sync to Follow Up Boss" button has been pressed. */
  synced: boolean;
  /** Whether the Sayso note has been written into the FUB timeline. */
  crmNoteVisible: boolean;
}

export function deriveScene(chapter: Chapter, elapsed: number): DerivedScene {
  const callSeconds = chapter.baseCallSeconds + Math.floor(elapsed / 1000);

  const speakingLine = chapter.transcript.find(
    (e) => elapsed >= e.at && elapsed < e.at + speakMs(e.text),
  );

  const cuePrompts = chapter.cue
    ? {
        condensed: chapter.cue.condensed.filter((p) => elapsed >= p.at),
        full: chapter.cue.full.filter((p) => elapsed >= p.at),
      }
    : null;

  const lpmama = LPMAMA_FIELDS.reduce(
    (acc, field) => {
      const event = chapter.lpmama.find((e) => e.field === field && elapsed >= e.at);
      acc[field] = event ? event.value : null;
      return acc;
    },
    {} as Record<LpmamaField, string | null>,
  );
  const lpmamaComplete = LPMAMA_FIELDS.every((f) => lpmama[f] !== null);

  // The most recently captured field still within the bubble display window.
  const recentEvent = [...chapter.lpmama]
    .filter((e) => elapsed >= e.at && elapsed - e.at < CAPTURE_BUBBLE_MS)
    .sort((a, b) => b.at - a.at)[0];
  const recentCapture = recentEvent
    ? { field: recentEvent.field, label: LPMAMA_LABELS[recentEvent.field], value: recentEvent.value }
    : null;

  const synced = chapter.syncAt !== undefined && elapsed >= chapter.syncAt;
  const crmNoteVisible = chapter.crmNoteAt !== undefined && elapsed >= chapter.crmNoteAt;

  return {
    callSeconds,
    speaker: speakingLine?.from ?? null,
    cuePrompts,
    lpmama,
    recentCapture,
    lpmamaComplete,
    synced,
    crmNoteVisible,
  };
}

/** Formats seconds as h:mm:ss to match the Follow Up Boss / Sayso timers. */
export function formatCallTimer(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}
