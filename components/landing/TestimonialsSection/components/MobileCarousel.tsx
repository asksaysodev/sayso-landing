'use client';

/**
 * Mobile-only snap-scroll carousel of testimonials with looping arrow nav.
 *
 * Each TestimonialBlock occupies one full-width slide. The active index is
 * derived from the container's scrollLeft so the prev/next arrows can wrap
 * modulo the testimonial count, making the carousel feel endless even with
 * only two entries. Native swipe still works because the layout is built on
 * CSS scroll-snap.
 */

import { useRef, useState } from 'react';
import type { Testimonial } from '../types';
import { TestimonialBlock } from './TestimonialBlock';
import { CarouselArrow } from './CarouselArrow';

type MobileCarouselProps = {
  testimonials: Testimonial[];
};

export function MobileCarousel({ testimonials }: MobileCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    if (idx !== activeIndex) setActiveIndex(idx);
  };

  const scrollTo = (idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: idx * el.clientWidth, behavior: 'smooth' });
  };

  // Loop around the ends so the arrows never dead-end on the first/last slide.
  const goPrev = () => {
    const next = (activeIndex - 1 + testimonials.length) % testimonials.length;
    scrollTo(next);
  };

  const goNext = () => {
    const next = (activeIndex + 1) % testimonials.length;
    scrollTo(next);
  };

  return (
    <div>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex items-stretch overflow-x-auto snap-x snap-mandatory scroll-smooth -mx-3 [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {testimonials.map((t) => (
          <div key={t.number} className="flex-none w-full snap-center px-3">
            <TestimonialBlock testimonial={t} />
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-6 mt-6">
        <CarouselArrow direction="prev" onClick={goPrev} />
        <CarouselArrow direction="next" onClick={goNext} />
      </div>
    </div>
  );
}
