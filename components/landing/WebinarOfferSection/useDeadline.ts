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

/** Milliseconds to shift a locally-built wall-clock time onto the PT instant. */
function ptSkew(now: Date): number {
  const pt = new Date(now.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
  return now.getTime() - pt.getTime();
}

/** The instant of a YYYY-MM-DD date at 5:00 PM PT, or null if the string is invalid. */
function deadlineFromParam(str: string | null, now: Date): number | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(str ?? '');
  if (!m) return null;
  const wall = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]), 17, 0, 0, 0);
  return wall.getTime() + ptSkew(now);
}

/** Demo fallback only: the next Friday 5:00 PM PT. */
function nextFridayPt(now: Date): number {
  const pt = new Date(now.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
  const t = new Date(pt.getTime());
  t.setDate(t.getDate() + ((5 - pt.getDay() + 7) % 7));
  t.setHours(17, 0, 0, 0);
  if (t.getTime() <= pt.getTime()) t.setDate(t.getDate() + 7);
  return t.getTime() + ptSkew(now);
}

/** Resolve the deadline instant from the URL, or null when there is none. */
function resolveDeadline(params: URLSearchParams): number | null {
  const now = new Date();
  const dParam = params.get('d');
  if (dParam) return deadlineFromParam(dParam, now);
  if (MOCKUP_MODE && !params.get('expired')) return nextFridayPt(now);
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
