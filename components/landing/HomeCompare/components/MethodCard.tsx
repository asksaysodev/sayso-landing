/** One Compare card: a method, when it helps, and a yes / no / partly list. Sayso's card is navy. */
import { cx } from '@/lib/utils/cx';
import type { CompareMethod, Mark } from '../data';

const MARK_TEXT: Record<Mark, { icon: string; sr: string }> = {
  y: { icon: '✓', sr: 'Yes' },
  n: { icon: '✕', sr: 'No' },
  p: { icon: '~', sr: 'Partly' },
};

const markClass = (mark: Mark, us: boolean) => {
  if (mark === 'y') return us ? 'bg-[#22c06d] text-white' : 'bg-[#dcf5e8] text-[#127a45]';
  if (mark === 'n') return 'bg-[#fbe4e2] text-[#b4423c]';
  return 'bg-[#fdf1d6] text-[#9a6a06]';
};

export function MethodCard({ method }: { method: CompareMethod }) {
  const us = !!method.highlight;
  return (
    <article
      className={cx(
        'flex flex-col rounded-[18px] p-[18px]',
        us
          ? 'bg-[#1D4871] text-white shadow-[0_18px_40px_-18px_rgba(29,72,113,0.6)]'
          : 'bg-white text-[#10233A] shadow-[0_0_0_1px_rgba(16,35,58,0.12),0_14px_34px_-18px_rgba(16,35,58,0.28)]',
      )}
    >
      <header className={cx('mb-1.5 flex flex-col gap-1.5 border-b pb-3', us ? 'border-white/15' : 'border-[rgba(29,72,113,0.14)]')}>
        <h3 className={us ? 'font-comic text-2xl font-normal tracking-[0.06em]' : 'font-hero text-lg font-bold'}>{method.name}</h3>
        <span
          className={cx(
            'self-start rounded-full px-2.5 py-[3px] text-xs font-semibold',
            us ? 'bg-[#FFDE59] text-[#1D4871]' : 'bg-[#F4F4F5] text-[#556B86]',
          )}
        >
          {method.when}
        </span>
      </header>
      <ul className="grid gap-0.5">
        {method.rows.map((row) => (
          <li key={row.label} className="grid grid-cols-[22px_1fr] items-start gap-2.5 py-[7px] text-sm leading-[1.35]">
            <i aria-hidden="true" className={cx('grid h-[22px] w-[22px] place-items-center rounded-full text-xs font-extrabold not-italic', markClass(row.mark, us))}>
              {MARK_TEXT[row.mark].icon}
            </i>
            <span className={!us && row.mark === 'n' ? 'text-[#556B86]' : undefined}>
              <span className="sr-only">{MARK_TEXT[row.mark].sr}: </span>
              {row.label}
              {row.note && <small className={cx('mt-px block text-xs', us ? 'text-white/70' : 'text-[#556B86]')}>{row.note}</small>}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}
