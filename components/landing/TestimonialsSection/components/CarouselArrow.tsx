'use client';

/**
 * Round white chevron button used to navigate the mobile testimonial
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
      className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-[#10233A] shadow-[0_0_0_1px_rgba(16,35,58,0.12),0_4px_12px_-4px_rgba(16,35,58,0.2)] transition duration-150 hover:-translate-y-px active:translate-y-0 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#2367EE]"
    >
      <Icon size={26} strokeWidth={2.5} aria-hidden="true" />
    </button>
  );
}
