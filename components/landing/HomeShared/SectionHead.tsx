/**
 * Centered section header: optional yellow label, a Manrope headline and an
 * optional intro line.
 */
import type { ReactNode } from 'react';
import { eyebrow as eyebrowClass } from './styles';

interface SectionHeadProps {
  eyebrow?: string;
  title: ReactNode;
  id?: string;
  /** Heading level. Default `h2`; a page that opens with this header passes `h1`. */
  as?: 'h1' | 'h2';
}

export function SectionHead({ eyebrow, title, id, as: Heading = 'h2' }: SectionHeadProps) {
  return (
    <div className="mx-auto mb-12 max-w-[740px] text-center">
      {eyebrow && <span className={eyebrowClass}>{eyebrow}</span>}
      <Heading
        id={id}
        className="mt-[18px] text-balance font-hero text-[clamp(30px,4.5vw,46px)] font-extrabold leading-[1.1] tracking-[-0.03em] text-[#10233A]"
      >
        {title}
      </Heading>
    </div>
  );
}
