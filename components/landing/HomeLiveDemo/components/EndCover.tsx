'use client';

/**
 * Soft cover over the demo stage once the tour is complete: Book a demo and
 * Start over, matching the end card above. Fades in after the last step's
 * animation has had a moment to play.
 */
import { useDemoCalendar } from '@/app/context/landing/DemoCalendarContext';
import styles from '../LiveDemo.module.css';

export function EndCover({ onRestart }: { onRestart: () => void }) {
  const { openDemoCalendar } = useDemoCalendar();
  return (
    <div className={styles.endCover}>
      <p className={styles.endCoverTitle}>Ready to try it on your own calls?</p>
      <div className={styles.coachActions}>
        <button type="button" className={styles.coachGo} onClick={openDemoCalendar} data-analytics-id="cta-book-demo-live-demo">
          Book a demo
        </button>
        <button type="button" className={styles.endCoverSecondary} onClick={onRestart}>
          Start over
        </button>
      </div>
    </div>
  );
}
