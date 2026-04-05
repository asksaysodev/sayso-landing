import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ContentCTA } from '@/components/pages/ContentCTA';
import { ContentInlineCTA } from '@/components/pages/ContentInlineCTA';
import { FAQ } from '@/components/pages/FAQ';
import { LightningIcon } from '@/components/icons/LightningIcon';
import { generateWebPageJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo/schema';
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

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Solutions', url: '/for' },
    { name: entry.persona, url: `/for/${entry.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
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

        {/* Opening Empathy - NO product mention */}
        <div className="space-y-4 mb-8">
          {entry.openingEmpathy.map((paragraph, i) => (
            <p key={i} className="text-[#1D4871]/80 text-base leading-relaxed font-sans">
              {paragraph}
            </p>
          ))}
        </div>

        {/* The Problem */}
        <h2 className="font-hero text-2xl md:text-[28px] text-[#1D4871] mt-10 mb-4">
          {entry.theProblemHeading ?? 'The Real Problem'}
        </h2>
        {entry.theProblem.map((paragraph, i) => (
          <p key={i} className="text-[#1D4871]/80 text-base leading-relaxed font-sans mb-5">
            {paragraph}
          </p>
        ))}

        {/* What They Try */}
        <h2 className="font-hero text-2xl md:text-[28px] text-[#1D4871] mt-10 mb-4">
          {entry.whatTheyTryHeading ?? `What Most ${entry.persona} Try (And Why It Falls Short)`}
        </h2>
        {entry.whatTheyTry.map((paragraph, i) => (
          <p key={i} className="text-[#1D4871]/80 text-base leading-relaxed font-sans mb-5">
            {paragraph}
          </p>
        ))}

        {/* Better Approach - introduces Sayso here */}
        <h2 className="font-hero text-2xl md:text-[28px] text-[#1D4871] mt-10 mb-4">
          {entry.betterApproachHeading ?? 'A Better Approach \u2014 Real-Time Coaching'}
        </h2>
        {entry.betterApproach.map((paragraph, i) => (
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
              <h3 className="font-bold text-[#1D4871] text-base font-sans mb-2">
                {item.href ? (
                  <Link href={item.href} className="hover:text-[#2367EE] transition-colors">
                    {item.feature}
                  </Link>
                ) : (
                  item.feature
                )}
              </h3>
              <p className="text-[#1D4871]/70 text-sm leading-relaxed font-sans">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Get Started */}
        {entry.getStarted && (
          <>
            <h2 className="font-hero text-2xl md:text-[28px] text-[#1D4871] mt-10 mb-4">
              Get Started
            </h2>
            <p className="text-[#1D4871]/80 text-base leading-relaxed font-sans mb-4">
              {entry.getStarted}
            </p>
            <div className="flex items-center gap-4 flex-wrap mb-6">
              <Link
                href="/demo"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-transparent text-[#1D4871] font-bold text-sm border-2 border-[#1D4871] hover:bg-[#FFDE59]/20 transition-colors"
              >
                Book a Demo
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#2367EE] text-white font-bold text-sm v4-hero-glow border-2 border-[#1D4871]"
              >
                <LightningIcon size={14} className="mr-1.5" />
                Download Sayso
              </Link>
            </div>
          </>
        )}

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
          <li>
            <Link
              href="/for"
              className="text-[#2367EE] hover:underline font-sans"
            >
              See all solutions \u2192
            </Link>
          </li>
        </ul>

        {/* Related Objections */}
        {entry.relatedObjections && entry.relatedObjections.length > 0 && (
          <>
            <h2 className="font-hero text-xl text-[#1D4871] mt-6 mb-3">
              Objection Scripts
            </h2>
            <ul className="space-y-2 mb-6">
              {entry.relatedObjections.map((objection) => (
                <li key={objection.href}>
                  <Link
                    href={objection.href}
                    className="text-[#2367EE] hover:underline font-sans"
                  >
                    {objection.title}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}

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
