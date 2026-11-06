'use client';

/**
 * Fixes the demo stage's height so it never grows or shrinks while the
 * visitor clicks around: the widget is reserved at its tallest moment (cues,
 * Pulse and Playbook all open) at the scale it will be drawn. Also reports
 * whether the demo has room for the wide layout; on desktop the page scales
 * the whole demo (step card and stage) as one block to fit the window.
 */
import { useEffect, useState, type RefObject } from 'react';
import { useIsomorphicLayoutEffect } from '@/lib/hooks/useIsomorphicLayoutEffect';

/** Widget design sizes at its tallest: Playbook beside the column, or stacked under it. */
const WIDE = { width: 1010, height: 400 };
const STACKED = { width: 604, height: 752 };
/** Must match WidgetScaler's default stackBelow. */
const STACK_BELOW = 760;

export interface StageFit {
  /** Fixed stage height in px. */
  height: number;
}

export function useStageFit(padRef: RefObject<HTMLElement>, captionRef: RefObject<HTMLElement>): StageFit | null {
  const [fit, setFit] = useState<StageFit | null>(null);

  const measure = () => {
    const pad = padRef.current;
    if (!pad) return;
    const cs = getComputedStyle(pad);
    const padX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
    const padY = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
    const cap = captionRef.current;
    const capH = cap ? cap.offsetHeight + parseFloat(getComputedStyle(cap).marginBottom) : 0;
    const cw = pad.clientWidth - padX;
    if (cw <= 0) return;
    const design = cw < STACK_BELOW ? STACKED : WIDE;
    const height = Math.ceil(padY + capH + design.height * Math.min(1, cw / design.width));
    setFit((p) => (p && p.height === height ? p : { height }));
  };

  useIsomorphicLayoutEffect(measure, []);

  useEffect(() => {
    const pad = padRef.current;
    const ro = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(() => measure());
    if (pad) ro?.observe(pad);
    return () => ro?.disconnect();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return fit;
}
