'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PanelTheStruggle } from './PanelTheStruggle';
import { PanelWastedOpportunity } from './PanelWastedOpportunity';

export function PainPointPanel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <section className="bg-[#F8F8FA] py-12 md:py-16 lg:py-20 v2-halftone relative">
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Comic narrator box */}
        <div className="flex justify-center mb-8 md:mb-12">
          <div className="bg-[#1D4871] text-white px-5 py-2 rounded-lg v2-comic-shadow-sm transform -rotate-1">
            <span className="font-comic text-lg md:text-xl tracking-wide">Without SaySo...</span>
          </div>
        </div>

        {/* Mobile: compact carousel — hidden on md+ */}
        <div className="md:hidden max-w-xs mx-auto">
          {currentSlide === 0
            ? <PanelTheStruggle imgHeight="min-h-[160px]" />
            : <PanelWastedOpportunity imgHeight="min-h-[160px]" />
          }
          <div className="flex items-center justify-center gap-4 mt-4">
            <button
              onClick={() => setCurrentSlide(0)}
              disabled={currentSlide === 0}
              aria-label="Previous"
              className="w-9 h-9 rounded-full border-2 border-[#1D4871] bg-white flex items-center justify-center disabled:opacity-30 transition-opacity"
            >
              <ChevronLeft size={16} strokeWidth={2} stroke="#1D4871" />
            </button>
            <div className="flex gap-2">
              {[0, 1].map(i => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  aria-label={`Slide ${i + 1}`}
                  className={`w-2 h-2 rounded-full transition-colors ${i === currentSlide ? 'bg-[#1D4871]' : 'bg-[#1D4871]/30'}`}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrentSlide(1)}
              disabled={currentSlide === 1}
              aria-label="Next"
              className="w-9 h-9 rounded-full border-2 border-[#1D4871] bg-white flex items-center justify-center disabled:opacity-30 transition-opacity"
            >
              <ChevronRight size={16} strokeWidth={2} stroke="#1D4871" />
            </button>
          </div>
        </div>

        {/* Desktop: two comic panels side by side */}
        <div className="hidden md:grid grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          <PanelTheStruggle />
          <PanelWastedOpportunity />
        </div>
      </div>
    </section>
  );
}
