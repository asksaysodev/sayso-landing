'use client';

/**
 * The yellow "Click here" pointer above the control the current tour step
 * wants pressed. It never moves on screen: when the widget's layout changes
 * it disappears, waits for the widget to settle, then appears in its new
 * place. It hides the moment the step is done (the tour turns `active` off).
 */
import { useEffect, useRef, useState, type RefObject } from 'react';
import styles from '../LiveDemo.module.css';

/** Longest widget open/close transition, so the pointer only appears once things stop moving. */
const SETTLE_MS = 450;

interface TourPointerProps {
  stageRef: RefObject<HTMLDivElement>;
  /** False hides the pointer (no target for this step). */
  active: boolean;
  /** Changes whenever the widget layout may move (step, open panels, cues). */
  layoutKey: string;
}

export function TourPointer({ stageRef, active, layoutKey }: TourPointerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);

  const place = () => {
    const stage = stageRef.current;
    const target = stage?.querySelector<HTMLElement>('[data-tour-target]');
    if (!stage || !target || !target.offsetParent || target.closest('[data-collapsed="true"]')) {
      setPos((p) => (p === null ? p : null));
      return;
    }
    const r = target.getBoundingClientRect();
    const b = stage.getBoundingClientRect();
    // The demo may sit in a scaled frame: convert screen px back to the stage's own px.
    const k = stage.offsetWidth ? b.width / stage.offsetWidth : 1;
    const half = (ref.current?.offsetWidth || 90) / 2 + 8;
    const left = Math.max(half, Math.min(stage.offsetWidth - half, (r.left + r.width / 2 - b.left) / k));
    const top = (r.top - b.top) / k - 14;
    setPos((p) => (p && Math.abs(p.left - left) < 0.5 && Math.abs(p.top - top) < 0.5 ? p : { left, top }));
  };

  // Hide on every layout change, then show once the widget has settled.
  useEffect(() => {
    setPos(null);
    if (!active) return;
    const id = setTimeout(place, SETTLE_MS);
    return () => clearTimeout(id);
  }, [active, layoutKey]); // eslint-disable-line react-hooks/exhaustive-deps

  // A window resize scales the demo: hide, then re-place when resizing stops.
  useEffect(() => {
    if (!active) return;
    let id: ReturnType<typeof setTimeout>;
    const onResize = () => {
      setPos(null);
      clearTimeout(id);
      id = setTimeout(place, 150);
    };
    window.addEventListener('resize', onResize);
    return () => {
      clearTimeout(id);
      window.removeEventListener('resize', onResize);
    };
  }, [active]); // eslint-disable-line react-hooks/exhaustive-deps

  const shown = active ? pos : null;

  return (
    <div ref={ref} className={styles.pointer} hidden={!shown} style={shown ?? undefined} aria-hidden="true">
      Click here
    </div>
  );
}
