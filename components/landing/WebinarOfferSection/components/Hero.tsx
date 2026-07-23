/**
 * Hero. Names the offer, sums the value against the webinar price, and puts the
 * first claim button high on the page. The signed-client guarantee sits under
 * the button as the risk reversal.
 */

import { ClaimButton } from './ClaimButton';
import { PRICE, TOTAL_VALUE } from '../data';

export function Hero() {
  return (
    <section className="text-center px-5 pt-14 pb-10 md:pt-16 md:pb-12">
      <div className="max-w-[680px] mx-auto">
        <span className="inline-block text-xs font-extrabold uppercase tracking-[0.14em] text-[#2367EE] mb-4">
          Webinar attendees only
        </span>
        <h1 className="font-comic text-5xl md:text-6xl text-[#1D4871] tracking-wide leading-none mb-5">
          The offer
        </h1>
        <p className="text-lg md:text-xl text-[#1D4871]/65 max-w-xl mx-auto mb-5 leading-relaxed">
          The full Sayso system: software, a year of weekly coaching, a list of
          curated leads for you, and personal setup.
        </p>
        <p className="text-[17px] text-[#1D4871]/65 mb-7">
          <s className="opacity-85">{TOTAL_VALUE} total value</s>
          <b className="inline-block ml-2.5 align-middle font-black italic text-2xl text-[#1D4871] tabular-nums">
            {PRICE} for the year
          </b>
        </p>
        <ClaimButton variant="primary" />
        <p className="mt-4 text-sm font-bold text-[#1E7F4F]">
          Sign 1 client in your first 12 months, or every dollar back.
        </p>
      </div>
    </section>
  );
}
