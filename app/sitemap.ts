import { MetadataRoute } from 'next';
import { getAllPostsMeta } from '@/lib/blog';
import { siteUrl } from '@/lib/config';
import { getAllNavHrefs } from '@/lib/navigation';
import { getAllGlossaryEntries } from '@/lib/content/glossary';
import { getAllObjectionEntries } from '@/lib/content/objections';
import { getAllProductEntries } from '@/lib/content/products';
import { getAllPartnerIntegrations } from '@/lib/content/partner-integrations';
import { getAllUseCaseEntries } from '@/lib/content/for';
// import { getAllCaseStudyEntries } from '@/lib/content/case-studies'; // TODO: re-enable when first real case study is published

// Regenerate hourly so scheduled posts enter the sitemap when their publishedAt
// date passes, without waiting for a manual redeploy. Matches the blog pages'
// revalidate interval so the sitemap and the published pages stay in sync.
export const revalidate = 3600;

/** Paths that should never appear in the sitemap. */
const EXCLUDED_PATHS = new Set([
  '/privacy',
  '/terms',
  '/feedback',
  '/case-studies', // TODO: re-enable when first real case study is published
  '/founderpricing', // noindex: time-limited promo overlapping /pricing/
  '/request-demo', // noindex: duplicates the /demo/ booking page
  '/resources', // noindex: thin gateway that only repeats nav links
]);

/**
 * Last meaningful content change (YYYY-MM-DD) for each static page in the
 * sitemap, used as its lastmod. Bump the date when you change a page's
 * content. /blog is omitted because it uses the newest post's updatedAt.
 * Content entries (glossary, objections, products, /for/, integration
 * partners) carry their own updatedAt field instead.
 */
const STATIC_PAGE_UPDATED_AT: Record<string, string> = {
  '/': '2026-09-13',
  '/demo': '2026-06-11',
  '/download': '2026-05-05',
  '/products': '2026-05-09',
  '/for': '2026-04-19',
  '/integrations': '2026-06-23',
  '/objections': '2026-09-13',
  '/glossary': '2026-04-19',
  '/tools/prospecting-calculator': '2026-10-04',
  '/why-sayso': '2026-07-15',
  '/differences': '2026-10-12',
  '/pricing': '2026-10-12',
  '/about': '2026-10-04',
  '/security': '2026-10-04',
  '/contact': '2026-06-14',
  '/referral': '2026-10-04',
  '/affiliate': '2026-10-04',
};

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
  if (path.startsWith('/integrations')) return 0.7;
  if (path.startsWith('/objections')) return 0.7;
  if (path.startsWith('/glossary')) return 0.5;
  return 0.6;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPostsMeta();
  const newestPostUpdatedAt = posts.reduce(
    (newest, post) => (post.updatedAt > newest ? post.updatedAt : newest),
    '',
  );

  // Content entry pages, listed from their loaders so new entries (including new
  // integration partners) enter the sitemap automatically.
  const contentSections: { entries: { slug: string; updatedAt: string }[]; prefix: string; priority: number }[] = [
    { entries: getAllGlossaryEntries(), prefix: '/glossary', priority: 0.5 },
    { entries: getAllObjectionEntries(), prefix: '/objections', priority: 0.7 },
    { entries: getAllProductEntries(), prefix: '/products', priority: 0.7 },
    { entries: getAllPartnerIntegrations(), prefix: '/integrations/partners', priority: 0.7 },
    { entries: getAllUseCaseEntries(), prefix: '/for', priority: 0.7 },
    // { entries: getAllCaseStudyEntries(), prefix: '/case-studies', priority: 0.7 }, // TODO: re-enable when first real case study is published
  ];
  const contentPaths = new Set(
    contentSections.flatMap(({ entries, prefix }) => entries.map((entry) => `${prefix}/${entry.slug}`)),
  );

  // Static pages: everything registered in the nav, plus homepage, demo and download.
  const navHrefs = getAllNavHrefs();
  const allStaticPaths = new Set(['/', '/demo', '/download', ...navHrefs]);

  // Skip excluded paths and the child pages the content loaders already list
  // (persona, product and partner pages are registered in the nav too).
  const staticPages: MetadataRoute.Sitemap = Array.from(allStaticPaths)
    .filter((path) => !EXCLUDED_PATHS.has(path) && !contentPaths.has(path))
    .map((path) => {
      const updatedAt = path === '/blog' ? newestPostUpdatedAt : STATIC_PAGE_UPDATED_AT[path];
      if (!updatedAt) {
        throw new Error(`Sitemap: add a date for "${path}" to STATIC_PAGE_UPDATED_AT in app/sitemap.ts`);
      }
      return {
        url: `${siteUrl}${path.replace(/\/?$/, '/')}`,
        lastModified: new Date(updatedAt),
        changeFrequency: 'weekly' as const,
        priority: getPriority(path),
      };
    });

  // Blog post pages
  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}/`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: post.type === 'pillar' ? 0.9 : post.type === 'supporting' ? 0.7 : 0.6,
  }));

  // Blog category pages are intentionally omitted: they are noindex, so submitting
  // them in the sitemap sends Google a conflicting signal and wastes crawl budget.
  // Their internal (follow) links still let crawlers discover the posts.

  const contentPages: MetadataRoute.Sitemap = contentSections.flatMap(({ entries, prefix, priority }) =>
    entries.map((entry) => ({
      url: `${siteUrl}${prefix}/${entry.slug}/`,
      lastModified: new Date(entry.updatedAt),
      changeFrequency: 'weekly' as const,
      priority,
    })),
  );

  return [...staticPages, ...blogPages, ...contentPages];
}
