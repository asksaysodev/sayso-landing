import Link from 'next/link';
import { buildMetadata } from '@/lib/seo/metadata';
import { generateFAQPageJsonLd } from '@/lib/seo/schema';
import { PageHeader } from '@/components/pages/PageHeader';
import { ContentCTA } from '@/components/pages/ContentCTA';
import { FaqList } from '@/components/pages/FaqList';
import { focusRing } from '@/components/landing/HomeShared/styles';
import { FAQ_GROUPS, FAQ_ITEMS, faqSchemaItems } from '@/lib/content/faq';

export const metadata = buildMetadata({
  title: 'Sayso FAQ: Real-Time Call Guidance for Real Estate Teams',
  description:
    'Answers about Sayso: how real-time call guidance works, setup, dialers and CRMs, privacy and two-party consent, team pricing and the company dashboard.',
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
            <a
              href="https://asksayso.notion.site/helpcenter"
              target="_blank"
              rel="noopener noreferrer"
              className={`whitespace-nowrap rounded font-semibold text-[#2367EE] ${focusRing}`}
            >
              help center
            </a>
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
      </div>

      <ContentCTA location="faq" />
    </>
  );
}
