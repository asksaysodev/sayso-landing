import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ContentCTA } from '@/components/pages/ContentCTA';
import { FAQ } from '@/components/pages/FAQ';
import type { HubPageConfig } from '@/lib/content/hubs/types';

interface HubPageProps {
  config: HubPageConfig;
}

export function HubPage({ config }: HubPageProps) {
  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: config.section },
        ]}
      />

      {/* Hero */}
      <section className="max-w-[800px] mx-auto px-6 pt-6 pb-8 text-center">
        <h1 className="font-comic text-4xl md:text-5xl text-[#1D4871] tracking-wide mb-4">
          {config.h1}
        </h1>
        <p className="text-[#1D4871]/70 text-base md:text-lg max-w-2xl mx-auto font-sans leading-relaxed">
          {config.introduction}
        </p>
      </section>

      {/* Card Grid */}
      <section className="max-w-[1200px] mx-auto px-6 pb-10">
        {config.groups && config.groups.length > 0 ? (
          config.groups.map((group) => (
            <div key={group.label} className="mb-10">
              <h2 className="font-hero text-xl text-[#1D4871] mb-4">
                {group.label}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {config.childPages
                  .filter((page) => group.slugs.includes(page.slug))
                  .map((page) => (
                    <HubCard key={page.slug} page={page} basePath={config.basePath} />
                  ))}
              </div>
            </div>
          ))
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {config.childPages.map((page) => (
              <HubCard key={page.slug} page={page} basePath={config.basePath} />
            ))}
            {config.featureRequestCard && (
              <FeatureRequestCard card={config.featureRequestCard} />
            )}
          </div>
        )}
      </section>

      {/* How Sayso Helps */}
      {config.howSaysoHelps && (
        <section className="max-w-[800px] mx-auto px-6 pb-10">
          <h2 className="font-comic text-2xl md:text-3xl text-[#1D4871] tracking-wide mb-4">
            How Sayso Helps
          </h2>
          <p className="text-[#1D4871]/70 text-base leading-relaxed font-sans">
            {config.howSaysoHelps}
          </p>
        </section>
      )}

      {/* FAQ */}
      {config.faq && config.faq.length > 0 && <FAQ items={config.faq} />}

      <ContentCTA location="hub-page" />
    </>
  );
}

function HubCard({
  page,
  basePath,
}: {
  page: HubPageConfig['childPages'][number];
  basePath: string;
}) {
  const card = (
    <Link
      href={page.href ?? `${basePath}/${page.slug}`}
      className={`group bg-white border-2 border-[#1D4871]/10 rounded-2xl p-6 hover:border-[#2367EE] hover:v2-comic-shadow-sm transition-all block${page.bannerText ? ' h-full' : ''}`}
    >
      {page.eyebrow && (
        <span className="block text-xs font-bold text-[#2367EE] uppercase tracking-wider mb-1 font-sans">
          {page.eyebrow}
        </span>
      )}
      <h3 className="font-hero text-lg text-[#1D4871] mb-2 group-hover:text-[#2367EE] transition-colors">
        {page.title}
      </h3>
      <p className="text-sm text-[#1D4871]/60 font-sans leading-relaxed mb-4">
        {page.description}
      </p>
      <span className="inline-flex items-center text-sm font-bold text-[#2367EE] font-sans">
        {page.linkText}
        <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
      </span>
    </Link>
  );

  if (page.bannerText) {
    return (
      <div className="relative">
        <div className="absolute -top-4 -right-3 z-10 bg-[#FFDE59] text-[#1D4871] font-comic text-base px-4 py-1.5 v2-comic-border v2-comic-shadow-sm rotate-[8deg] whitespace-nowrap">
          {page.bannerText}
        </div>
        {card}
      </div>
    );
  }

  return card;
}

function FeatureRequestCard({
  card,
}: {
  card: NonNullable<HubPageConfig['featureRequestCard']>;
}) {
  return (
    <div className="relative">
      {card.bannerText && (
        <div className="absolute -top-4 -right-3 z-10 bg-[#FFDE59] text-[#1D4871] font-comic text-base px-4 py-1.5 v2-comic-border v2-comic-shadow-sm rotate-[8deg] whitespace-nowrap">
          {card.bannerText}
        </div>
      )}
      <Link
        href={card.href}
        className="group bg-white border-2 border-[#1D4871]/10 rounded-2xl p-6 hover:border-[#2367EE] hover:v2-comic-shadow-sm transition-all block h-full"
      >
        <h3 className="font-hero text-lg text-[#1D4871] mb-2 group-hover:text-[#2367EE] transition-colors">
          {card.title}
        </h3>
        <p className="text-sm text-[#1D4871]/60 font-sans leading-relaxed mb-4">
          {card.description}
        </p>
        <span className="inline-flex items-center text-sm font-bold text-[#2367EE] font-sans">
          {card.linkText}
          <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
        </span>
      </Link>
    </div>
  );
}
