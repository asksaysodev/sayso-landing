/**
 * Deadline resolution for the webinar offer page. Pure timezone math, no React.
 *
 * The deadline comes from a per-cohort link, `/webinar/offer?d=YYYY-MM-DD`,
 * which resolves to that date at 5:00 PM PT. Kuvaal shares a dated link per
 * webinar; the page itself never changes. A missing, past, or invalid `?d=`
 * means there is no live offer, so the page renders the expired state.
 *
 * To preview: append a future date (`?d=2026-08-01`) to see the live page, or a
 * past date (`?d=2020-01-01`) to see the expired state.
 */

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface DeadlineState {
  /** True once the client has evaluated the deadline. */
  mounted: boolean;
  /** True when there is no valid live deadline (missing/past/bad ?d=, or the timer hit zero). */
  expired: boolean;
  /** Time remaining, or null before mount / when expired. */
  timeLeft: TimeLeft | null;
}

const PT = 'America/Los_Angeles';

/**
 * How far ahead of UTC the timezone is (ms) at a given instant. Uses the
 * browser's IANA timezone database, so it is correct for both PST and PDT.
 */
function zoneOffsetMs(utcMs: number, timeZone: string): number {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hourCycle: 'h23',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).formatToParts(new Date(utcMs));
  const get = (type: string) => Number(parts.find((p) => p.type === type)!.value);
  const asUtc = Date.UTC(
    get('year'),
    get('month') - 1,
    get('day'),
    get('hour'),
    get('minute'),
    get('second'),
  );
  return asUtc - utcMs;
}

/**
 * The exact UTC instant whose Pacific wall clock is the given date at 5:00 PM.
 * We treat the wall time as UTC, then subtract Pacific's offset at that instant,
 * iterating once so it stays correct right across a DST change. This does not
 * depend on the viewer's timezone at all: everyone resolves the same moment.
 */
function ptFivePmToUtc(year: number, month: number, day: number): number {
  const naive = Date.UTC(year, month - 1, day, 17, 0, 0);
  let utc = naive - zoneOffsetMs(naive, PT);
  utc = naive - zoneOffsetMs(utc, PT);
  return utc;
}

/** The instant of a YYYY-MM-DD date at 5:00 PM PT, or null if the string is invalid. */
function deadlineFromParam(str: string | null): number | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(str ?? '');
  if (!m) return null;
  return ptFivePmToUtc(Number(m[1]), Number(m[2]), Number(m[3]));
}

/** Resolve the deadline instant from the URL, or null when there is no valid ?d=. */
export function resolveDeadline(params: URLSearchParams): number | null {
  return deadlineFromParam(params.get('d'));
}
