import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug, getAllProductSlugs } from '@/lib/content/products';
import { buildMetadata } from '@/lib/seo/metadata';
import { ProductPage } from '@/components/pages/ProductPage';
import { isLiveBlogHref } from '@/lib/blog';

// Hourly, so related posts appear once their scheduled publish date passes.
export const revalidate = 3600;

export async function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getProductBySlug(slug);
  if (!entry) return { title: 'Not Found' };
  return buildMetadata({
    title: entry.seoTitle,
    description: entry.seoDescription,
    path: `/products/${slug}`,
  });
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const entry = getProductBySlug(slug);
  if (!entry) notFound();
  const relatedBlogPosts = entry.relatedBlogPosts.filter((post) => isLiveBlogHref(post.href));
  return <ProductPage entry={{ ...entry, relatedBlogPosts }} />;
}
