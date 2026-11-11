'use client';

/**
 * The step card above the demo stage. Shows the current tour step with a
 * progress bar, a Show me button that does the step for the visitor and a
 * Skip tour link. After the last step it becomes the end card with Get Sayso
 * and Start over. When a step change removes the
 * focused button (Show me on the last step, Start over), focus moves to the
 * new card's title so keyboard users keep their place.
 */
import { useEffect, useRef } from 'react';
import { useDemoCalendar } from '@/app/context/landing/DemoCalendarContext';
import { cx } from '@/lib/utils/cx';
import styles from '../LiveDemo.module.css';
import { STEPS } from '../data';

interface CoachCardProps {
  stepIndex: number;
  onShowMe: () => void;
  onBack: () => void;
  onForward: () => void;
  onSkip: () => void;
  onRestart: () => void;
}

function Chevron({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={dir === 'left' ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6'} />
    </svg>
  );
}

export function CoachCard({ stepIndex, onShowMe, onBack, onForward, onSkip, onRestart }: CoachCardProps) {
  const { openSignup } = useDemoCalendar();
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
          <span className={styles.stepNav}>Demo complete</span>
          <span className={styles.coachBar}>
            <i style={{ width: '100%' }} />
          </span>
        </div>
        <div className={styles.coachBody}>
          <div className={styles.coachCopy}>
            <p ref={titleRef} tabIndex={-1} className={styles.coachTitle}>
              That’s Sayso.
            </p>
            <p>Cues while you talk, notes while you listen, and your script one click away.</p>
          </div>
          <div className={styles.coachActions}>
            <button type="button" className={styles.coachGo} onClick={openSignup} data-analytics-id="cta-download-live-demo">
              Get Sayso
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
        <span className={styles.stepNav}>
          <button type="button" className={styles.stepArrow} onClick={onBack} disabled={stepIndex === 0} aria-label="Previous step">
            <Chevron dir="left" />
          </button>
          Step {stepIndex + 1} of {STEPS.length}
          <button type="button" className={styles.stepArrow} onClick={onForward} aria-label="Next step">
            <Chevron dir="right" />
          </button>
        </span>
        <span className={styles.coachBar}>
          <i style={{ width: `${((stepIndex + 1) / STEPS.length) * 100}%` }} />
        </span>
      </div>
      <div className={styles.coachBody}>
        <div key={stepIndex} className={cx(styles.coachCopy, styles.stepIn)}>
          <p ref={titleRef} tabIndex={-1} className={styles.coachTitle}>
            {step.title}
          </p>
          <p>{step.body}</p>
        </div>
        <div className={styles.coachActions}>
          {/* Step 2 moves on by itself when the opening finishes, so it never offers a button that would flash. */}
          <button type="button" className={cx(styles.coachGo, styles.coachShow)} onClick={onShowMe} disabled={isWatch}>
            {isWatch ? 'Listening…' : 'Show me'}
          </button>
          <button type="button" className={styles.coachSkip} onClick={onSkip}>
            Skip tour
          </button>
        </div>
      </div>
    </div>
  );
}
