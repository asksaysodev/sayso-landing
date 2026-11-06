/**
 * Sidebar of product tabs in the Features panel. Arrow keys move between
 * tabs (roving tabindex). Two-by-two grid on mobile, a column on desktop.
 */
import { useRef, type KeyboardEvent } from 'react';
import { BoltIcon, CheckIcon, ListIcon, SearchIcon } from '@/components/SaysoWidget/components/icons';
import { cx } from '@/lib/utils/cx';
import { FEATURES, type FeatureIcon } from '../data';

const ICONS: Record<FeatureIcon, JSX.Element> = {
  bolt: <BoltIcon />,
  check: <CheckIcon />,
  search: <SearchIcon color="#fff" />,
  list: <ListIcon />,
};

interface FeatureTabsProps {
  active: number;
  onSelect: (index: number) => void;
}

export function FeatureTabs({ active, onSelect }: FeatureTabsProps) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: KeyboardEvent) => {
    const delta = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (active + delta + FEATURES.length) % FEATURES.length;
    onSelect(next);
    refs.current[next]?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label="Sayso products"
      className="grid grid-cols-2 gap-2 px-3 pt-3 min-[961px]:flex min-[961px]:flex-col min-[961px]:py-5 min-[961px]:pl-5 min-[961px]:pr-0"
      onKeyDown={onKeyDown}
    >
      {FEATURES.map((f, i) => {
        const selected = i === active;
        return (
          <button
            key={f.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`feature-tab-${f.id}`}
            aria-selected={selected}
            aria-controls="feature-panel"
            tabIndex={selected ? 0 : -1}
            onClick={() => onSelect(i)}
            className={cx(
              'grid h-[50px] grid-cols-[28px_1fr] items-center gap-[9px] rounded-xl px-2.5 py-2 text-left transition-colors focus:outline-none focus-visible:ring-[3px] focus-visible:ring-[#FFDE59] min-[961px]:h-[72px] min-[961px]:grid-cols-[36px_1fr] min-[961px]:gap-3 min-[961px]:rounded-[14px] min-[961px]:px-3',
              selected
                ? 'bg-[rgba(35,103,238,0.18)] text-white shadow-[inset_0_0_0_1px_rgba(35,103,238,0.55)]'
                : 'text-[rgba(244,244,245,0.68)] hover:bg-white/5 hover:text-white',
            )}
          >
            <span
              className={cx(
                'grid h-7 w-7 place-items-center rounded-full [&_svg]:h-[15px] [&_svg]:w-[15px] min-[961px]:h-9 min-[961px]:w-9 min-[961px]:[&_svg]:h-auto min-[961px]:[&_svg]:w-auto',
                selected ? 'bg-[#2367EE]' : 'bg-[#2B4A6D]',
              )}
            >
              {ICONS[f.icon]}
            </span>
            <span>
              <b className="block whitespace-nowrap text-sm font-semibold min-[961px]:text-[15px]">{f.name}</b>
              <small className="hidden text-xs leading-[1.35] text-[rgba(244,244,245,0.68)] min-[961px]:block">{f.sub}</small>
            </span>
          </button>
        );
      })}
    </div>
  );
}
