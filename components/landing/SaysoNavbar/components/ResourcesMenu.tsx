/**
 * Resources dropdown panel: Blog, the Prospecting Calculator, the Ultimate
 * Script Book and the free script generator (Composer, opens in a new tab) as
 * plain link tiles at the top, then the Products, Solutions and About columns, then a link to the
 * resources hub. Centered on the viewport (not the trigger) so it never runs
 * off the right edge on narrower desktops.
 *
 * The panel is `fixed`, but its containing block changes: the viewport when the
 * navbar is at rest, the navbar itself once it scrolls (backdrop-blur / transform
 * create a containing block). Rather than guess which, `place` sets top to 0,
 * reads where that puts the panel (the containing block's top edge), then sets
 * top to the navbar's bottom edge relative to that origin. It re-runs on scroll
 * and resize (once per frame), when the navbar resizes or its classes change,
 * and when its 300ms show/hide transition ends. `top` is written straight to
 * the element so React never re-applies a stale value over the measurement.
 */
'use client';

import { useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import { headerNav, resourcesFeatured, resourcesHubHref } from '@/lib/navigation';

export function ResourcesMenu({ onNavigate }: { onNavigate: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    const nav = el?.closest('nav');
    if (!el || !nav) return;
    const place = () => {
      el.style.top = '0px';
      const origin = el.getBoundingClientRect().top;
      el.style.top = `${nav.getBoundingClientRect().bottom - origin}px`;
    };
    let frame = 0;
    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        place();
      });
    };
    place();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    nav.addEventListener('transitionend', schedule);
    const resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(nav);
    // The blur and hide classes toggle on scroll and change the containing block.
    const mutationObserver = new MutationObserver(schedule);
    mutationObserver.observe(nav, { attributes: true, attributeFilter: ['class', 'style'] });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      nav.removeEventListener('transitionend', schedule);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      id="resources-menu"
      className="fixed left-1/2 top-16 z-50 w-max max-w-[92vw] -translate-x-1/2 pt-2"
    >
      <div className="rounded-2xl bg-white p-5 shadow-popover">
        <div className="mb-5 flex flex-wrap gap-2">
          {resourcesFeatured.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onNavigate}
              {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              data-analytics-id={link.dataAnalyticsId}
              className="whitespace-nowrap rounded-full bg-[#F4F4F5] px-4 py-2 text-[14px] font-semibold text-[#10233A] ring-1 ring-[#1D4871]/10 transition hover:ring-[#1D4871]/30"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-[auto_auto_auto] gap-x-12 gap-y-5">
          {headerNav.map((section) => (
            <div key={section.label}>
              <Link
                href={section.href ?? resourcesHubHref}
                onClick={onNavigate}
                className="mb-2 block font-comic text-base tracking-wider text-[#1D4871] hover:text-[#2367EE]"
              >
                {section.label.toUpperCase()}
              </Link>
              {section.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onNavigate}
                  className="block py-1.5 text-sm text-[#10233A] hover:text-[#2367EE]"
                >
                  {link.label}
                  {link.subtitle && <span className="block text-xs text-[#556B86]">{link.subtitle}</span>}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-4 border-t border-[#1D4871]/10 pt-3 text-right">
          <Link href={resourcesHubHref} onClick={onNavigate} className="text-sm font-semibold text-[#2367EE] hover:underline">
            All resources &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
