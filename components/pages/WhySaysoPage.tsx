import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ContentCTA } from '@/components/pages/ContentCTA';
import { ContentInlineCTA } from '@/components/pages/ContentInlineCTA';
import { FAQ } from '@/components/pages/FAQ';
import { generateWebPageJsonLd } from '@/lib/seo/schema';
import type { WhySaysoContent } from '@/lib/content/why-sayso';

interface WhySaysoPageProps {
  content: WhySaysoContent;
}

export function WhySaysoPage({ content }: WhySaysoPageProps) {
  const webPageJsonLd = generateWebPageJsonLd(
    content.seoTitle,
    content.seoDescription,
    '/why-sayso',
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
          { label: 'Why Sayso' },
        ]}
      />

      <article className="max-w-[800px] mx-auto px-6 pb-10">
        {/* H1 */}
        <h1 className="font-comic text-3xl md:text-4xl text-[#1D4871] tracking-wide mt-6 mb-6">
          {content.h1}
        </h1>

        {/* Opening */}
        <p className="text-[#1D4871]/80 text-lg leading-relaxed font-sans mb-8">
          {content.opening}
        </p>

        {/* The Problem */}
        <h2 className="font-hero text-2xl md:text-[28px] text-[#1D4871] mt-10 mb-4">
          The Problem with How Agents Learn Today
        </h2>
        {content.problemToday.split('\n\n').map((paragraph, i) => (
          <p key={i} className="text-[#1D4871]/80 text-base leading-relaxed font-sans mb-5">
            {paragraph}
          </p>
        ))}

        {/* Differentiators */}
        <h2 className="font-hero text-2xl md:text-[28px] text-[#1D4871] mt-10 mb-6">
          What Makes Sayso Different
        </h2>
        <div className="space-y-5 mb-8">
          {content.differentiators.map((diff) => (
            <div
              key={diff.title}
              className="bg-white border-2 border-[#1D4871]/10 rounded-2xl p-5"
            >
              <p className="font-bold text-[#1D4871] text-base font-sans mb-2">
                {diff.title}
              </p>
              <p className="text-[#1D4871]/70 text-sm leading-relaxed font-sans">
                {diff.description}
              </p>
            </div>
          ))}
        </div>

        <ContentInlineCTA />

        {/* Who It's For */}
        <h2 className="font-hero text-2xl md:text-[28px] text-[#1D4871] mt-10 mb-6">
          Who Sayso Is Built For
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {content.whoItsFor.map((persona) => (
            <Link
              key={persona.persona}
              href={persona.href}
              className="group bg-white border-2 border-[#1D4871]/10 rounded-2xl p-5 hover:border-[#2367EE] transition-colors block"
            >
              <p className="font-bold text-[#1D4871] text-base font-sans mb-1 group-hover:text-[#2367EE] transition-colors">
                {persona.persona}
              </p>
              <p className="text-[#1D4871]/70 text-sm leading-relaxed font-sans">
                {persona.description}
              </p>
            </Link>
          ))}
        </div>

        {/* Social Proof */}
        <h2 className="font-hero text-2xl md:text-[28px] text-[#1D4871] mt-10 mb-4">
          What Teams Are Saying
        </h2>
        <div className="space-y-4 mb-8">
          {content.socialProof.map((quote, i) => (
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

        {/* Integrations */}
        <h2 className="font-hero text-2xl md:text-[28px] text-[#1D4871] mt-10 mb-4">
          Integrations
        </h2>
        <p className="text-[#1D4871]/80 text-base leading-relaxed font-sans mb-4">
          {content.integrationsBlurb}
        </p>
        <Link
          href="/integrations"
          className="text-[#2367EE] hover:underline font-bold font-sans"
        >
          See all integrations →
        </Link>
      </article>

      {/* FAQ */}
      {content.faq.length > 0 && <FAQ items={content.faq} />}

      <ContentCTA
        headline="Get Started Today"
        subheading="Try Sayso free and see the difference real-time coaching makes."
      />
    </>
  );
}
