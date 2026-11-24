import { generateBreadcrumbJsonLd } from '@/lib/seo/schema';

/**
 * BreadcrumbList JSON-LD for pages without a visible breadcrumb row (top-level
 * marketing pages). Pages with <Breadcrumb> already emit their own.
 */
export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbJsonLd(items)) }}
    />
  );
}
