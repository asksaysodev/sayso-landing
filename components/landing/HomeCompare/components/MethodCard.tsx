/** One Compare card (phones and tablets; desktop shows CompareTable): a method, when it helps, and a yes / no / partly list. Sayso's card is navy. */
import { cx } from '@/lib/utils/cx';
import { SaysoLogo } from './SaysoLogo';
import type { CompareMethod } from '../data';
import { MARK_TEXT, markClass } from './marks';

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
        <h3 className={us ? undefined : 'font-hero text-lg font-bold'}>{us ? <SaysoLogo className="block h-7 w-auto" /> : method.name}</h3>
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
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}
