'use client';

/**
 * Interactive calculator that lets a visitor slide between four
 * conversation-hour tiers and see the matching monthly price, estimated
 * calls covered, and effective cost per hour.
 *
 * Pricing tiers and constants live in `../data.ts`. Edit there to update
 * the page.
 */

import { useMemo, useState } from 'react';
import { FOUNDER_PRICING_CONFIG } from '../data';

const { tiers, callsPerHour } = FOUNDER_PRICING_CONFIG;

function formatNumber(n: number) {
  return n.toLocaleString('en-US');
}

export function PricingCalculator() {
  const [index, setIndex] = useState(0);
  const tier = tiers[index];

  const estimatedCalls = useMemo(
    () => Math.round((tier.hours * callsPerHour) / 100) * 100,
    [tier.hours],
  );
  const costPerHour = useMemo(
    () => (tier.price / tier.hours).toFixed(2),
    [tier.hours, tier.price],
  );

  const fillPct = (index / (tiers.length - 1)) * 100;
  const trackBg = `linear-gradient(90deg,#2367EE 0 ${fillPct}%,#D7DEE1 ${fillPct}% 100%)`;

  return (
    <section className="bg-white v2-comic-border v2-comic-shadow rounded-2xl p-7 md:p-10">
      <span className="block text-xs font-bold tracking-widest uppercase text-[#2367EE] mb-3">
        Find your plan
      </span>
      <h2 className="font-comic text-3xl md:text-4xl text-[#1D4871] tracking-wide mb-2">
        Get enough hours to coach every call
      </h2>
      <p className="text-base md:text-[15px] text-[#1D4871]/75 leading-relaxed mb-6">
        Slide to find your plan. Each one is a monthly pool of conversation hours that covers your whole team, with room to spare.
      </p>

      <input
        type="range"
        min={0}
        max={tiers.length - 1}
        step={1}
        value={index}
        onChange={(e) => setIndex(parseInt(e.target.value, 10))}
        aria-label="Plan tier"
        aria-valuetext={`${tier.hours} conversation hours, $${formatNumber(tier.price)} per month`}
        className="founder-pricing-slider w-full"
        style={{ ['--track' as string]: trackBg }}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-1">
        {tiers.map((t, i) => {
          const active = i === index;
          return (
            <button
              key={t.hours}
              type="button"
              onClick={() => setIndex(i)}
              className={`text-sm font-bold leading-tight py-3 px-1 rounded-xl transition-colors ${
                active
                  ? 'text-[#1D4871] bg-white border-2 border-[#1D4871] v2-comic-shadow-sm'
                  : 'text-[#1D4871]/70 hover:text-[#1D4871] border-2 border-transparent'
              }`}
            >
              {t.hours} hrs
            </button>
          );
        })}
      </div>

      <div className="mt-7 v2-comic-border rounded-2xl bg-[#F4F4F5] overflow-hidden">
        <div className="flex items-start justify-between flex-wrap gap-3 px-6 pt-6 pb-1">
          <div className="font-comic text-[22px] md:text-[26px] text-[#1D4871] tracking-wide leading-tight">
            {tier.hours} conversation hours
          </div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#1D4871] bg-[#FFDE59] border-2 border-[#1D4871] rounded-full px-3 py-1 whitespace-nowrap">
            Early Access Pricing
          </span>
        </div>
        <div className="flex items-baseline gap-2 px-6 pb-4">
          <div className="font-comic text-[56px] md:text-[80px] text-[#1D4871] tracking-wide leading-none">
            ${formatNumber(tier.price)}
          </div>
          <div className="text-base md:text-lg font-bold text-[#1D4871]/75">/ month</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 border-t-[2.5px] border-[#1D4871]">
          <div className="px-5 py-4 md:border-r-[2.5px] border-b-[2.5px] md:border-b-0 border-[#1D4871]">
            <div className="font-comic text-2xl md:text-[26px] text-[#1D4871] tracking-wide leading-tight">
              ≈ {formatNumber(estimatedCalls)}
            </div>
            <div className="text-[11.5px] font-bold uppercase tracking-wider text-[#1D4871]/70 mt-1">
              Estimated calls
            </div>
          </div>
          <div className="px-5 py-4">
            <div className="font-comic text-2xl md:text-[26px] text-[#1D4871] tracking-wide leading-tight">
              ${costPerHour}
            </div>
            <div className="text-[11.5px] font-bold uppercase tracking-wider text-[#1D4871]/70 mt-1">
              Cost per conversation hour
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-white border-t-[2.5px] border-[#1D4871] text-sm md:text-[15px] font-semibold text-[#1D4871]">
          All Sayso products are included, Cue, Smart Capture, Pulse, and Playbook, for everyone in your organization.
        </div>
      </div>
    </section>
  );
}
