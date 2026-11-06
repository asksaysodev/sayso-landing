'use client';

/**
 * The yellow "Click here" pointer that floats above the control the current
 * tour step wants pressed. It finds the widget's highlighted control inside
 * the stage and re-measures only when needed: after each demo layout change
 * (with a short per-frame burst to follow the widget's transitions, only while
 * the stage is on screen) and when the stage resizes.
 */
import { useRef, useState, type RefObject } from 'react';
import { useTrackLayout } from '@/lib/hooks/useTrackLayout';
import styles from '../LiveDemo.module.css';

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
    const half = (ref.current?.offsetWidth || 90) / 2 + 8;
    const left = Math.max(half, Math.min(b.width - half, r.left + r.width / 2 - b.left));
    const top = r.top - b.top - 14;
    setPos((p) => (p && Math.abs(p.left - left) < 0.5 && Math.abs(p.top - top) < 0.5 ? p : { left, top }));
  };

  useTrackLayout(stageRef, place, { enabled: active, layoutKey, follow: true });
  const shown = active ? pos : null;

  return (
    <div ref={ref} className={styles.pointer} hidden={!shown} style={shown ?? undefined} aria-hidden="true">
      Click here
    </div>
  );
}
