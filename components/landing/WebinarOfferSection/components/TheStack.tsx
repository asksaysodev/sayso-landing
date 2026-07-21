/**
 * "The Stack": everything you get itemized with its standalone value, summed to
 * a struck-through total, then the webinar price. One card so the value adds up
 * to the deal.
 */

import { STACK_ITEMS, TOTAL_VALUE, PRICE } from '../data';

export function TheStack() {
  return (
    <section className="py-12 md:py-14">
      <div className="max-w-[680px] mx-auto px-5 md:px-6">
        <h2 className="font-comic text-3xl md:text-4xl text-[#1D4871] text-center tracking-wide mb-2">
          Here&apos;s everything you get
        </h2>
        <p className="text-center text-[#1D4871]/60 mb-8">
          The same system we use with a RealTrends Top 200 ranked team.
        </p>

        <div className="bg-white v2-comic-border v2-comic-shadow rounded-2xl overflow-hidden">
          {STACK_ITEMS.map((item) => (
            <div
              key={item.name}
              className="flex items-baseline justify-between gap-4 px-5 md:px-6 py-4 border-b border-[#1D4871]/10"
            >
              <div>
                <p className="font-bold text-[#1D4871] text-[15px] md:text-base">
                  {item.name}
                </p>
                <p className="text-[13px] md:text-sm text-[#1D4871]/60 mt-0.5 leading-relaxed">
                  {item.detail}
                </p>
              </div>
              <span className="shrink-0 font-bold text-[#1D4871] tabular-nums">
                {item.value}
              </span>
            </div>
          ))}

          <div className="flex items-center justify-between gap-4 bg-[#1D4871] px-5 md:px-6 pt-5 pb-2 text-white">
            <span className="font-bold">Total value</span>
            <span className="text-xl font-bold text-[#B9C6D6] line-through tabular-nums">
              {TOTAL_VALUE}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4 bg-[#1D4871] px-5 md:px-6 pb-5 text-white">
            <span className="font-bold">Your price with the webinar offer</span>
            <span className="font-comic text-3xl text-[#FFDE59] tabular-nums">
              {PRICE}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
