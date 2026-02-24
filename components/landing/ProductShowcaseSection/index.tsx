'use client';

import { useShowcaseState } from './hooks/useShowcaseState';
import { ProductShowcaseVideo } from './ProductShowcaseVideo';

export { ProductShowcaseVideo } from './ProductShowcaseVideo';
export { ProductShowcaseCopy } from './CopySection';

export function ProductShowcaseSection() {
  const { timerSeconds, currentSuggestion, visibleSignals, cycleKey } = useShowcaseState();

  return (
    <section className="bg-white py-12 md:py-14 lg:py-16">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Copy Section */}
        <div className="text-center mb-8 md:mb-12">
          <p className="text-[12px] uppercase tracking-wider text-[#1D4871]/60 font-semibold mb-3 md:mb-4">
            LIVE DURING THE CALL
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1D4871] mb-3 md:mb-4">
            See the moment before it passes.
          </h2>
          <p className="text-base md:text-lg text-[#1D4871]/80 max-w-2xl mx-auto">
            Sayso surfaces the next best question while you&apos;re still in the conversation.
          </p>
        </div>

        <ProductShowcaseVideo
          timerSeconds={timerSeconds}
          cycleKey={cycleKey}
          currentSuggestion={currentSuggestion}
          visibleSignals={visibleSignals}
        />
      </div>
    </section>
  );
}
