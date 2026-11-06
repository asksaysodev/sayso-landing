import { useEffect, useRef, type RefObject } from 'react';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

interface TrackLayoutOptions {
  /** False stops all measuring (nothing to place). */
  enabled: boolean;
  /** Any value that changes when the layout may move; each change re-measures. */
  layoutKey: string;
  /**
   * Keep measuring every frame for `burstMs` after each layoutKey change, while
   * the root is on screen, to follow CSS transitions. Off: measure once per
   * change and on resize only (static pictures).
   */
  follow?: boolean;
  burstMs?: number;
}

/**
 * Calls `place` to position an overlay against the layout inside `rootRef`
 * without permanent polling: once after each layoutKey change, whenever the
 * root resizes (ResizeObserver), and, with `follow`, every frame for a short
 * burst after each change while the root is visible (IntersectionObserver).
 * Everything is cancelled on unmount or when disabled.
 */
export function useTrackLayout(
  rootRef: RefObject<HTMLElement>,
  place: () => void,
  { enabled, layoutKey, follow = false, burstMs = 700 }: TrackLayoutOptions,
) {
  const placeRef = useRef(place);
  placeRef.current = place;
  const visible = useRef(false);
  const raf = useRef(0);

  const burst = () => {
    cancelAnimationFrame(raf.current);
    if (!follow || !visible.current) return;
    const end = performance.now() + burstMs;
    const loop = (now: number) => {
      placeRef.current();
      if (now < end) raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
  };
  const burstRef = useRef(burst);
  burstRef.current = burst;

  // Measure right after every render that changes the layout key.
  useIsomorphicLayoutEffect(() => {
    if (!enabled) return;
    placeRef.current();
    burstRef.current();
  }, [enabled, layoutKey]);

  // Re-measure on resize; with follow, track on-screen state so bursts only run while visible.
  useEffect(() => {
    const root = rootRef.current;
    if (!enabled || !root) return;
    const ro = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(() => placeRef.current());
    ro?.observe(root);
    let io: IntersectionObserver | null = null;
    if (follow && typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver(([entry]) => {
        const wasVisible = visible.current;
        visible.current = entry.isIntersecting;
        if (entry.isIntersecting && !wasVisible) {
          placeRef.current();
          burstRef.current();
        }
        if (!entry.isIntersecting) cancelAnimationFrame(raf.current);
      });
      io.observe(root);
    } else {
      visible.current = follow;
    }
    return () => {
      ro?.disconnect();
      io?.disconnect();
      cancelAnimationFrame(raf.current);
      visible.current = false;
    };
  }, [enabled, follow, rootRef]);
}
