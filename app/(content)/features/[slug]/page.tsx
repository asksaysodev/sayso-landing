import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getFeatureBySlug, getAllFeatureSlugs } from '@/lib/content/features';
import { buildMetadata } from '@/lib/seo/metadata';
import { FeaturePage } from '@/components/pages/FeaturePage';

export async function generateStaticParams() {
  return getAllFeatureSlugs().map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getFeatureBySlug(slug);
  if (!entry) return { title: 'Not Found' };
  return buildMetadata({
    title: entry.seoTitle,
    description: entry.seoDescription,
    path: `/features/${slug}`,
  });
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const entry = getFeatureBySlug(slug);
  if (!entry) notFound();
  return <FeaturePage entry={entry} />;
}
