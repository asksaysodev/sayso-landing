/**
 * The price. Compact, centered navy panel: the $3,000 today price and how much
 * that saves, with the guarantee line underneath. Sits near the top so the
 * price and a Claim button are visible without scrolling.
 */

import { TODAY_PRICE, TOTAL_SAVINGS } from '../data';

function formatUsd(value: number): string {
  return `$${value.toLocaleString('en-US')}`;
}

export function SavingsCallout() {
  return (
    <section className="bg-[#1D4871] v2-comic-border v2-comic-shadow rounded-2xl p-6 md:p-8 text-center v2-halftone relative overflow-hidden max-w-2xl mx-auto w-full">
      <div className="relative z-10">
        <span className="block font-comic text-5xl md:text-6xl text-[#FFDE59] tracking-wide leading-none">
          {formatUsd(TODAY_PRICE)}
        </span>
        <span className="block text-xs md:text-sm text-white/80 mt-2">
          for the full year, everything included
        </span>

        <div className="inline-flex items-center justify-center bg-[#FFDE59] text-[#1D4871] v2-comic-border rounded-full px-4 py-1.5 mt-4">
          <span className="font-bold text-base md:text-xl tabular-nums">
            You save {formatUsd(TOTAL_SAVINGS)}
          </span>
        </div>

        <p className="text-xs md:text-sm text-white/70 mt-4 leading-relaxed">
          One closing covers this several times over, and if you don&apos;t close,
          you don&apos;t pay.
        </p>
      </div>
    </section>
  );
}
