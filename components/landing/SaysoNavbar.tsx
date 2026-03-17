'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useDemoCalendar } from '@/app/context/landing/DemoCalendarContext';
import { LightningIcon } from '@/components/icons/LightningIcon';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', href: '#top' },
  { label: 'How Sayso Works', href: '#how-it-works' },
  // { label: 'Case Studies', href: '/case-studies' },
  { label: 'Demo', href: '#demo', isCalendar: true },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '#contact', isContact: true },
];

export default function SaysoNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openDemoCalendar, openContactForm } = useDemoCalendar();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    }
    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    function handleEsc(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsMobileMenuOpen(false);
    }
    if (isMobileMenuOpen) document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isMobileMenuOpen]);

  return (
    <nav className="sticky top-4 z-50 flex justify-center px-4" aria-label="Main navigation">
      <div ref={menuRef} className="relative w-full max-w-[1200px]">
        {/* Main Navbar — comic border style */}
        <div className="flex items-center justify-between h-14 md:h-[4.5rem] px-4 md:px-6 rounded-full bg-white border-2 border-[#1D4871] v2-comic-shadow-sm">
          {/* Logo with superhero character */}
          <a
            href="/"
            className="flex items-center gap-2 text-[#1D4871] font-bold text-lg md:text-xl hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#2367EE] focus:ring-offset-2 rounded-lg px-2 -ml-2"
            aria-label="Sayso home"
          >
            <Image src="/logo-pos-horizontal.png" alt="Sayso" width={90} height={32} />
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6 lg:gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.isCalendar || link.isContact ? undefined : link.href}
                onClick={
                  link.isCalendar ? (e) => { e.preventDefault(); openDemoCalendar(); }
                  : link.isContact ? (e) => { e.preventDefault(); openContactForm(); }
                  : undefined
                }
                className="text-[#1D4871] font-bold text-sm md:text-[1.2rem] hover:text-[#2367EE] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2367EE] focus:ring-offset-2 rounded-lg px-2 py-1 cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            <button
              onClick={openDemoCalendar}
              className="hidden lg:inline-flex items-center justify-center px-5 py-2 rounded-full bg-[#2367EE] text-white font-bold text-base md:text-md v4-hero-glow border-2 border-[#1D4871] focus:outline-none focus:ring-2 focus:ring-[#2367EE] focus:ring-offset-2"
            >
              <LightningIcon size={14} className="mr-1.5" />
              Download Sayso
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#1D4871] hover:bg-[#FFDE59]/20 transition-colors focus:outline-none focus:ring-2 focus:ring-[#2367EE] focus:ring-offset-2"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                  <X size={24} />
              ) : (
                  <Menu size={24} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className="absolute top-full left-0 right-0 mt-2 rounded-2xl bg-white border-2 border-[#1D4871] v2-comic-shadow overflow-hidden"
          >
            <div className="py-4 px-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.isCalendar || link.isContact ? undefined : link.href}
                  onClick={
                    link.isCalendar ? (e) => { e.preventDefault(); setIsMobileMenuOpen(false); openDemoCalendar(); }
                    : link.isContact ? (e) => { e.preventDefault(); setIsMobileMenuOpen(false); openContactForm(); }
                    : () => setIsMobileMenuOpen(false)
                  }
                  className="block px-4 py-3 rounded-lg text-[#1D4871] font-bold text-base text-right hover:bg-[#FFDE59]/20 transition-colors cursor-pointer"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => { setIsMobileMenuOpen(false); openDemoCalendar(); }}
                className="block w-full mt-3 px-4 py-3 rounded-full bg-[#2367EE] text-white font-bold text-lg text-center v2-comic-btn border-2 border-[#1D4871]"
              >
                Download Sayso
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
