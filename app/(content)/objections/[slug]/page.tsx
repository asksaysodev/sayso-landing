import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getObjectionBySlug, getAllObjectionSlugs } from '@/lib/content/objections';
import { buildMetadata } from '@/lib/seo/metadata';
import { ObjectionPage } from '@/components/pages/ObjectionPage';

export async function generateStaticParams() {
  return getAllObjectionSlugs().map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getObjectionBySlug(slug);
  if (!entry) return { title: 'Not Found' };
  return buildMetadata({
    title: entry.seoTitle,
    description: entry.seoDescription,
    path: `/objections/${slug}`,
  });
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const entry = getObjectionBySlug(slug);
  if (!entry) notFound();
  return <ObjectionPage entry={entry} />;
}
