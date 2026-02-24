'use client';

import Image from 'next/image';
import { useRevealOnScroll } from './hooks/useRevealOnScroll';

export function PanelWastedOpportunity({ imgHeight = 'min-h-[240px] md:min-h-[280px]' }: { imgHeight?: string }) {
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
