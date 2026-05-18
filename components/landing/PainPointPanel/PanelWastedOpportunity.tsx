'use client';

import Image from 'next/image';
import { useRevealOnScroll } from './hooks/useRevealOnScroll';

export function PanelWastedOpportunity({ imgHeight = 'min-h-[240px] md:min-h-[280px]' }: { imgHeight?: string }) {
  const { ref, revealed } = useRevealOnScroll();

  return (
    <div ref={ref} className={`flex flex-col gap-4 transition-all duration-600 ${revealed ? 'v4-panel-reveal' : 'v4-panel-hidden'}`}>
      <div className="relative bg-white rounded-2xl v2-comic-border v2-comic-shadow v2-tilt-right overflow-hidden">
        <div className={`relative bg-gradient-to-br from-[#f0f2f5] to-[#e8eaed] flex items-center justify-center ${imgHeight}`}>
          <Image
            src="/images/without-sayso-part-2.png"
            alt="Missed questions, missed appointments, missed revenue without Sayso"
            width={500}
            height={350}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="bg-white rounded-xl v2-comic-border v2-comic-shadow-sm px-4 py-3">
        <p className="text-[#1D4871] text-base md:text-lg leading-relaxed font-medium">
          Later that day you realize what you should have said, but the moment passed and the appointment is gone.
        </p>
      </div>
    </div>
  );
}
