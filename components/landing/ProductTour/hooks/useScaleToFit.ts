'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Scales a fixed design-size stage to fit BOTH its container width and a share
 * of the viewport height, so the whole window stays visible on one screen
 * alongside the header and pills (never scales above 1).
 *
 * Uses a callback ref (not a one-time effect) so it re-measures and re-observes
 * every time the element mounts. This matters because the Product Tour swaps the
 * dialer stage out for the web app demo and back; a one-time effect would leave
 * the remounted stage stuck at a stale scale (misaligned overlay).
 */
export function useScaleToFit(
  designWidth: number,
  designHeight: number,
  maxViewportHeightFraction = 0.62,
) {
  const [scale, setScale] = useState(1);
  const elRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<ResizeObserver | null>(null);

  const measure = useCallback(() => {
    const el = elRef.current;
    if (!el) return;
    const widthScale = el.clientWidth / designWidth;
    const heightScale = (window.innerHeight * maxViewportHeightFraction) / designHeight;
    setScale(Math.min(1, widthScale, heightScale));
  }, [designWidth, designHeight, maxViewportHeightFraction]);

  // Re-attaches whenever the measured element mounts/unmounts (incl. remounts).
  const containerRef = useCallback(
    (node: HTMLDivElement | null) => {
      observerRef.current?.disconnect();
      observerRef.current = null;
      elRef.current = node;
      if (node) {
        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(node);
        observerRef.current = observer;
      }
    },
    [measure],
  );

  // Viewport-height changes also affect the height-based scale.
  useEffect(() => {
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  return { containerRef, scale };
}
