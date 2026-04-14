import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getIntegrationBySlug, getAllIntegrationSlugs } from '@/lib/content/integrations';
import { buildMetadata } from '@/lib/seo/metadata';
import { IntegrationPage } from '@/components/pages/IntegrationPage';

export async function generateStaticParams() {
  return getAllIntegrationSlugs().map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getIntegrationBySlug(slug);
  if (!entry) return { title: 'Not Found' };
  return buildMetadata({
    title: entry.seoTitle,
    description: entry.seoDescription,
    path: `/integrations/${slug}`,
  });
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const entry = getIntegrationBySlug(slug);
  if (!entry) notFound();
  return <IntegrationPage entry={entry} />;
}
