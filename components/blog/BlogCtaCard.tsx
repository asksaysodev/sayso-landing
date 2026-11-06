/**
 * BlogCtaCard: the navy card shared by the blog's call-to-action blocks
 * (BlogInArticleCTA and BlogInlineCTA). Holds the visual shell only; each CTA supplies its content.
 */
import type { ReactNode } from 'react';

interface BlogCtaCardProps {
  as?: 'div' | 'aside';
  children: ReactNode;
}

export function BlogCtaCard({ as: Tag = 'div', children }: BlogCtaCardProps) {
  return (
    <Tag className="my-10 bg-[#1D4871] rounded-[20px] shadow-[0_1px_2px_rgba(16,35,58,0.1),0_18px_40px_-18px_rgba(16,35,58,0.55)] overflow-hidden">
      {children}
    </Tag>
  );
}
