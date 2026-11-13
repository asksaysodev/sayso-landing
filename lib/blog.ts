import 'server-only';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { cache } from 'react';
import { siteUrl } from '@/lib/config';
import { getAuthor } from '@/lib/authors';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export interface BlogAuthor {
  name: string;
  role: string;
  avatar: string;
  linkedin?: string;
  /** Author page path, when the author has one (see lib/authors.ts). */
  path?: string;
}

/** Which one-line call to action follows the second paragraph (see BlogInlineCTA). */
export const BLOG_CTA_VARIANTS = ['script', 'coaching', 'leads', 'prospecting', 'team'] as const;
export type BlogCtaVariant = (typeof BLOG_CTA_VARIANTS)[number];

export interface BlogPost {
  slug: string;
  title: string;
  /** Short search-result title. The visible article heading remains `title`. */
  seoTitle?: string;
  description: string;
  category: string;
  tags: string[];
  author: BlogAuthor;
  coverImage: string;
  heroImage: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  featured: boolean;
  type: 'pillar' | 'supporting' | 'standalone';
  cluster?: string;
  pillar?: string;
  ctaVariant?: BlogCtaVariant;
  content: string;
}

export interface BlogPostMeta extends Omit<BlogPost, 'content'> {}

const DEFAULT_AUTHOR_KEY = 'kuvaal-patel';

/** Frontmatter `author` is a key from lib/authors.ts. Unknown keys fail the build. */
function resolveAuthor(key: unknown, filePath: string): BlogAuthor {
  const author = getAuthor(typeof key === 'string' ? key : DEFAULT_AUTHOR_KEY);
  if (!author) throw new Error(`Unknown author "${String(key)}" in ${filePath}. Add it to lib/authors.ts.`);
  const { name, role, avatar, linkedin, path } = author;
  return { name, role, avatar, linkedin, path };
}

function parseMdxFile(filePath: string): BlogPost {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const stats = readingTime(content);
  const slug = data.slug || path.basename(filePath, '.mdx');
  if (data.ctaVariant && !BLOG_CTA_VARIANTS.includes(data.ctaVariant)) {
    // Fail the build: an unknown variant would otherwise drop both mid-article CTAs silently.
    throw new Error(`Invalid ctaVariant "${data.ctaVariant}" in ${filePath}. Use one of: ${BLOG_CTA_VARIANTS.join(', ')}.`);
  }

  return {
    slug,
    title: data.title || 'Untitled',
    seoTitle: data.seoTitle || undefined,
    description: data.description || '',
    category: data.category || 'general',
    tags: data.tags || [],
    author: resolveAuthor(data.author, filePath),
    coverImage: data.coverImage || '/blog/covers/blog-card.jpg',
    heroImage: data.heroImage || '/blog/covers/blog-hero.jpg',
    publishedAt: data.publishedAt || new Date().toISOString().split('T')[0],
    updatedAt: data.updatedAt || data.publishedAt || new Date().toISOString().split('T')[0],
    readingTime: data.readingTime || Math.ceil(stats.minutes),
    featured: data.featured || false,
    type: data.type || 'standalone',
    cluster: data.cluster || undefined,
    pillar: data.pillar || undefined,
    ctaVariant: data.ctaVariant || undefined,
    content,
  };
}

function validateClusterRelationships(posts: BlogPost[]): void {
  const allSlugs = new Set(posts.map((p) => p.slug));

  for (const post of posts) {
    if (post.type === 'supporting') {
      if (!post.pillar) {
        console.warn(`[Blog] Supporting post "${post.slug}" is missing a "pillar" field`);
      }
      if (!post.cluster) {
        console.warn(`[Blog] Supporting post "${post.slug}" is missing a "cluster" field`);
      }
      if (post.pillar && !allSlugs.has(post.pillar)) {
        console.warn(
          `[Blog] Supporting post "${post.slug}" references pillar "${post.pillar}" which does not exist`
        );
      }
    }

    if (post.type === 'pillar' && !post.cluster) {
      console.warn(`[Blog] Pillar post "${post.slug}" is missing a "cluster" field`);
    }
  }
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));
  const now = new Date();
  // Hide future-dated posts on production only. Local dev and Vercel preview
  // deployments show every post so writers and reviewers can see scheduled content.
  const isProduction = process.env.VERCEL_ENV === 'production';

  const posts = files
    .map((file) => parseMdxFile(path.join(BLOG_DIR, file)))
    .filter((p) => !isProduction || new Date(p.publishedAt) <= now)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  if (process.env.NODE_ENV === 'development') {
    validateClusterRelationships(posts);
  }

  return posts;
}

