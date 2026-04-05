import { Metadata } from 'next';
import { getAllPostsMeta, getCategories, getFeaturedPost, getPaginatedPosts } from '@/lib/blog';
import { generateBlogListJsonLd } from '@/lib/seo/blog-jsonld';
import { BlogHeroBanner } from '@/components/blog/BlogHeroBanner';
import { BlogCategoryPills } from '@/components/blog/BlogCategoryPills';
import { BlogFeaturedPost } from '@/components/blog/BlogFeaturedPost';
import { BlogPostCard } from '@/components/blog/BlogPostCard';
import { BlogPagination } from '@/components/blog/BlogPagination';
import { BlogNewsletterCTA } from '@/components/blog/BlogNewsletterCTA';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://asksayso.com';

export const metadata: Metadata = {
  title: 'Blog | Sayso',
  description: 'Tips, strategies, and insights to help you win every sales moment. Cold calling scripts, AI coaching, lead conversion, and more.',
  alternates: {
    canonical: `${siteUrl}/blog/`,
  },
  openGraph: {
    title: 'The Sayso Blog',
    description: 'Tips, strategies, and insights to help you win every sales moment.',
    url: `${siteUrl}/blog/`,
    type: 'website',
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'The Sayso Blog' }],
  },
  twitter: {
    title: 'The Sayso Blog',
    description: 'Tips, strategies, and insights to help you win every sales moment.',
    images: ['/og-default.png'],
  },
};

interface BlogPageProps {
  searchParams: Promise<{ page?: string; q?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page || '1', 10));
  const query = params.q?.toLowerCase();

  const categories = getCategories();
  const featuredPost = page === 1 ? getFeaturedPost() : null;
  const { posts, totalPages, currentPage } = getPaginatedPosts(page);

  // Filter by search query if provided
  const filteredPosts = query
    ? posts.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.tags.some((t) => t.toLowerCase().includes(query))
      )
    : posts;

  // Exclude featured post from grid on page 1
  const gridPosts = featuredPost
    ? filteredPosts.filter((p) => p.slug !== featuredPost.slug)
    : filteredPosts;

  const jsonLd = generateBlogListJsonLd(siteUrl);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <BlogHeroBanner />
      <BlogCategoryPills categories={categories} />

      {/* Featured post — only on page 1 */}
      {featuredPost && page === 1 && <BlogFeaturedPost post={featuredPost} />}

      {/* Post grid */}
      <section className="max-w-[1200px] mx-auto px-6 pb-4">
        {query && (
          <p className="text-sm text-[#1D4871]/60 mb-4 font-sans">
            Showing results for &ldquo;{params.q}&rdquo;
          </p>
        )}
        {gridPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gridPosts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-[#1D4871]/60 font-sans text-lg">No posts found.</p>
          </div>
        )}
      </section>

      <BlogPagination currentPage={currentPage} totalPages={totalPages} />
      <BlogNewsletterCTA />
    </>
  );
}
