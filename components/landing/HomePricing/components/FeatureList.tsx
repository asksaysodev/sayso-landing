'use client';

/**
 * Checkmark list of what a pricing plan includes. Below 961px only the first
 * `phoneCount` items show, with a "See everything included" button for the rest,
 * so both plans and their buttons fit on about one phone screen.
 */
import { useId, useState, type ReactNode } from 'react';
import { focusRing } from '../../HomeShared/styles';

function Check() {
  return (
    <span aria-hidden="true" className="mt-0.5 grid h-[18px] w-[18px] place-items-center rounded-full bg-[#2367EE]">
      <svg width="12" height="12" viewBox="0 0 16 16">
        <path d="M4 8.5l2.5 2.5L12 5.5" stroke="white" strokeWidth="2" fill="none" />
      </svg>
    </span>
  );
}

interface FeatureListProps {
  items: ReactNode[];
  inverted?: boolean;
  /** Items shown on phones before "See everything included". Default 3. */
  phoneCount?: number;
}

export function FeatureList({ items, inverted = false, phoneCount = 3 }: FeatureListProps) {
  const [expanded, setExpanded] = useState(false);
  const listId = useId();
  const hasMore = items.length > phoneCount;

  return (
    <div className="mb-5 mt-4 flex-1 min-[961px]:mb-6 min-[961px]:mt-[22px]">
      <ul id={listId} className="grid content-start gap-2.5">
        {items.map((item, i) => (
          <li
            key={i}
            className={`grid-cols-[20px_1fr] gap-2.5 text-[15px] ${inverted ? 'text-white/85' : ''} ${
              i >= phoneCount && !expanded ? 'hidden min-[961px]:grid' : 'grid'
            }`}
          >
            <Check />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {hasMore && (
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={listId}
          onClick={() => setExpanded((v) => !v)}
          className={`mt-3 rounded text-sm font-bold underline-offset-2 hover:underline min-[961px]:hidden ${focusRing} ${
            inverted ? 'text-white' : 'text-[#2367EE]'
          }`}
        >
          {expanded ? 'Show less' : 'See everything included'}
        </button>
      )}
    </div>
  );
}
