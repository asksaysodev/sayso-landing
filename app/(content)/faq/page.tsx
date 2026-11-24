import Link from 'next/link';
import { buildMetadata } from '@/lib/seo/metadata';
import { generateFAQPageJsonLd } from '@/lib/seo/schema';
import { PageHeader } from '@/components/pages/PageHeader';
import { ContentCTA } from '@/components/pages/ContentCTA';
import { FaqList } from '@/components/pages/FaqList';
import { focusRing } from '@/components/landing/HomeShared/styles';
import { FAQ_GROUPS, FAQ_ITEMS, faqSchemaItems } from '@/lib/content/faq';

export const metadata = buildMetadata({
  title: 'Sayso FAQ: Real-Time Call Guidance for Real Estate Agents',
  description:
    'Answers about Sayso: what it does, how it works on a call, setup on Mac and Windows, objections, your own scripts and methods, and market data.',
  path: '/faq',
});

const faqJsonLd = generateFAQPageJsonLd(faqSchemaItems(FAQ_ITEMS));

export default function FaqPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <PageHeader
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'FAQ' }]}
        title="Frequently Asked Questions"
        intro={
          <>
            Something else?{' '}
            <Link href="/contact/" className={`rounded font-semibold text-[#2367EE] ${focusRing}`}>
              Contact us
            </Link>{' '}
            or browse the{' '}
            <Link href="/help/" className={`whitespace-nowrap rounded font-semibold text-[#2367EE] ${focusRing}`}>
              help center
            </Link>
            .
          </>
        }
      />

      {/* data-faq: GTM's FAQ trigger only counts clicks inside this marker. */}
      <div data-faq="" className="mx-auto max-w-[800px] px-6 pb-10">
        {FAQ_GROUPS.map((group, gi) => (
          <section key={group.title} className={gi ? 'mt-12' : undefined} aria-labelledby={`faq-group-${gi}`}>
            <h2
              id={`faq-group-${gi}`}
              className="mb-1 font-hero text-2xl font-extrabold tracking-[-0.02em] text-[#10233A] md:text-[28px]"
            >
              {group.title}
            </h2>
            <FaqList items={group.items} />
          </section>
        ))}
        <p className="mt-12 text-base leading-relaxed text-[#1D4871]/70 font-sans">
          Questions about dialers, recording, two-party consent, pricing and cancelling are answered in the{' '}
          <Link href="/#faq" className={`rounded font-semibold text-[#2367EE] ${focusRing}`}>
            homepage FAQ
          </Link>
          .
        </p>
      </div>

      <ContentCTA location="faq" />
    </>
  );
}
