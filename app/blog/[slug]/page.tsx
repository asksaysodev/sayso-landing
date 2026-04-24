import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllSlugs, getRelatedPosts, formatCategoryName, getSupportingPosts, getPillarPost } from '@/lib/blog';
import { generateArticleJsonLd, generateBreadcrumbJsonLd, extractFaqFromContent, generateFaqJsonLd } from '@/lib/seo/blog-jsonld';
import { BlogBreadcrumb } from '@/components/blog/BlogBreadcrumb';
import { BlogArticleHeader } from '@/components/blog/BlogArticleHeader';
import { BlogArticleContent } from '@/components/blog/BlogArticleContent';
import { BlogAuthorCard } from '@/components/blog/BlogAuthorCard';
import { BlogInArticleCTA } from '@/components/blog/BlogInArticleCTA';
import { BlogEarlyCTA } from '@/components/blog/BlogEarlyCTA';
import { BlogPillarUplink } from '@/components/blog/BlogPillarUplink';
import { BlogRelatedPosts } from '@/components/blog/BlogRelatedPosts';
import { BlogClusterPosts } from '@/components/blog/BlogClusterPosts';
// TOC sidebar and cluster nav sidebar removed - blog posts use a single centered column.
// Do not re-add BlogTableOfContents or BlogClusterNav sidebar here.
import { BlogNewsletterCTA } from '@/components/blog/BlogNewsletterCTA';

// Revalidate hourly so scheduled posts appear on production within an hour of their publishedAt date.
export const revalidate = 3600;

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
      canonical: `${siteUrl}/blog/${slug}/`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      images: [post.heroImage],
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.heroImage],
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
  const faqPairs = extractFaqFromContent(post.content);
  const faqJsonLd = generateFaqJsonLd(faqPairs);

  // Resolve cluster data
  const pillarPost = post.type === 'supporting' && post.pillar
    ? getPostBySlug(post.pillar)
    : post.type === 'pillar' && post.cluster
      ? post // The post itself is the pillar
      : null;
  const clusterPillar = post.cluster ? getPillarPost(post.cluster) : null;
  const clusterSupporting = post.cluster ? getSupportingPosts(post.cluster) : [];

  // Build breadcrumbs: supporting posts show pillar in path if it exists
  const breadcrumbItems = post.type === 'supporting' && pillarPost && pillarPost.slug !== post.slug
    ? [
        { name: 'Blog', url: '/blog/' },
        { name: pillarPost.title, url: `/blog/${pillarPost.slug}/` },
        { name: post.title, url: `/blog/${post.slug}/` },
      ]
    : [
        { name: 'Blog', url: '/blog/' },
        { name: formatCategoryName(post.category), url: `/blog/category/${post.category}/` },
        { name: post.title, url: `/blog/${post.slug}/` },
      ];
  const breadcrumbJsonLd = generateBreadcrumbJsonLd(breadcrumbItems);

  const visibleBreadcrumbs = post.type === 'supporting' && pillarPost && pillarPost.slug !== post.slug
    ? [
        { label: 'Blog', href: '/blog' },
        { label: pillarPost.title, href: `/blog/${pillarPost.slug}` },
        { label: post.title },
      ]
    : [
        { label: 'Blog', href: '/blog' },
        { label: formatCategoryName(post.category), href: `/blog/category/${post.category}` },
        { label: post.title },
      ];

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

  // Article content block (shared between layouts)
  const articleContent = (
    <>
      {/* Early CTA - pillar posts only */}
      {post.type === 'pillar' && <BlogEarlyCTA />}

      {/* Pillar uplink - supporting posts only, when pillar exists */}
      {post.type === 'supporting' && pillarPost && pillarPost.slug !== post.slug && (
        <BlogPillarUplink pillar={pillarPost} />
      )}

      <BlogArticleContent content={firstHalf} />
      <BlogInArticleCTA />
      <BlogArticleContent content={secondHalf} />

      {/* Author card */}
      <div className="mt-8">
        <BlogAuthorCard author={post.author} />
      </div>
    </>
  );

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
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/* Breadcrumb */}
      <BlogBreadcrumb items={visibleBreadcrumbs} />

      {/* Article header */}
      <BlogArticleHeader post={post} />

      {/* Content area - single centered column for all post types */}
      <div className="max-w-[800px] mx-auto px-6 pb-10">
        <article>
          {articleContent}
        </article>
      </div>

      {/* Cluster navigation */}
      {post.cluster && (
        <BlogClusterPosts
          currentSlug={post.slug}
          pillar={clusterPillar}
          supportingPosts={clusterSupporting}
          postType={post.type}
        />
      )}

      {/* Related posts full width */}
      {relatedPosts.length > 0 && (
        <BlogRelatedPosts posts={relatedPosts} variant="grid" />
      )}

      <BlogNewsletterCTA />
    </>
  );
}
