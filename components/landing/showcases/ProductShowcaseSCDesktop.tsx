'use client';

import Image from 'next/image';
import { useShowcaseScale } from '../hooks/useShowcaseScale';

const SC_RENDER_WIDTH = 649;

export function ProductShowcaseSCDesktop() {
  const { containerRef, mobileScale, isScaled, renderWidth } =
    useShowcaseScale(SC_RENDER_WIDTH, null);

  return (
    <div ref={containerRef} className="relative">
      <div
        style={
          isScaled
            ? { overflow: 'visible' }
            : undefined
        }
      >
        <div
          style={
            isScaled
              ? {
                  width: renderWidth,
                  transform: `scale(${mobileScale})`,
                  transformOrigin: 'top left',
                }
              : undefined
          }
        >
          <div className="flex justify-center">
            <Image
              src="/smart-capture-widget.svg"
              alt="Sayso Smart Capture widget showing real-time call insights with LPMAMA indicators"
              width={649}
              height={199}
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
