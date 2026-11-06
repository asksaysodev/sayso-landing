'use client';

import { useEffect, useState } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface BlogTableOfContentsProps {
  content: string;
}

function extractHeadings(mdxContent: string): TocItem[] {
  const headings: TocItem[] = [];
  const lines = mdxContent.split('\n');

  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].replace(/\*\*/g, '').replace(/\*/g, '');
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-');
      headings.push({ id, text, level });
    }
  }

  return headings;
}

export function BlogTableOfContents({ content }: BlogTableOfContentsProps) {
  const headings = extractHeadings(content);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -80% 0px' }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl p-5 shadow-[0_0_0_1px_rgba(16,35,58,0.12),0_14px_34px_-16px_rgba(16,35,58,0.25)]">
      <h4 className="font-hero text-sm text-[#1D4871] mb-3 uppercase tracking-wide">
        On this page
      </h4>
      <hr className="border-[#D7DEE1] mb-3" />
      <nav aria-label="Table of contents">
        <ul className="space-y-1.5">
          {headings.map((heading) => (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                className={`block text-sm font-sans transition-colors py-0.5 ${
                  heading.level === 3 ? 'pl-4' : ''
                } ${
                  activeId === heading.id
                    ? 'text-[#2367EE] font-bold'
                    : 'text-[#1D4871]/60 hover:text-[#1D4871]'
                }`}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
