/**
 * Short FAQ under the /pricing plans: cancelling, contracts, setup, dialer and
 * CRM fit, and team pricing. Uses the shared FaqList accordion; the copy lives
 * in lib/content/faq (PRICING_FAQ_ITEMS).
 */
import Link from 'next/link';
import { FaqList } from '@/components/pages/FaqList';
import { PRICING_FAQ_ITEMS } from '@/lib/content/faq';
import { focusRing } from '../../HomeShared/styles';

export function PricingFaq() {
  return (
    <section aria-labelledby="pricing-faq-title" className="mx-auto mt-16 max-w-[760px]">
      <h2
        id="pricing-faq-title"
        className="text-balance text-center font-hero text-[clamp(26px,3.6vw,34px)] font-extrabold tracking-[-0.03em] text-[#10233A]"
      >
        Pricing questions
      </h2>
      {/* data-faq: GTM's FAQ trigger only counts clicks inside this marker. */}
      <div data-faq="" className="mt-6">
        <FaqList items={PRICING_FAQ_ITEMS} />
        <Link
          href="/faq/"
          data-analytics-id="link-faq-all-pricing"
          className={`mt-6 inline-block rounded px-1 text-sm font-bold text-[#2367EE] ${focusRing}`}
        >
          See all questions &rarr;
        </Link>
      </div>
    </section>
  );
}
