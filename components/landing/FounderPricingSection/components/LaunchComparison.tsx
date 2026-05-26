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
    ? 'bg-[#1D4871] v2-comic-border v2-comic-shadow rounded-2xl p-6 md:p-7 w-full'
    : 'bg-white v2-comic-border v2-comic-shadow rounded-2xl p-6 md:p-7 w-full';

  const tagCls = isLater
    ? 'inline-block text-[11px] font-bold uppercase tracking-widest text-[#1D4871] bg-[#FFDE59] border-2 border-[#1D4871] rounded-full px-3 py-1 mb-3'
    : 'inline-block text-[11px] font-bold uppercase tracking-widest text-[#1D4871] bg-[#D7DEE1] border-2 border-[#1D4871] rounded-full px-3 py-1 mb-3';

  const titleCls = isLater
    ? 'font-comic text-2xl md:text-[26px] text-white tracking-wide mb-3'
    : 'font-comic text-2xl md:text-[26px] text-[#1D4871] tracking-wide mb-3';

  const liCls = isLater
    ? 'text-sm md:text-[15px] leading-relaxed text-white/90 py-2 pl-7 relative border-t border-white/20 first:border-t-0'
    : 'text-sm md:text-[15px] leading-relaxed text-[#1D4871]/80 py-2 pl-7 relative border-t border-[#1D4871]/15 first:border-t-0';

  const dotCls = isLater
    ? 'absolute left-0 top-[14px] w-3 h-3 rounded-full bg-[#FFDE59] border-2 border-white'
    : 'absolute left-0 top-[14px] w-3 h-3 rounded-full bg-[#2367EE] border-2 border-[#1D4871]';

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
        <span className="block text-xs font-bold tracking-widest uppercase text-[#2367EE] mb-3">
          After public launch
        </span>
        <h2 className="font-comic text-3xl md:text-4xl text-[#1D4871] tracking-wide mb-3">
          What changes after our hard launch
        </h2>
        <p className="text-base md:text-lg text-[#1D4871]/75 leading-relaxed">
          Three things change when Sayso hard launches ({FOUNDER_PRICING_CONFIG.launchWindow}): Founder Pricing closes, prices increase, and instead of one rate, each product has its own cost.
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
