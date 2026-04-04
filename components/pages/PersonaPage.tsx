import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ContentCTA } from '@/components/pages/ContentCTA';
import { ContentInlineCTA } from '@/components/pages/ContentInlineCTA';
import { FAQ } from '@/components/pages/FAQ';
import { generateWebPageJsonLd } from '@/lib/seo/schema';
import type { UseCaseEntry } from '@/lib/content/for/types';

interface PersonaPageProps {
  entry: UseCaseEntry;
}

export function PersonaPage({ entry }: PersonaPageProps) {
  const webPageJsonLd = generateWebPageJsonLd(
    entry.seoTitle,
    entry.seoDescription,
    `/for/${entry.slug}`,
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
          { label: 'Solutions', href: '/for' },
          { label: entry.persona },
        ]}
      />

      <article className="max-w-[800px] mx-auto px-6 pb-10">
        {/* H1 */}
        <h1 className="font-comic text-3xl md:text-4xl text-[#1D4871] tracking-wide mt-6 mb-6">
          {entry.h1}
        </h1>

        {/* Opening Empathy — NO product mention */}
        <p className="text-[#1D4871]/80 text-base leading-relaxed font-sans mb-8">
          {entry.openingEmpathy}
        </p>

        {/* The Problem */}
        <h2 className="font-hero text-2xl md:text-[28px] text-[#1D4871] mt-10 mb-4">
          The Real Problem
        </h2>
        {entry.theProblem.split('\n\n').map((paragraph, i) => (
          <p key={i} className="text-[#1D4871]/80 text-base leading-relaxed font-sans mb-5">
            {paragraph}
          </p>
        ))}

        {/* What They Try */}
        <h2 className="font-hero text-2xl md:text-[28px] text-[#1D4871] mt-10 mb-4">
          What Most {entry.persona} Try (And Why It Falls Short)
        </h2>
        {entry.whatTheyTry.split('\n\n').map((paragraph, i) => (
          <p key={i} className="text-[#1D4871]/80 text-base leading-relaxed font-sans mb-5">
            {paragraph}
          </p>
        ))}

        {/* Better Approach — introduces Sayso here */}
        <h2 className="font-hero text-2xl md:text-[28px] text-[#1D4871] mt-10 mb-4">
          A Better Approach — Real-Time Coaching
        </h2>
        {entry.betterApproach.split('\n\n').map((paragraph, i) => (
          <p key={i} className="text-[#1D4871]/80 text-base leading-relaxed font-sans mb-5">
            {paragraph}
          </p>
        ))}

        <ContentInlineCTA />

        {/* How Sayso Works for This Persona */}
        <h2 className="font-hero text-2xl md:text-[28px] text-[#1D4871] mt-10 mb-6">
          How Sayso Works for {entry.persona}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {entry.howSaysoWorks.map((item) => (
            <div
              key={item.feature}
              className="bg-white border-2 border-[#1D4871]/10 rounded-2xl p-5"
            >
              <p className="font-bold text-[#1D4871] text-base font-sans mb-2">
                {item.feature}
              </p>
              <p className="text-[#1D4871]/70 text-sm leading-relaxed font-sans">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Related Features */}
        <h2 className="font-hero text-xl text-[#1D4871] mt-6 mb-3">
          Related Features
        </h2>
        <ul className="space-y-2 mb-6">
          {entry.relatedFeatures.map((feature) => (
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

        {/* Related Blog Posts */}
        {entry.relatedBlogPosts.length > 0 && (
          <>
            <h2 className="font-hero text-xl text-[#1D4871] mt-6 mb-3">
              From the Blog
            </h2>
            <ul className="space-y-2 mb-6">
              {entry.relatedBlogPosts.map((post) => (
                <li key={post.href}>
                  <Link
                    href={post.href}
                    className="text-[#2367EE] hover:underline font-sans"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </article>

      {/* FAQ */}
      {entry.faq.length > 0 && <FAQ items={entry.faq} />}

      <ContentCTA
        headline="Get Started Today"
        subheading={`See how Sayso helps ${entry.persona.toLowerCase()} sound better on every call.`}
      />
    </>
  );
}
