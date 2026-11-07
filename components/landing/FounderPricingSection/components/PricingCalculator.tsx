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
  const trackBg = `linear-gradient(90deg,#2367EE 0 ${fillPct}%,#E3E8EC ${fillPct}% 100%)`;

  return (
    <section className="rounded-[20px] border border-[rgba(16,35,58,0.12)] bg-white shadow-[0_1px_2px_rgba(16,35,58,0.06),0_14px_34px_-16px_rgba(16,35,58,0.25)] p-7 md:p-10">
      <h2 className="mb-2 font-hero font-extrabold tracking-[-0.03em] text-[#10233A] text-[clamp(28px,4vw,40px)] leading-[1.1]">
        Get enough hours to coach every call
      </h2>
      <p className="text-base md:text-[15px] text-[#556B86] leading-relaxed mb-6">
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

      <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-4">
        {tiers.map((t, i) => {
          const active = i === index;
          return (
            <button
              key={t.hours}
              type="button"
              onClick={() => setIndex(i)}
              aria-pressed={active}
              className={`h-11 rounded-full px-1 text-sm font-semibold leading-tight transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2367EE] focus-visible:ring-offset-2 ${
                active ? 'bg-[#2367EE] text-white shadow-button' : 'bg-white text-[#10233A] shadow-card-sm hover:shadow-card-sm-hover'
              }`}
            >
              {t.hours} hrs
            </button>
          );
        })}
      </div>

      <div className="mt-7 overflow-hidden rounded-2xl bg-[#F4F4F5] ring-1 ring-[rgba(16,35,58,0.1)]">
        <div className="flex items-start justify-between flex-wrap gap-3 px-6 pt-6 pb-1">
          <div className="font-hero text-[22px] font-bold leading-tight text-[#10233A]">
            {tier.hours} conversation hours
          </div>
          <span className="rounded-full bg-[#FFDE59] px-2.5 py-[3px] text-xs font-semibold text-[#1D4871] whitespace-nowrap">
            Early Access Pricing
          </span>
        </div>
        <div className="flex items-baseline gap-2 px-6 pb-4">
          <div className="font-hero text-[52px] font-extrabold leading-none tracking-[-0.03em] text-[#10233A] tabular-nums md:text-[72px]">
            ${formatNumber(tier.price)}
          </div>
          <div className="text-base md:text-lg font-semibold text-[#556B86]">/ month</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-[rgba(16,35,58,0.1)]">
          <div className="border-b border-[rgba(16,35,58,0.1)] px-5 py-4 md:border-b-0 md:border-r">
            <div className="font-hero text-2xl font-extrabold leading-tight tracking-[-0.02em] text-[#10233A] tabular-nums">
              ≈ {formatNumber(estimatedCalls)}
            </div>
            <div className="text-[11.5px] font-bold uppercase tracking-wider text-[#556B86] mt-1">
              Estimated calls
            </div>
          </div>
          <div className="px-5 py-4">
            <div className="font-hero text-2xl font-extrabold leading-tight tracking-[-0.02em] text-[#10233A] tabular-nums">
              ${costPerHour}
            </div>
            <div className="text-[11.5px] font-bold uppercase tracking-wider text-[#556B86] mt-1">
              Cost per conversation hour
            </div>
          </div>
        </div>

        <div className="border-t border-[rgba(16,35,58,0.1)] bg-white px-6 py-4 text-sm font-semibold text-[#10233A] md:text-[15px]">
          All Sayso products are included, Cue, Smart Capture, Pulse, and Playbook, for everyone in your organization.
        </div>
      </div>
    </section>
  );
}
