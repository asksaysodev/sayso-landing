'use client';

/**
 * Mobile-only collapsible "Read testimonial" disclosure that reveals the full
 * quote. Used in place of QuoteCard on small viewports to save vertical space.
 */

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { Testimonial } from '../types';
import { BadgePill } from './BadgePill';

type ReadTestimonialDisclosureProps = {
  testimonial: Testimonial;
};

export function ReadTestimonialDisclosure({
  testimonial,
}: ReadTestimonialDisclosureProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = `testimonial-quote-panel-${testimonial.number}`;

  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-white v2-comic-border v2-comic-shadow">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="w-full px-5 py-4 flex items-center gap-4 text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-[#2367EE] focus-visible:ring-inset"
      >
        <span className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-full bg-[#FFDE59] border-2 border-[#1D4871]">
          <svg
            className="text-[#1D4871]"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M7.17 6C4.86 6 3 7.86 3 10.17c0 2.31 1.86 4.17 4.17 4.17.41 0 .8-.07 1.18-.18-.68 1.92-2.48 3.34-4.6 3.58v2.09c4.38-.27 7.83-3.9 7.83-8.33V10.17C11.58 7.86 9.72 6 7.17 6zm9.66 0c-2.31 0-4.17 1.86-4.17 4.17 0 2.31 1.86 4.17 4.17 4.17.41 0 .8-.07 1.18-.18-.68 1.92-2.48 3.34-4.6 3.58v2.09c4.38-.27 7.83-3.9 7.83-8.33V10.17C21.24 7.86 19.38 6 16.83 6z" />
          </svg>
        </span>

        <span className="flex-1 min-w-0">
          <span className="block font-comic text-base text-[#1D4871] tracking-wide leading-tight">
            Read testimonial
          </span>
          <span className="block text-xs text-[#1D4871]/60 leading-snug mt-0.5 truncate">
            {testimonial.name} - {testimonial.attribution}
          </span>
        </span>

        <ChevronDown
          size={22}
          strokeWidth={2.5}
          className={`flex-shrink-0 text-[#2367EE] transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          id={panelId}
          className="px-5 pb-5 pt-1 border-t-2 border-dashed border-[#1D4871]/15"
        >
          <blockquote className="pt-4">
            <p className="font-hero text-base text-[#1D4871] leading-snug">
              {testimonial.quote}
            </p>
          </blockquote>

          <div className="pt-4 mt-4 border-t-2 border-dashed border-[#1D4871]/15">
            <p className="font-comic text-lg text-[#1D4871] tracking-wide">
              {testimonial.name}
            </p>
            <p className="text-sm text-[#1D4871]/70 leading-snug">
              {testimonial.attribution}
            </p>
            <BadgePill testimonial={testimonial} className="mt-2" />
          </div>
        </div>
      )}
    </div>
  );
}
