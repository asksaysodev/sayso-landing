/**
 * Pill strip above the homepage navbar announcing Sayso for teams. Opens the
 * Calendly demo page in a new tab.
 */
import { NewTag } from './HomeShared/NewTag';
import { focusRing, wrap } from './HomeShared/styles';

export function HomeTopStrip() {
  return (
    <div className={`${wrap} pt-3`}>
      <a
        href="https://calendly.com/asksayso/demo"
        target="_blank"
        rel="noopener noreferrer"
        data-analytics-id="cta-book-demo-top-strip"
        className={`mx-auto flex w-max max-w-full items-center gap-2.5 rounded-full border-[1.5px] border-[rgba(29,72,113,0.14)] bg-white py-[5px] pl-1.5 pr-3.5 text-[12.5px] text-[#556B86] hover:border-[#1D4871] min-[641px]:text-[13.5px] ${focusRing}`}
      >
        <NewTag />
        <span>
          Sayso for teams: <b className="text-[#1D4871]">see the team platform</b> &rsaquo;
        </span>
      </a>
    </div>
  );
}
