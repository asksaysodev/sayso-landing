/**
 * Desktop Compare table: the needs down the left, one column per method, a
 * yes / no / partly mark in each cell. Sayso's column is navy. Phones get the
 * swipe cards (MethodCard) instead.
 */
import { cx } from '@/lib/utils/cx';
import { SaysoLogo } from './SaysoLogo';
import type { CompareMethod } from '../data';
import { MARK_TEXT, markClass } from './marks';

export function CompareTable({ methods }: { methods: CompareMethod[] }) {
  const needs = methods[0].rows.map((row) => row.label);

  return (
    <div className="overflow-hidden rounded-[20px] bg-white shadow-[0_0_0_1px_rgba(16,35,58,0.12),0_14px_34px_-18px_rgba(16,35,58,0.28)]">
      <table className="w-full table-fixed border-collapse text-left">
        <caption className="sr-only">How Sayso compares with role-play, call reviews and printed scripts</caption>
        <colgroup>
          <col className="w-[34%]" />
          {methods.map((m) => (
            <col key={m.name} />
          ))}
        </colgroup>
        <thead>
          <tr>
            <td className="p-5" />
            {methods.map((m) => (
              <th
                key={m.name}
                scope="col"
                className={cx('px-4 pb-4 pt-5 text-center align-bottom', m.highlight && 'bg-[#1D4871] text-white')}
              >
                {m.highlight ? (
                  <SaysoLogo className="mx-auto block h-[30px] w-auto" />
                ) : (
                  <span className="block font-hero text-lg font-bold text-[#10233A]">{m.name}</span>
                )}
                <span
                  className={cx(
                    'mt-1.5 inline-block rounded-full px-2.5 py-[3px] text-xs font-semibold',
                    m.highlight ? 'bg-[#FFDE59] text-[#1D4871]' : 'bg-[#F4F4F5] text-[#556B86]',
                  )}
                >
                  {m.when}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {needs.map((need, r) => (
            <tr key={need} className="border-t border-[rgba(29,72,113,0.1)]">
              <th scope="row" className="px-5 py-3.5 text-[15px] font-semibold text-[#10233A]">
                {need}
              </th>
              {methods.map((m) => {
                const mark = m.rows[r].mark;
                return (
                  <td key={m.name} className={cx('px-4 py-3.5 text-center', m.highlight && 'bg-[#1D4871]')}>
                    <i
                      aria-hidden="true"
                      className={cx(
                        'mx-auto grid h-[26px] w-[26px] place-items-center rounded-full text-[13px] font-extrabold not-italic',
                        markClass(mark, !!m.highlight),
                      )}
                    >
                      {MARK_TEXT[mark].icon}
                    </i>
                    <span className="sr-only">{MARK_TEXT[mark].sr}</span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
