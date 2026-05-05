import { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/feedback', '/paywall-preview', '/ui'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
