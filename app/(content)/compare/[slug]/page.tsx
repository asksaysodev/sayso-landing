import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getComparisonBySlug, getAllComparisonSlugs } from '@/lib/content/comparisons';
import { buildMetadata } from '@/lib/seo/metadata';
import { ComparisonPage } from '@/components/pages/ComparisonPage';

export async function generateStaticParams() {
  return getAllComparisonSlugs().map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getComparisonBySlug(slug);
  if (!entry) return { title: 'Not Found' };
  return buildMetadata({
    title: entry.seoTitle,
    description: entry.seoDescription,
    path: `/compare/${slug}`,
  });
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const entry = getComparisonBySlug(slug);
  if (!entry) notFound();
  return <ComparisonPage entry={entry} />;
}
