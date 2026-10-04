'use client';

/**
 * Card row that becomes a swipeable carousel below the md breakpoint.
 * The centered card leaves its neighbors peeking at both edges, and the
 * arrows wrap from last to first so they never dead-end. From md up the
 * same children render as a plain grid (layout passed in via gridClassName).
 */

import { Children, useRef, type ReactNode } from 'react';
import { CarouselArrow } from '@/components/landing/TestimonialsSection/components/CarouselArrow';

type PeekCarouselProps = {
  /** Grid classes applied from md up, e.g. "md:grid-cols-3". */
  gridClassName: string;
  /** Used in the arrow labels, e.g. "feature" gives "Next feature". */
  itemLabel: string;
  children: ReactNode;
};

export function PeekCarousel({ gridClassName, itemLabel, children }: PeekCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const centeredIndex = (track: HTMLDivElement) => {
    const middle = track.scrollLeft + track.clientWidth / 2;
    const items = Array.from(track.children) as HTMLElement[];
    return items.reduce(
      (best, item, i) =>
        Math.abs(item.offsetLeft + item.offsetWidth / 2 - middle) <
        Math.abs(items[best].offsetLeft + items[best].offsetWidth / 2 - middle)
          ? i
          : best,
      0,
    );
  };

  const step = (delta: number) => {
    const track = trackRef.current;
    if (!track) return;
    const count = track.children.length;
    const target = track.children[(centeredIndex(track) + delta + count) % count] as HTMLElement;
    track.scrollTo({
      left: target.offsetLeft - (track.clientWidth - target.offsetWidth) / 2,
      behavior: 'smooth',
    });
  };

  return (
    <div className="-mx-4 md:mx-0">
      <div
        ref={trackRef}
        className={`flex gap-3 overflow-x-auto snap-x snap-mandatory px-[9%] py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:gap-6 md:overflow-visible md:px-0 ${gridClassName}`}
      >
        {Children.map(children, (child) => (
          <div className="flex-none basis-[82%] snap-center md:basis-auto">{child}</div>
        ))}
      </div>
      <div className="mt-5 flex justify-center gap-6 md:hidden">
        <CarouselArrow direction="prev" onClick={() => step(-1)} label={`Previous ${itemLabel}`} />
        <CarouselArrow direction="next" onClick={() => step(1)} label={`Next ${itemLabel}`} />
      </div>
    </div>
  );
}
