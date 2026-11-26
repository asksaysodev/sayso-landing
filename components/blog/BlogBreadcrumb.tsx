import { Breadcrumb } from '@/components/ui/Breadcrumb';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BlogBreadcrumbProps {
  items: BreadcrumbItem[];
}

export function BlogBreadcrumb({ items }: BlogBreadcrumbProps) {
  // The post template outputs BreadcrumbList JSON-LD itself, so the visible
  // breadcrumb skips its own copy.
  return <Breadcrumb items={items} jsonLd={false} />;
}
