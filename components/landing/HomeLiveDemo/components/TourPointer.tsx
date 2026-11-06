'use client';

/**
 * The yellow "Click here" pointer that floats above the control the current
 * tour step wants pressed. It finds the widget's highlighted control inside
 * the stage and follows it as the widget scales or moves.
 */
import { useEffect, useRef, useState, type RefObject } from 'react';
import { useIsomorphicLayoutEffect } from '@/lib/hooks/useIsomorphicLayoutEffect';
import styles from '../LiveDemo.module.css';

interface TourPointerProps {
  stageRef: RefObject<HTMLDivElement>;
  /** False hides the pointer (no target for this step). */
  active: boolean;
}

export function TourPointer({ stageRef, active }: TourPointerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);

  const place = () => {
    const stage = stageRef.current;
    const target = active ? stage?.querySelector<HTMLElement>('[data-tour-target]') : null;
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

  useIsomorphicLayoutEffect(place);

  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const loop = () => {
      place();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return (
    <div ref={ref} className={styles.pointer} hidden={!pos} style={pos ?? undefined} aria-hidden="true">
      Click here
    </div>
  );
}
