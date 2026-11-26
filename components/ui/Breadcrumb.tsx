import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { generateBreadcrumbJsonLd } from '@/lib/seo/schema';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  /** Emit BreadcrumbList JSON-LD. Turn off when the page already outputs its own (blog posts). */
  jsonLd?: boolean;
}

export function Breadcrumb({
  items,
  className = 'max-w-[1200px] mx-auto px-6 pt-6',
  jsonLd = true,
}: BreadcrumbProps) {
  // Build JSON-LD data from items
  const jsonLdItems = items.map((item) => ({
    name: item.label,
    url: item.href || '',
  }));

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateBreadcrumbJsonLd(jsonLdItems)),
          }}
        />
      )}
      <nav className={className} aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-sm font-sans flex-wrap">
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              {index > 0 && (
                <ChevronRight
                  size={14}
                  strokeWidth={2}
                  className="text-[#1D4871]/30"
                />
              )}
              {item.href ? (
                <Link
                  href={item.href}
                  className="text-[#2367EE] hover:underline"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-[#1D4871]/70">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
