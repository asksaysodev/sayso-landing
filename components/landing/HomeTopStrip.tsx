'use client';

/**
 * Pill strip above the homepage navbar announcing Sayso for teams. Opens the
 * same Calendly demo pop-up as every other Book a demo button.
 */
import { useDemoCalendar } from '@/app/context/landing/DemoCalendarContext';
import { NewTag } from './HomeShared/NewTag';
import { focusRing, wrap } from './HomeShared/styles';

export function HomeTopStrip() {
  const { openDemoCalendar } = useDemoCalendar();

  return (
    <div className={`${wrap} pt-3`}>
      <button
        type="button"
        onClick={openDemoCalendar}
        data-analytics-id="cta-team-platform-strip"
        className={`mx-auto flex w-max max-w-full items-center gap-2.5 rounded-full border-[1.5px] border-[rgba(29,72,113,0.14)] bg-white py-[5px] pl-1.5 pr-3.5 text-[12.5px] text-[#556B86] hover:border-[#1D4871] min-[641px]:text-[13.5px] ${focusRing}`}
      >
        <NewTag />
        <span>
          Sayso for teams: <b className="text-[#1D4871]">see the team platform</b> &rsaquo;
        </span>
      </button>
    </div>
  );
}
