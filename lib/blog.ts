import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');
const POSTS_PER_PAGE = 9;

export interface BlogAuthor {
  name: string;
  role: string;
  avatar: string;
  linkedin?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
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
  content: string;
}

export interface BlogPostMeta extends Omit<BlogPost, 'content'> {}

function parseMdxFile(filePath: string): BlogPost {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const stats = readingTime(content);
  const slug = data.slug || path.basename(filePath, '.mdx');

  return {
    slug,
    title: data.title || 'Untitled',
    description: data.description || '',
    category: data.category || 'general',
    tags: data.tags || [],
    author: data.author || { name: 'Sayso Team', role: 'Team', avatar: '/logo-sayso.png' },
    coverImage: data.coverImage || '/blog/covers/blog-card.jpg',
    heroImage: data.heroImage || '/blog/covers/blog-hero.jpg',
    publishedAt: data.publishedAt || new Date().toISOString().split('T')[0],
    updatedAt: data.updatedAt || data.publishedAt || new Date().toISOString().split('T')[0],
    readingTime: data.readingTime || Math.ceil(stats.minutes),
    featured: data.featured || false,
    type: data.type || 'standalone',
    cluster: data.cluster || undefined,
    pillar: data.pillar || undefined,
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

export function getPostBySlug(slug: string): BlogPost | null {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug) || null;
}

export function getPostsByCategory(category: string): BlogPostMeta[] {
  return getAllPostsMeta().filter((p) => p.category === category);
}

export function getFeaturedPost(): BlogPostMeta | null {
  return getAllPostsMeta().find((p) => p.featured) || getAllPostsMeta()[0] || null;
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

export function getPaginatedPosts(page: number, category?: string): {
  posts: BlogPostMeta[];
  totalPages: number;
  currentPage: number;
} {
  const allPosts = category ? getPostsByCategory(category) : getAllPostsMeta();
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const start = (page - 1) * POSTS_PER_PAGE;
  const posts = allPosts.slice(start, start + POSTS_PER_PAGE);

  return { posts, totalPages, currentPage: page };
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

export function getClusterPosts(cluster: string): BlogPostMeta[] {
  return getAllPostsMeta()
    .filter((p) => p.cluster === cluster)
    .sort((a, b) => {
      if (a.type === 'pillar' && b.type !== 'pillar') return -1;
      if (b.type === 'pillar' && a.type !== 'pillar') return 1;
      return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
    });
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

export function getPostClusters(): string[] {
  const clusters = getAllPostsMeta()
    .map((p) => p.cluster)
    .filter((c): c is string => !!c);

  return [...new Set(clusters)].sort();
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}
