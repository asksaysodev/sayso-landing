import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getGlossaryBySlug, getAllGlossarySlugs } from '@/lib/content/glossary';
import { buildMetadata } from '@/lib/seo/metadata';
import { GlossaryPage } from '@/components/pages/GlossaryPage';

// Hourly, so links to scheduled blog posts switch on once the post publishes.
export const revalidate = 3600;

export async function generateStaticParams() {
  return getAllGlossarySlugs().map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getGlossaryBySlug(slug);
  if (!entry) return { title: 'Not Found' };
  return buildMetadata({
    title: entry.seoTitle,
    description: entry.seoDescription,
    path: `/glossary/${slug}`,
  });
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const entry = getGlossaryBySlug(slug);
  if (!entry) notFound();
  return <GlossaryPage entry={entry} />;
}
