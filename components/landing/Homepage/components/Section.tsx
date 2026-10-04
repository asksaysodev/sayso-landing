/**
 * Standard homepage section: vertical rhythm, optional alternate background,
 * centered container, and an optional centered heading with lead copy.
 */

import type { ReactNode } from 'react';

type SectionProps = {
  id: string;
  title?: string;
  lead?: string;
  alt?: boolean;
  children?: ReactNode;
};

export function Section({ id, title, lead, alt = false, children }: SectionProps) {
  return (
    <section
      id={id}
      className={`py-16 md:py-24 ${alt ? 'bg-[#F7F8FA] border-y border-accent-bg' : ''}`}
    >
      <div className="max-w-[1180px] mx-auto px-4 md:px-6">
        {title && (
          <div className={`max-w-3xl mx-auto text-center ${children ? 'mb-6 md:mb-12' : ''}`}>
            <h2 className="font-comic text-3xl md:text-4xl lg:text-5xl tracking-wide text-primary text-balance">
              {title}
            </h2>
            {lead && (
              <p className="mt-4 md:mt-6 text-lg md:text-xl text-[#515C6C] text-balance">{lead}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
