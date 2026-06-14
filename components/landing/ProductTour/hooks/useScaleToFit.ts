'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Scales a fixed design-size stage to fit BOTH its container width and a share
 * of the viewport height, so the whole Follow Up Boss window stays visible on
 * one screen alongside the header and pills (never scales above 1).
 */
export function useScaleToFit(
  designWidth: number,
  designHeight: number,
  maxViewportHeightFraction = 0.62,
) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const widthScale = el.clientWidth / designWidth;
      const heightScale = (window.innerHeight * maxViewportHeightFraction) / designHeight;
      setScale(Math.min(1, widthScale, heightScale));
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    window.addEventListener('resize', update);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', update);
    };
  }, [designWidth, designHeight, maxViewportHeightFraction]);

  return { containerRef, scale };
}
