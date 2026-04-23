import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ContentCTA } from '@/components/pages/ContentCTA';
import { ContentInlineCTA } from '@/components/pages/ContentInlineCTA';
import { ImagePlaceholder } from '@/components/pages/ImagePlaceholder';
import { FAQ } from '@/components/pages/FAQ';
import { generateSoftwareAppJsonLd } from '@/lib/seo/schema';
import type { IntegrationEntry } from '@/lib/content/integrations/types';

interface IntegrationPageProps {
  entry: IntegrationEntry;
}

export function IntegrationPage({ entry }: IntegrationPageProps) {
  const softwareJsonLd = generateSoftwareAppJsonLd({
    featureList: entry.featureList,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />

      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Integrations', href: '/integrations' },
          { label: entry.crmName },
        ]}
      />

      <article className="max-w-[800px] mx-auto px-6 pb-10">
        {/* Partner Logos */}
        <div className="flex items-center justify-center gap-4 mt-6 mb-6">
          <Image
            src="/logo-pos-horizontal.png"
            alt="Sayso"
            width={100}
            height={40}
            className="h-8 w-auto"
          />
          <span className="text-[#1D4871]/30 text-2xl font-bold">+</span>
          <ImagePlaceholder alt={entry.logoAlt} aspectRatio="3/1" className="w-28" />
        </div>

        {/* H1 */}
        <h1 className="font-comic text-3xl md:text-4xl text-[#1D4871] tracking-wide text-center mb-4">
          {entry.h1}
        </h1>

        {/* Opening */}
        <p className="text-[#1D4871]/80 text-base leading-relaxed font-sans mb-8 text-center max-w-2xl mx-auto">
          {entry.openingDescription}
        </p>

        {/* How It Works */}
        <h2 className="font-hero text-2xl md:text-[28px] text-[#1D4871] mt-10 mb-6">
          {entry.howItWorksHeading ?? 'How It Works'}
        </h2>
        <div className="space-y-5 mb-8">
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

        <ContentInlineCTA
          location="integration-page"
          headline={entry.inlineCtaHeadline}
        />

        {/* Benefits */}
        <h2 className="font-hero text-2xl md:text-[28px] text-[#1D4871] mt-10 mb-6">
          What You Get
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {entry.benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="bg-white border-2 border-[#1D4871]/10 rounded-2xl p-5"
            >
              <p className="font-bold text-[#1D4871] text-base font-sans mb-2">
                {benefit.title}
              </p>
              <p className="text-[#1D4871]/70 text-sm leading-relaxed font-sans">
                {benefit.body}
              </p>
            </div>
          ))}
        </div>

        {/* Why Choose */}
        <h2 className="font-hero text-2xl md:text-[28px] text-[#1D4871] mt-10 mb-4">
          Why {entry.crmName} Users Choose Sayso
        </h2>
        <p className="text-[#1D4871]/80 text-base leading-relaxed font-sans mb-6">
          {entry.whyChoose}
        </p>

        {/* Get Started */}
        <h2 className="font-hero text-2xl md:text-[28px] text-[#1D4871] mt-10 mb-4">
          Get Started
        </h2>
        <p className="text-[#1D4871]/80 text-base leading-relaxed font-sans mb-6">
          {entry.getStarted}
        </p>

        {/* Related Pages */}
        {entry.relatedLinks && entry.relatedLinks.length > 0 && (
          <div className="flex flex-col gap-3 mt-10 mb-6">
            {entry.relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 px-5 py-3 rounded-xl border-2 border-[#1D4871]/10 bg-white hover:border-[#2367EE]/40 transition-colors group"
              >
                <span className="text-sm font-bold text-[#1D4871]/50 uppercase tracking-wide">
                  {link.label}
                </span>
                <span className="text-[#2367EE] font-bold font-sans group-hover:underline">
                  {link.title} &rarr;
                </span>
              </Link>
            ))}
          </div>
        )}

        {/* Related Integrations */}
        {entry.relatedIntegrations.length > 0 && (
          <>
            <h2 className="font-hero text-xl text-[#1D4871] mt-10 mb-3">
              Other Integrations
            </h2>
            <ul className="space-y-2 mb-6">
              {entry.relatedIntegrations.map((integration) => (
                <li key={integration.slug}>
                  <Link
                    href={`/integrations/${integration.slug}`}
                    className="text-[#2367EE] hover:underline font-bold font-sans"
                  >
                    {integration.name}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </article>

      {/* FAQ */}
      {entry.faq.length > 0 && <FAQ items={entry.faq} />}

      <ContentCTA location="integration-page" />
    </>
  );
}
