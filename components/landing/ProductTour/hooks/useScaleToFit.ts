'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Scales a fixed design-width stage down to fit its container width, so the
 * desktop-shaped Follow Up Boss frame stays pixel-faithful while shrinking
 * gracefully on narrower screens (never scales above 1).
 */
export function useScaleToFit(designWidth: number) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const width = el.clientWidth;
      setScale(Math.min(1, width / designWidth));
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [designWidth]);

  return { containerRef, scale };
}
