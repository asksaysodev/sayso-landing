/**
 * "Everything you get," laid out like the webinar slide: two columns of
 * check-marked items, the Sayso platform on the light card and the webinar-only
 * bonuses on the dark card, with a money-back guarantee banner underneath.
 *
 * Each card also shows its combined dollar value, so the amounts stay clear and
 * tie back to the savings callout above (platform + bonuses = full value).
 */

import { Check, ShieldCheck } from 'lucide-react';
import { OFFER_COLUMNS, GUARANTEE_TEXT } from '../data';
import type { OfferColumn } from '../types';

function formatUsd(value: number): string {
  return `$${value.toLocaleString('en-US')}`;
}

function OfferCard({ column }: { column: OfferColumn }) {
  const isDark = column.variant === 'dark';

  const cardCls = isDark
    ? 'bg-[#1D4871] v2-comic-border v2-comic-shadow rounded-2xl p-6 md:p-7'
    : 'bg-white v2-comic-border v2-comic-shadow rounded-2xl p-6 md:p-7';
  const labelCls = isDark
    ? 'text-[11px] font-bold uppercase tracking-wide whitespace-nowrap text-white/70'
    : 'text-[11px] font-bold uppercase tracking-wide whitespace-nowrap text-[#1D4871]/70';
  const pillCls = isDark
    ? 'shrink-0 text-[11px] font-bold rounded-full px-2.5 py-1 bg-[#FFDE59] text-[#1D4871]'
    : 'shrink-0 text-[11px] font-bold rounded-full px-2.5 py-1 bg-[#EEF3FF] text-[#2367EE] border border-[#2367EE]/20';
  const nameCls = isDark ? 'font-bold text-white' : 'font-bold text-[#1D4871]';
  const detailCls = isDark ? 'text-white/70' : 'text-[#1D4871]/70';

  return (
    <div className={cardCls}>
      <div className="flex items-center justify-between gap-3 mb-5">
        <span className={labelCls}>{column.label}</span>
        <span className={pillCls}>{formatUsd(column.value)} value</span>
      </div>
      <ul className="flex flex-col gap-3.5">
        {column.items.map((item) => (
          <li key={item.name} className="flex items-start gap-3">
            <span
              className="shrink-0 mt-0.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#2367EE]"
              aria-hidden="true"
            >
              <Check size={13} strokeWidth={3} className="text-white" />
            </span>
            <p className="text-sm md:text-[15px] leading-snug">
              <span className={nameCls}>{item.name}</span>
              {item.detail && (
                <span className={detailCls}>: {item.detail}</span>
              )}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function WhatYouGet() {
  return (
    <section>
      <div className="text-center mb-7">
        <span className="block text-xs md:text-sm font-bold tracking-widest uppercase text-[#2367EE] mb-2">
          The full offer
        </span>
        <h2 className="font-comic text-2xl md:text-3xl text-[#1D4871] tracking-wide">
          Everything you get, and what it&apos;s worth
        </h2>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {OFFER_COLUMNS.map((column) => (
          <OfferCard key={column.label} column={column} />
        ))}
      </div>

      <div className="mt-5 flex items-start gap-3.5 bg-[#EEF1FF] v2-comic-border rounded-2xl p-5 md:p-6">
        <ShieldCheck
          size={26}
          strokeWidth={2.25}
          className="shrink-0 text-[#2367EE] mt-0.5"
          aria-hidden="true"
        />
        <p className="text-sm md:text-base leading-relaxed text-[#1D4871]">
          <span className="font-bold text-[#2367EE]">The guarantee:</span>{' '}
          {GUARANTEE_TEXT}
        </p>
      </div>
    </section>
  );
}
