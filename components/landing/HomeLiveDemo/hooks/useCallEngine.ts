'use client';

/**
 * Call engine for the homepage guided demo. Holds the demo state in a ref
 * (timers always read the latest values), re-renders on every change, plays
 * the scripted call in timed stretches, runs the call clock and handles the
 * widget controls. Every delayed callback is tracked and token-guarded:
 * the yellow reset button cancels the call and starts a new one, cancelAll
 * (stop, Skip tour, Start over, unmount) clears every pending timer.
 */
import { useEffect, useReducer, useRef } from 'react';
import { SAMPLE_MARKET, SAMPLE_NOTES } from '@/components/SaysoWidget/data';
import type { WidgetControl } from '@/components/SaysoWidget/types';
import { HINT_DISMISS, NEW_CALL, PHASE_A, PHASE_B2, fresh } from '../data';
import type { Beat, DemoState } from '../types';

interface EngineHooks {
  /** The opening stretch of the call finished. */
  onPhaseADone: () => void;
  /** True when the yellow reset button should replay the call opening (false leaves an empty call). */
  replayOnReset: () => boolean;
}

export function useCallEngine(hooks: EngineHooks) {
  const s = useRef(fresh());
  const [, rerender] = useReducer((x: number) => x + 1, 0);
  const hooksRef = useRef(hooks);
  hooksRef.current = hooks;
  const timers = useRef(new Set<ReturnType<typeof setTimeout>>());
  const clock = useRef<ReturnType<typeof setInterval>>();
  const talkTimer = useRef<ReturnType<typeof setTimeout>>();
  /** Bumped by reset, stop, Skip tour and Start over: cancels the scripted call. */
  const callToken = useRef(0);
  /** Bumped by stop, Skip tour and Start over: cancels every delayed callback. */
  const sessionToken = useRef(0);
  const zipToken = useRef(0);
  const phaseB2Done = useRef(false);

  const set = (patch: Partial<DemoState>) => {
    s.current = { ...s.current, ...patch };
    rerender();
  };

  const later = (fn: () => void, ms: number) => {
    const session = sessionToken.current;
    const id = setTimeout(() => {
      timers.current.delete(id);
      if (session === sessionToken.current) fn();
    }, ms);
    timers.current.add(id);
    return id;
  };

  /** Runs fn later only if the call has not been stopped or reset since. */
  const laterInCall = (fn: () => void, ms: number) => {
    const call = callToken.current;
    return later(() => call === callToken.current && fn(), ms);
  };

  const stopCall = () => {
    callToken.current++;
    // A fresh call should replay the agent's Pulse answer.
    phaseB2Done.current = false;
    zipToken.current++;
    clearInterval(clock.current);
    clearTimeout(talkTimer.current);
  };

  /** Stops the call and clears every pending timer. */
  const cancelAll = () => {
    stopCall();
    sessionToken.current++;
    timers.current.forEach(clearTimeout);
    timers.current.clear();
  };

  useEffect(() => cancelAll, []); // eslint-disable-line react-hooks/exhaustive-deps

  const line = (who: 'prospect' | 'you') => {
    clearTimeout(talkTimer.current);
    if (who === 'you') return set({ caption: { kind: 'none' } });
    if (s.current.caption.kind !== 'talk') set({ caption: { kind: 'talk' } });
    talkTimer.current = later(() => s.current.caption.kind === 'talk' && set({ caption: { kind: 'none' } }), 2200);
  };

  const openInsight = (open: boolean) => set(open ? { insight: true } : { insight: false, tip: null });

  const capture = (i: number) => {
    const caps = [...s.current.caps];
    caps[i] = true;
    set({ caps });
    if (!s.current.insight) return;
    set({ tip: i });
    later(() => s.current.tip === i && set({ tip: null }), 2400);
  };

  const beat = (b: Beat) => {
    if (b.kind === 'prospect' || b.kind === 'you') line(b.kind);
    else if (b.kind === 'cue') set({ cues: [b.text, ...s.current.cues].slice(0, 4) });
    else if (b.kind === 'capture') capture(b.index);
    else openInsight(true);
  };

  /** Plays beats in order; stopping or resetting the call cancels the rest. */
  const run = (beats: Beat[], done?: () => void) => {
    let t = 0;
    beats.forEach((b) => {
      t += b.delay;
      laterInCall(() => beat(b), t);
    });
    laterInCall(() => done?.(), t + 500);
  };

  const startClock = () => {
    clearInterval(clock.current);
    clock.current = setInterval(() => set({ secs: s.current.secs + 1 }), 1000);
  };

  const playOpening = () =>
    run(PHASE_A, () => {
      set({ phaseADone: true });
      hooksRef.current.onPhaseADone();
    });

  /** Back to the call alert with nothing played: the tour starts again at step 1. */
  const restart = () => {
    cancelAll();
    s.current = fresh();
    rerender();
  };

  const actions: Record<WidgetControl, () => void> = {
    start() {
      if (s.current.live || s.current.starting) return;
      set({ starting: true });
      laterInCall(() => {
        set({ starting: false, live: true, detect: false, secs: 0, caption: { kind: 'none' } });
        startClock();
        playOpening();
      }, 300);
    },
    dismiss() {
      if (s.current.detect && !s.current.live) set({ nudge: s.current.nudge + 1, caption: { kind: 'hint', text: HINT_DISMISS } });
    },
    zip() {
      const mine = ++zipToken.current;
      if (s.current.pulse) return set({ pulse: false, pulseShown: false, zipText: null });
      set({ pulse: true, zipText: '' });
      const zip = SAMPLE_MARKET.zip;
      for (let i = 1; i <= zip.length; i++) {
        later(() => {
          if (mine !== zipToken.current) return;
          if (i < zip.length) return set({ zipText: zip.slice(0, i) });
          set({ zipText: null, pulseShown: true });
          if (s.current.live && !phaseB2Done.current) {
            phaseB2Done.current = true;
            run(PHASE_B2);
          }
        }, 90 * i);
      }
    },
    cues: () => s.current.live && openInsight(!s.current.insight),
    play: () => set({ play: !s.current.play }),
    stop: restart,
    /** A new call on the same tour step: clock back to zero, letters and cues cleared, panels closed. */
    reset() {
      if (!s.current.live) return;
      stopCall();
      const replay = hooksRef.current.replayOnReset();
      set({ ...NEW_CALL, phaseADone: !replay });
      startClock();
      if (replay) playOpening();
    },
    lead: () => set({ lead: s.current.lead === 'B' ? 'S' : 'B' }),
    copy() {
      const notes = SAMPLE_NOTES.filter((_, i) => s.current.caps[i]).join('\n');
      if (notes) navigator.clipboard?.writeText(notes).catch(() => undefined);
    },
  };

  return { s, set, later, run, actions, openInsight, cancelAll, restart };
}
