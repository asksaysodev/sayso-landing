/**
 * Previous / next arrow buttons under a carousel. Only visible at 960px and
 * below, where the carousel is a swipeable row.
 */
import styles from '../Carousel.module.css';

interface CarouselNavProps {
  label: string;
  prevDisabled: boolean;
  nextDisabled: boolean;
  onPrev: () => void;
  onNext: () => void;
}

export function CarouselNav({ label, prevDisabled, nextDisabled, onPrev, onNext }: CarouselNavProps) {
  return (
    <div className={styles.nav}>
      <button type="button" className={styles.navButton} onClick={onPrev} disabled={prevDisabled} aria-label={`Previous ${label}`}>
        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 6l-6 6 6 6" />
        </svg>
      </button>
      <button type="button" className={styles.navButton} onClick={onNext} disabled={nextDisabled} aria-label={`Next ${label}`}>
        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>
    </div>
  );
}
