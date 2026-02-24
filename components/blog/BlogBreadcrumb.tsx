import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BlogBreadcrumbProps {
  items: BreadcrumbItem[];
}

export function BlogBreadcrumb({ items }: BlogBreadcrumbProps) {
  return (
    <nav className="max-w-[1200px] mx-auto px-6 pt-6" aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 text-sm font-sans flex-wrap">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {index > 0 && (
              <ChevronRight size={14} strokeWidth={2} className="text-[#1D4871]/30" />
            )}
            {item.href ? (
              <Link href={item.href} className="text-[#2367EE] hover:underline">
                {item.label}
              </Link>
            ) : (
              <span className="text-[#1D4871]/70">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
