'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BlogHeroBackground } from './BlogHeroBackground';

interface BlogHeroBannerProps {
  title?: string;
  subtitle?: string;
  heroImage?: string;
}

export function BlogHeroBanner({
  title = 'The Sayso Blog',
  subtitle = 'Expert insights on prospecting, objection handling, and appointment booking for real estate agents and teams.',
  heroImage = '/blog/covers/blog-hero.jpg',
}: BlogHeroBannerProps) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/blog?q=${encodeURIComponent(query.trim())}`);
    }
  }

  return (
    <section className="relative bg-[#F4F4F5] overflow-hidden">
      <BlogHeroBackground src={heroImage} />
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-16 md:py-20 text-center">
        <h1 className="font-hero font-extrabold tracking-[-0.03em] text-[#10233A] leading-[1.08] text-4xl md:text-5xl lg:text-6xl mb-4">
          {title}
        </h1>
        <p className="text-base md:text-lg text-[#1D4871]/70 max-w-xl mx-auto mb-8">
          {subtitle}
        </p>
        <form onSubmit={handleSearch} className="max-w-md mx-auto relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles..."
            className="w-full px-5 py-3 pl-12 rounded-full bg-white text-[#10233A] placeholder-[#1D4871]/40 font-sans text-body shadow-[0_0_0_1px_rgba(16,35,58,0.12),0_8px_20px_-12px_rgba(16,35,58,0.22)] focus:outline-none focus:ring-2 focus:ring-[#2367EE] transition-shadow"
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
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </form>
      </div>
    </section>
  );
}
