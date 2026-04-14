import { BlogPost, BlogPostMeta, getPostBySlug, getSupportingPosts } from '@/lib/blog';
import { SAYSO_PUBLISHER } from '@/lib/seo/schema';

// Re-export for backward compatibility
export { generateBreadcrumbJsonLd } from '@/lib/seo/schema';

function formatClusterName(cluster: string): string {
  return cluster
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export function generateArticleJsonLd(post: BlogPost | BlogPostMeta, siteUrl: string) {
  const base: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
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
      '@id': `${siteUrl}/blog/${post.slug}/`,
    },
  };

  // Add articleSection from cluster name
  if (post.cluster) {
    base.articleSection = formatClusterName(post.cluster);
  }

  // Pillar posts: hasPart listing supporting posts
  if (post.type === 'pillar' && post.cluster) {
    const supporting = getSupportingPosts(post.cluster);
    if (supporting.length > 0) {
      base.hasPart = supporting.map((s) => ({
        '@type': 'WebPage',
        '@id': `${siteUrl}/blog/${s.slug}/`,
      }));
    }
  }

  // Supporting posts: isPartOf referencing the pillar
  if (post.type === 'supporting' && post.pillar) {
    const pillar = getPostBySlug(post.pillar);
    if (pillar) {
      base.isPartOf = {
        '@type': 'BlogPosting',
        '@id': `${siteUrl}/blog/${pillar.slug}/`,
        headline: pillar.title,
      };
    }
  }

  return base;
}

/**
 * Extracts FAQ Q&A pairs from blog post markdown content.
 * Looks for a ## FAQ section, then parses bold questions and their answer paragraphs.
 */
export function extractFaqFromContent(content: string): { question: string; answer: string }[] {
  const lines = content.split('\n');
  const faqIndex = lines.findIndex((line) => /^##\s+FAQ\b/i.test(line));
  if (faqIndex === -1) return [];

  const faqLines = lines.slice(faqIndex + 1);
  const pairs: { question: string; answer: string }[] = [];
  let currentQuestion = '';
  let currentAnswer = '';

  for (const line of faqLines) {
    // Stop at the next H2 section
    if (/^##\s+/.test(line) && !/^###/.test(line)) break;

    // Bold text on its own line is a question
    const questionMatch = line.match(/^\*\*(.+?)\*\*\s*$/);
    if (questionMatch) {
      if (currentQuestion && currentAnswer.trim()) {
        pairs.push({ question: currentQuestion, answer: currentAnswer.trim() });
      }
      currentQuestion = questionMatch[1];
      currentAnswer = '';
    } else if (currentQuestion && line.trim()) {
      currentAnswer += (currentAnswer ? ' ' : '') + line.trim();
    }
  }

  // Push the last pair
  if (currentQuestion && currentAnswer.trim()) {
    pairs.push({ question: currentQuestion, answer: currentAnswer.trim() });
  }

  return pairs;
}

export function generateFaqJsonLd(pairs: { question: string; answer: string }[]) {
  if (pairs.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: pairs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function generateBlogListJsonLd(siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'The Sayso Blog',
    description: 'Expert insights on prospecting, objection handling, and appointment booking for real estate agents and teams.',
    url: `${siteUrl}/blog/`,
    publisher: SAYSO_PUBLISHER,
  };
}
