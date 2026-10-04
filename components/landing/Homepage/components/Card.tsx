/**
 * Bordered content card used across the homepage card grids.
 */

import type { ReactNode } from 'react';

type CardProps = {
  className?: string;
  children: ReactNode;
};

export function Card({ className = '', children }: CardProps) {
  return (
    <article
      className={`flex h-full flex-col rounded-2xl border-2 border-primary bg-white p-5 md:p-7 focus-within:outline focus-within:outline-[3px] focus-within:outline-offset-[3px] focus-within:outline-cta ${className}`}
    >
      {children}
    </article>
  );
}
