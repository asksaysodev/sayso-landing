/**
 * Tall 9:14 quote card shown alongside the video on tablet and desktop.
 * Replaced by ReadTestimonialDisclosure on mobile viewports.
 */

import type { Testimonial } from '../types';
import { BadgePill } from './BadgePill';

type QuoteCardProps = {
  testimonial: Testimonial;
};

export function QuoteCard({ testimonial }: QuoteCardProps) {
  return (
    <div
      className="relative overflow-hidden rounded-xl bg-white v2-comic-border v2-comic-shadow p-4 md:p-5 flex flex-col"
      style={{ aspectRatio: '9 / 14' }}
    >
      <svg
        className="absolute top-3 right-3 md:top-4 md:right-4 text-[#FFDE59]"
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M7.17 6C4.86 6 3 7.86 3 10.17c0 2.31 1.86 4.17 4.17 4.17.41 0 .8-.07 1.18-.18-.68 1.92-2.48 3.34-4.6 3.58v2.09c4.38-.27 7.83-3.9 7.83-8.33V10.17C11.58 7.86 9.72 6 7.17 6zm9.66 0c-2.31 0-4.17 1.86-4.17 4.17 0 2.31 1.86 4.17 4.17 4.17.41 0 .8-.07 1.18-.18-.68 1.92-2.48 3.34-4.6 3.58v2.09c4.38-.27 7.83-3.9 7.83-8.33V10.17C21.24 7.86 19.38 6 16.83 6z" />
      </svg>

      <blockquote className="relative z-10 flex-1 flex items-center">
        <p className="font-hero text-xs md:text-sm lg:text-sm text-[#1D4871] leading-snug">
          {testimonial.quote}
        </p>
      </blockquote>

      <div className="relative z-10 pt-3 mt-3 border-t-2 border-dashed border-[#1D4871]/15">
        <p className="font-comic text-sm md:text-base text-[#1D4871] tracking-wide leading-tight">
          {testimonial.name}
        </p>
        <p className="text-[11px] md:text-xs text-[#1D4871]/70 leading-snug mt-0.5">
          {testimonial.attribution}
        </p>
        <BadgePill testimonial={testimonial} className="mt-1.5" />
      </div>
    </div>
  );
}
