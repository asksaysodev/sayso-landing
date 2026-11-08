import Link from 'next/link';

interface Category {
  slug: string;
  name: string;
  count: number;
}

/** Pill classes shared by the category links here and the in-place filters on /blog. */
export function blogPillClass(active: boolean) {
  return `shrink-0 rounded-full px-4 py-2 font-sans text-sm font-semibold transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2367EE] focus-visible:ring-offset-2 ${
    active
      ? 'bg-[#2367EE] text-white shadow-[0_0_0_1px_#2367EE]'
      : 'bg-white text-[#10233A] shadow-[0_0_0_1px_rgba(16,35,58,0.12)] hover:shadow-[0_0_0_1px_rgba(16,35,58,0.24)]'
  }`;
}

/**
 * Pill row container. Scrolls sideways on phones and wraps centered from md up.
 * The inner padding keeps rings and focus outlines from being clipped by the
 * scroll container.
 */
export const blogPillRowClass =
  'scrollbar-hide -mx-6 flex gap-3 overflow-x-auto px-6 py-2 md:mx-0 md:flex-wrap md:justify-center md:overflow-visible md:px-0';

interface BlogCategoryPillsProps {
  categories: Category[];
  activeCategory?: string;
}

/** Category links for the /blog/category/* pages. Links keep the scroll position. */
export function BlogCategoryPills({ categories, activeCategory }: BlogCategoryPillsProps) {
  return (
    <nav aria-label="Blog categories" className="mx-auto max-w-[1200px] px-6 pb-6">
      <div className={blogPillRowClass}>
        <Link href="/blog/" scroll={false} className={blogPillClass(!activeCategory)}>
          All
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/blog/category/${cat.slug}/`}
            scroll={false}
            aria-current={activeCategory === cat.slug ? 'page' : undefined}
            className={blogPillClass(activeCategory === cat.slug)}
          >
            {cat.name} ({cat.count})
          </Link>
        ))}
      </div>
    </nav>
  );
}
