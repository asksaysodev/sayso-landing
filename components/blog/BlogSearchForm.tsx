'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface BlogSearchFormProps {
  initialQuery?: string;
  /** Search in place. Without it the form opens /blog/?q=… */
  onSearch?: (query: string) => void;
}

export function BlogSearchForm({ initialQuery = '', onSearch }: BlogSearchFormProps) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (onSearch) {
      onSearch(trimmed);
      return;
    }
    if (trimmed) router.push(`/blog/?q=${encodeURIComponent(trimmed)}`);
  }

  return (
    <form onSubmit={handleSearch} role="search" className="relative mx-auto max-w-md">
      <input
        type="search"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          // Emptying the field (typing, Escape or the native clear button) resets in-place results.
          if (onSearch && e.target.value === '') onSearch('');
        }}
        placeholder="Search articles..."
        aria-label="Search articles"
        className="w-full rounded-full bg-white px-5 py-3 pl-12 font-sans text-body text-[#10233A] placeholder-[#1D4871]/40 shadow-[0_0_0_1px_rgba(16,35,58,0.12),0_8px_20px_-12px_rgba(16,35,58,0.22)] transition-shadow focus:outline-none focus:ring-2 focus:ring-[#2367EE]"
      />
      <svg
        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1D4871]/40"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    </form>
  );
}
