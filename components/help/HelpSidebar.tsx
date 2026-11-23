'use client';

/**
 * Left navigation for the Help Center: sections > folders > articles.
 * The folder holding the current article starts open. On phones the whole
 * tree sits behind a "Browse all articles" toggle above the article.
 */
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { HelpNav } from '@/lib/help';

export function HelpSidebar({ nav }: { nav: HelpNav }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const tree = (
    <nav aria-label="Help Center" className="space-y-6 text-sm">
      {nav.map((sec) => (
        <div key={sec.id}>
          <Link
            href={`/help/${sec.id}/`}
            className={`mb-2 block font-hero text-[13px] font-extrabold uppercase tracking-wide ${
              pathname === `/help/${sec.id}/` ? 'text-[#2367EE]' : 'text-[#10233A] hover:text-[#2367EE]'
            }`}
          >
            {sec.title}
          </Link>
          <ul className="space-y-1">
            {sec.groups.map((g) => {
              const containsActive = g.articles.some((a) => a.url === pathname);
              return (
                <li key={g.id}>
                  <details open={containsActive} className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-2 rounded-lg px-2 py-1.5 font-semibold text-[#1D4871] hover:bg-white marker:hidden">
                      {g.title}
                      <ChevronDown className="h-4 w-4 shrink-0 text-[#1D4871]/50 transition-transform group-open:rotate-180" aria-hidden />
                    </summary>
                    <ul className="mb-2 ml-2 mt-1 space-y-0.5 border-l border-[#D7DEE1] pl-3">
                      {g.articles.map((a) => {
                        const active = a.url === pathname;
                        return (
                          <li key={a.url}>
                            <Link
                              href={a.url}
                              aria-current={active ? 'page' : undefined}
                              onClick={() => setMobileOpen(false)}
                              className={`block rounded-md px-2 py-1 leading-snug ${
                                active ? 'bg-white font-semibold text-[#2367EE] shadow-card-sm' : 'text-[#1D4871]/75 hover:text-[#10233A]'
                              }`}
                            >
                              {a.title}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </details>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );

  return (
    <>
      <div className="lg:hidden">
        <button
          type="button"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="flex w-full items-center justify-between rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-[#10233A] shadow-card-sm"
        >
          Browse all articles
          <ChevronDown className={`h-4 w-4 transition-transform ${mobileOpen ? 'rotate-180' : ''}`} aria-hidden />
        </button>
        {mobileOpen && <div className="mt-3 rounded-2xl bg-[#F4F4F5] p-2">{tree}</div>}
      </div>
      <div className="hidden lg:block">{tree}</div>
    </>
  );
}
