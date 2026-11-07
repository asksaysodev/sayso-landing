/**
 * Resources dropdown panel: Blog, the Prospecting Calculator and the free
 * script generator (Composer, opens in a new tab) highlighted at the top, then the Products, Solutions and About columns, then a link to the
 * resources hub. Centered on the viewport (not the trigger) so it never runs
 * off the right edge on narrower desktops.
 */
import Link from 'next/link';
import { headerNav, resourcesFeatured, resourcesHubHref } from '@/lib/navigation';

export function ResourcesMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="fixed left-1/2 top-16 z-50 w-[min(840px,92vw)] -translate-x-1/2 pt-2">
      <div className="rounded-2xl bg-white p-5 shadow-popover">
        <div className="mb-5 grid grid-cols-3 gap-3">
          {resourcesFeatured.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onNavigate}
              {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              data-analytics-id={link.dataAnalyticsId}
              className="flex items-center gap-3 rounded-xl bg-[#F4F4F5] px-4 py-3 ring-1 ring-[#1D4871]/10 transition hover:ring-[#1D4871]/30"
            >
              <span
                aria-hidden="true"
                className="grid h-10 w-10 flex-none place-items-center rounded-lg bg-[#FFDE59] font-comic text-lg text-[#1D4871]"
              >
                {link.mark}
              </span>
              <span>
                <span className="block whitespace-nowrap text-[15px] font-semibold text-[#10233A]">{link.label}</span>
                <span className="block text-[13px] text-[#556B86]">{link.subtitle}</span>
              </span>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-5">
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
