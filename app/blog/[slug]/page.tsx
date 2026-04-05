import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllSlugs, getRelatedPosts, formatCategoryName } from '@/lib/blog';
import { generateArticleJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo/blog-jsonld';
import { BlogBreadcrumb } from '@/components/blog/BlogBreadcrumb';
import { BlogArticleHeader } from '@/components/blog/BlogArticleHeader';
import { BlogArticleContent } from '@/components/blog/BlogArticleContent';
import { BlogAuthorCard } from '@/components/blog/BlogAuthorCard';
import { BlogInArticleCTA } from '@/components/blog/BlogInArticleCTA';
import { BlogRelatedPosts } from '@/components/blog/BlogRelatedPosts';
import { BlogNewsletterCTA } from '@/components/blog/BlogNewsletterCTA';

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://asksayso.com';
  if (!post) return { title: 'Post Not Found | Sayso Blog' };

  return {
    title: `${post.title} | Sayso Blog`,
    description: post.description,
    alternates: {
      canonical: `${siteUrl}/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      images: [post.coverImage],
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.coverImage],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const relatedPosts = getRelatedPosts(post.slug, {
    cluster: post.cluster,
    category: post.category,
  });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://asksayso.com';
  const articleJsonLd = generateArticleJsonLd(post, siteUrl);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Blog', url: '/blog' },
    { name: formatCategoryName(post.category), url: `/blog/category/${post.category}` },
    { name: post.title, url: `/blog/${post.slug}` },
  ]);

  // Split content roughly in half for mid-article CTA insertion
  const contentLines = post.content.split('\n');
  const midpoint = Math.floor(contentLines.length / 2);
  // Find the nearest heading after midpoint to split cleanly
  let splitIndex = midpoint;
  for (let i = midpoint; i < contentLines.length; i++) {
    if (contentLines[i].startsWith('## ')) {
      splitIndex = i;
      break;
    }
  }
  const firstHalf = contentLines.slice(0, splitIndex).join('\n');
  const secondHalf = contentLines.slice(splitIndex).join('\n');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Breadcrumb */}
      <BlogBreadcrumb
        items={[
          { label: 'Blog', href: '/blog' },
          { label: formatCategoryName(post.category), href: `/blog/category/${post.category}` },
          { label: post.title },
        ]}
      />

      {/* Article header */}
      <BlogArticleHeader post={post} />

      {/* Content area */}
      <div className="max-w-[800px] mx-auto px-6 pb-10">
        <article>
          <BlogArticleContent content={firstHalf} />
          <BlogInArticleCTA />
          <BlogArticleContent content={secondHalf} />

          {/* Author card */}
          <div className="mt-8">
            <BlogAuthorCard author={post.author} />
          </div>
        </article>
      </div>

      {/* Related posts full width */}
      {relatedPosts.length > 0 && (
        <BlogRelatedPosts posts={relatedPosts} variant="grid" />
      )}

      <BlogNewsletterCTA />
    </>
  );
}
