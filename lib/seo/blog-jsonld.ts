import { BlogPost, BlogPostMeta } from '@/lib/blog';
import { SAYSO_PUBLISHER } from '@/lib/seo/schema';

// Re-export for backward compatibility
export { generateBreadcrumbJsonLd } from '@/lib/seo/schema';

export function generateArticleJsonLd(post: BlogPost | BlogPostMeta, siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    image: `${siteUrl}${post.coverImage}`,
    author: {
      '@type': 'Person',
      name: post.author.name,
    },
    publisher: SAYSO_PUBLISHER,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    description: post.description,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/blog/${post.slug}`,
    },
  };
}

export function generateBlogListJsonLd(siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'The Sayso Blog',
    description: 'Tips, strategies, and insights to help you win every sales moment.',
    url: `${siteUrl}/blog`,
    publisher: SAYSO_PUBLISHER,
  };
}