export function getAllPostsMeta(): BlogPostMeta[] {
  return getAllPosts().map(({ content, ...meta }) => meta);
}

// Slugs of posts visible right now. Cached per request so a page with many links reads the posts once.
const getLiveSlugs = cache(() => new Set(getAllPosts().map((p) => p.slug)));

/**
 * False only when `href` points at a blog post that is not live yet (future
 * publishedAt in production). Callers render plain text instead, so scheduled
 * posts never show up as 404 links; the link appears on the next hourly
 * revalidation after the post publishes. Any other href returns true.
 */
export function isLiveBlogHref(href: string): boolean {
  const pathname = (href.startsWith(siteUrl) ? href.slice(siteUrl.length) : href).toLowerCase();
  const match = pathname.match(/^\/blog\/([a-z0-9-]+)\/?(?:[?#].*)?$/);
  return !match || getLiveSlugs().has(match[1]);
}

export function getPostBySlug(slug: string): BlogPost | null {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug) || null;
}

export function getPostsByCategory(category: string): BlogPostMeta[] {
  return getAllPostsMeta().filter((p) => p.category === category);
}

export function getCategories(): { slug: string; name: string; count: number }[] {
  const posts = getAllPostsMeta();
  const categoryMap = new Map<string, number>();

  posts.forEach((p) => {
    categoryMap.set(p.category, (categoryMap.get(p.category) || 0) + 1);
  });

  return Array.from(categoryMap.entries()).map(([slug, count]) => ({
    slug,
    name: formatCategoryName(slug),
    count,
  }));
}

export function formatCategoryName(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function getRelatedPosts(
  currentSlug: string,
  options?: { cluster?: string; category?: string; limit?: number }
): BlogPostMeta[] {
  const { cluster, category, limit = 3 } = options || {};
  const allPosts = getAllPostsMeta().filter((p) => p.slug !== currentSlug);

  const related: BlogPostMeta[] = [];
  const seen = new Set<string>();

  function addPosts(posts: BlogPostMeta[]) {
    for (const p of posts) {
      if (related.length >= limit) return;
      if (!seen.has(p.slug)) {
        seen.add(p.slug);
        related.push(p);
      }
    }
  }

  // 1. Same cluster (pillar first)
  if (cluster) {
    const clusterPosts = allPosts
      .filter((p) => p.cluster === cluster)
      .sort((a, b) => {
        if (a.type === 'pillar' && b.type !== 'pillar') return -1;
        if (b.type === 'pillar' && a.type !== 'pillar') return 1;
        return 0;
      });
    addPosts(clusterPosts);
  }

  // 2. Same category
  if (category) {
    addPosts(allPosts.filter((p) => p.category === category));
  }

  // 3. Any recent posts (already sorted by publishedAt desc)
  addPosts(allPosts);

  return related;
}

export function getPillarPost(cluster: string): BlogPostMeta | null {
  const pillars = getAllPostsMeta().filter(
    (p) => p.cluster === cluster && p.type === 'pillar'
  );

  if (pillars.length > 1) {
    console.warn(
      `[Blog] Cluster "${cluster}" has ${pillars.length} pillar posts - expected 1`
    );
  }

  return pillars[0] || null;
}

export function getSupportingPosts(cluster: string): BlogPostMeta[] {
  return getAllPostsMeta()
    .filter((p) => p.cluster === cluster && p.type === 'supporting')
    .sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

/** The plain fields a blog card renders (see components/blog/BlogPostCard). */
export function toBlogCardPost(post: BlogPostMeta) {
  return {
    slug: post.slug,
    title: post.title,
    description: post.description,
    categoryName: formatCategoryName(post.category),
    category: post.category,
    tags: post.tags,
    publishedAt: post.publishedAt,
    readingTime: post.readingTime,
  };
}
