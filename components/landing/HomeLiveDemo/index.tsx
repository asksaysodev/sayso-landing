'use client';

/**
 * Homepage guided live demo: the step card above a stage that holds the live,
 * clickable Sayso widget. The visitor starts a sample buyer call from the call
 * alert, watches cues and Smart Capture fill in, opens Pulse and Playbook and
 * hangs up. The call engine (useCallEngine) and the tour (useDemoTour) hold
 * all the logic.
 *
 * On desktop the step card and stage are laid out once at DESIGN_WIDTH and
 * scaled as one block to fit the window's width and height, so resizing in
 * any direction shrinks or grows everything evenly. Narrow screens (phones)
 * lay out at their own width and scroll.
 */
import { inter } from '@/components/SaysoWidget/font';
import { useEffect, useRef, useState } from 'react';
import SaysoWidget, { WidgetScaler } from '@/components/SaysoWidget';
import styles from './LiveDemo.module.css';
import { CoachCard } from './components/CoachCard';
import { StageCaption } from './components/StageCaption';
import { TourPointer } from './components/TourPointer';
import { useDemoTour } from './hooks/useDemoTour';
import { useStageFit } from './hooks/useStageFit';

/** Desktop layout width of the whole demo (the section's 1160px max minus its 16px gutters). */
const DESIGN_WIDTH = 1128;
/** Below this content width the demo stops scaling as a block and uses the phone layout. */
const BLOCK_BELOW = 760;
/** Window height kept free: the fixed header plus air above, and a gap below the stage. */
const VIEWPORT_RESERVE = 94;

/** Width of the demo's content box, tracked as the window resizes. */
function useContentWidth(ref: React.RefObject<HTMLElement>) {
  const [w, setW] = useState<number | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const read = () => {
      const cs = getComputedStyle(el);
      setW(el.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight));
    };
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return w;
}

export function HomeLiveDemo() {
  const outerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const padRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const demo = useDemoTour();
  const fit = useStageFit(padRef, captionRef);
  const contentWidth = useContentWidth(outerRef);
  const block = contentWidth === null || contentWidth >= BLOCK_BELOW;
  const pointerActive = demo.pointer;
  const w = demo.widget;
  // Only what moves the pointer's target: toolbar buttons move with the view, the zip pill and Playbook;
  // L moves with the panels above it and the cue list.
  const layoutKey =
    demo.stepKey === 'dot'
      ? [demo.stepIndex, w.view, w.insightOpen, w.pulseOpen, w.cues?.length].join('|')
      : [demo.stepIndex, w.view, w.live, w.zipText ?? '', w.pulseOpen, w.playbookOpen].join('|');

  return (
    <div ref={outerRef} id="demo" className={`${inter.variable} mx-auto mt-12 w-full max-w-[1160px] scroll-mt-20 px-4 pb-3`}>
      <WidgetScaler
        width={block ? DESIGN_WIDTH : (contentWidth ?? DESIGN_WIDTH)}
        fitViewport={block ? VIEWPORT_RESERVE : undefined}
        initialHeight="min(620px, calc(100vh - 94px))"
      >
        <div role="region" aria-label="Guided demo" aria-live="polite">
          <CoachCard
            stepIndex={demo.stepIndex}
            phaseADone={demo.phaseADone}
            onShowMe={demo.showMe}
            onSkip={demo.skip}
            onRestart={demo.restart}
          />
        </div>
        <div ref={stageRef} className={styles.stage}>
          <div ref={padRef} className={styles.stagePad} data-fit={fit ? '' : undefined} style={fit ? { height: fit.height } : undefined}>
            <StageCaption ref={captionRef} caption={demo.caption} />
            <WidgetScaler width={1010} narrowWidth={demo.narrowWidth} initialHeight="min(62px, calc((100vw - 54px) * 0.1292))">
              <SaysoWidget {...demo.widget} />
            </WidgetScaler>
            <span className={styles.sampleNote}>Sample call and market data</span>
          </div>
          <TourPointer stageRef={stageRef} active={pointerActive} layoutKey={layoutKey} />
        </div>
      </WidgetScaler>
    </div>
  );
}
