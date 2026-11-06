'use client';

/**
 * Engine for the homepage guided demo. Holds the demo state in a ref (timers
 * always read the latest values) and re-renders on every change. Plays the
 * scripted call in timed stretches that stop or reset cancel, runs the call
 * timer, and moves the guided tour forward when the visitor does what the
 * current step asks.
 */
import { useEffect, useReducer, useRef } from 'react';
import { SAMPLE_MARKET, SAMPLE_NOTES } from '@/components/SaysoWidget/data';
import type { SaysoWidgetProps, WidgetControl } from '@/components/SaysoWidget/types';
import { prefersReducedMotion } from '@/lib/utils/motion';
import { HINT_DISMISS, HINT_START, PHASE_A, PHASE_B, PHASE_B2, PHASE_C, STEPS } from '../data';
import type { Beat, DemoState, StepKey } from '../types';

const NO_CAPS = [false, false, false, false, false, false];

const fresh = (): DemoState => ({
  lead: 'B',
  live: false,
  detect: true,
  starting: false,
  nudge: 0,
  insight: false,
  pulse: false,
  pulseShown: false,
  zipText: null,
  play: false,
  cues: [],
  caps: NO_CAPS,
  tip: null,
  secs: 0,
  step: 0,
  phaseADone: false,
  caption: { kind: 'hint', text: HINT_START },
});

const formatTime = (n: number) =>
  `${Math.floor(n / 3600)}:${String(Math.floor(n / 60) % 60).padStart(2, '0')}:${String(n % 60).padStart(2, '0')}`;

const HIGHLIGHT: Partial<Record<StepKey, WidgetControl>> = { start: 'start', zip: 'zip', play: 'play', stop: 'stop' };

