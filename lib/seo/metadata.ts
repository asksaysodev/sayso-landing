import type { Metadata } from 'next';
import { siteUrl } from '@/lib/config';

/** Open Graph fields every page should carry. A page-level `openGraph` replaces the
 *  root layout's, so pages that build their own must spread these back in. */
export const OG_DEFAULTS = {
  siteName: 'Sayso',
  images: [{ url: '/images/og-default.png', width: 1200, height: 630 }],
};

interface BuildMetadataOptions {
  /** Page title - max 60 chars recommended. Used in <title> as "[title] | Sayso" via root layout template. */
  title: string;
  /** Meta description - max 160 chars recommended. */
  description: string;
  /** URL path, e.g. "/products/cue". Used to build canonical URL. */
  path: string;
  /** Custom OG image path. Defaults to '/images/og-default.png'. */
  ogImage?: string;
  /** Set true to keep the page out of the index while still following its links (e.g. blog category pages, utility hubs). */
  noindex?: boolean;
}

export function buildMetadata({
  title,
  description,
  path,
  ogImage = '/images/og-default.png',
  noindex = false,
}: BuildMetadataOptions): Metadata {
  if (process.env.NODE_ENV === 'development') {
    if (title.length > 60) {
      console.warn(
        `[SEO] Title exceeds 60 chars (${title.length}): "${title}"`,
      );
    }
    if (description.length > 160) {
      console.warn(
        `[SEO] Description exceeds 160 chars (${description.length}): "${description.slice(0, 60)}..."`,
      );
    }
  }

  const canonicalUrl = `${siteUrl}${path.replace(/\/?$/, '/')}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: OG_DEFAULTS.siteName,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    ...(noindex && {
      robots: {
        index: false,
        follow: true,
      },
    }),
  };
}
