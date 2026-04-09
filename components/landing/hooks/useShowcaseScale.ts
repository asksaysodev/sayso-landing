'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const DEFAULT_RENDER_WIDTH = 900;

export function useShowcaseScale(renderWidth = DEFAULT_RENDER_WIDTH) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mobileScale, setMobileScale] = useState<number | null>(null);

  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.clientWidth;
      if (containerWidth < renderWidth) {
        setMobileScale(containerWidth / renderWidth);
      } else {
        setMobileScale(null);
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [renderWidth]);

  const isScaled = mobileScale !== null;
  const scaledHeight = isScaled
    ? renderWidth * (10 / 16) * mobileScale
    : undefined;

  return { containerRef, mobileScale, isScaled, scaledHeight, renderWidth };
}
