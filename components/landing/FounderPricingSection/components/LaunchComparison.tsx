/**
 * "What changes after our hard launch" section. Two columns: Founder
 * Pricing now (light) vs A la carte at launch (dark). Carousel on mobile,
 * 2-col grid on md+.
 */

import { FOUNDER_PRICING_CONFIG, LAUNCH_COMPARISON } from '../data';
import type { ComparisonColumn } from '../types';
import { Carousel } from './Carousel';

function ComparisonCard({ column }: { column: ComparisonColumn }) {
  const isLater = column.variant === 'later';

  const wrapperCls = isLater
    ? 'rounded-[20px] bg-[#1D4871] shadow-[0_18px_40px_-18px_rgba(29,72,113,0.6)] p-6 md:p-7 w-full'
    : 'rounded-[20px] border border-[rgba(16,35,58,0.12)] bg-white shadow-[0_1px_2px_rgba(16,35,58,0.06),0_14px_34px_-16px_rgba(16,35,58,0.25)] p-6 md:p-7 w-full';

  const tagCls = isLater
    ? 'mb-3 inline-block rounded-full bg-[#FFDE59] px-2.5 py-[3px] text-xs font-semibold text-[#1D4871] whitespace-nowrap'
    : 'mb-3 inline-block rounded-full bg-[#F4F4F5] px-2.5 py-[3px] text-xs font-semibold text-[#556B86] whitespace-nowrap';

  const titleCls = isLater
    ? 'mb-3 font-hero text-[22px] font-bold text-white'
    : 'mb-3 font-hero text-[22px] font-bold text-[#10233A]';

  const liCls = isLater
    ? 'text-sm md:text-[15px] leading-relaxed text-white/90 py-2 pl-7 relative border-t border-white/20 first:border-t-0'
    : 'text-sm md:text-[15px] leading-relaxed text-[#556B86] py-2 pl-7 relative border-t border-[rgba(16,35,58,0.1)] first:border-t-0';

  const dotCls = isLater
    ? 'absolute left-0 top-[15px] h-2.5 w-2.5 rounded-full bg-[#FFDE59]'
    : 'absolute left-0 top-[15px] h-2.5 w-2.5 rounded-full bg-[#2367EE]';

  return (
    <div className={wrapperCls}>
      <span className={tagCls}>{column.tag}</span>
      <h3 className={titleCls}>{column.title}</h3>
      <ul>
        {column.bullets.map((b) => (
          <li key={b} className={liCls}>
            <span className={dotCls} aria-hidden="true" />
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function LaunchComparison() {
  return (
    <section>
      <div className="mb-7">
        <h2 className="mb-3 font-hero font-extrabold tracking-[-0.03em] text-[#10233A] text-[clamp(28px,4vw,40px)] leading-[1.1]">
          What changes after our hard launch
        </h2>
        <p className="text-base md:text-lg text-[#556B86] leading-relaxed">
          Three things change when Sayso hard launches ({FOUNDER_PRICING_CONFIG.launchWindow}): Early Access Pricing closes, prices increase, and instead of one rate, each product has its own cost.
        </p>
      </div>

      <Carousel ariaLabel="Pricing comparison">
        {LAUNCH_COMPARISON.map((c) => (
          <ComparisonCard key={c.tag} column={c} />
        ))}
      </Carousel>
    </section>
  );
}
