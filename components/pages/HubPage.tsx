import type { ReactElement } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageHeader } from '@/components/pages/PageHeader';
import Carousel from '@/components/ui/Carousel';
import { ContentCTA } from '@/components/pages/ContentCTA';
import { FAQ } from '@/components/pages/FAQ';
import { renderInlineMarkdown } from '@/lib/utils/render-inline-markdown';
import type { HubPageConfig } from '@/lib/content/hubs/types';

const GRID = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5';
/** Hubs with 2 to 6 cards swipe on mobile; longer directories (glossary, objections) and single-card hubs stay a grid. */
const CAROUSEL_MAX = 6;

function HubCardList({ cards }: { cards: ReactElement[] }) {
  if (cards.length < 2 || cards.length > CAROUSEL_MAX) return <div className={GRID}>{cards}</div>;
  return (
    <Carousel label="Pages in this section" itemName="page" trackClassName="grid grid-cols-2 lg:grid-cols-3 gap-5">
      {cards}
    </Carousel>
  );
}

interface HubPageProps {
  config: HubPageConfig;
}

export function HubPage({ config }: HubPageProps) {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: config.section },
        ]}
        title={config.h1}
        intro={config.introduction}
      />

      {/* Quick answers: scannable list with a one-line answer per child page */}
      {config.quickAnswers && (
        <section className="max-w-[800px] mx-auto px-6 pb-10">
          <h2 className="font-hero font-extrabold tracking-[-0.03em] text-[#10233A] text-[28px] md:text-4xl leading-[1.1] mb-3">
            {config.quickAnswers.heading}
          </h2>
          {config.quickAnswers.intro && (
            <p className="text-[#1D4871]/70 text-base leading-relaxed font-sans mb-5">
              {config.quickAnswers.intro}
            </p>
          )}
          <ul className="divide-y divide-[#1D4871]/10 rounded-[20px] bg-white overflow-hidden shadow-card">
            {config.quickAnswers.items.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`${config.basePath}/${item.slug}`}
                  className="group block px-5 py-4 hover:bg-[#2367EE]/5 transition-colors"
                >
                  <span className="block font-bold text-[#1D4871] font-sans group-hover:text-[#2367EE] transition-colors">
                    {item.phrase}
                  </span>
                  <span className="block text-sm text-[#1D4871]/70 font-sans leading-relaxed mt-1">
                    {item.answer}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Card Grid */}
      <section className="max-w-[1200px] mx-auto px-6 pb-10">
        {config.groups && config.groups.length > 0 ? (
          config.groups.map((group) => (
            <div key={group.label} className="mb-10">
              <h2 className="font-hero font-extrabold tracking-[-0.02em] text-[22px] text-[#10233A] mb-4">
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
          <HubCardList
            cards={[
              ...config.childPages.map((page) => <HubCard key={page.slug} page={page} basePath={config.basePath} />),
              ...(config.featureRequestCard
                ? [<FeatureRequestCard key="feature-request" card={config.featureRequestCard} />]
                : []),
            ]}
          />
        )}
      </section>

      {/* Related reading */}
      {config.relatedReading && (
        <section className="max-w-[800px] mx-auto px-6 pb-10">
          <h2 className="font-hero font-extrabold tracking-[-0.03em] text-[#10233A] text-[28px] md:text-4xl leading-[1.1] mb-4">
            {config.relatedReading.heading}
          </h2>
          <div className="space-y-4">
            {config.relatedReading.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-[#1D4871]/70 text-base leading-relaxed font-sans">
                {renderInlineMarkdown(paragraph)}
              </p>
            ))}
          </div>
        </section>
      )}

      {/* How Sayso Helps */}
      {config.howSaysoHelps && (
        <section className="max-w-[800px] mx-auto px-6 pb-10">
          <h2 className="font-hero font-extrabold tracking-[-0.03em] text-[#10233A] text-[28px] md:text-4xl leading-[1.1] mb-4">
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
      className={`group bg-white rounded-[20px] p-6 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition duration-200 block${page.bannerText ? ' h-full' : ''}`}
    >
      <h3 className="font-hero font-extrabold tracking-[-0.01em] text-lg leading-snug text-[#10233A] mb-2 group-hover:text-[#2367EE] transition-colors">
        {page.title}
      </h3>
      {page.description && (
        <p className="text-sm text-[#1D4871]/60 font-sans leading-relaxed mb-4">{page.description}</p>
      )}
      <span className="inline-flex items-center text-sm font-bold text-[#2367EE] font-sans">
        {page.linkText}
        <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
      </span>
    </Link>
  );

  if (page.bannerText) {
    return (
      <div className="relative">
        <div className="absolute -top-2 right-4 z-10 rounded-md bg-[#FFDE59] text-[#1D4871] font-comic text-base tracking-[0.06em] px-3 py-0.5 whitespace-nowrap">
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
        <div className="absolute -top-2 right-4 z-10 rounded-md bg-[#FFDE59] text-[#1D4871] font-comic text-base tracking-[0.06em] px-3 py-0.5 whitespace-nowrap">
          {card.bannerText}
        </div>
      )}
      <Link
        href={card.href}
        className="group bg-white rounded-[20px] p-6 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition duration-200 block h-full"
      >
        <h3 className="font-hero font-extrabold tracking-[-0.01em] text-lg leading-snug text-[#10233A] mb-2 group-hover:text-[#2367EE] transition-colors">
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
