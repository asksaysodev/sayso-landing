import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getObjectionBySlug, getAllObjectionSlugs } from '@/lib/content/objections';
import { buildMetadata } from '@/lib/seo/metadata';
import { ObjectionPage } from '@/components/pages/ObjectionPage';
import { isLiveBlogHref } from '@/lib/blog';

// Hourly, so the deeper-reading link appears once its scheduled post publishes.
export const revalidate = 3600;

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
  const relatedBlogPost =
    entry.relatedBlogPost && isLiveBlogHref(entry.relatedBlogPost.href) ? entry.relatedBlogPost : undefined;
  return <ObjectionPage entry={{ ...entry, relatedBlogPost }} />;
}
