'use client';

/**
 * Guided tour for the homepage demo, layered on the call engine. Moves the
 * tour forward when the visitor does what the current step asks, powers the
 * step card's Show me, Skip tour and Start over buttons, and builds the props
 * for the live widget.
 */
import type { SaysoWidgetProps, WidgetControl } from '@/components/SaysoWidget/types';
import { prefersReducedMotion } from '@/lib/utils/motion';
import { HINT_START, PHASE_B, PHASE_C, STEPS, STOPPED } from '../data';
import type { StepKey } from '../types';
import { useCallEngine } from './useCallEngine';

const formatTime = (n: number) =>
  `${Math.floor(n / 3600)}:${String(Math.floor(n / 60) % 60).padStart(2, '0')}:${String(n % 60).padStart(2, '0')}`;

const HIGHLIGHT: Partial<Record<StepKey, WidgetControl>> = { start: 'start', zip: 'zip', play: 'play', stop: 'stop' };

const scrollToDemo = () => {
  const el = document.getElementById('demo');
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 78;
  if (Math.abs(window.scrollY - top) > 40) window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
};

export function useDemoTour() {
  const stepKey = (): StepKey | undefined => STEPS[engine.s.current.step]?.key;

  const engine = useCallEngine({
    onPhaseADone: () => stepKey() === 'watch' && goStep(engine.s.current.step + 1),
    // Keep L's note up while the tour is asking the visitor to look at it.
    holdTip: (i) => stepKey() === 'dot' && i === 0,
  });
  const { s, set, later, run, actions, openInsight, cancelAll } = engine;

  const goStep = (n: number) => {
    set({ step: n });
    const key = STEPS[n]?.key;
    if (n === 0 && !s.current.live) set({ caption: { kind: 'hint', text: HINT_START } });
    if (key === 'zip') run(PHASE_B);
    if (key === 'stop') run(PHASE_C);
  };

  /** Advance when the visitor did what the current step asks. */
  const hit = (key: StepKey) => {
    const at = s.current.step;
    if (STEPS[at]?.key !== key) return;
    if (key === 'start') return goStep(at + 1);
    later(() => s.current.step === at && goStep(at + 1), key === 'dot' ? 1200 : 600);
    if (key === 'dot') later(() => s.current.tip === 0 && set({ tip: null }), 2400);
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

  /** The step card's main button: does the step for the visitor. */
  const showMe = () => {
    scrollToDemo();
    const key = stepKey();
    if (!key) return;
    if (key === 'watch') return goStep(s.current.step + 1);
    if (key === 'dot') {
      if (!s.current.insight) openInsight(true);
      set({ tip: 0 });
      return hit('dot');
    }
    onAction(key);
  };

  /** Skip tour: hang up (clock and scripted call stop) and show the end card. */
  const skip = () => {
    cancelAll();
    set({ ...STOPPED, step: STEPS.length });
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
    skip,
    restart: () => actions.reset(),
  };
}
