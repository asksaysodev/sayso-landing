import Link from 'next/link';
import { PageHeader } from '@/components/pages/PageHeader';
import Carousel from '@/components/ui/Carousel';
import { ContentCTA } from '@/components/pages/ContentCTA';
import { generateFAQPageJsonLd, generateWebPageJsonLd } from '@/lib/seo/schema';
import type { CaseStudyEntry } from '@/lib/content/case-studies/types';

interface CaseStudyPageProps {
  entry: CaseStudyEntry;
}

const h2Class =
  'font-hero font-extrabold tracking-[-0.02em] leading-tight text-2xl md:text-[28px] text-[#10233A] mt-10 mb-4';
const pClass = 'text-[#1D4871]/80 text-base leading-relaxed font-sans mb-5';

function Paragraphs({ text }: { text: string }) {
  return (
    <>
      {text.split('\n\n').map((paragraph, i) => (
        <p key={i} className={pClass}>
          {paragraph}
        </p>
      ))}
    </>
  );
}

export function CaseStudyPage({ entry }: CaseStudyPageProps) {
  const webPageJsonLd = generateWebPageJsonLd(
    entry.seoTitle,
    entry.seoDescription,
    `/case-studies/${entry.slug}`,
  );

  const faqJsonLd = entry.faqs?.length ? generateFAQPageJsonLd(entry.faqs) : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <PageHeader
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Case Studies', href: '/case-studies' },
          { label: entry.customerName },
        ]}
        title={entry.headline}
        intro={entry.subheadline}
      >
        <p className="text-[#1D4871]/60 text-base font-sans">{entry.customerName}</p>
        {entry.pdf && (
          <p className="mt-4">
            <a
              href={entry.pdf.href}
              className="text-[#2367EE] hover:underline font-bold font-sans"
              download
              data-analytics-id="link-case-study-pdf-top"
            >
              {entry.pdf.label}
            </a>
          </p>
        )}
      </PageHeader>

      <article className="max-w-[800px] mx-auto px-6 pb-10">
        {/* Snapshot Card */}
        <div className="bg-white rounded-[20px] overflow-hidden mb-8 shadow-card">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {[
              { label: 'Customer', value: entry.snapshot.customer },
              { label: 'Challenge', value: entry.snapshot.challenge },
              { label: 'Approach', value: entry.snapshot.approach },
              { label: 'Result', value: entry.snapshot.result },
            ].map((item) => (
              <div key={item.label} className="px-5 py-4 border-b border-r border-[#1D4871]/10">
                <p className="text-xs font-bold text-[#1D4871]/50 uppercase tracking-wider mb-1 font-sans">
                  {item.label}
                </p>
                <p className="text-[#1D4871] text-sm font-sans leading-relaxed">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* At a Glance */}
        {entry.stats && entry.stats.length > 0 && (
          <>
            <h2 className={h2Class}>At a Glance</h2>
            {entry.statsPeriod && <p className={pClass}>{entry.statsPeriod}</p>}
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {entry.stats.map((stat) => (
                <div key={stat.label} className="bg-white rounded-[20px] shadow-card px-5 py-4">
                  <dt className="text-xs font-bold text-[#1D4871]/50 uppercase tracking-wider mb-1 font-sans">
                    {stat.label}
                  </dt>
                  <dd className="font-hero font-extrabold text-[32px] leading-tight text-[#10233A]">
                    {stat.value}
                  </dd>
                  {stat.change && (
                    <dd className="text-[#2367EE] text-sm font-bold font-sans mt-1">{stat.change}</dd>
                  )}
                </div>
              ))}
            </dl>
          </>
        )}

        {/* About the customer */}
        {entry.aboutCustomer && (
          <>
            <h2 className={h2Class}>About the Team</h2>
            <Paragraphs text={entry.aboutCustomer} />
          </>
        )}

        {/* Challenge */}
        <h2 className={h2Class}>The Challenge</h2>
        <Paragraphs text={entry.challenge} />

        {/* What They Tried Before */}
        {entry.whatTheyTriedBefore && (
          <>
            <h2 className="font-hero font-extrabold tracking-[-0.02em] leading-tight text-2xl md:text-[28px] text-[#10233A] mt-10 mb-4">
              What They Tried Before
            </h2>
            <p className="text-[#1D4871]/80 text-base leading-relaxed font-sans mb-5">
              {entry.whatTheyTriedBefore}
            </p>
          </>
        )}

        {/* How Sayso Helped / What Changed */}
        <h2 className={h2Class}>{entry.whatChanged ? 'What Changed' : 'How Sayso Helped'}</h2>
        <Paragraphs text={entry.howSaysoHelped} />
        {entry.whatChanged?.map((item) => (
          <div key={item.title}>
            <h3 className="font-hero font-bold tracking-[-0.01em] text-xl text-[#10233A] mt-6 mb-2">
              {item.title}
            </h3>
            <p className={pClass}>{item.body}</p>
          </div>
        ))}

        {/* Quotes */}
        {entry.quotes.length > 0 && (
          <Carousel label="Customer quotes" itemName="quote" className="my-8" trackClassName="grid grid-cols-1 gap-4">
            {entry.quotes.map((quote, i) => (
              <blockquote
                key={i}
                className="border-l-4 border-[#FFDE59] bg-[#FFDE59]/10 px-6 py-4 rounded-r-lg"
              >
                <p className="text-[#1D4871] text-base leading-relaxed font-sans italic">
                  &ldquo;{quote}&rdquo;
                </p>
              </blockquote>
            ))}
          </Carousel>
        )}

        {/* Results */}
        <h2 className={h2Class}>The Results</h2>
        <Paragraphs text={entry.results} />

        {/* What This Means */}
        {entry.whatThisMeans && (
          <>
            <h2 className={h2Class}>What This Means for Teams</h2>
            <Paragraphs text={entry.whatThisMeans} />
          </>
        )}

        {/* What's Next */}
        {entry.whatsNext && (
          <>
            <h2 className="font-hero font-extrabold tracking-[-0.02em] leading-tight text-2xl md:text-[28px] text-[#10233A] mt-10 mb-4">
              What&apos;s Next
            </h2>
            <p className="text-[#1D4871]/80 text-base leading-relaxed font-sans mb-5">
              {entry.whatsNext}
            </p>
          </>
        )}

        {/* FAQ */}
        {entry.faqs && entry.faqs.length > 0 && (
          <>
            <h2 className={h2Class}>Common Questions</h2>
            {entry.faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="font-hero font-bold tracking-[-0.01em] text-lg text-[#10233A] mt-6 mb-2">
                  {faq.question}
                </h3>
                <p className={pClass}>{faq.answer}</p>
              </div>
            ))}
          </>
        )}

        {/* PDF */}
        {entry.pdf && (
          <p className="mt-8 mb-2">
            <a
              href={entry.pdf.href}
              className="text-[#2367EE] hover:underline font-bold font-sans"
              download
              data-analytics-id="link-case-study-pdf-bottom"
            >
              {entry.pdf.label}
            </a>
          </p>
        )}

        {/* Related Features */}
        <h2 className="font-hero font-bold tracking-[-0.01em] text-xl text-[#10233A] mt-10 mb-3">
          Features Used
        </h2>
        <ul className="space-y-2 mb-6">
          {entry.relatedProducts.map((feature) => (
            <li key={feature.href}>
              <Link
                href={feature.href}
                className="text-[#2367EE] hover:underline font-bold font-sans"
              >
                {feature.title}
              </Link>
            </li>
          ))}
        </ul>

        {/* Related Persona */}
        {entry.relatedPersona && (
          <p className="text-[#1D4871]/70 text-sm font-sans">
            See also:{' '}
            <Link
              href={entry.relatedPersona.href}
              className="text-[#2367EE] hover:underline font-bold"
            >
              {entry.relatedPersona.title}
            </Link>
          </p>
        )}
      </article>

      <ContentCTA
        location="case-study-page"
        headline="See Sayso on Your Team's Calls"
        subheading="Book a demo to see real-time call coaching on a live call."
      />
    </>
  );
}
