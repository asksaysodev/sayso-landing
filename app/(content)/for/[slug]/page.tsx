import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getUseCaseBySlug, getAllUseCaseSlugs } from '@/lib/content/for';
import { buildMetadata } from '@/lib/seo/metadata';
import { PersonaPage } from '@/components/pages/PersonaPage';
import { isLiveBlogHref } from '@/lib/blog';

// Hourly, so related posts appear once their scheduled publish date passes.
export const revalidate = 3600;

export async function generateStaticParams() {
  return getAllUseCaseSlugs().map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getUseCaseBySlug(slug);
  if (!entry) return { title: 'Not Found' };
  return buildMetadata({
    title: entry.seoTitle,
    description: entry.seoDescription,
    path: `/for/${slug}`,
  });
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const entry = getUseCaseBySlug(slug);
  if (!entry) notFound();
  // PersonaPage is a client component, so drop scheduled posts here on the server.
  const relatedBlogPosts = entry.relatedBlogPosts.filter((post) => isLiveBlogHref(post.href));
  return <PersonaPage entry={{ ...entry, relatedBlogPosts }} />;
}
