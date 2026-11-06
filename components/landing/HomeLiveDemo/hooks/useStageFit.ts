'use client';

/**
 * Sizes the demo stage so the step card and the whole widget fit on screen
 * together, and keeps that size fixed while the visitor clicks around.
 *
 * The widget is scaled once for its tallest moment (cues, Pulse and Playbook
 * all open), never for the current content, so opening a panel never resizes
 * anything. The scale follows the window: narrower or shorter windows get a
 * smaller widget. Phones (stacked layout) scale to the width only and scroll.
 */
import { useEffect, useState, type RefObject } from 'react';
import { useIsomorphicLayoutEffect } from '@/lib/hooks/useIsomorphicLayoutEffect';

/** Widget design sizes at its tallest: Playbook beside the column, or stacked under it. */
const WIDE = { width: 1010, height: 400 };
const STACKED = { width: 604, height: 752 };
/** Must match WidgetScaler's default stackBelow. */
const STACK_BELOW = 760;
/** Fixed header height plus a little air above the step card. */
const TOP_OFFSET = 78;
/** Gap below the stage so its bottom edge shows. */
const BOTTOM_GAP = 16;
/** Never shrink the widget below this, however short the window. */
const MIN_SCALE = 0.4;

export interface StageFit {
  /** Scale cap passed to WidgetScaler (wide layout only). */
  maxScale?: number;
  /** Fixed stage height in px. */
  height: number;
}

export function useStageFit(
  padRef: RefObject<HTMLElement>,
  captionRef: RefObject<HTMLElement>,
  coachRef: RefObject<HTMLElement>,
): StageFit | null {
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

    const stacked = cw < STACK_BELOW;
    const design = stacked ? STACKED : WIDE;
    let scale = Math.min(1, cw / design.width);
    if (!stacked) {
      // Everything above the stage: the step card and the gap under it.
      const coach = coachRef.current;
      const above = coach ? pad.getBoundingClientRect().top - coach.getBoundingClientRect().top : 0;
      const room = window.innerHeight - TOP_OFFSET - above - padY - capH - BOTTOM_GAP;
      scale = Math.min(scale, Math.max(MIN_SCALE, room / design.height));
    }
    const height = Math.ceil(padY + capH + design.height * scale);
    const next: StageFit = { maxScale: stacked ? undefined : scale, height };
    setFit((p) => (p && p.height === next.height && p.maxScale === next.maxScale ? p : next));
  };

  useIsomorphicLayoutEffect(measure, []);

  useEffect(() => {
    const pad = padRef.current;
    const ro = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(() => measure());
    if (pad) ro?.observe(pad);
    window.addEventListener('resize', measure);
    return () => {
      ro?.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return fit;
}
