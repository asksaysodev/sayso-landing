/**
 * Resources dropdown panel: Blog and the Prospecting Calculator highlighted at
 * the top, then the Products, Solutions and About columns, then a link to the
 * resources hub.
 */
import Link from 'next/link';
import { headerNav, resourcesFeatured, resourcesHubHref } from '@/lib/navigation';

const FEATURED_MARKS = ['B', '$'];

export function ResourcesMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="absolute left-1/2 top-full z-50 w-[min(760px,92vw)] -translate-x-1/2 pt-2">
      <div className="rounded-2xl bg-white p-5 shadow-[0_0_0_1px_rgba(16,35,58,0.12),0_24px_48px_-20px_rgba(16,35,58,0.35)]">
        <div className="mb-5 grid grid-cols-2 gap-3">
          {resourcesFeatured.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onNavigate}
              className="flex items-center gap-3 rounded-xl bg-[#F4F4F5] px-4 py-3 ring-1 ring-[#1D4871]/10 transition hover:ring-[#1D4871]/30"
            >
              <span className="grid h-10 w-10 flex-none place-items-center rounded-lg bg-[#FFDE59] font-comic text-lg text-[#1D4871]">
                {FEATURED_MARKS[i]}
              </span>
              <span>
                <span className="block text-[15px] font-semibold text-[#10233A]">{link.label}</span>
                <span className="block text-[13px] text-[#556B86]">{link.subtitle}</span>
              </span>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-5">
          {headerNav.map((section) => (
            <div key={section.label}>
              <Link
                href={section.href ?? '#'}
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
                  className={`block py-1.5 text-sm text-[#10233A] hover:text-[#2367EE] ${
                    link.indent ? 'ml-0.5 border-l-2 border-[#1D4871]/15 pl-3 text-[#556B86]' : ''
                  }`}
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
