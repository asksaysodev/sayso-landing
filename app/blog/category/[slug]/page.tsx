import { Metadata } from 'next';
import { getPostsByCategory, getCategories, formatCategoryName } from '@/lib/blog';
import { BlogHeroBanner } from '@/components/blog/BlogHeroBanner';
import { BlogCategoryPills } from '@/components/blog/BlogCategoryPills';
import { BlogPostCard } from '@/components/blog/BlogPostCard';
import { BlogNewsletterCTA } from '@/components/blog/BlogNewsletterCTA';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getCategories().map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const name = formatCategoryName(slug);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://asksayso.com';
  return {
    title: `${name} Articles | Sayso Blog`,
    description: `Read our latest articles about ${name.toLowerCase()}. Tips, strategies, and insights from the Sayso team.`,
    alternates: {
      canonical: `${siteUrl}/blog/category/${slug}`,
    },
    openGraph: {
      title: `${name} Articles | Sayso Blog`,
      description: `Read our latest articles about ${name.toLowerCase()}. Tips, strategies, and insights from the Sayso team.`,
      url: `${siteUrl}/blog/category/${slug}`,
      type: 'website',
      // TODO: create /public/og-default.png (1200x630) and uncomment
      // images: [{ url: '/og-default.png', width: 1200, height: 630, alt: `${name} — Sayso Blog` }],
    },
    twitter: {
      title: `${name} Articles | Sayso Blog`,
      description: `Read our latest articles about ${name.toLowerCase()}. Tips, strategies, and insights from the Sayso team.`,
      // images: ['/og-default.png'],
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const categoryName = formatCategoryName(slug);
  const posts = getPostsByCategory(slug);
  const categories = getCategories();

  return (
    <>
      <BlogHeroBanner
        title={categoryName}
        subtitle={`Explore our articles about ${categoryName.toLowerCase()}.`}
      />

      <BlogCategoryPills categories={categories} activeCategory={slug} />

      <section className="max-w-[1200px] mx-auto px-6 pb-8">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-[#1D4871]/60 font-sans text-lg">
              No posts in this category yet.
            </p>
          </div>
        )}
      </section>

      <BlogNewsletterCTA />
    </>
  );
}
