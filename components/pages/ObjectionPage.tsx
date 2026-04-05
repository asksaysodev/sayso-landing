import Image from 'next/image';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ContentCTA } from '@/components/pages/ContentCTA';
import { ContentInlineCTA } from '@/components/pages/ContentInlineCTA';
import { FAQ } from '@/components/pages/FAQ';
import { generateHowToJsonLd } from '@/lib/seo/schema';
import type { ObjectionEntry } from '@/lib/content/objections/types';

interface ObjectionPageProps {
  entry: ObjectionEntry;
}

export function ObjectionPage({ entry }: ObjectionPageProps) {
  const howToJsonLd = generateHowToJsonLd(
    `How to Respond When a Prospect Says "${entry.objectionQuote}"`,
    [
      { name: entry.responses.safe.label, text: entry.responses.safe.script },
      { name: entry.responses.stronger.label, text: entry.responses.stronger.script },
      { name: entry.responses.advanced.label, text: entry.responses.advanced.script },
    ],
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />

      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Objections', href: '/objections' },
          { label: entry.h1 },
        ]}
      />

      <article className="max-w-[800px] mx-auto px-6 pb-10">
        {/* Badge + H1 */}
        <div className="mt-6 mb-6">
          <span className="v2-pow-badge px-3 py-1 rounded-lg text-xs font-comic tracking-wider mb-3 inline-block">
            OBJECTION
          </span>
          <h1 className="font-comic text-3xl md:text-4xl text-[#1D4871] tracking-wide">
            {entry.h1}
          </h1>
        </div>

        {/* Objection Quote */}
        <div className="bg-white border-2 border-[#1D4871] rounded-2xl p-6 v2-comic-shadow-sm mb-8 relative">
          <p className="text-xl md:text-2xl font-bold text-[#1D4871] italic font-sans">
            &ldquo;{entry.objectionQuote}&rdquo;
          </p>
          <div className="absolute -bottom-3 left-10 w-6 h-6 bg-white border-b-2 border-r-2 border-[#1D4871] rotate-45" />
        </div>

        {/* Opening Paragraph */}
        <p className="text-[#1D4871]/80 text-base leading-relaxed font-sans mb-8">
          {entry.openingParagraph}
        </p>

        {/* Optional Hero Image */}
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

        {/* Why They Say This */}
        <h2 className="font-hero text-2xl md:text-[28px] text-[#1D4871] mt-10 mb-4">
          {entry.whyTheyTitle}
        </h2>
        {entry.whyTheySayThis.split('\n\n').map((paragraph, i) => (
          <p key={i} className="text-[#1D4871]/80 text-base leading-relaxed font-sans mb-5">
            {paragraph}
          </p>
        ))}

        {/* 3 Response Frameworks + What to Say Next (merged) */}
        <h2 className="font-hero text-2xl md:text-[28px] text-[#1D4871] mt-10 mb-6">
          3 Ways to Respond
        </h2>

        {[entry.responses.safe, entry.responses.stronger, entry.responses.advanced].map(
          (response) => (
            <div key={response.label} className="mb-8">
              <h3 className="font-hero text-xl text-[#1D4871] mb-3">
                {response.label}
              </h3>
              <blockquote className="border-l-4 border-[#FFDE59] bg-[#FFDE59]/10 px-6 py-4 rounded-r-lg mb-3">
                <p className="text-[#1D4871] text-base leading-relaxed font-sans italic">
                  {response.script}
                </p>
              </blockquote>
              <p className="text-[#1D4871]/70 text-sm leading-relaxed font-sans">
                <strong className="text-[#1D4871]">Why it works:</strong>{' '}
                {response.whyItWorks}
              </p>
            </div>
          ),
        )}

        {/* What to Say Next - merged under "3 Ways to Respond" */}
        <h3 className="font-hero text-xl text-[#1D4871] mb-3">
          What to Say Next
        </h3>
        <p className="text-[#1D4871]/80 text-base leading-relaxed font-sans mb-6">
          {entry.whatToSayNext}
        </p>

        {/* Common Mistakes */}
        <h2 className="font-hero text-2xl md:text-[28px] text-[#1D4871] mt-10 mb-4">
          Common Mistakes to Avoid
        </h2>
        <ul className="space-y-2 mb-8">
          {entry.commonMistakes.map((mistake, i) => (
            <li key={i} className="flex gap-3 text-[#1D4871]/80 text-base font-sans">
              <span className="text-red-500 flex-shrink-0 font-bold">✕</span>
              {mistake}
            </li>
          ))}
        </ul>

        {/* How Sayso Helps */}
        <h2 className="font-hero text-2xl md:text-[28px] text-[#1D4871] mt-10 mb-4">
          How Sayso Helps You Handle This in Real Time
        </h2>
        <p className="text-[#1D4871]/80 text-base leading-relaxed font-sans mb-6">
          {entry.howSaysoHelps}
        </p>

        <ContentInlineCTA />

        {/* Related Objections + Cross-Section Links */}
        <h2 className="font-hero text-2xl md:text-[28px] text-[#1D4871] mt-10 mb-4">
          Related Objections
        </h2>
        <ul className="space-y-2 mb-6">
          {entry.relatedObjections.map((related) => (
            <li key={related.slug}>
              <Link
                href={`/objections/${related.slug}`}
                className="text-[#2367EE] hover:underline font-bold font-sans"
              >
                {related.title}
              </Link>
              <span className="text-[#1D4871]/40 text-sm ml-2 font-sans">
                 - {related.keyword}
              </span>
            </li>
          ))}
        </ul>

        {/* Cross-Section Links */}
        {(entry.relatedBlogPost || entry.relatedFeature) && (
          <div className="flex flex-col gap-3 mb-6">
            {entry.relatedBlogPost && (
              <Link
                href={entry.relatedBlogPost.href}
                className="flex items-center gap-3 px-5 py-3 rounded-xl border-2 border-[#1D4871]/10 bg-white hover:border-[#2367EE]/40 transition-colors group"
              >
                <span className="text-sm font-bold text-[#1D4871]/50 uppercase tracking-wide">
                  Deeper reading
                </span>
                <span className="text-[#2367EE] font-bold font-sans group-hover:underline">
                  {entry.relatedBlogPost.title} &rarr;
                </span>
              </Link>
            )}
            {entry.relatedFeature && (
              <Link
                href={entry.relatedFeature.href}
                className="flex items-center gap-3 px-5 py-3 rounded-xl border-2 border-[#1D4871]/10 bg-white hover:border-[#2367EE]/40 transition-colors group"
              >
                <span className="text-sm font-bold text-[#1D4871]/50 uppercase tracking-wide">
                  Related feature
                </span>
                <span className="text-[#2367EE] font-bold font-sans group-hover:underline">
                  {entry.relatedFeature.title} &rarr;
                </span>
              </Link>
            )}
          </div>
        )}
      </article>

      {/* FAQ */}
      {entry.faq.length > 0 && <FAQ items={entry.faq} />}

      <ContentCTA />
    </>
  );
}
