'use client';

import Image from 'next/image';
import { useShowcaseScale } from '../hooks/useShowcaseScale';

const PLAYBOOK_RENDER_WIDTH = 649;

export function ProductShowcasePlaybookDesktop() {
  const { containerRef, mobileScale, isScaled, renderWidth } =
    useShowcaseScale(PLAYBOOK_RENDER_WIDTH, null);

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
          <div className="flex flex-col items-center gap-2">
            <Image
              src="/playbook-widget.svg"
              alt="Sayso Playbook toolbar widget for guided call scripts"
              width={649}
              height={59}
              priority
            />
            <Image
              src="/playbook-notes.svg"
              alt="Sayso Playbook notes showing real-time call script guidance and captured insights"
              width={491}
              height={446}
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