export function useLiveDemo() {
  const s = useRef<DemoState>(fresh());
  const [, rerender] = useReducer((x: number) => x + 1, 0);
  const timers = useRef(new Set<ReturnType<typeof setTimeout>>());
  const clock = useRef<ReturnType<typeof setInterval>>();
  const talkTimer = useRef<ReturnType<typeof setTimeout>>();
  const token = useRef(0);
  const zipToken = useRef(0);
  const phaseDone = useRef({ B2: false, C: false });

  useEffect(() => {
    const pending = timers.current;
    return () => {
      pending.forEach(clearTimeout);
      clearInterval(clock.current);
    };
  }, []);

  const set = (patch: Partial<DemoState>) => {
    s.current = { ...s.current, ...patch };
    rerender();
  };

  const later = (fn: () => void, ms: number) => {
    const id = setTimeout(() => {
      timers.current.delete(id);
      fn();
    }, ms);
    timers.current.add(id);
    return id;
  };

  const stepKey = (): StepKey | undefined => STEPS[s.current.step]?.key;

  // ---------- the scripted call ----------
  const line = (who: 'prospect' | 'you') => {
    clearTimeout(talkTimer.current);
    if (who === 'you') {
      set({ caption: { kind: 'none' } });
      return;
    }
    if (s.current.caption.kind !== 'talk') set({ caption: { kind: 'talk' } });
    talkTimer.current = later(() => {
      if (s.current.caption.kind === 'talk') set({ caption: { kind: 'none' } });
    }, 2200);
  };

  const openInsight = (open: boolean) => set(open ? { insight: true } : { insight: false, tip: null });

  const capture = (i: number) => {
    const caps = [...s.current.caps];
    caps[i] = true;
    set({ caps });
    if (!s.current.insight) return;
    set({ tip: i });
    later(() => {
      // Keep L's note up while the tour is asking the visitor to look at it.
      if (s.current.tip === i && !(stepKey() === 'dot' && i === 0)) set({ tip: null });
    }, 2400);
  };

  const beat = (b: Beat) => {
    if (b.kind === 'prospect' || b.kind === 'you') line(b.kind);
    else if (b.kind === 'cue') set({ cues: [b.text, ...s.current.cues].slice(0, 4) });
    else if (b.kind === 'capture') capture(b.index);
    else openInsight(true);
  };

  /** Plays beats in order. Stop and reset bump the token, which cancels the rest. */
  const run = (beats: Beat[], done?: () => void) => {
    const mine = token.current;
    let t = 0;
    beats.forEach((b) => {
      t += b.delay;
      later(() => mine === token.current && beat(b), t);
    });
    later(() => mine === token.current && done?.(), t + 500);
  };

  // ---------- tour ----------
  const goStep = (n: number) => {
    set({ step: n });
    const key = STEPS[n]?.key;
    if (n === 0 && !s.current.live) set({ caption: { kind: 'hint', text: HINT_START } });
    if (key === 'zip') run(PHASE_B);
    if (key === 'stop') run(PHASE_C, () => (phaseDone.current.C = true));
  };

  /** Advance when the visitor did what the current step asks. */
  const hit = (key: StepKey) => {
    const at = s.current.step;
    if (STEPS[at]?.key !== key) return;
    if (key === 'start') {
      goStep(at + 1);
      return;
    }
    later(() => s.current.step === at && goStep(at + 1), key === 'dot' ? 1200 : 600);
    if (key === 'dot') later(() => s.current.tip === 0 && set({ tip: null }), 2400);
  };

  // ---------- widget controls ----------
  const startClock = () => {
    clearInterval(clock.current);
    clock.current = setInterval(() => set({ secs: s.current.secs + 1 }), 1000);
  };

  const actions: Record<WidgetControl, () => void> = {
    start() {
      if (s.current.live || s.current.starting) return;
      set({ starting: true });
      later(() => {
        set({ starting: false, live: true, detect: false, secs: 0, caption: { kind: 'none' } });
        startClock();
        run(PHASE_A, () => {
          set({ phaseADone: true });
          if (stepKey() === 'watch') goStep(s.current.step + 1);
        });
      }, 300);
    },
    dismiss() {
      if (!s.current.detect || s.current.live) return;
      set({ nudge: s.current.nudge + 1, caption: { kind: 'hint', text: HINT_DISMISS } });
    },
    zip() {
      const mine = ++zipToken.current;
      if (s.current.pulse) {
        set({ pulse: false, pulseShown: false, zipText: null });
        return;
      }
      set({ pulse: true, zipText: '' });
      const zip = SAMPLE_MARKET.zip;
      for (let i = 1; i <= zip.length; i++) {
        later(() => {
          if (mine !== zipToken.current) return;
          if (i < zip.length) {
            set({ zipText: zip.slice(0, i) });
            return;
          }
          set({ zipText: null, pulseShown: true });
          if (s.current.live && !phaseDone.current.B2) {
            phaseDone.current.B2 = true;
            run(PHASE_B2);
          }
        }, 90 * i);
      }
    },
    cues() {
      if (s.current.live) openInsight(!s.current.insight);
    },
    play() {
      set({ play: !s.current.play });
    },
    stop() {
      token.current++;
      zipToken.current++;
      clearInterval(clock.current);
      clearTimeout(talkTimer.current);
      set({ live: false, insight: false, pulse: false, pulseShown: false, zipText: null, play: false, tip: null, caption: { kind: 'none' } });
    },
    reset() {
      token.current++;
      zipToken.current++;
      clearInterval(clock.current);
      clearTimeout(talkTimer.current);
      phaseDone.current = { B2: false, C: false };
      s.current = fresh();
      rerender();
    },
    lead() {
      set({ lead: s.current.lead === 'B' ? 'S' : 'B' });
    },
    copy() {
      const notes = SAMPLE_NOTES.filter((_, i) => s.current.caps[i]).join('\n');
      if (notes) navigator.clipboard?.writeText(notes).catch(() => undefined);
    },
  };

  const onAction = (control: WidgetControl) => {
    actions[control]();
    if (control === 'start' || control === 'zip' || control === 'play' || control === 'stop') hit(control);
  };

  const onDotSelect = (i: number) => {
    if (!s.current.caps[i]) return;
    if (s.current.insight) set({ tip: i });
    if (i === 0) hit('dot');
  };

  const scrollToDemo = () => {
    const el = document.getElementById('demo');
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 78;
    if (Math.abs(window.scrollY - top) > 40) {
      window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    }
  };

  /** The step card's main button: does the step for the visitor. */
  const showMe = () => {
    scrollToDemo();
    const key = stepKey();
    if (!key) return;
    if (key === 'watch') {
      goStep(s.current.step + 1);
      return;
    }
    if (key === 'dot') {
      if (!s.current.insight) openInsight(true);
      set({ tip: 0 });
      hit('dot');
      return;
    }
    onAction(key);
  };

  const st = s.current;
  const key = STEPS[st.step]?.key;
  const showAlert = st.detect && !st.live;

  const widget: SaysoWidgetProps = {
    view: showAlert ? 'alert' : 'widget',
    alertLeaving: st.starting,
    alertNudge: st.nudge,
    lead: st.lead,
    live: st.live,
    time: formatTime(st.secs),
    insightOpen: st.insight,
    cues: st.cues,
    captured: st.caps,
    note: st.tip,
    pulseOpen: st.pulseShown,
    zipText: st.zipText ?? undefined,
    animatePulse: true,
    playbookOpen: st.play,
    morph: true,
    highlight: key ? HIGHLIGHT[key] ?? null : null,
    highlightDot: key === 'dot' ? 0 : null,
    watchInsight: key === 'watch',
    interactive: true,
    onAction,
    onDotSelect,
  };

  return {
    widget,
    narrowWidth: showAlert ? 480 : 604,
    stepIndex: st.step,
    stepKey: key,
    starting: st.starting,
    phaseADone: st.phaseADone,
    caption: st.caption,
    showMe,
    skip: () => goStep(STEPS.length),
    restart: () => actions.reset(),
  };
}
