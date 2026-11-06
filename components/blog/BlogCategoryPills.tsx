'use client';

import Link from 'next/link';

interface Category {
  slug: string;
  name: string;
  count: number;
}

interface BlogCategoryPillsProps {
  categories: Category[];
  activeCategory?: string;
}

export function BlogCategoryPills({ categories, activeCategory }: BlogCategoryPillsProps) {
  const allActive = !activeCategory;

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-6">
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        <Link
          href="/blog"
          className={`shrink-0 px-4 py-2 rounded-full font-semibold text-sm transition-shadow ${
            allActive
              ? 'bg-[#2367EE] text-white shadow-[0_0_0_1px_#2367EE]'
              : 'bg-white text-[#10233A] shadow-[0_0_0_1px_rgba(16,35,58,0.12)] hover:shadow-[0_0_0_1px_rgba(16,35,58,0.24)]'
          }`}
        >
          All
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/blog/category/${cat.slug}`}
            className={`shrink-0 px-4 py-2 rounded-full font-semibold text-sm transition-shadow ${
              activeCategory === cat.slug
                ? 'bg-[#2367EE] text-white shadow-[0_0_0_1px_#2367EE]'
                : 'bg-white text-[#10233A] shadow-[0_0_0_1px_rgba(16,35,58,0.12)] hover:shadow-[0_0_0_1px_rgba(16,35,58,0.24)]'
            }`}
          >
            {cat.name} ({cat.count})
          </Link>
        ))}
      </div>
    </div>
  );
}
