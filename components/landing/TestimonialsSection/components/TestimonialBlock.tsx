/**
 * One testimonial's full layout: identity + stat label bar above a video
 * paired with either the full QuoteCard (lg+ desktop row) or the collapsible
 * ReadTestimonialDisclosure (mobile + tablet carousel).
 *
 * Layout is vertical at every breakpoint because the block is always either
 * a full-width carousel slide (below lg) or one of four narrow grid columns
 * (lg+). The lg min-height on the label bar keeps the four videos aligned
 * across the desktop row regardless of how identity/stat text wraps.
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
      <div className="mb-4 rounded-lg bg-[#2367EE]/10 border-2 border-[#2367EE]/25 px-4 py-3 lg:px-5 lg:py-4 lg:min-h-[170px] flex">
        <div className="flex flex-col gap-3 w-full">
          <div className="min-w-0">
            <p className="text-[10px] lg:text-xs font-bold text-[#2367EE] mb-0.5 tracking-wider uppercase">
              Testimonial #{testimonial.number}
            </p>
            <p className="text-sm text-[#1D4871] leading-snug">
              <span className="font-bold">{testimonial.name}</span>
              <span className="text-[#1D4871]/60"> - {testimonial.attribution}</span>
            </p>
          </div>

          <div className="flex items-center gap-3 text-[#2367EE]">
            <p className="font-comic text-3xl leading-none tracking-wide flex-shrink-0">
              {testimonial.stat.value}
            </p>
            <p className="text-[11px] lg:text-xs font-semibold leading-tight">
              {testimonial.stat.label}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <VideoCard testimonial={testimonial} />

        <div className="hidden lg:block">
          <QuoteCard testimonial={testimonial} />
        </div>

        <div className="lg:hidden">
          <ReadTestimonialDisclosure testimonial={testimonial} />
        </div>
      </div>
    </div>
  );
}
