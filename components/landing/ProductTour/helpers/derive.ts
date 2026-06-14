import type { Chapter, LpmamaField, Speaker } from '../types';

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

export interface DerivedScene {
  /** Call timer value (seconds) shown in the FUB call bar and Sayso timer. */
  callSeconds: number;
  /** Who is talking right now, for the speaking indicator (null = silence). */
  speaker: Speaker | null;
  /** The newest Cue insight, shown as a toast bubble while fresh. */
  toastInsight: { id: string; text: string } | null;
  /** All Cue insights that have arrived, newest first (for the eye panel). */
  panelInsights: { id: string; text: string }[];
  /** Captured LPMAMA values keyed by field (null until captured). */
  lpmama: Record<LpmamaField, string | null>;
  /** True once every LPMAMA field is captured (drives the Copy state). */
  lpmamaComplete: boolean;
  /** Whether the "Sync to Follow Up Boss" button has been pressed. */
  synced: boolean;
  /** Whether the Sayso note has been written into the FUB timeline. */
  crmNoteVisible: boolean;
}

const TOAST_VISIBLE_MS = 4200;

export function deriveScene(chapter: Chapter, elapsed: number): DerivedScene {
  const callSeconds = chapter.baseCallSeconds + Math.floor(elapsed / 1000);

  const speakingLine = chapter.transcript.find(
    (e) => elapsed >= e.at && elapsed < e.at + speakMs(e.text),
  );

  const arrivedInsights = chapter.insights.filter((e) => elapsed >= e.at);
  const panelInsights = [...arrivedInsights]
    .sort((a, b) => b.at - a.at)
    .slice(0, 5)
    .map((e) => ({ id: `${chapter.key}-${e.at}`, text: e.text }));

  const freshInsight = [...arrivedInsights]
    .reverse()
    .find((e) => elapsed - e.at < TOAST_VISIBLE_MS);
  const toastInsight = freshInsight
    ? { id: `${chapter.key}-${freshInsight.at}`, text: freshInsight.text }
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

  const synced = chapter.syncAt !== undefined && elapsed >= chapter.syncAt;
  const crmNoteVisible = chapter.crmNoteAt !== undefined && elapsed >= chapter.crmNoteAt;

  return {
    callSeconds,
    speaker: speakingLine?.from ?? null,
    toastInsight,
    panelInsights,
    lpmama,
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
