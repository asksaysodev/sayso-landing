'use client';

/**
 * Mobile drawer: slides in from the right with the primary links, a Resources
 * accordion (featured links plus the three columns), log in and Book a demo.
 * Locks page scroll while open and closes on Escape or a backdrop tap.
 */
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronDown, X } from 'lucide-react';
import { headerNav, loginHref, primaryNav, resourcesFeatured, resourcesHubHref } from '@/lib/navigation';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  onBookDemo: () => void;
}

export function MobileMenu({ open, onClose, onBookDemo }: MobileMenuProps) {
  const [resourcesOpen, setResourcesOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const rowClass = 'block border-b border-[#1D4871]/10 py-3.5 text-[17px] font-semibold text-[#1D4871]';
  const subClass = 'block py-2 pl-2.5 text-[15px] text-[#10233A]';

  return (
    <div className="fixed inset-0 z-[70] flex justify-end bg-[#10233A]/45 lg:hidden" onClick={onClose}>
      <div
        role="dialog"
        aria-label="Menu"
        onClick={(e) => e.stopPropagation()}
        className="flex h-full w-[min(340px,88vw)] flex-col overflow-y-auto bg-white px-6 pb-8 pt-3"
      >
        <button onClick={onClose} aria-label="Close menu" className="ml-auto grid h-10 w-10 place-items-center text-[#1D4871]">
          <X size={24} />
        </button>

        {primaryNav.map((link) => (
          <Link key={link.href} href={link.href} onClick={onClose} className={rowClass}>
            {link.label}
          </Link>
        ))}

        <div className="border-b border-[#1D4871]/10">
          <button
            onClick={() => setResourcesOpen((o) => !o)}
            aria-expanded={resourcesOpen}
            className="flex w-full items-center justify-between py-3.5 text-[17px] font-semibold text-[#1D4871]"
          >
            Resources
            <ChevronDown size={18} className={`text-[#2367EE] transition-transform ${resourcesOpen ? 'rotate-180' : ''}`} />
          </button>
          {resourcesOpen && (
            <div className="pb-3">
              {resourcesFeatured.map((link) => (
                <Link key={link.href} href={link.href} onClick={onClose} className={subClass}>
                  {link.label}
                </Link>
              ))}
              {headerNav.map((section) => (
                <div key={section.label}>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-[#556B86]">{section.label}</p>
                  {section.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={onClose}
                      className={link.indent ? `${subClass} pl-6 text-[#556B86]` : subClass}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              ))}
              <Link href={resourcesHubHref} onClick={onClose} className={`${subClass} mt-2 font-semibold text-[#2367EE]`}>
                All resources &rarr;
              </Link>
            </div>
          )}
        </div>

        <a href={loginHref} target="_blank" rel="noopener noreferrer" className={rowClass}>
          Log in
        </a>
        <button
          onClick={onBookDemo}
          data-analytics-id="cta-book-demo-mobile-menu"
          className="mt-6 h-12 rounded-full bg-[#2367EE] text-base font-semibold text-white shadow-[0_8px_20px_-8px_rgba(35,103,238,0.55)]"
        >
          Book a demo
        </button>
      </div>
    </div>
  );
}
