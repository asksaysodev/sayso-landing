import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ContentCTA } from '@/components/pages/ContentCTA';
import { generateWebPageJsonLd } from '@/lib/seo/schema';
import type { CaseStudyEntry } from '@/lib/content/case-studies/types';

interface CaseStudyPageProps {
  entry: CaseStudyEntry;
}

export function CaseStudyPage({ entry }: CaseStudyPageProps) {
  const webPageJsonLd = generateWebPageJsonLd(
    entry.seoTitle,
    entry.seoDescription,
    `/case-studies/${entry.slug}`,
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />

      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Case Studies', href: '/case-studies' },
          { label: entry.customerName },
        ]}
      />

      <article className="max-w-[800px] mx-auto px-6 pb-10">
        {/* Badge + Headline */}
        <div className="mt-6 mb-6">
          <span className="inline-block rounded-md bg-[#FFDE59] px-2.5 py-px font-comic text-[17px] tracking-[0.08em] text-[#1D4871] mb-4">
            CASE STUDY
          </span>
          <h1 className="font-hero font-extrabold tracking-[-0.03em] text-[#10233A] leading-[1.1] text-[34px] md:text-5xl">
            {entry.headline}
          </h1>
          <p className="text-[#1D4871]/60 text-base font-sans mt-2">
            {entry.customerName}
          </p>
        </div>

        {/* Snapshot Card */}
        <div className="bg-white rounded-[20px] overflow-hidden mb-8 shadow-card">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {[
              { label: 'Customer', value: entry.snapshot.customer },
              { label: 'Challenge', value: entry.snapshot.challenge },
              { label: 'Solution', value: entry.snapshot.solution },
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

        {/* Challenge */}
        <h2 className="font-hero font-extrabold tracking-[-0.02em] leading-tight text-2xl md:text-[28px] text-[#10233A] mt-10 mb-4">
          The Challenge
        </h2>
        {entry.challenge.split('\n\n').map((paragraph, i) => (
          <p key={i} className="text-[#1D4871]/80 text-base leading-relaxed font-sans mb-5">
            {paragraph}
          </p>
        ))}

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

        {/* How Sayso Helped */}
        <h2 className="font-hero font-extrabold tracking-[-0.02em] leading-tight text-2xl md:text-[28px] text-[#10233A] mt-10 mb-4">
          How Sayso Helped
        </h2>
        {entry.howSaysoHelped.split('\n\n').map((paragraph, i) => (
          <p key={i} className="text-[#1D4871]/80 text-base leading-relaxed font-sans mb-5">
            {paragraph}
          </p>
        ))}

        {/* Quotes */}
        {entry.quotes.length > 0 && (
          <div className="space-y-4 my-8">
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
          </div>
        )}

        {/* Results */}
        <h2 className="font-hero font-extrabold tracking-[-0.02em] leading-tight text-2xl md:text-[28px] text-[#10233A] mt-10 mb-4">
          The Results
        </h2>
        {entry.results.split('\n\n').map((paragraph, i) => (
          <p key={i} className="text-[#1D4871]/80 text-base leading-relaxed font-sans mb-5">
            {paragraph}
          </p>
        ))}

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
        headline="Ready for Results Like These?"
        subheading="See how Sayso can help your team book more appointments."
      />
    </>
  );
}
