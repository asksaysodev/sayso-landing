import Link from 'next/link';

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string;
}

export function BlogPagination({ currentPage, totalPages, basePath = '/blog' }: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  const pages: (number | '...')[] = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push('...');
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push('...');
    pages.push(totalPages);
  }

  function getHref(page: number) {
    return page === 1 ? basePath : `${basePath}?page=${page}`;
  }

  return (
    <nav className="max-w-[1200px] mx-auto px-6 py-8" aria-label="Blog pagination">
      <div className="flex items-center justify-center gap-2">
        {currentPage > 1 && (
          <Link
            href={getHref(currentPage - 1)}
            className="px-4 py-2 rounded-full font-semibold text-sm transition-shadow bg-white text-[#10233A] shadow-[0_0_0_1px_rgba(16,35,58,0.12)] hover:shadow-[0_0_0_1px_rgba(16,35,58,0.24)]"
          >
            &larr; Prev
          </Link>
        )}

        {pages.map((page, i) =>
          page === '...' ? (
            <span key={`dots-${i}`} className="px-2 text-[#1D4871]/50">
              ...
            </span>
          ) : (
            <Link
              key={page}
              href={getHref(page)}
              className={`w-10 h-10 flex items-center justify-center rounded-full font-semibold text-sm transition-shadow ${
                page === currentPage
                  ? 'bg-[#2367EE] text-white shadow-[0_0_0_1px_#2367EE]'
                  : 'bg-white text-[#10233A] shadow-[0_0_0_1px_rgba(16,35,58,0.12)] hover:shadow-[0_0_0_1px_rgba(16,35,58,0.24)]'
              }`}
            >
              {page}
            </Link>
          )
        )}

        {currentPage < totalPages && (
          <Link
            href={getHref(currentPage + 1)}
            className="px-4 py-2 rounded-full font-semibold text-sm transition-shadow bg-white text-[#10233A] shadow-[0_0_0_1px_rgba(16,35,58,0.12)] hover:shadow-[0_0_0_1px_rgba(16,35,58,0.24)]"
          >
            Next &rarr;
          </Link>
        )}
      </div>
    </nav>
  );
}
