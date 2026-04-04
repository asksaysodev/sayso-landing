import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ContentCTA } from '@/components/pages/ContentCTA';
import { ContentInlineCTA } from '@/components/pages/ContentInlineCTA';
import { FAQ } from '@/components/pages/FAQ';
import { generateWebPageJsonLd, generateSoftwareAppJsonLd } from '@/lib/seo/schema';
import { renderInlineMarkdown } from '@/lib/utils/render-inline-markdown';
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

  const softwareAppJsonLd = entry.featureList
    ? generateSoftwareAppJsonLd({ featureList: entry.featureList })
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      {softwareAppJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
        />
      )}

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
            {renderInlineMarkdown(entry.tldr)}
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
            {renderInlineMarkdown(paragraph)}
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
            {renderInlineMarkdown(paragraph)}
          </p>
        ))}

        {/* H3 subsections for Where Sayso Wins */}
        {entry.whereSaysoWinsDetails?.map((detail, i) => (
          <div key={i}>
            <h3 className="font-hero text-xl md:text-[22px] text-[#1D4871] mt-8 mb-3">
              {detail.heading}
            </h3>
            {detail.body.split('\n\n').map((paragraph, j) => (
              <p key={j} className="text-[#1D4871]/80 text-base leading-relaxed font-sans mb-5">
                {renderInlineMarkdown(paragraph)}
              </p>
            ))}
          </div>
        ))}

        {/* Feature Links */}
        {entry.featureLinks && entry.featureLinks.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-4 mb-6">
            {entry.featureLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#2367EE] hover:underline font-bold font-sans text-sm"
              >
                Learn more about {link.title} →
              </Link>
            ))}
          </div>
        )}

        {/* Where Competitor Wins */}
        <h2 className="font-hero text-2xl md:text-[28px] text-[#1D4871] mt-10 mb-4">
          Where {entry.competitor} Might Be Better
        </h2>
        {entry.whereCompetitorWins.split('\n\n').map((paragraph, i) => (
          <p key={i} className="text-[#1D4871]/80 text-base leading-relaxed font-sans mb-5">
            {renderInlineMarkdown(paragraph)}
          </p>
        ))}

        {/* Who It's For */}
        <h2 className="font-hero text-2xl md:text-[28px] text-[#1D4871] mt-10 mb-4">
          Who Sayso Is Best For
        </h2>
        {entry.whoItsFor.split('\n\n').map((paragraph, i) => (
          <p key={i} className="text-[#1D4871]/80 text-base leading-relaxed font-sans mb-5">
            {renderInlineMarkdown(paragraph)}
          </p>
        ))}

        {/* Persona Links */}
        {entry.personaLinks && entry.personaLinks.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-6">
            {entry.personaLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#2367EE] hover:underline font-bold font-sans text-sm"
              >
                Sayso for {link.title} →
              </Link>
            ))}
          </div>
        )}

        {/* Pricing */}
        <h2 className="font-hero text-2xl md:text-[28px] text-[#1D4871] mt-10 mb-4">
          Pricing
        </h2>
        {entry.pricing.split('\n\n').map((paragraph, i) => (
          <p key={i} className="text-[#1D4871]/80 text-base leading-relaxed font-sans mb-4">
            {renderInlineMarkdown(paragraph)}
          </p>
        ))}
        <Link
          href="/pricing"
          className="text-[#2367EE] hover:underline font-bold font-sans"
        >
          See Sayso pricing →
        </Link>

        {/* Related Comparisons */}
        {entry.relatedComparisons.length > 0 && (
          <>
            <p className="font-hero text-lg text-[#1D4871]/70 mt-10 mb-3 uppercase tracking-wider">
              More Comparisons
            </p>
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
