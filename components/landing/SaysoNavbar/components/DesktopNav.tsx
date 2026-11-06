'use client';

/**
 * Desktop link row: primary links plus the Resources trigger. The Resources
 * menu opens on hover (with a short close delay) or on click, and closes on
 * Escape (focus returns to the trigger), an outside click, or when keyboard
 * focus leaves it.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { primaryNav } from '@/lib/navigation';
import { ResourcesMenu } from './ResourcesMenu';

export function DesktopNav() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  }, []);
  const hideSoon = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 180);
  }, []);

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
        onMouseEnter={show}
        onMouseLeave={hideSoon}
        onBlur={(e) => {
          if (!wrapRef.current?.contains(e.relatedTarget as Node | null)) setOpen(false);
        }}
      >
        <button
          ref={triggerRef}
          type="button"
          // Hover already opens it on mouse devices, so a click there should not toggle it shut.
          onClick={() => (window.matchMedia('(hover: hover)').matches ? setOpen(true) : setOpen((o) => !o))}
          aria-expanded={open}
          className={`flex h-10 items-center gap-1 ${linkClass}`}
        >
          Resources
          <ChevronDown size={14} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
        </button>
        {open && <ResourcesMenu onNavigate={() => setOpen(false)} />}
      </div>
    </div>
  );
}
