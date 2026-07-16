/**
 * The savings emphasis. This is the whole point of the page: make it unmistakable
 * that the $17k+ of value costs $3,000 today and that the difference is money
 * saved. Dark navy panel so it reads as the hero moment, with the savings amount
 * called out in the yellow accent.
 */

import { TOTAL_VALUE, TODAY_PRICE, TOTAL_SAVINGS } from '../data';

function formatUsd(value: number): string {
  return `$${value.toLocaleString('en-US')}`;
}

export function SavingsCallout() {
  return (
    <section className="bg-[#1D4871] v2-comic-border v2-comic-shadow rounded-2xl p-7 md:p-10 text-center v2-halftone relative overflow-hidden">
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 mb-6">
          <span className="text-2xl md:text-3xl font-bold text-white/45 tabular-nums line-through decoration-2">
            {formatUsd(TOTAL_VALUE)}
          </span>

          <span className="text-white/40 text-3xl md:text-4xl font-light" aria-hidden="true">
            &rarr;
          </span>

          <div className="flex flex-col items-center">
            <span className="font-comic text-5xl md:text-7xl text-[#FFDE59] tracking-wide leading-none">
              {formatUsd(TODAY_PRICE)}
            </span>
            <span className="text-sm md:text-base text-white/80 mt-2">
              for the full year, everything included
            </span>
          </div>
        </div>

        <div className="inline-flex items-center justify-center bg-[#FFDE59] text-[#1D4871] v2-comic-border rounded-full px-5 py-2.5">
          <span className="font-bold text-lg md:text-2xl tabular-nums">
            You save {formatUsd(TOTAL_SAVINGS)}
          </span>
        </div>

        <p className="text-sm md:text-base text-white/70 mt-6 max-w-xl mx-auto leading-relaxed">
          One closing covers this several times over. And if you don&apos;t close,
          you don&apos;t pay. That is the guarantee.
        </p>
      </div>
    </section>
  );
}
