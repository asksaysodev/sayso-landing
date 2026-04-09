'use client';

import { DesktopDemoFrame } from '../DesktopDemoFrame';
import { useShowcaseScale } from '../hooks/useShowcaseScale';
import { SaysoToolbar } from './SaysoToolbar';
import { SmartCaptureBubbles } from './SmartCaptureBubbles';
import { StaticDialerView } from './StaticDialerView';

export function ProductShowcaseSCDesktop() {
  const { containerRef, mobileScale, isScaled, scaledHeight, renderWidth } =
    useShowcaseScale();

  return (
    <div ref={containerRef} className="relative">
      <div
        style={
          isScaled
            ? { height: scaledHeight, overflow: 'hidden' }
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
          <DesktopDemoFrame
            desktopOverlay={
              <div className="w-full flex flex-col gap-[6px]">
                <SaysoToolbar />
                <SmartCaptureBubbles maxSignals={4} />
              </div>
            }
          >
            <div className="relative h-full">
              <StaticDialerView />
            </div>
          </DesktopDemoFrame>
        </div>
      </div>
    </div>
  );
}
