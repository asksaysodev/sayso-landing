'use client';

/**
 * The step card above the demo stage. Shows the current tour step with a
 * progress bar, a Show me button that does the step for the visitor and a
 * Skip tour link. After the last step it becomes the end card with the
 * superhero, Book a demo and Start over. When a step change removes the
 * focused button (Show me on the last step, Start over), focus moves to the
 * new card's title so keyboard users keep their place.
 */
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useDemoCalendar } from '@/app/context/landing/DemoCalendarContext';
import { cx } from '@/lib/utils/cx';
import styles from '../LiveDemo.module.css';
import { STEPS } from '../data';

interface CoachCardProps {
  stepIndex: number;
  phaseADone: boolean;
  onShowMe: () => void;
  onSkip: () => void;
  onRestart: () => void;
}

export function CoachCard({ stepIndex, phaseADone, onShowMe, onSkip, onRestart }: CoachCardProps) {
  const { openDemoCalendar } = useDemoCalendar();
  const step = STEPS[stepIndex];
  const titleRef = useRef<HTMLParagraphElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const active = document.activeElement;
    if (!active || active === document.body) titleRef.current?.focus({ preventScroll: true });
  }, [stepIndex]);

  if (!step) {
    return (
      <div className={cx(styles.coach, styles.end)}>
        <div className={styles.coachHead}>
          Demo complete
          <span className={styles.coachBar}>
            <i style={{ width: '100%' }} />
          </span>
        </div>
        <div className={styles.coachBody}>
          <Image className={styles.endImage} src="/images/this-is-sayso-point-up.png" alt="" width={74} height={79} />
          <div className={styles.coachCopy}>
            <p ref={titleRef} tabIndex={-1} className={styles.coachTitle}>
              That’s Sayso.
            </p>
            <p>Cues while you talk, notes while you listen, and your script one click away.</p>
          </div>
          <div className={styles.coachActions}>
            <button type="button" className={styles.coachGo} onClick={openDemoCalendar} data-analytics-id="cta-book-demo-live-demo">
              Book a demo
            </button>
            <button type="button" className={styles.coachSkip} onClick={onRestart}>
              Start over
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isWatch = step.key === 'watch';
  return (
    <div className={styles.coach}>
      <div className={styles.coachHead}>
        Step {stepIndex + 1} of {STEPS.length}
        <span className={styles.coachBar}>
          <i style={{ width: `${((stepIndex + 1) / STEPS.length) * 100}%` }} />
        </span>
      </div>
      <div className={styles.coachBody}>
        <div className={styles.coachCopy}>
          <p ref={titleRef} tabIndex={-1} className={styles.coachTitle}>
            {step.title}
          </p>
          <p>{step.body}</p>
        </div>
        <div className={styles.coachActions}>
          <button type="button" className={styles.coachGo} onClick={onShowMe} disabled={isWatch && !phaseADone}>
            {isWatch ? (phaseADone ? 'Next' : 'Listening…') : 'Show me'}
          </button>
          <button type="button" className={styles.coachSkip} onClick={onSkip}>
            Skip tour
          </button>
        </div>
      </div>
    </div>
  );
}
