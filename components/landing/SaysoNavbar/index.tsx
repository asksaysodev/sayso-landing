'use client';

/**
 * Site navbar: logo, primary links with the Resources menu, log in and the
 * Book a demo button. Sticky and full width; it picks up a blurred background
 * once the page scrolls.
 */
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { useDemoCalendar } from '@/app/context/landing/DemoCalendarContext';
import { loginHref } from '@/lib/navigation';
import { DesktopNav } from './components/DesktopNav';
import { MobileMenu } from './components/MobileMenu';

export default function SaysoNavbar({ autoHide = false }: { autoHide?: boolean } = {}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // When autoHide is on (e.g. the Product Tour page), the bar slides away on
  // scroll-down and returns on scroll-up to free up vertical space.
  const [hidden, setHidden] = useState(false);
  const { openDemoCalendar } = useDemoCalendar();

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (autoHide) {
        if (y > 140 && y > lastY) setHidden(true);
        else if (y < lastY - 4 || y < 80) setHidden(false);
      }
      lastY = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [autoHide]);

  return (
    <nav
      aria-label="Main navigation"
      className={`sticky top-0 z-50 transition-[transform,background-color,box-shadow] duration-300 ${
        scrolled ? 'bg-[#F4F4F5]/90 backdrop-blur-md shadow-[0_1px_0_rgba(29,72,113,0.12)]' : ''
      } ${autoHide && hidden ? '-translate-y-full' : ''}`}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center gap-6 px-4 md:px-6">
        <Link
          href="/"
          aria-label="Sayso home"
          className="rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2367EE] focus-visible:ring-offset-2"
        >
          <Image src="/logos/logo-pos-transparent-horizontal.png" alt="Sayso" width={90} height={29} priority />
        </Link>

        <DesktopNav />

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <a
            href={loginHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex h-10 items-center rounded-full px-3 text-sm font-semibold text-[#1D4871] transition-colors hover:bg-[#1D4871]/5"
          >
            Log in
          </a>
          <button
            onClick={openDemoCalendar}
            data-analytics-id="cta-book-demo-navbar"
            className="inline-flex h-10 items-center rounded-full bg-[#2367EE] px-4 text-sm font-semibold text-white shadow-[0_8px_20px_-8px_rgba(35,103,238,0.55)] transition hover:-translate-y-px hover:bg-[#1F5AD6] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2367EE] focus-visible:ring-offset-2"
          >
            Book a demo
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={isMobileMenuOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-[#1D4871] lg:hidden"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      <MobileMenu
        open={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onBookDemo={() => {
          setIsMobileMenuOpen(false);
          openDemoCalendar();
        }}
      />
    </nav>
  );
}
