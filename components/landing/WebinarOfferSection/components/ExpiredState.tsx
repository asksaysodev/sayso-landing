/**
 * Shown when the webinar deadline has passed (or there is no valid ?d=). The
 * offer is hidden and replaced with this, pointing people to regular pricing.
 */

import {
  PRICE,
  REGULAR_MONTHLY,
  REGULAR_PRICE,
  REGULAR_PRICING_URL,
} from '../data';

export function ExpiredState() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center px-5 py-16">
      <div className="max-w-[560px]">
        <h1 className="font-comic text-4xl md:text-5xl text-[#1D4871] tracking-wide leading-tight mb-5">
          The webinar offer for your session has ended.
        </h1>
        <p className="text-lg text-[#1D4871]/70 mb-8 leading-relaxed">
          The {PRICE} webinar price, the 2x lead list, and the signed-client
          guarantee were only available until the Friday after your webinar. Sayso
          is still here, at the regular price of {REGULAR_PRICE}/yr or{' '}
          {REGULAR_MONTHLY}.
        </p>
        <a
          href={REGULAR_PRICING_URL}
          className="inline-flex items-center justify-center rounded-full bg-[#2367EE] px-9 py-3.5 text-base font-bold text-white v2-comic-border v2-comic-btn focus:outline-none focus-visible:ring-4 focus-visible:ring-[#2367EE]/40"
        >
          See regular pricing
        </a>
        <p className="mt-4 text-sm text-[#1D4871]/60">
          Think this is a mistake? Email us and we&apos;ll take a look.
        </p>
      </div>
    </div>
  );
}
