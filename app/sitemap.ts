import { MetadataRoute } from 'next';
import { getAllPostsMeta } from '@/lib/blog';
import { siteUrl } from '@/lib/config';
import { getAllNavHrefs } from '@/lib/navigation';
import { getAllGlossarySlugs } from '@/lib/content/glossary';
import { getAllObjectionSlugs } from '@/lib/content/objections';
import { getAllProductSlugs } from '@/lib/content/products';
// import { getAllIntegrationSlugs } from '@/lib/content/integrations'; // TODO: re-enable when integrations article is published
import { getAllUseCaseSlugs } from '@/lib/content/for';
// import { getAllCaseStudySlugs } from '@/lib/content/case-studies'; // TODO: re-enable when first real case study is published

// Regenerate hourly so scheduled posts enter the sitemap when their publishedAt
// date passes, without waiting for a manual redeploy. Matches the blog pages'
// revalidate interval so the sitemap and the published pages stay in sync.
export const revalidate = 3600;

/** Paths that should never appear in the sitemap. */
const EXCLUDED_PATHS = new Set([
  '/privacy',
  '/terms',
  '/feedback',
  '/paywall-preview',
  '/ui',
  '/integrations', // TODO: re-enable when integrations article is published
  '/case-studies', // TODO: re-enable when first real case study is published
  '/founderpricing', // noindex: time-limited promo overlapping /pricing/
  '/request-demo', // noindex: duplicates the /demo/ booking page
  '/resources', // noindex: thin gateway that only repeats nav links
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
  if (path.startsWith('/objections')) return 0.7;
  if (path.startsWith('/glossary')) return 0.5;
  return 0.6;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // 1. Collect all nav-registered pages + homepage + demo
  const navHrefs = getAllNavHrefs();
  const allStaticPaths = new Set(['/', '/demo', '/download', ...navHrefs]);

  // 2. Filter out excluded paths. The whole /integrations area (hub + partner
  // pages) is intentionally kept out of the sitemap for now; the nav links to
  // the partner pages would otherwise leak them in. Remove this prefix guard
  // when integrations are ready to be indexed.
  const staticPages: MetadataRoute.Sitemap = Array.from(allStaticPaths)
    .filter((path) => !EXCLUDED_PATHS.has(path) && !path.startsWith('/integrations'))
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

  // Blog category pages are intentionally omitted: they are noindex, so submitting
  // them in the sitemap sends Google a conflicting signal and wastes crawl budget.
  // Their internal (follow) links still let crawlers discover the posts.

  // 4. Dynamic content pages from content loaders
  const contentSections: { slugs: string[]; prefix: string; priority: number }[] = [
    { slugs: getAllGlossarySlugs(), prefix: '/glossary', priority: 0.5 },
    { slugs: getAllObjectionSlugs(), prefix: '/objections', priority: 0.7 },
    { slugs: getAllProductSlugs(), prefix: '/products', priority: 0.7 },
    // { slugs: getAllIntegrationSlugs(), prefix: '/integrations', priority: 0.7 }, // TODO: re-enable when integrations article is published
    { slugs: getAllUseCaseSlugs(), prefix: '/for', priority: 0.7 },
    // { slugs: getAllCaseStudySlugs(), prefix: '/case-studies', priority: 0.7 }, // TODO: re-enable when first real case study is published
  ];

  const contentPages: MetadataRoute.Sitemap = contentSections.flatMap(({ slugs, prefix, priority }) =>
    slugs.map((slug) => ({
      url: `${siteUrl}${prefix}/${slug}/`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority,
    })),
  );

  // Dedupe by URL: persona and product child pages are registered both in the
  // nav (staticPages) and in the content loaders (contentPages), so they would
  // otherwise appear twice. Keep the first occurrence of each URL.
  const all = [...staticPages, ...blogPages, ...contentPages];
  const seen = new Set<string>();
  return all.filter((entry) => {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });
}
