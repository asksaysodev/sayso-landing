'use client';

/**
 * Generic responsive carousel for the founder pricing page.
 *
 * Below `md`, children render as a snap-scroll row with looping arrow nav.
 * At `md` and above, children render as a 2-col CSS grid.
 * Modeled after TestimonialsSection's MobileCarousel.
 */

import { useRef, useState, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type CarouselProps = {
  children: ReactNode[];
  ariaLabel: string;
};

export function Carousel({ children, ariaLabel }: CarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = children.length;

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

  const goPrev = () => scrollTo((activeIndex - 1 + slides) % slides);
  const goNext = () => scrollTo((activeIndex + 1) % slides);

  return (
    <div>
      {/* Mobile: snap-scroll carousel */}
      <div className="md:hidden">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex items-stretch overflow-x-auto snap-x snap-mandatory scroll-smooth -mx-3 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          aria-label={ariaLabel}
        >
          {children.map((child, i) => (
            <div key={i} className="flex-none w-full snap-center px-3">
              {child}
            </div>
          ))}
        </div>

        {slides > 1 && (
          <div className="flex justify-center items-center gap-6 mt-6">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#10233A] shadow-card-sm transition duration-150 hover:shadow-card-sm-hover active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2367EE] focus-visible:ring-offset-2"
            >
              <ChevronLeft size={22} strokeWidth={2.5} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#10233A] shadow-card-sm transition duration-150 hover:shadow-card-sm-hover active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2367EE] focus-visible:ring-offset-2"
            >
              <ChevronRight size={22} strokeWidth={2.5} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>

      {/* Desktop: grid */}
      <div className="hidden md:grid md:grid-cols-2 gap-6">
        {children.map((child, i) => (
          <div key={i} className="flex">
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
