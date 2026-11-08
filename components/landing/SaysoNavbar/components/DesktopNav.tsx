'use client';

/**
 * Desktop link row: primary links plus the Resources trigger. "Resources" is a
 * link to the /resources hub: a mouse click or Enter navigates there. The menu
 * opens on mouse hover (with a short close delay), on ArrowDown or Space from
 * the focused trigger (focus moves to the first menu link), or on the first
 * touch tap (a second tap follows the link). Focusing the trigger alone does
 * not open it, so Tab moves on to the next header control. The menu closes on
 * Escape (focus returns to the trigger), an outside click, or when keyboard
 * focus leaves it.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { primaryNav, resourcesHubHref } from '@/lib/navigation';
import { ResourcesMenu } from './ResourcesMenu';

export function DesktopNav() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLAnchorElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Pointer type of the press that leads to the next click; null for keyboard (Enter) clicks.
  const pointerType = useRef<string | null>(null);
  // Set when the keyboard opens the menu, so focus moves into it once it renders.
  const focusFirstLink = useRef(false);

  const show = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  }, []);
  const hideSoon = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 180);
  }, []);

  useEffect(() => {
    if (!open || !focusFirstLink.current) return;
    focusFirstLink.current = false;
    wrapRef.current?.querySelector<HTMLAnchorElement>('#resources-menu a')?.focus();
  }, [open]);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (wrapRef.current?.contains(document.activeElement)) triggerRef.current?.focus();
      setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const linkClass =
    'rounded-lg px-1 text-[15px] font-medium text-[#1D4871] transition-colors hover:text-[#2367EE] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2367EE]';

  return (
    <div className="mx-auto hidden items-center gap-7 lg:flex">
      {primaryNav.map((link) => (
        <Link key={link.href} href={link.href} className={linkClass}>
          {link.label}
        </Link>
      ))}
      <div
        ref={wrapRef}
        className="relative"
        // Pointer events so touch taps (which also emit compatibility mouse events) don't count as hover.
        onPointerEnter={(e) => {
          if (e.pointerType === 'mouse') show();
        }}
        onPointerLeave={(e) => {
          if (e.pointerType === 'mouse') hideSoon();
        }}
        onBlur={(e) => {
          if (!wrapRef.current?.contains(e.relatedTarget as Node | null)) setOpen(false);
        }}
      >
        <Link
          ref={triggerRef}
          href={resourcesHubHref}
          onPointerDown={(e) => {
            pointerType.current = e.pointerType;
          }}
          onKeyDown={(e) => {
            // Enter keeps its link behaviour (navigate); ArrowDown and Space open the menu.
            if (e.key === 'ArrowDown' || e.key === ' ') {
              e.preventDefault();
              if (open) {
                wrapRef.current?.querySelector<HTMLAnchorElement>('#resources-menu a')?.focus();
                return;
              }
              focusFirstLink.current = true;
              show();
            }
          }}
          onClick={(e) => {
            const type = pointerType.current;
            pointerType.current = null;
            // Touch has no hover, so the first tap opens the menu instead of leaving the page.
            if (!open && type === 'touch') {
              e.preventDefault();
              setOpen(true);
              return;
            }
            setOpen(false);
          }}
          aria-expanded={open}
          aria-controls={open ? 'resources-menu' : undefined}
          className={`flex h-10 items-center gap-1 ${linkClass}`}
        >
          Resources
          <ChevronDown size={14} aria-hidden="true" className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
        </Link>
        {open && <ResourcesMenu onNavigate={() => setOpen(false)} />}
      </div>
    </div>
  );
}
