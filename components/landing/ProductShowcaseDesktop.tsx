'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { DesktopDemoFrame } from './DesktopDemoFrame';
import { CRMDialerShowcase, SaysoWidget, useSaysoWidget } from './CRMDialerShowcase';

const DESKTOP_RENDER_WIDTH = 900;

export function ProductShowcaseDesktop() {
  const widgetState = useSaysoWidget();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mobileScale, setMobileScale] = useState<number | null>(null);
  const [widgetPos, setWidgetPos] = useState<{ bottom: number; centerX: number } | null>(null);

  const handleWidgetPosition = useCallback((pos: { bottom: number; centerX: number }) => {
    setWidgetPos(pos);
  }, []);

  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.clientWidth;
      if (containerWidth < DESKTOP_RENDER_WIDTH) {
        setMobileScale(containerWidth / DESKTOP_RENDER_WIDTH);
      } else {
        setMobileScale(null);
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const isScaled = mobileScale !== null;
  const scaledHeight = isScaled
    ? DESKTOP_RENDER_WIDTH * (10 / 16) * mobileScale
    : undefined;

  // Convert un-scaled widget position to visual coordinates
  const scale = mobileScale ?? 1;
  const heroTop = widgetPos ? widgetPos.bottom * scale : 0;
  const heroLeft = widgetPos ? widgetPos.centerX * scale : 0;

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
                  width: DESKTOP_RENDER_WIDTH,
                  transform: `scale(${mobileScale})`,
                  transformOrigin: 'top left',
                }
              : undefined
          }
        >
          <DesktopDemoFrame
            onWidgetPosition={handleWidgetPosition}
            desktopOverlay={
              <div className="w-full">
                <SaysoWidget
                  currentCycle={widgetState.currentCycle}
                  showBuyerMessage={widgetState.showBuyerMessage}
                  showPrompt={widgetState.showPrompt}
                  promptText={widgetState.promptText}
                  timerSeconds={widgetState.timerSeconds}
                />
              </div>
            }
          >
            <div className="relative h-full">
              <CRMDialerShowcase />
            </div>
          </DesktopDemoFrame>
        </div>
      </div>

      {/* Mobile superhero - rendered outside overflow-hidden, tracks widget bottom-center */}
      {widgetPos && (
        <div
          className="lg:hidden absolute z-40 pointer-events-none -translate-x-1/2"
          style={{ top: heroTop, left: heroLeft }}
        >
          <Image
            src="/this_is_sayso_point_up.png"
            alt="This is SaySo"
            width={105}
            height={105}
            className="w-[90px] sm:w-[105px] h-auto drop-shadow-[0_4px_10px_rgba(0,0,0,0.25)]"
          />
        </div>
      )}
    </div>
  );
}
