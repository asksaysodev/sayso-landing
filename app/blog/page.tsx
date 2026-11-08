import { Metadata } from 'next';
import { getAllPostsMeta, getCategories, toBlogCardPost } from '@/lib/blog';
import { generateBlogListJsonLd } from '@/lib/seo/blog-jsonld';
import { BlogIndex, type BlogSort } from '@/components/blog/BlogIndex';
import { BlogNewsletterCTA } from '@/components/blog/BlogNewsletterCTA';
import { siteUrl } from '@/lib/config';

// Revalidate hourly so scheduled posts appear on production within an hour of their publishedAt date.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Expert insights on prospecting, objection handling, and appointment booking for real estate agents and teams.',
  alternates: {
    canonical: `${siteUrl}/blog/`,
  },
  openGraph: {
    title: 'The Sayso Blog',
    description: 'Expert insights on prospecting, objection handling, and appointment booking for real estate agents and teams.',
    url: `${siteUrl}/blog/`,
    type: 'website',
    images: [{ url: '/images/og-default.png', width: 1200, height: 630, alt: 'The Sayso Blog' }],
  },
  twitter: {
    title: 'The Sayso Blog',
    description: 'Expert insights on prospecting, objection handling, and appointment booking for real estate agents and teams.',
    images: ['/images/og-default.png'],
  },
};

const POSTS_PER_PAGE = 9;
const SORTS: BlogSort[] = ['newest', 'oldest', 'quickest'];

interface BlogPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

/** Repeated query keys (`?q=a&q=b`) arrive as arrays; take the first value. */
function firstParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const raw = await searchParams;
  const params = {
    page: firstParam(raw.page),
    q: firstParam(raw.q),
    category: firstParam(raw.category),
    sort: firstParam(raw.sort),
  };
  const page = Math.max(1, parseInt(params.page || '1', 10) || 1);
  const categories = getCategories();
  const category = categories.some((c) => c.slug === params.category) ? params.category : undefined;
  const sort = SORTS.find((s) => s === params.sort) ?? 'newest';
  const posts = getAllPostsMeta().map(toBlogCardPost);

  const jsonLd = generateBlogListJsonLd(siteUrl);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <BlogIndex
        posts={posts}
        categories={categories}
        initialCategory={category}
        initialSort={sort}
        initialQuery={params.q?.trim() ?? ''}
        initialPage={page}
        pageSize={POSTS_PER_PAGE}
      />
      <BlogNewsletterCTA />
    </>
  );
}
