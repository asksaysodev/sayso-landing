'use client';

/**
 * Branded circular chevron button used to navigate the mobile testimonial
 * carousel. Direction controls both the icon and the accessible label.
 */

import { ChevronLeft, ChevronRight } from 'lucide-react';

type CarouselArrowProps = {
  direction: 'prev' | 'next';
  onClick: () => void;
};

export function CarouselArrow({ direction, onClick }: CarouselArrowProps) {
  const Icon = direction === 'prev' ? ChevronLeft : ChevronRight;
  const label = direction === 'prev' ? 'Previous testimonial' : 'Next testimonial';

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex items-center justify-center w-12 h-12 rounded-full bg-[#FFDE59] text-[#1D4871] v2-comic-border v2-comic-shadow transition-transform duration-150 hover:scale-105 active:translate-y-0.5 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#2367EE]"
    >
      <Icon size={26} strokeWidth={3} aria-hidden="true" />
    </button>
  );
}
