'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const DEFAULT_RENDER_WIDTH = 900;

const DEFAULT_ASPECT_RATIO = 10 / 16;

export function useShowcaseScale(
  renderWidth = DEFAULT_RENDER_WIDTH,
  aspectRatio: number | null = DEFAULT_ASPECT_RATIO,
) {
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
  // When aspectRatio is a number use it for fixed height; pass null for content-driven height.
  const scaledHeight =
    isScaled && aspectRatio !== null
      ? renderWidth * aspectRatio * mobileScale
      : undefined;

  return { containerRef, mobileScale, isScaled, scaledHeight, renderWidth };
}
