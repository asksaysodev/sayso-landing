'use client';

/**
 * Scroll logic for the mobile carousel row: centers the first real slide,
 * moves one slide per arrow press with a timer-based tween (smooth scrolling
 * proved unreliable with scroll-snap), keeps finite carousels' arrows in sync
 * and, in infinite mode, silently jumps from the clones back to the real
 * slides so the row never runs out.
 */
import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';
import { prefersReducedMotion } from '@/lib/utils/motion';

const MOBILE_QUERY = '(max-width: 960px)';
const GLIDE_MS = 380;

export function useCarousel(trackRef: RefObject<HTMLDivElement>, count: number, loop: boolean) {
  const [prevDisabled, setPrevDisabled] = useState(!loop);
  const [nextDisabled, setNextDisabled] = useState(false);
  const animating = useRef(false);
  const glideTimer = useRef<ReturnType<typeof setInterval>>();

  // Stop a glide that is still in flight when the carousel unmounts.
  useEffect(() => () => clearInterval(glideTimer.current), []);

  const kids = useCallback(() => Array.from(trackRef.current?.children ?? []) as HTMLElement[], [trackRef]);

  const center = useCallback(
    (el: HTMLElement) => el.offsetLeft - ((trackRef.current?.clientWidth ?? 0) - el.offsetWidth) / 2,
    [trackRef],
  );

  const step = useCallback(() => {
    const k = kids();
    return k.length > 1 ? k[1].offsetLeft - k[0].offsetLeft : trackRef.current?.clientWidth ?? 1;
  }, [kids, trackRef]);

  const indexNow = useCallback(() => {
    const track = trackRef.current;
    const k = kids();
    if (!track || !k.length) return 0;
    return Math.round((track.scrollLeft - center(k[0])) / (step() || 1));
  }, [trackRef, kids, center, step]);

  // Instant scroll with snapping paused, so the browser does not fight the jump.
  const jump = useCallback(
    (x: number) => {
      const track = trackRef.current;
      if (!track) return;
      track.style.scrollSnapType = 'none';
      track.scrollLeft = x;
      void track.offsetWidth;
      track.style.scrollSnapType = '';
    },
    [trackRef],
  );

  const sync = useCallback(() => {
    const track = trackRef.current;
    if (!track || loop) return;
    const max = track.scrollWidth - track.clientWidth;
    setPrevDisabled(track.scrollLeft < 8);
    setNextDisabled(track.scrollLeft > max - 8);
  }, [trackRef, loop]);

  const normalize = useCallback(() => {
    const track = trackRef.current;
    if (!loop || !track) return;
    const i = indexNow();
    if (i < count) jump(track.scrollLeft + count * step());
    else if (i >= 2 * count) jump(track.scrollLeft - count * step());
  }, [trackRef, loop, indexNow, count, jump, step]);

  const glide = useCallback(
    (to: number) => {
      const track = trackRef.current;
      if (!track) return;
      if (prefersReducedMotion()) {
        jump(to);
        normalize();
        sync();
        return;
      }
      const from = track.scrollLeft;
      const t0 = performance.now();
      animating.current = true;
      track.style.scrollSnapType = 'none';
      clearInterval(glideTimer.current);
      glideTimer.current = setInterval(() => {
        const p = Math.min(1, (performance.now() - t0) / GLIDE_MS);
        track.scrollLeft = from + (to - from) * (1 - Math.pow(1 - p, 3));
        if (p >= 1) {
          clearInterval(glideTimer.current);
          track.style.scrollSnapType = '';
          animating.current = false;
          normalize();
          sync();
        }
      }, 16);
    },
    [trackRef, jump, normalize, sync],
  );

  const go = useCallback(
    (delta: number) => {
      if (animating.current) return;
      normalize();
      const k = kids();
      const i = Math.max(0, Math.min(k.length - 1, indexNow() + delta));
      if (k[i]) glide(center(k[i]));
    },
    [normalize, kids, indexNow, glide, center],
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const mq = window.matchMedia(MOBILE_QUERY);

    const home = () => {
      if (!mq.matches) return;
      const first = kids()[loop ? count : 0];
      if (first) jump(center(first));
      sync();
    };

    let settle: ReturnType<typeof setTimeout> | undefined;
    const onScroll = () => {
      sync();
      if (!loop || animating.current) return;
      clearTimeout(settle);
      settle = setTimeout(normalize, 180);
    };

    home();
    track.addEventListener('scroll', onScroll, { passive: true });
    mq.addEventListener('change', home);
    window.addEventListener('load', home);
    return () => {
      clearTimeout(settle);
      track.removeEventListener('scroll', onScroll);
      mq.removeEventListener('change', home);
      window.removeEventListener('load', home);
    };
  }, [trackRef, kids, loop, count, jump, center, sync, normalize]);

  return { prevDisabled, nextDisabled, prev: () => go(-1), next: () => go(1) };
}
