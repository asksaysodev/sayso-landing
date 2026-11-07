'use client';

/**
 * Mobile drawer: slides in from the right with the primary links, a Resources
 * accordion (featured links plus the three columns), log in and Book a demo.
 * Modal while open: rendered in a portal on <body> (the blurred navbar would
 * otherwise trap a fixed overlay inside itself), the rest of the page is
 * inert, focus moves to the close button, Tab stays inside the drawer, page
 * scroll is locked (iOS-safe), and Escape or a backdrop tap closes it. Focus
 * returns to the menu button on close.
 */
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { RefObject } from 'react';
import Link from 'next/link';
import { ChevronDown, X } from 'lucide-react';
import { headerNav, loginHref, primaryNav, resourcesFeatured, resourcesHubHref } from '@/lib/navigation';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  onBookDemo: () => void;
  /** The hamburger button; focus returns here when the drawer closes. */
  returnFocusRef: RefObject<HTMLButtonElement | null>;
}

const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function MobileMenu({ open, onClose, onBookDemo, returnFocusRef }: MobileMenuProps) {
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Scroll lock and focus handoff run once per open/close, not on every render.
  useEffect(() => {
    if (!open) return;
    const { body } = document;
    const returnTo = returnFocusRef.current;
    const scrollY = window.scrollY;
    const previous = { position: body.style.position, top: body.style.top, width: body.style.width };
    // position: fixed is the scroll lock iOS Safari respects; overflow: hidden alone is ignored there.
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.width = '100%';
    // Everything outside the drawer's portal is inert, so screen readers and Tab stay in the dialog.
    const siblings = Array.from(body.children).filter(
      (el) => el !== panelRef.current?.parentElement && !el.hasAttribute('inert'),
    );
    siblings.forEach((el) => el.setAttribute('inert', ''));
    closeRef.current?.focus();
    return () => {
      siblings.forEach((el) => el.removeAttribute('inert'));
      Object.assign(body.style, previous);
      window.scrollTo(0, scrollY);
      returnTo?.focus();
    };
  }, [open, returnFocusRef]);

  // Escape closes; Tab and Shift+Tab wrap inside the drawer.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;
      const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || !panelRef.current.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !panelRef.current.contains(active))) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const rowClass = 'block border-b border-[#1D4871]/10 py-3.5 text-[17px] font-semibold text-[#1D4871]';
  const subClass = 'block py-2 pl-2.5 text-[15px] text-[#10233A]';

  return createPortal(
    <div className="fixed inset-0 z-[70] flex justify-end bg-[#10233A]/45 lg:hidden" onClick={onClose}>
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        onClick={(e) => e.stopPropagation()}
        className="flex h-full w-[min(340px,88vw)] flex-col overflow-y-auto overscroll-contain bg-white px-6 pb-8 pt-3"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="ml-auto grid h-10 w-10 place-items-center text-[#1D4871]">
          <X size={24} />
        </button>

        {primaryNav.map((link) => (
          <Link key={link.href} href={link.href} onClick={onClose} className={rowClass}>
            {link.label}
          </Link>
        ))}

        <div className="border-b border-[#1D4871]/10">
          <button
            type="button"
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
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  data-analytics-id={link.dataAnalyticsId}
                  className={subClass}
                >
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
                      className={subClass}
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
          type="button"
          onClick={onBookDemo}
          data-analytics-id="cta-book-demo-mobile-menu"
          className="mt-6 h-12 rounded-full bg-white text-base font-semibold text-[#10233A] shadow-card-sm"
        >
          Book a demo
        </button>
      </div>
    </div>,
    document.body,
  );
}
