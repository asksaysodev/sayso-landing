/**
 * Quote card shown below the video on lg+. Sizes to its content with
 * `h-full` so the parent grid row drives the height — all four cards in
 * the row stretch to the tallest quote's natural height, eliminating the
 * large dead space that came from the previous 9:14 aspect-ratio lock.
 * Attribution is pushed to the bottom with `mt-auto`.
 */

import type { Testimonial } from '../types';
import { BadgePill } from './BadgePill';

type QuoteCardProps = {
  testimonial: Testimonial;
};

export function QuoteCard({ testimonial }: QuoteCardProps) {
  return (
    <div className="relative h-full overflow-hidden rounded-xl bg-white v2-comic-border v2-comic-shadow p-4 lg:p-5 flex flex-col">
      <svg
        className="absolute top-3 right-3 lg:top-4 lg:right-4 text-[#FFDE59]"
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M7.17 6C4.86 6 3 7.86 3 10.17c0 2.31 1.86 4.17 4.17 4.17.41 0 .8-.07 1.18-.18-.68 1.92-2.48 3.34-4.6 3.58v2.09c4.38-.27 7.83-3.9 7.83-8.33V10.17C11.58 7.86 9.72 6 7.17 6zm9.66 0c-2.31 0-4.17 1.86-4.17 4.17 0 2.31 1.86 4.17 4.17 4.17.41 0 .8-.07 1.18-.18-.68 1.92-2.48 3.34-4.6 3.58v2.09c4.38-.27 7.83-3.9 7.83-8.33V10.17C21.24 7.86 19.38 6 16.83 6z" />
      </svg>

      <blockquote className="relative z-10 pt-8">
        <p className="font-hero text-sm text-[#1D4871] leading-snug">
          {testimonial.quote}
        </p>
      </blockquote>

      <div className="relative z-10 pt-3 mt-auto border-t-2 border-dashed border-[#1D4871]/15">
        <p className="font-comic text-sm lg:text-base text-[#1D4871] tracking-wide leading-tight">
          {testimonial.name}
        </p>
        <p className="text-[11px] lg:text-xs text-[#1D4871]/70 leading-snug mt-0.5">
          {testimonial.attribution}
        </p>
        <BadgePill testimonial={testimonial} className="mt-1.5" />
      </div>
    </div>
  );
}
