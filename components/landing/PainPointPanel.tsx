'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function useRevealOnScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, revealed };
}

// Panel A: "The Struggle" — agent on a call, frustrated
function PanelTheStruggle({ imgHeight = 'min-h-[240px] md:min-h-[280px]' }: { imgHeight?: string }) {
  const { ref, revealed } = useRevealOnScroll();

  return (
    <div
      ref={ref}
      className={`relative bg-white rounded-2xl v2-comic-border v2-comic-shadow v2-tilt-left overflow-hidden transition-all duration-600 ${
        revealed ? 'v4-panel-reveal' : 'v4-panel-hidden'
      }`}
    >
      <div className={`relative bg-gradient-to-br from-[#f0f2f5] to-[#e8eaed] flex items-center justify-center ${imgHeight}`}>
        <Image
          src="/without_sayso_part_1.jpg"
          alt="Agent freezes on a call without SaySo"
          width={500}
          height={350}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

// Panel B: "Wasted Opportunity" — calendar with X marks
function PanelWastedOpportunity({ imgHeight = 'min-h-[240px] md:min-h-[280px]' }: { imgHeight?: string }) {
  const { ref, revealed } = useRevealOnScroll();

  return (
    <div
      ref={ref}
      className={`relative bg-white rounded-2xl v2-comic-border v2-comic-shadow v2-tilt-right overflow-hidden transition-all duration-600 ${
        revealed ? 'v4-panel-reveal' : 'v4-panel-hidden'
      }`}
    >
      <div className={`relative bg-gradient-to-br from-[#f0f2f5] to-[#e8eaed] flex items-center justify-center ${imgHeight}`}>
        <Image
          src="/without_sayso_part_2.png"
          alt="Missed questions, missed appointments, missed revenue without SaySo"
          width={500}
          height={350}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

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

        {/* Desktop: two comic panels side by side — unchanged */}
        <div className="hidden md:grid grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          <PanelTheStruggle />
          <PanelWastedOpportunity />
        </div>
      </div>
    </section>
  );
}
