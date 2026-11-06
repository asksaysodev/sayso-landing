'use client';

/**
 * Carousel: a grid on desktop (the page passes the grid classes), a swipeable
 * scroll-snap row with peeking edges and prev/next arrows at 960px and below.
 * Finite by default; `loop` adds aria-hidden clones on both sides so the row
 * never ends. Each child is one slide and is stretched to equal height.
 */
import { Children, useEffect, useRef, type ReactNode } from 'react';
import { cx } from '@/lib/utils/cx';
import styles from './Carousel.module.css';
import { CarouselNav } from './components/CarouselNav';
import { useCarousel } from './useCarousel';

interface CarouselProps {
  /** Accessible name of the carousel, also used in the arrow labels (e.g. "review"). */
  label: string;
  /** Singular item name for the arrow buttons. Defaults to "slide". */
  itemName?: string;
  /** Infinite row on mobile. */
  loop?: boolean;
  /** Grid classes for the desktop layout. */
  trackClassName?: string;
  className?: string;
  children: ReactNode;
}

export default function Carousel({ label, itemName = 'slide', loop = false, trackClassName, className, children }: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const slides = Children.toArray(children);
  const { prevDisabled, nextDisabled, prev, next } = useCarousel(trackRef, slides.length, loop);

  // Clones are decorative copies: keep their links and buttons out of the tab order.
  useEffect(() => {
    trackRef.current
      ?.querySelectorAll<HTMLElement>('[data-clone] a, [data-clone] button')
      .forEach((el) => (el.tabIndex = -1));
  }, [children]);

  const clones = (side: string) =>
    slides.map((slide, i) => (
      <div key={`${side}-${i}`} className={cx(styles.slide, styles.clone)} aria-hidden="true" data-clone="">
        {slide}
      </div>
    ));

  return (
    <div className={className} role="region" aria-label={label}>
      <div ref={trackRef} className={cx(trackClassName, styles.track)}>
        {loop && clones('before')}
        {slides.map((slide, i) => (
          <div key={i} className={styles.slide} role="group" aria-label={`${i + 1} of ${slides.length}`}>
            {slide}
          </div>
        ))}
        {loop && clones('after')}
      </div>
      <CarouselNav label={itemName} prevDisabled={prevDisabled} nextDisabled={nextDisabled} onPrev={prev} onNext={next} />
    </div>
  );
}
