'use client';

import Image from 'next/image';
import { useShowcaseScale } from '../hooks/useShowcaseScale';

const PULSE_RENDER_WIDTH = 656;

export function ProductShowcasePulseDesktop() {
  const { containerRef, mobileScale, isScaled, renderWidth } =
    useShowcaseScale(PULSE_RENDER_WIDTH, null);

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
              src="/pulse-widget.svg"
              alt="Sayso Pulse widget showing live market analysis data for real-time call insights"
              width={656}
              height={149}
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
