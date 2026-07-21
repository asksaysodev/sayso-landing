/**
 * The price card. Value anchors struck through above the $2,700 webinar price,
 * the lock-in line, and the primary claim button. This is the #price scroll
 * target used by the deadline bar.
 */

import { PRICE, PRICE_ANCHORS } from '../data';
import { ClaimButton } from './ClaimButton';

export function PriceCard() {
  return (
    <section id="price" className="py-12 md:py-14 scroll-mt-24">
      <div className="max-w-[680px] mx-auto px-5 md:px-6">
        <div className="bg-[#1D4871] v2-comic-border v2-comic-shadow rounded-2xl text-center text-white px-6 py-10 md:px-8 md:py-12">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4 text-sm text-[#B9C6D6]">
            {PRICE_ANCHORS.map((anchor) => (
              <span key={anchor.label}>
                {anchor.label} <s className="opacity-85">{anchor.value}</s>
              </span>
            ))}
          </div>

          <div className="font-comic text-6xl md:text-7xl text-[#FFDE59] leading-none">
            {PRICE}
          </div>
          <p className="mt-3 text-base md:text-lg">
            for the full year, everything above, plus all three bonuses
          </p>
          <p className="mt-3 mb-6 italic font-bold text-[15px] text-[#FFDE59]">
            Webinar-only offer, and you can lock this offer forever.
          </p>

          <ClaimButton variant="primary" />
          <p className="mt-4 text-sm text-[#B9C6D6]">
            Limited to webinar attendees.
          </p>
        </div>
      </div>
    </section>
  );
}
