import { useEffect, useState } from 'react';

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/**
 * The real instant (ms) of the upcoming Friday 5:00 PM PT. We read "now" in the
 * America/Los_Angeles wall clock, roll forward to the next Friday at 17:00, then
 * apply the local/PT skew so the result is correct in the viewer's own clock,
 * whatever timezone they are in.
 */
function nextFridayFivePmPt(): number {
  const now = new Date();
  const pt = new Date(now.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
  const skew = now.getTime() - pt.getTime();

  const target = new Date(pt.getTime());
  target.setDate(target.getDate() + ((5 - pt.getDay() + 7) % 7));
  target.setHours(17, 0, 0, 0);
  if (target.getTime() <= pt.getTime()) target.setDate(target.getDate() + 7);

  return target.getTime() + skew;
}

/**
 * Live countdown to the next Friday 5:00 PM PT. The offer always ends Friday at
 * 5 PM PT, so once a deadline passes the target simply rolls to the following
 * Friday. Returns null until mounted so the server and first client render match
 * (no hydration mismatch); components should show a placeholder until then.
 */
export function useFridayCountdown(): TimeLeft | null {
  const [left, setLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    let target = nextFridayFivePmPt();
    const tick = () => {
      let ms = target - Date.now();
      if (ms <= 0) {
        target = nextFridayFivePmPt();
        ms = target - Date.now();
      }
      setLeft({
        days: Math.floor(ms / 864e5),
        hours: Math.floor((ms % 864e5) / 36e5),
        minutes: Math.floor((ms % 36e5) / 6e4),
        seconds: Math.floor((ms % 6e4) / 1e3),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return left;
}
