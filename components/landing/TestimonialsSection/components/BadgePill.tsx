/**
 * Yellow comic-style credential badge shown under a testimonial's name.
 * Renders an optional second line when the testimonial provides `badgeSubtext`.
 */

import type { Testimonial } from '../types';

type BadgePillProps = {
  testimonial: Testimonial;
  className?: string;
};

export function BadgePill({ testimonial, className = '' }: BadgePillProps) {
  return (
    <span
      className={`inline-block bg-[#FFDE59] text-[#1D4871] px-2 py-1 rounded border-2 border-[#1D4871] ${className}`}
    >
      <span className="block text-[10px] md:text-xs font-bold tracking-widest uppercase leading-tight">
        {testimonial.badge}
      </span>
      {testimonial.badgeSubtext && (
        <span className="block text-[9px] md:text-[10px] font-semibold tracking-wide uppercase leading-tight opacity-80 mt-0.5">
          {testimonial.badgeSubtext}
        </span>
      )}
    </span>
  );
}
