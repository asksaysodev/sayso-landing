import Link from 'next/link';
import type { ReactNode } from 'react';

/**
 * Lightweight inline markdown renderer for content strings.
 * Supports: [link text](/url/) syntax only.
 * Internal links (starting with /) use Next.js <Link>.
 * External links use <a target="_blank">.
 */
export function renderInlineMarkdown(text: string): ReactNode {
  // Match [text](url) patterns
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);

  if (parts.length === 1) return text;

  return parts.map((part, i) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!match) return <span key={i}>{part}</span>;

    const [, linkText, href] = match;
    const isInternal = href.startsWith('/');

    if (isInternal) {
      return (
        <Link
          key={i}
          href={href}
          className="text-[#2367EE] hover:underline font-bold"
        >
          {linkText}
        </Link>
      );
    }

    return (
      <a
        key={i}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#2367EE] hover:underline font-bold"
      >
        {linkText}
      </a>
    );
  });
}
