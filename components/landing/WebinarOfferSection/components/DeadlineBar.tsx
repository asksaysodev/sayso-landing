/**
 * Sticky deadline bar at the very top of the page: the Friday 5:00 PM PT cutoff,
 * a live countdown, and a claim button (hidden on mobile, where the fixed bottom
 * bar carries the CTA instead).
 */

import { Countdown } from './Countdown';
import { ClaimButton } from './ClaimButton';

export function DeadlineBar() {
  return (
    <div
      role="status"
      className="sticky top-0 z-50 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 bg-[#1D4871] px-4 py-2.5 text-white shadow-[0_8px_20px_-12px_rgba(16,35,58,0.45)]"
    >
      <span className="text-sm md:text-[15px]">
        Webinar pricing ends{' '}
        <b className="italic text-[#FFDE59]">Friday 5:00 PM PT</b>
      </span>
      <Countdown size="sm" />
      <div className="hidden sm:block">
        <ClaimButton variant="mini" />
      </div>
    </div>
  );
}
