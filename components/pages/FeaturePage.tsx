'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ContentCTA } from '@/components/pages/ContentCTA';
import { ContentInlineCTA } from '@/components/pages/ContentInlineCTA';
import { ImagePlaceholder } from '@/components/pages/ImagePlaceholder';
import { FAQ } from '@/components/pages/FAQ';

const ProductShowcaseDesktop = dynamic(
  () => import('@/components/landing/ProductShowcaseDesktop').then(m => m.ProductShowcaseDesktop),
  { ssr: false }
);
import { LightningIcon } from '@/components/icons/LightningIcon';
import { generateSoftwareAppJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo/schema';
import { useDemoCalendar } from '@/app/context/landing/DemoCalendarContext';
import type { FeatureEntry } from '@/lib/content/features/types';

interface FeaturePageProps {
  entry: FeatureEntry;
}

export function FeaturePage({ entry }: FeaturePageProps) {
  const { openDemoCalendar, openSystemSelect } = useDemoCalendar();

  const softwareJsonLd = generateSoftwareAppJsonLd({
    featureList: entry.featureList,
  });

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Features', url: '/features' },
    { name: entry.h1, url: `/features/${entry.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Features', href: '/features' },
          { label: entry.h1 },
        ]}
      />

      {/* Hero */}
      <section className="max-w-[800px] mx-auto px-6 pt-6 pb-8">
        <h1 className="font-comic text-3xl md:text-4xl text-[#1D4871] tracking-wide mb-4">
          {entry.h1}
        </h1>
        <div className="space-y-4 mb-6">
          {entry.heroDescription.map((paragraph, index) => (
            <p
              key={index}
              className="text-[#1D4871]/80 text-base md:text-lg leading-relaxed font-sans"
            >
              {paragraph}
            </p>
          ))}
        </div>
        <div className="flex items-center gap-4 flex-wrap mb-8">
          <button
            onClick={openDemoCalendar}
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-transparent text-[#1D4871] font-bold text-sm border-2 border-[#1D4871] hover:bg-[#FFDE59]/20 transition-colors"
          >
            Book a Demo
          </button>
          <button
            onClick={openSystemSelect}
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#2367EE] text-white font-bold text-sm v4-hero-glow border-2 border-[#1D4871]"
          >
            <LightningIcon size={14} className="mr-1.5" />
            Download Sayso
          </button>
        </div>
        {entry.heroVisual === 'product-showcase' ? (
          <div className="relative">
            <div className="hidden md:block absolute top-[12%] left-[2%] z-10 bg-[#FFDE59] text-[#1D4871] font-comic text-lg px-6 py-2 v2-comic-border v2-comic-shadow-sm -rotate-[3deg] whitespace-nowrap">
              Real Time Coaching
            </div>
            <ProductShowcaseDesktop />
          </div>
        ) : (
          <ImagePlaceholder alt={entry.screenshotAlt} />
        )}
      </section>

      {/* How It Works */}
      <section className="max-w-[800px] mx-auto px-6 pb-10">
        <h2 className="font-hero text-2xl md:text-[28px] text-[#1D4871] mt-10 mb-6">
          {entry.howItWorksHeading ?? 'How It Works'}
        </h2>
        <div className="space-y-5">
          {entry.howItWorks.map((step, index) => (
            <div key={index} className="flex gap-4">
              <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#2367EE] text-white font-bold text-sm flex items-center justify-center">
                {index + 1}
              </span>
              <div>
                <p className="font-bold text-[#1D4871] text-base font-sans">
                  {step.step}
                </p>
                <p className="text-[#1D4871]/70 text-base leading-relaxed font-sans mt-1">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Secondary CTA - after How It Works */}
      <div className="max-w-[800px] mx-auto px-6">
        <ContentInlineCTA />
      </div>

      {/* Who It's For */}
      <section className="max-w-[800px] mx-auto px-6 pb-10">
        <h2 className="font-hero text-2xl md:text-[28px] text-[#1D4871] mt-10 mb-4">
          Who This Is For
        </h2>
        <div className="space-y-4">
          {entry.whoItsFor.map((paragraph, index) => (
            <p
              key={index}
              className="text-[#1D4871]/80 text-base leading-relaxed font-sans"
            >
              {paragraph}
            </p>
          ))}
        </div>
        <div className="flex items-center gap-4 flex-wrap mt-4">
          {entry.personaLinks && entry.personaLinks.map((persona) => (
            <Link
              key={persona.href}
              href={persona.href}
              className="text-[#2367EE] hover:underline font-bold font-sans text-sm"
            >
              {persona.title} →
            </Link>
          ))}
          <Link
            href="/pricing"
            className="text-[#2367EE] hover:underline font-bold font-sans text-sm"
          >
            View Pricing →
          </Link>
        </div>
      </section>

      {/* Differentiators */}
      <section className="max-w-[800px] mx-auto px-6 pb-10">
        <h2 className="font-hero text-2xl md:text-[28px] text-[#1D4871] mt-10 mb-6">
          {entry.differentiatorsHeading ?? 'What Makes This Different'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {entry.differentiators.map((diff) => (
            <div
              key={diff.title}
              className="bg-white border-2 border-[#1D4871]/10 rounded-2xl p-5"
            >
              <h3 className="font-bold text-[#1D4871] text-base font-sans mb-2">
                {diff.title}
              </h3>
              <p className="text-[#1D4871]/70 text-sm leading-relaxed font-sans">
                {diff.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Social Proof */}
      {entry.socialProof && (
        <section className="max-w-[800px] mx-auto px-6 pb-10">
          <h2 className="font-hero text-2xl md:text-[28px] text-[#1D4871] mt-10 mb-4">
            What Agents Are Saying
          </h2>
          <blockquote className="border-l-4 border-[#FFDE59] bg-[#FFDE59]/10 px-6 py-4 rounded-r-lg">
            <p className="text-[#1D4871] text-base leading-relaxed font-sans italic">
              {entry.socialProof}
            </p>
          </blockquote>
        </section>
      )}

      {/* Related Features */}
      <section className="max-w-[800px] mx-auto px-6 pb-6">
        <h2 className="font-hero text-2xl md:text-[28px] text-[#1D4871] mt-6 mb-4">
          Related Features
        </h2>
        <ul className="space-y-2">
          {entry.relatedFeatures.map((feature) => (
            <li key={feature.slug}>
              <Link
                href={`/features/${feature.slug}`}
                className="text-[#2367EE] hover:underline font-bold font-sans"
              >
                {feature.title}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/features"
              className="text-[#2367EE] hover:underline font-sans"
            >
              See all features →
            </Link>
          </li>
        </ul>
      </section>

      {/* Related Blog Posts */}
      {entry.relatedBlogPosts.length > 0 && (
        <section className="max-w-[800px] mx-auto px-6 pb-10">
          <h2 className="font-hero text-xl text-[#1D4871] mb-3">
            From the Blog
          </h2>
          <ul className="space-y-2">
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
        </section>
      )}

      {/* FAQ */}
      {entry.faq.length > 0 && <FAQ items={entry.faq} />}

      <ContentCTA />
    </>
  );
}
