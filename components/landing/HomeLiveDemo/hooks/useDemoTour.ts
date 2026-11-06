'use client';

/**
 * Guided tour for the homepage demo, layered on the call engine. Moves the
 * tour forward when the visitor does what the current step asks, powers the
 * step card's Show me, Skip tour and Start over buttons, and builds the props
 * for the live widget. Stop sends the tour back to step 1; the yellow reset
 * button starts a new call on the same step.
 */
import type { SaysoWidgetProps, WidgetControl } from '@/components/SaysoWidget/types';
import { useRef, useState } from 'react';
import { prefersReducedMotion } from '@/lib/utils/motion';
import { PHASE_B, PHASE_C, STEPS, STOPPED } from '../data';
import type { StepKey } from '../types';
import { useCallEngine } from './useCallEngine';

const formatTime = (n: number) =>
  `${Math.floor(n / 3600)}:${String(Math.floor(n / 60) % 60).padStart(2, '0')}:${String(n % 60).padStart(2, '0')}`;

const HIGHLIGHT: Partial<Record<StepKey, WidgetControl>> = { start: 'start', zip: 'zip', play: 'play', reset: 'reset' };

const scrollToDemo = () => {
  const el = document.getElementById('demo');
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 78;
  if (Math.abs(window.scrollY - top) > 40) window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
};

export function useDemoTour() {
  /** The step already counting down to the next one (hover, tap and Show me fire hit more than once). */
  const advancing = useRef(-1);
  /** Step whose action the visitor already did (hides Click here until the next step). */
  const [acted, setActed] = useState(-1);
  const stepKey = (): StepKey | undefined => STEPS[engine.s.current.step]?.key;

  const engine = useCallEngine({
    // Let the last cue settle before the card moves on to Smart Capture.
    onPhaseADone: () => {
      const at = engine.s.current.step;
      if (stepKey() === 'watch') engine.later(() => engine.s.current.step === at && goStep(at + 1), 1600);
    },
    // L's note waits for the visitor on step 3, so it does not pop open on its own first.
    autoTip: (i) => i !== 0 || !(stepKey() === 'watch' || stepKey() === 'dot'),
    // On the last step, reset leaves an empty call (timer running, cues closed); elsewhere the call replays.
    replayOnReset: () => stepKey() !== 'reset',
  });
  const { s, set, later, run, actions, openInsight, cancelAll, restart, newCall } = engine;

  const goStep = (n: number) => {
    advancing.current = -1;
    const key = STEPS[n]?.key;
    // Step 3 shows L's note only when the visitor hovers or taps L.
    set(key === 'dot' ? { step: n, tip: null } : { step: n });
    if (key === 'zip') run(PHASE_B);
    if (key === 'reset') run(PHASE_C);
  };

  /**
   * How long the result of each step stays on screen before the card moves on:
   * long enough to read L's note, and for Pulse to open and the agent to answer.
   */
  const SETTLE: Partial<Record<StepKey, number>> = { dot: 2000, zip: 3200, play: 900, reset: 900 };

  /** Advance when the visitor did what the current step asks. */
  const hit = (key: StepKey) => {
    const at = s.current.step;
    if (STEPS[at]?.key !== key || advancing.current === at) return;
    // The visitor did the step: the Click here pointer goes away at once.
    setActed(at);
    if (key === 'start') return goStep(at + 1);
    advancing.current = at;
    const wait = SETTLE[key] ?? 600;
    if (key === 'dot') {
      // Fade L's note out first, then bring in the next step.
      later(() => s.current.step === at && s.current.tip === 0 && set({ tip: null }), wait);
      later(() => s.current.step === at && goStep(at + 1), wait + 300);
      return;
    }
    later(() => s.current.step === at && goStep(at + 1), wait);
  };

  const onAction = (control: WidgetControl) => {
    if (control === 'stop') {
      advancing.current = -1;
      setActed(-1);
    }
    actions[control]();
    if (control === 'start' || control === 'zip' || control === 'play' || control === 'reset') hit(control);
  };

  /** Step 3: hovering (or tapping) L opens its note and holds it open; the tour moves on 2s later. */
  const openL = () => {
    if (stepKey() !== 'dot' || !s.current.caps[0]) return;
    if (!s.current.insight) openInsight(true);
    if (s.current.tip !== 0) set({ tip: 0 });
    hit('dot');
  };

  const onDotHover = (i: number | null) => {
    if (i === 0) openL();
  };

  const onDotSelect = (i: number) => {
    if (!s.current.caps[i]) return;
    if (i === 0 && stepKey() === 'dot') return openL();
    if (s.current.insight) set({ tip: i });
  };

  /** The step card's main button: does the step for the visitor. */
  const showMe = () => {
    scrollToDemo();
    const key = stepKey();
    if (!key) return;
    if (key === 'watch') return goStep(s.current.step + 1);
    if (key === 'dot') {
      // After a reset the call may not have reached L yet: fill it so the note has something to show.
      if (!s.current.caps[0]) {
        const caps = [...s.current.caps];
        caps[0] = true;
        set({ caps });
      }
      return openL();
    }
    onAction(key);
  };

  /**
   * Skip tour: show the end card. A call in progress becomes an empty call
   * (timer running, cues closed) so the yellow reset button stays available;
   * before Start, the call alert stays up.
   */
  const skip = () => {
    const live = s.current.live;
    cancelAll();
    if (live) newCall(false);
    set(live ? { step: STEPS.length } : { ...STOPPED, step: STEPS.length });
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
    onDotHover,
  };

  /**
   * Click here shows only while the current step waits for the visitor: on
   * the control the step points at, or on L once its note is ready (step 3).
   */
  const pointer = !st.starting && acted !== st.step && (key === 'dot' ? !!st.caps[0] : !!(key && HIGHLIGHT[key]));

  return {
    widget,
    pointer,
    narrowWidth: showAlert ? 480 : 604,
    stepIndex: st.step,
    stepKey: key,
    starting: st.starting,
    phaseADone: st.phaseADone,
    caption: st.caption,
    showMe,
    skip,
    restart: () => {
      advancing.current = -1;
      setActed(-1);
      restart();
    },
  };
}
