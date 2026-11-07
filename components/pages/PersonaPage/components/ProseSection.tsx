/** An H2 followed by paragraphs (inline [text](/url/) links allowed), used for the persona page's story sections. */
import type { ReactNode } from 'react';
import { body, h2 } from '@/components/pages/contentStyles';
import { renderInlineMarkdown } from '@/lib/utils/render-inline-markdown';

interface ProseSectionProps {
  heading: string;
  paragraphs: string[];
  children?: ReactNode;
}

export function ProseSection({ heading, paragraphs, children }: ProseSectionProps) {
  return (
    <>
      <h2 className={`${h2} mb-4 mt-10`}>{heading}</h2>
      {paragraphs.map((paragraph, i) => (
        <p key={i} className={`${body} mb-5`}>
          {renderInlineMarkdown(paragraph)}
        </p>
      ))}
      {children}
    </>
  );
}
