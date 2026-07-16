/**
 * The itemized offer. Each thing you get on the left with its real dollar value
 * on the right, then a "Total value" row that sums them up. This is the setup
 * for the savings callout: we show the full value first so the today price lands.
 */

import { OFFER_LINE_ITEMS, TOTAL_VALUE } from '../data';

function formatUsd(value: number): string {
  return `$${value.toLocaleString('en-US')}`;
}

export function OfferBreakdown() {
  return (
    <section className="bg-white v2-comic-border v2-comic-shadow rounded-2xl p-6 md:p-9">
      <ul>
        {OFFER_LINE_ITEMS.map((item) => (
          <li
            key={item.name}
            className="flex items-start justify-between gap-5 py-4 border-t border-[#1D4871]/12 first:border-t-0 first:pt-0"
          >
            <div>
              <p className="font-bold text-[#1D4871] text-[15px] md:text-lg leading-snug">
                {item.name}
              </p>
              {item.detail && (
                <p className="text-[13px] md:text-sm text-[#1D4871]/60 leading-relaxed mt-1">
                  {item.detail}
                </p>
              )}
            </div>
            <span className="shrink-0 font-bold text-[#1D4871] text-[15px] md:text-lg tabular-nums">
              {item.value !== null ? formatUsd(item.value) : item.displayValue}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-2 pt-5 border-t-2 border-[#1D4871]/20 flex items-baseline justify-between gap-5">
        <span className="font-bold text-[#1D4871] text-base md:text-xl">
          Total value
        </span>
        <span className="font-bold text-[#1D4871]/50 text-xl md:text-2xl tabular-nums line-through decoration-2">
          {formatUsd(TOTAL_VALUE)}
        </span>
      </div>
    </section>
  );
}
