import { notFound } from 'next/navigation';
import { buildMetadata } from '@/lib/seo/metadata';
import { PageHeader } from '@/components/pages/PageHeader';
import { ContentCTA } from '@/components/pages/ContentCTA';
import { TopicHubPostList } from '@/components/pages/TopicHubPostList';
import { renderInlineMarkdown } from '@/lib/utils/render-inline-markdown';
import { TOPIC_HUB_PAGES, getTopicHubPage } from '@/lib/content/topic-hub-pages';

// Revalidate hourly, like the blog, so scheduled posts join the list on their publish date.
export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return TOPIC_HUB_PAGES.map((page) => ({ topic: page.slug }));
}

interface TopicHubPageProps {
  params: Promise<{ topic: string }>;
}

export async function generateMetadata({ params }: TopicHubPageProps) {
  const { topic } = await params;
  const page = getTopicHubPage(topic);
  if (!page) return {};
  return buildMetadata({
    title: page.seoTitle,
    description: page.seoDescription,
    path: `/resources/${page.slug}`,
  });
}

export default async function TopicHubRoute({ params }: TopicHubPageProps) {
  const { topic } = await params;
  const page = getTopicHubPage(topic);
  if (!page) notFound();

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Resources', href: '/resources' },
          { label: page.section },
        ]}
        title={page.h1}
        intro={renderInlineMarkdown(page.intro[0])}
      />
      {page.intro.length > 1 && (
        <section className="max-w-[800px] mx-auto px-6 pb-8">
          {page.intro.slice(1).map((paragraph, index) => (
            <p key={index} className="text-[#1D4871]/70 text-base leading-relaxed font-sans">
              {renderInlineMarkdown(paragraph)}
            </p>
          ))}
        </section>
      )}
      <TopicHubPostList hub={page.id} heading={page.listHeading} />
      <section className="max-w-[800px] mx-auto px-6 pb-10">
        <h2 className="font-hero font-extrabold tracking-[-0.03em] text-[#10233A] text-[28px] md:text-4xl leading-[1.1] mb-4">
          Related resources
        </h2>
        <p className="text-[#1D4871]/70 text-base leading-relaxed font-sans">{renderInlineMarkdown(page.related)}</p>
      </section>
      <ContentCTA location="topic-hub" />
    </>
  );
}
