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
}

export function SectionHead({ eyebrow, title, id }: SectionHeadProps) {
  return (
    <div className="mx-auto mb-12 max-w-[740px] text-center">
      {eyebrow && <span className={eyebrowClass}>{eyebrow}</span>}
      <h2
        id={id}
        className="mt-[18px] text-balance font-hero text-[clamp(30px,4.5vw,46px)] font-extrabold leading-[1.1] tracking-[-0.03em] text-[#10233A]"
      >
        {title}
      </h2>
    </div>
  );
}
