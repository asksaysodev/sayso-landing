/**
 * Homepage FAQ: an intro column with contact links and a short flat list of
 * questions. The full list lives on /faq.
 */
import Link from 'next/link';
import { section, wash, wrap, eyebrow, focusRing } from '../HomeShared/styles';
import { FaqList } from '@/components/pages/FaqList';
import { HOME_FAQ_ITEMS } from '@/lib/content/faq';

export function HomeFAQ() {
  return (
    <section id="faq" className={`${section} ${wash}`} aria-labelledby="faq-title">
      <div className={`${wrap} grid max-w-[1040px] grid-cols-1 gap-10 min-[961px]:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]`}>
        <div>
          <span className={eyebrow}>FAQ</span>
          <h2 id="faq-title" className="mt-[18px] text-balance font-hero text-[clamp(28px,4vw,40px)] font-extrabold tracking-[-0.03em] text-[#10233A]">
            Frequently asked questions
          </h2>
          <p className="mt-3 text-[#556B86]">
            Something else?{' '}
            <Link href="/contact/" className={`rounded font-semibold text-[#2367EE] ${focusRing}`}>
              Contact us
            </Link>{' '}
            or browse the{' '}
            <a href="https://asksayso.notion.site/helpcenter" target="_blank" rel="noopener noreferrer" className={`whitespace-nowrap rounded font-semibold text-[#2367EE] ${focusRing}`}>
              help center
            </a>
            .
          </p>
        </div>
        {/* data-faq: GTM's FAQ trigger only counts clicks inside this marker. */}
        <div data-faq="">
          <FaqList items={HOME_FAQ_ITEMS} />
          <Link
            href="/faq/"
            data-analytics-id="link-faq-all"
            className={`mt-6 inline-block rounded px-1 text-sm font-bold text-[#2367EE] ${focusRing}`}
          >
            See all questions &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
