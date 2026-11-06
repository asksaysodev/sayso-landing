/** Checkmark list of what a pricing plan includes. */
import type { ReactNode } from 'react';

function Check() {
  return (
    <span aria-hidden="true" className="mt-0.5 grid h-[18px] w-[18px] place-items-center rounded-full bg-[#2367EE]">
      <svg width="12" height="12" viewBox="0 0 16 16">
        <path d="M4 8.5l2.5 2.5L12 5.5" stroke="white" strokeWidth="2" fill="none" />
      </svg>
    </span>
  );
}

export function FeatureList({ items, inverted = false }: { items: ReactNode[]; inverted?: boolean }) {
  return (
    <ul className="mb-6 mt-[22px] grid flex-1 content-start gap-2.5">
      {items.map((item, i) => (
        <li key={i} className={`grid grid-cols-[20px_1fr] gap-2.5 text-[15px] ${inverted ? 'text-white/85' : ''}`}>
          <Check />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
