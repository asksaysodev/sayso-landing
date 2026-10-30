/**
 * BlogCtaCard: the navy-to-blue gradient card shared by the blog's call-to-action blocks
 * (BlogInArticleCTA and BlogInlineCTA). Holds the visual shell only; each CTA supplies its content.
 */
import type { ReactNode } from 'react';

interface BlogCtaCardProps {
  as?: 'div' | 'aside';
  children: ReactNode;
}

export function BlogCtaCard({ as: Tag = 'div', children }: BlogCtaCardProps) {
  return (
    <Tag className="my-10 bg-gradient-to-r from-[#1D4871] to-[#2367EE] rounded-2xl border-2 border-[#1D4871] v2-comic-shadow overflow-hidden">
      {children}
    </Tag>
  );
}
