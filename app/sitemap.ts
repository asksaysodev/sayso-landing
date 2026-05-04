import { MetadataRoute } from 'next';
import { getAllPostsMeta, getCategories } from '@/lib/blog';
import { siteUrl } from '@/lib/config';
import { getAllNavHrefs } from '@/lib/navigation';
import { getAllGlossarySlugs } from '@/lib/content/glossary';
import { getAllObjectionSlugs } from '@/lib/content/objections';
import { getAllProductSlugs } from '@/lib/content/products';
// import { getAllIntegrationSlugs } from '@/lib/content/integrations'; // TODO: re-enable when integrations article is published
import { getAllUseCaseSlugs } from '@/lib/content/for';
import { getAllComparisonSlugs } from '@/lib/content/comparisons';
import { getAllCaseStudySlugs } from '@/lib/content/case-studies';

/** Paths that should never appear in the sitemap. */
const EXCLUDED_PATHS = new Set([
  '/privacy',
  '/terms',
  '/start',
  '/feedback',
  '/paywall-preview',
  '/ui',
  '/integrations', // TODO: re-enable when integrations article is published
]);

/** Priority overrides by exact path. */
const PRIORITY_MAP: Record<string, number> = {
  '/': 1.0,
  '/demo': 0.9,
  '/blog': 0.9,
  '/pricing': 0.8,
  '/case-studies': 0.7,
  '/contact': 0.7,
  '/request-demo': 0.7,
};

/** Default priority by path prefix. */
function getPriority(path: string): number {
  if (PRIORITY_MAP[path] !== undefined) return PRIORITY_MAP[path];
  if (path.startsWith('/products/')) return 0.7;
  if (path.startsWith('/for/')) return 0.7;
  // if (path.startsWith('/integrations')) return 0.7; // TODO: re-enable when integrations article is published
  if (path.startsWith('/compare/')) return 0.7;
  if (path.startsWith('/objections')) return 0.7;
  if (path.startsWith('/glossary')) return 0.5;
  return 0.6;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // 1. Collect all nav-registered pages + homepage + demo
  const navHrefs = getAllNavHrefs();
  const allStaticPaths = new Set(['/', '/demo', ...navHrefs]);

  // 2. Filter out excluded paths
  const staticPages: MetadataRoute.Sitemap = Array.from(allStaticPaths)
    .filter((path) => !EXCLUDED_PATHS.has(path))
    .map((path) => ({
      url: `${siteUrl}${path.replace(/\/?$/, '/')}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: getPriority(path),
    }));

  // 3. Dynamic blog post pages
  const posts = getAllPostsMeta();
  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}/`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: post.type === 'pillar' ? 0.9 : post.type === 'supporting' ? 0.7 : 0.6,
  }));

  // 4. Blog category pages (low priority, supports topic clusters)
  const categories = getCategories();
  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${siteUrl}/blog/category/${cat.slug}/`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.4,
  }));

  // 5. Dynamic content pages from content loaders
  const contentSections: { slugs: string[]; prefix: string; priority: number }[] = [
    { slugs: getAllGlossarySlugs(), prefix: '/glossary', priority: 0.5 },
    { slugs: getAllObjectionSlugs(), prefix: '/objections', priority: 0.7 },
    { slugs: getAllProductSlugs(), prefix: '/products', priority: 0.7 },
    // { slugs: getAllIntegrationSlugs(), prefix: '/integrations', priority: 0.7 }, // TODO: re-enable when integrations article is published
    { slugs: getAllUseCaseSlugs(), prefix: '/for', priority: 0.7 },
    { slugs: getAllComparisonSlugs(), prefix: '/compare', priority: 0.7 },
    { slugs: getAllCaseStudySlugs(), prefix: '/case-studies', priority: 0.7 },
  ];

  const contentPages: MetadataRoute.Sitemap = contentSections.flatMap(({ slugs, prefix, priority }) =>
    slugs.map((slug) => ({
      url: `${siteUrl}${prefix}/${slug}/`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority,
    })),
  );

  return [...staticPages, ...blogPages, ...categoryPages, ...contentPages];
}
