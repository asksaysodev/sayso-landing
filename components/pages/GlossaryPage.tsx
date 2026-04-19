import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ContentCTA } from '@/components/pages/ContentCTA';
import { ContentInlineCTA } from '@/components/pages/ContentInlineCTA';
import { FAQ } from '@/components/pages/FAQ';
import { generateDefinedTermJsonLd } from '@/lib/seo/schema';
import { renderInlineMarkdown } from '@/lib/utils/render-inline-markdown';
import type { GlossaryEntry } from '@/lib/content/glossary/types';

interface GlossaryPageProps {
  entry: GlossaryEntry;
}

export function GlossaryPage({ entry }: GlossaryPageProps) {
  const definedTermJsonLd = generateDefinedTermJsonLd(
    entry.term,
    entry.definition,
    `/glossary/${entry.slug}`,
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermJsonLd) }}
      />

      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Glossary', href: '/glossary' },
          { label: entry.term },
        ]}
      />

      <article className="max-w-[800px] mx-auto px-6 pb-10">
        {/* H1 */}
        <h1 className="font-comic text-3xl md:text-4xl text-[#1D4871] tracking-wide mt-6 mb-6">
          {entry.h1}
        </h1>

        {/* Definition - featured snippet target */}
        <p className="text-[#1D4871] text-lg leading-relaxed font-sans mb-3">
          <strong>{entry.definition}</strong>
        </p>

        {/* Glossary hub link */}
        <p className="text-sm text-[#1D4871]/50 font-sans mb-8">
          Part of the{' '}
          <Link
            href="/glossary"
            className="text-[#2367EE] hover:underline font-bold"
          >
            Real Estate Glossary
          </Link>
        </p>

        {/* Optional hero image */}
        {entry.heroImage && (
          <div className="mb-8">
            <Image
              src={entry.heroImage.src}
              alt={entry.heroImage.alt}
              width={800}
              height={450}
              className="rounded-xl border-2 border-[#1D4871]/10"
            />
          </div>
        )}

        {/* How It Works */}
        <h2 className="font-hero text-2xl md:text-[28px] text-[#1D4871] mt-10 mb-4">
          How {entry.term} Works in Practice
        </h2>
        <div className="space-y-4 mb-6">
          {entry.howItWorks.map((paragraph, index) => (
            <p
              key={index}
              className="text-[#1D4871]/80 text-base leading-relaxed font-sans"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Why It Matters */}
        <h2 className="font-hero text-2xl md:text-[28px] text-[#1D4871] mt-10 mb-4">
          Why {entry.term} Matters for Real Estate Agents
        </h2>
        <div className="space-y-4 mb-6">
          {entry.whyItMatters.map((paragraph, index) => (
            <p
              key={index}
              className="text-[#1D4871]/80 text-base leading-relaxed font-sans"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Tips */}
        <h2 className="font-hero text-2xl md:text-[28px] text-[#1D4871] mt-10 mb-4">
          Tips for {entry.term}
        </h2>
        <ol className="space-y-4 mb-8">
          {entry.tips.map((tip, index) => (
            <li key={index} className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#2367EE]/10 text-[#2367EE] font-bold text-sm flex items-center justify-center">
                {index + 1}
              </span>
              <div>
                <p className="font-bold text-[#1D4871] text-base font-sans">
                  {tip.title}
                </p>
                <p className="text-[#1D4871]/70 text-base leading-relaxed font-sans mt-1">
                  {tip.body}
                </p>
              </div>
            </li>
          ))}
        </ol>

        {/* How Sayso Helps */}
        <h2 className="font-hero text-2xl md:text-[28px] text-[#1D4871] mt-10 mb-4">
          How Sayso Helps with {entry.term}
        </h2>
        <div className="space-y-4 mb-6">
          {entry.howSaysoHelps.map((paragraph, index) => (
            <p
              key={index}
              className="text-[#1D4871]/80 text-base leading-relaxed font-sans"
            >
              {renderInlineMarkdown(paragraph)}
            </p>
          ))}
        </div>

        <ContentInlineCTA location="glossary-page" />

        {/* Related Terms */}
        {entry.relatedTerms.length > 0 && (
          <>
            <h2 className="font-hero text-2xl md:text-[28px] text-[#1D4871] mt-10 mb-4">
              Related Terms
            </h2>
            <ul className="space-y-2 mb-6">
              {entry.relatedTerms.map((related) => (
                <li key={related.slug}>
                  <Link
                    href={`/glossary/${related.slug}`}
                    className="text-[#2367EE] hover:underline font-bold font-sans"
                  >
                    {related.term}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}

        {/* Cross-Section Links */}
        {(entry.relatedFeature || entry.relatedPersona) && (
          <div className="flex flex-col gap-3 mb-6">
            {entry.relatedFeature && (
              <Link
                href={entry.relatedFeature.href}
                className="flex items-center gap-3 px-5 py-3 rounded-xl border-2 border-[#1D4871]/10 bg-white hover:border-[#2367EE]/40 transition-colors group"
              >
                <span className="text-sm font-bold text-[#1D4871]/50 uppercase tracking-wide">
                  Related feature
                </span>
                <span className="text-[#2367EE] font-bold font-sans group-hover:underline">
                  {entry.relatedFeature.title} →
                </span>
              </Link>
            )}
            {entry.relatedPersona && (
              <Link
                href={entry.relatedPersona.href}
                className="flex items-center gap-3 px-5 py-3 rounded-xl border-2 border-[#1D4871]/10 bg-white hover:border-[#2367EE]/40 transition-colors group"
              >
                <span className="text-sm font-bold text-[#1D4871]/50 uppercase tracking-wide">
                  Built for you
                </span>
                <span className="text-[#2367EE] font-bold font-sans group-hover:underline">
                  {entry.relatedPersona.title} →
                </span>
              </Link>
            )}
          </div>
        )}

        {/* Deeper Content Link */}
        {entry.deeperLink && (
          <div className="bg-white border-2 border-[#1D4871]/10 rounded-xl p-5 mb-6">
            <p className="text-sm text-[#1D4871]/60 font-sans mb-1">
              Go deeper:
            </p>
            <Link
              href={entry.deeperLink.href}
              className="text-[#2367EE] hover:underline font-bold font-sans"
            >
              {entry.deeperLink.title} →
            </Link>
          </div>
        )}
      </article>

      {/* FAQ */}
      {entry.faq.length > 0 && <FAQ items={entry.faq} />}

      <ContentCTA location="glossary-page" />
    </>
  );
}
