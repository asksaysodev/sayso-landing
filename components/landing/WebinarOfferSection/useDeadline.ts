import { useEffect, useState } from 'react';

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

/**
 * MOCKUP / REVIEW switch. The offer deadline comes from a per-cohort link,
 * `/webinar/offer?d=YYYY-MM-DD`, which resolves to that date at 5:00 PM PT.
 * Kuvaal shares a dated link per webinar; the page itself never changes.
 *
 * When true (review): a bare URL with no ?d= counts down to the next Friday
 * 5:00 PM PT so the page can be reviewed, and ?expired=1 previews the expired
 * state. SET THIS TO false FOR PRODUCTION so a missing or invalid ?d= renders
 * the expired state.
 */
export const MOCKUP_MODE = true;

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

/** Demo fallback only: the next Friday 5:00 PM PT. */
function nextFridayPt(): number {
  // Read today's date in Pacific to find this/next Friday's calendar date.
  const ptNow = new Date(new Date().toLocaleString('en-US', { timeZone: PT }));
  ptNow.setDate(ptNow.getDate() + ((5 - ptNow.getDay() + 7) % 7));

  let deadline = ptFivePmToUtc(
    ptNow.getFullYear(),
    ptNow.getMonth() + 1,
    ptNow.getDate(),
  );
  // If it is already Friday past 5 PM PT, roll to next Friday.
  if (deadline <= Date.now()) {
    ptNow.setDate(ptNow.getDate() + 7);
    deadline = ptFivePmToUtc(
      ptNow.getFullYear(),
      ptNow.getMonth() + 1,
      ptNow.getDate(),
    );
  }
  return deadline;
}

/** Resolve the deadline instant from the URL, or null when there is none. */
function resolveDeadline(params: URLSearchParams): number | null {
  const dParam = params.get('d');
  if (dParam) return deadlineFromParam(dParam);
  if (MOCKUP_MODE && !params.get('expired')) return nextFridayPt();
  return null;
}

/**
 * Evaluates the webinar deadline on the client and ticks every second. Reports
 * the time remaining and whether the offer has expired: no valid ?d=, a past
 * date, or the countdown reaching zero while the page is open.
 */
export function useDeadline(): DeadlineState {
  const [state, setState] = useState<DeadlineState>({
    mounted: false,
    expired: false,
    timeLeft: null,
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const deadline = resolveDeadline(params);

    const tick = () => {
      const ms = deadline == null ? -1 : deadline - Date.now();
      if (ms <= 0) {
        setState({ mounted: true, expired: true, timeLeft: null });
        return;
      }
      setState({
        mounted: true,
        expired: false,
        timeLeft: {
          days: Math.floor(ms / 864e5),
          hours: Math.floor((ms % 864e5) / 36e5),
          minutes: Math.floor((ms % 36e5) / 6e4),
          seconds: Math.floor((ms % 6e4) / 1e3),
        },
      });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return state;
}
