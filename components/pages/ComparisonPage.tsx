import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ContentCTA } from '@/components/pages/ContentCTA';
import { ContentInlineCTA } from '@/components/pages/ContentInlineCTA';
import { FAQ } from '@/components/pages/FAQ';
import { generateWebPageJsonLd } from '@/lib/seo/schema';
import type { ComparisonEntry } from '@/lib/content/comparisons/types';

interface ComparisonPageProps {
  entry: ComparisonEntry;
}

export function ComparisonPage({ entry }: ComparisonPageProps) {
  const webPageJsonLd = generateWebPageJsonLd(
    entry.seoTitle,
    entry.seoDescription,
    `/compare/${entry.slug}`,
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
          { label: 'Compare', href: '/compare' },
          { label: `Sayso vs ${entry.competitor}` },
        ]}
      />

      <article className="max-w-[800px] mx-auto px-6 pb-10">
        {/* H1 */}
        <h1 className="font-comic text-3xl md:text-4xl text-[#1D4871] tracking-wide mt-6 mb-6">
          {entry.h1}
        </h1>

        {/* TLDR Box */}
        <div className="bg-[#FFDE59]/10 border-2 border-[#1D4871] rounded-2xl p-6 v2-comic-shadow-sm mb-8">
          <p className="text-xs font-bold text-[#1D4871]/50 uppercase tracking-wider mb-2 font-sans">
            TL;DR
          </p>
          <p className="text-[#1D4871] text-base leading-relaxed font-sans mb-4">
            {entry.tldr}
          </p>
          <Link
            href="/demo"
            className="inline-flex items-center justify-center px-5 py-2 rounded-full bg-[#1D4871] text-white font-bold text-sm hover:bg-[#2367EE] transition-colors"
          >
            Book a Demo
          </Link>
        </div>

        {/* Why Looking */}
        <h2 className="font-hero text-2xl md:text-[28px] text-[#1D4871] mt-10 mb-4">
          Why People Look for {entry.competitor} Alternatives
        </h2>
        {entry.whyLooking.split('\n\n').map((paragraph, i) => (
          <p key={i} className="text-[#1D4871]/80 text-base leading-relaxed font-sans mb-5">
            {paragraph}
          </p>
        ))}

        {/* Comparison Table */}
        <h2 className="font-hero text-2xl md:text-[28px] text-[#1D4871] mt-10 mb-6">
          {entry.competitor} vs Sayso — Feature Comparison
        </h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full border-collapse border-2 border-[#1D4871] rounded-lg text-sm font-sans">
            <thead>
              <tr>
                <th className="bg-[#1D4871] text-white px-4 py-3 text-left font-bold">
                  Feature
                </th>
                <th className="bg-[#FFDE59] text-[#1D4871] px-4 py-3 text-left font-bold">
                  Sayso
                </th>
                <th className="bg-[#1D4871] text-white px-4 py-3 text-left font-bold">
                  {entry.competitor}
                </th>
              </tr>
            </thead>
            <tbody>
              {entry.comparisonTable.map((row, i) => (
                <tr key={i}>
                  <td className="border border-[#D7DEE1] px-4 py-3 text-[#1D4871] font-bold">
                    {row.feature}
                  </td>
                  <td className="border border-[#D7DEE1] px-4 py-3 text-[#1D4871]/80 bg-[#FFDE59]/5">
                    {row.sayso}
                  </td>
                  <td className="border border-[#D7DEE1] px-4 py-3 text-[#1D4871]/80">
                    {row.competitor}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ContentInlineCTA />

        {/* Where Sayso Wins */}
        <h2 className="font-hero text-2xl md:text-[28px] text-[#1D4871] mt-10 mb-4">
          Where Sayso Wins
        </h2>
        {entry.whereSaysoWins.split('\n\n').map((paragraph, i) => (
          <p key={i} className="text-[#1D4871]/80 text-base leading-relaxed font-sans mb-5">
            {paragraph}
          </p>
        ))}

        {/* Where Competitor Wins */}
        <h2 className="font-hero text-2xl md:text-[28px] text-[#1D4871] mt-10 mb-4">
          Where {entry.competitor} Might Be Better
        </h2>
        {entry.whereCompetitorWins.split('\n\n').map((paragraph, i) => (
          <p key={i} className="text-[#1D4871]/80 text-base leading-relaxed font-sans mb-5">
            {paragraph}
          </p>
        ))}

        {/* Who It's For */}
        <h2 className="font-hero text-2xl md:text-[28px] text-[#1D4871] mt-10 mb-4">
          Who Sayso Is Best For
        </h2>
        <p className="text-[#1D4871]/80 text-base leading-relaxed font-sans mb-6">
          {entry.whoItsFor}
        </p>

        {/* Pricing */}
        <h2 className="font-hero text-2xl md:text-[28px] text-[#1D4871] mt-10 mb-4">
          Pricing
        </h2>
        <p className="text-[#1D4871]/80 text-base leading-relaxed font-sans mb-4">
          {entry.pricing}
        </p>
        <Link
          href="/pricing"
          className="text-[#2367EE] hover:underline font-bold font-sans"
        >
          See Sayso pricing →
        </Link>

        {/* Related Comparisons */}
        {entry.relatedComparisons.length > 0 && (
          <>
            <h2 className="font-hero text-xl text-[#1D4871] mt-10 mb-3">
              More Comparisons
            </h2>
            <ul className="space-y-2 mb-6">
              {entry.relatedComparisons.map((comparison) => (
                <li key={comparison.slug}>
                  <Link
                    href={`/compare/${comparison.slug}`}
                    className="text-[#2367EE] hover:underline font-bold font-sans"
                  >
                    {comparison.title}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </article>

      {/* FAQ */}
      {entry.faq.length > 0 && <FAQ items={entry.faq} />}

      <ContentCTA />
    </>
  );
}
