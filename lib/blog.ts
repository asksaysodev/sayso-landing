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
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  featured: boolean;
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
    coverImage: data.coverImage || '/blog/covers/default.jpg',
    publishedAt: data.publishedAt || new Date().toISOString().split('T')[0],
    updatedAt: data.updatedAt || data.publishedAt || new Date().toISOString().split('T')[0],
    readingTime: data.readingTime || Math.ceil(stats.minutes),
    featured: data.featured || false,
    content,
  };
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));

  return files
    .map((file) => parseMdxFile(path.join(BLOG_DIR, file)))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
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

export function getRelatedPosts(currentSlug: string, category: string, limit = 3): BlogPostMeta[] {
  return getAllPostsMeta()
    .filter((p) => p.slug !== currentSlug && p.category === category)
    .slice(0, limit);
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}
