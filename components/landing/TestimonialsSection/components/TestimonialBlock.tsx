/**
 * One testimonial's full layout: identity + stat label bar above a video
 * paired with either the full QuoteCard (tablet/desktop) or the collapsible
 * ReadTestimonialDisclosure (mobile).
 *
 * Used by both the desktop grid and the mobile carousel, so its outer
 * wrapper stretches to fill its container to keep neighboring blocks
 * vertically aligned.
 */

import type { Testimonial } from '../types';
import { VideoCard } from './VideoCard';
import { QuoteCard } from './QuoteCard';
import { ReadTestimonialDisclosure } from './ReadTestimonialDisclosure';

type TestimonialBlockProps = {
  testimonial: Testimonial;
};

export function TestimonialBlock({ testimonial }: TestimonialBlockProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Label bar: identity on the left, headline stat on the right. */}
      {/* min-h on mobile keeps all blocks the same height when content wraps */}
      {/* to different line counts between testimonials. */}
      <div className="mb-4 rounded-lg bg-[#2367EE]/10 border-2 border-[#2367EE]/25 px-4 py-3 md:px-5 md:py-4 min-h-[140px] md:min-h-0 flex">
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-5 w-full">
          <div className="flex-1 min-w-0 min-h-[48px] md:min-h-0">
            <p className="text-[10px] md:text-xs font-bold text-[#2367EE] mb-0.5 tracking-wider uppercase">
              Testimonial #{testimonial.number}
            </p>
            <p className="text-sm md:text-[15px] text-[#1D4871] leading-snug">
              <span className="font-bold">{testimonial.name}</span>
              <span className="text-[#1D4871]/60"> - {testimonial.attribution}</span>
            </p>
          </div>

          <div className="hidden md:block h-12 w-0.5 bg-[#2367EE]/25 flex-shrink-0" />

          <div className="flex items-center gap-2 md:gap-3 flex-shrink-0 text-[#2367EE] min-h-[44px]">
            <p className="font-comic text-3xl md:text-4xl leading-none tracking-wide">
              {testimonial.stat.value}
            </p>
            <p className="text-[11px] md:text-xs font-semibold leading-tight max-w-[18ch]">
              {testimonial.stat.label}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        <VideoCard testimonial={testimonial} />

        <div className="hidden md:block">
          <QuoteCard testimonial={testimonial} />
        </div>

        <div className="md:hidden">
          <ReadTestimonialDisclosure testimonial={testimonial} />
        </div>
      </div>
    </div>
  );
}
