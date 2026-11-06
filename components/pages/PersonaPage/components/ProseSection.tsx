/** An H2 followed by plain paragraphs, used for the persona page's story sections. */
import type { ReactNode } from 'react';
import { body, h2 } from '@/components/pages/contentStyles';

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
          {paragraph}
        </p>
      ))}
      {children}
    </>
  );
}
