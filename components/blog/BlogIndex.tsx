'use client';

/**
 * /blog post list: category filter, sort, search and pagination, all in place.
 * State changes update the list and rewrite the URL with
 * history.replaceState, so the page never scrolls to the top and every view
 * stays shareable (/blog/?category=…&sort=…&q=…&page=…).
 */
import { useMemo, useRef, useState } from 'react';
import { PageHeader } from '@/components/pages/PageHeader';
import { BlogPostCard, type BlogCardPost } from './BlogPostCard';
import { BlogSearchForm } from './BlogSearchForm';
import { blogPillClass, blogPillRowClass } from './BlogCategoryPills';

export type BlogSort = 'newest' | 'oldest' | 'quickest';

export interface BlogIndexPost extends BlogCardPost {
  category: string;
  tags: string[];
}

interface BlogIndexProps {
  posts: BlogIndexPost[];
  categories: { slug: string; name: string; count: number }[];
  initialCategory?: string;
  initialSort?: BlogSort;
  initialQuery?: string;
  initialPage?: number;
  pageSize: number;
}

const SORTS: { value: BlogSort; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'quickest', label: 'Quickest read' },
];

function buildUrl(category: string, sort: BlogSort, query: string, page: number) {
  const params = new URLSearchParams();
  if (category) params.set('category', category);
  if (sort !== 'newest') params.set('sort', sort);
  if (query) params.set('q', query);
  if (page > 1) params.set('page', String(page));
  const qs = params.toString();
  return `/blog/${qs ? `?${qs}` : ''}`;
}

/** Let modified or non-primary clicks (new tab, new window) fall through to the href. */
function isPlainLeftClick(e: React.MouseEvent) {
  return e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey;
}

export function BlogIndex({
  posts,
  categories,
  initialCategory = '',
  initialSort = 'newest',
  initialQuery = '',
  initialPage = 1,
  pageSize,
}: BlogIndexProps) {
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState<BlogSort>(initialSort);
  const [query, setQuery] = useState(initialQuery);
  const [page, setPage] = useState(initialPage);
  const listRef = useRef<HTMLElement>(null);

  const visible = useMemo(() => {
    const q = query.toLowerCase();
    const filtered = posts.filter(
      (p) =>
        (!category || p.category === category) &&
        (!q ||
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))),
    );
    const time = (p: BlogIndexPost) => new Date(p.publishedAt).getTime();
    return [...filtered].sort((a, b) => {
      if (sort === 'oldest') return time(a) - time(b);
      if (sort === 'quickest') return a.readingTime - b.readingTime || time(b) - time(a);
      return time(b) - time(a);
    });
  }, [posts, category, sort, query]);

  const totalPages = Math.max(1, Math.ceil(visible.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pagePosts = visible.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  function update(next: { category?: string; sort?: BlogSort; query?: string; page?: number }) {
    const c = next.category ?? category;
    const s = next.sort ?? sort;
    const q = next.query ?? query;
    // Any filter change starts again at page 1.
    const p = next.page ?? 1;
    setCategory(c);
    setSort(s);
    setQuery(q);
    setPage(p);
    window.history.replaceState(window.history.state, '', buildUrl(c, s, q, p));
  }

  function goToPage(p: number) {
    update({ page: p });
    // Bring the top of the list into view only when it is above the viewport.
    const top = listRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 0) listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Blog' }]}
        title="Sayso Blog"
        intro="Expert insights on prospecting, objection handling, and appointment booking for real estate agents and teams."
      >
        <BlogSearchForm initialQuery={initialQuery} onSearch={(q) => update({ query: q })} />
      </PageHeader>

      <div className="mx-auto max-w-[1200px] px-6 pb-6">
        <div role="group" aria-label="Filter posts by category" className={blogPillRowClass}>
          <button type="button" aria-pressed={!category} onClick={() => update({ category: '' })} className={blogPillClass(!category)}>
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              aria-pressed={category === cat.slug}
              onClick={() => update({ category: cat.slug })}
              className={blogPillClass(category === cat.slug)}
            >
              {cat.name} ({cat.count})
            </button>
          ))}
        </div>

        <div className="mt-3 flex justify-center">
          <div
            role="group"
            aria-label="Sort posts"
            className="inline-flex rounded-full bg-white p-1 shadow-[0_0_0_1px_rgba(16,35,58,0.12)]"
          >
            {SORTS.map((option) => (
              <button
                key={option.value}
                type="button"
                aria-pressed={sort === option.value}
                onClick={() => update({ sort: option.value })}
                className={`whitespace-nowrap rounded-full px-3.5 py-1.5 font-sans text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2367EE] ${
                  sort === option.value ? 'bg-[#10233A] text-white' : 'text-[#1D4871]/70 hover:text-[#10233A]'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section ref={listRef} aria-label="Blog posts" className="mx-auto max-w-[1200px] scroll-mt-24 px-6 pb-4">
        <p className="sr-only" role="status" aria-live="polite">
          {visible.length === 1 ? '1 post' : `${visible.length} posts`}
          {query ? ` for “${query}”` : ''}
        </p>
        {query && (
          <p className="mb-4 font-sans text-sm text-[#1D4871]/60">
            Showing results for &ldquo;{query}&rdquo;
          </p>
        )}
        <h2 className="sr-only">Posts</h2>
        {pagePosts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pagePosts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="font-sans text-lg text-[#1D4871]/60">No posts found.</p>
          </div>
        )}
      </section>

      {totalPages > 1 && (
        <nav className="mx-auto max-w-[1200px] px-6 py-8" aria-label="Blog pagination">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {currentPage > 1 && (
              <a
                href={buildUrl(category, sort, query, currentPage - 1)}
                onClick={(e) => {
                  if (!isPlainLeftClick(e)) return;
                  e.preventDefault();
                  goToPage(currentPage - 1);
                }}
                className={blogPillClass(false)}
              >
                &larr; Prev
              </a>
            )}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <a
                key={p}
                href={buildUrl(category, sort, query, p)}
                aria-current={p === currentPage ? 'page' : undefined}
                onClick={(e) => {
                  if (!isPlainLeftClick(e)) return;
                  e.preventDefault();
                  goToPage(p);
                }}
                className={`flex h-10 w-10 items-center justify-center ${blogPillClass(p === currentPage)} !px-0 !py-0`}
              >
                {p}
              </a>
            ))}
            {currentPage < totalPages && (
              <a
                href={buildUrl(category, sort, query, currentPage + 1)}
                onClick={(e) => {
                  if (!isPlainLeftClick(e)) return;
                  e.preventDefault();
                  goToPage(currentPage + 1);
                }}
                className={blogPillClass(false)}
              >
                Next &rarr;
              </a>
            )}
          </div>
        </nav>
      )}
    </>
  );
}
