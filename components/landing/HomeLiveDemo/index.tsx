'use client';

/**
 * Homepage guided live demo: the step card above a stage that holds the live,
 * clickable Sayso widget. The visitor starts a sample buyer call from the call
 * alert, watches cues and Smart Capture fill in, opens Pulse and Playbook and
 * hangs up. The call engine (useCallEngine) and the tour (useDemoTour) hold
 * all the logic.
 */
import { inter } from '@/components/SaysoWidget/font';
import { useRef } from 'react';
import SaysoWidget, { WidgetScaler } from '@/components/SaysoWidget';
import styles from './LiveDemo.module.css';
import { CoachCard } from './components/CoachCard';
import { StageCaption } from './components/StageCaption';
import { TourPointer } from './components/TourPointer';
import { useDemoTour } from './hooks/useDemoTour';

export function HomeLiveDemo() {
  const stageRef = useRef<HTMLDivElement>(null);
  const demo = useDemoTour();
  const pointerActive = !demo.starting && !!demo.widget.highlight;
  const w = demo.widget;
  const layoutKey = [demo.stepIndex, w.view, w.live, w.insightOpen, w.pulseOpen, w.zipText ?? '', w.playbookOpen, w.cues?.length, w.note].join('|');

  return (
    <div id="demo" className={`${inter.variable} mx-auto mt-12 w-full max-w-[1160px] scroll-mt-20 px-4 pb-3`}>
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
        <div className={styles.stagePad}>
          <StageCaption caption={demo.caption} />
          <WidgetScaler width={1010} narrowWidth={demo.narrowWidth} initialHeight="min(62px, calc((100vw - 54px) * 0.1292))">
            <SaysoWidget {...demo.widget} />
          </WidgetScaler>
          <span className={styles.sampleNote}>Sample call and market data</span>
        </div>
        <TourPointer stageRef={stageRef} active={pointerActive} layoutKey={layoutKey} />
      </div>
    </div>
  );
}
