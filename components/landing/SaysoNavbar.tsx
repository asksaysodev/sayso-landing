'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useDemoCalendar } from '@/app/context/landing/DemoCalendarContext';
import { LightningIcon } from '@/components/icons/LightningIcon';
import { Menu, X, ChevronDown } from 'lucide-react';
import { headerNav } from '@/lib/navigation';

export default function SaysoNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);
  const { openDemoCalendar, openSystemSelect } = useDemoCalendar();
  const menuRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close everything on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
        setActiveDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Body scroll lock for mobile menu
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  // Escape key closes dropdowns and mobile menu
  useEffect(() => {
    function handleEsc(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setActiveDropdown(null);
      }
    }
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  // Desktop dropdown hover handlers with delay
  const handleMouseEnter = useCallback((label: string) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(label);
    }, 100);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  }, []);

  // Mobile accordion toggle
  const toggleMobileSection = useCallback((label: string) => {
    setOpenMobileSection((prev) => (prev === label ? null : label));
  }, []);

  return (
    <nav className="sticky top-4 z-50 flex justify-center px-4" aria-label="Main navigation">
      <div ref={menuRef} className="relative w-full max-w-[1200px]">
        {/* Main Navbar - comic border style */}
        <div className="flex items-center justify-between h-14 md:h-[4.5rem] px-4 md:px-6 rounded-full bg-white border-2 border-[#1D4871] v2-comic-shadow-sm">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-[#1D4871] font-bold text-lg md:text-xl hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#2367EE] focus:ring-offset-2 rounded-lg px-2 -ml-2"
            aria-label="Sayso home"
          >
            <Image src="/logo-pos-horizontal.png" alt="Sayso" width={90} height={32} />
          </Link>

          {/* Desktop Nav - Dropdown Triggers */}
          <div className="hidden lg:flex items-center gap-1">
            {headerNav.map((section) => (
              <div
                key={section.label}
                className="relative"
                onMouseEnter={() => handleMouseEnter(section.label)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={section.href ?? '#'}
                  className="flex items-center gap-1 px-3 py-2 text-[#1D4871] font-bold text-[1rem] hover:text-[#2367EE] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2367EE] focus:ring-offset-2 rounded-lg cursor-pointer"
                  aria-expanded={activeDropdown === section.label}
                  aria-haspopup="true"
                >
                  {section.label}
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${activeDropdown === section.label ? 'rotate-180' : ''}`}
                  />
                </Link>

                {/* Desktop Dropdown Panel */}
                {activeDropdown === section.label && (
                  <div
                    className="absolute top-full left-0 mt-2 min-w-[280px] rounded-xl bg-white border-2 border-[#1D4871] v2-comic-shadow-sm py-2 z-50"
                    onMouseEnter={() => handleMouseEnter(section.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {section.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block px-4 py-2.5 hover:bg-[#FFDE59]/20 transition-colors"
                        onClick={() => setActiveDropdown(null)}
                      >
                        <span className="text-[#1D4871] font-medium text-sm hover:text-[#2367EE]">
                          {link.label}
                        </span>
                        {link.subtitle && (
                          <span className="block text-sm text-[#1D4871]/60 mt-1">
                            {link.subtitle}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Section - CTAs + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={openDemoCalendar}
              className="hidden lg:inline-flex items-center justify-center px-4 py-2 rounded-full text-[#1D4871] font-bold text-sm border-2 border-[#1D4871] hover:bg-[#FFDE59]/20 transition-colors focus:outline-none focus:ring-2 focus:ring-[#2367EE] focus:ring-offset-2"
            >
              Book a Demo
            </button>
            <button
              onClick={openSystemSelect}
              className="hidden lg:inline-flex items-center justify-center px-5 py-2 rounded-full bg-[#2367EE] text-white font-bold text-sm v4-hero-glow border-2 border-[#1D4871] focus:outline-none focus:ring-2 focus:ring-[#2367EE] focus:ring-offset-2"
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
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Accordion Sections */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 rounded-2xl bg-white border-2 border-[#1D4871] v2-comic-shadow overflow-hidden lg:hidden">
            <div className="py-4 px-4 space-y-1 max-h-[70vh] overflow-y-auto">
              {headerNav.map((section) => (
                <div key={section.label}>
                  {/* Section Header - Label navigates, chevron toggles accordion */}
                  <div className="flex items-center w-full rounded-lg hover:bg-[#FFDE59]/20 transition-colors">
                    <Link
                      href={section.href ?? '#'}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex-1 px-4 py-3 text-[#1D4871] font-bold text-base text-left"
                    >
                      {section.label}
                    </Link>
                    <button
                      onClick={() => toggleMobileSection(section.label)}
                      className="px-4 py-3 text-[#1D4871] focus:outline-none focus:ring-2 focus:ring-[#2367EE] focus:ring-offset-2 rounded-lg"
                      aria-expanded={openMobileSection === section.label}
                      aria-label={`Expand ${section.label} submenu`}
                    >
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${openMobileSection === section.label ? 'rotate-180' : ''}`}
                      />
                    </button>
                  </div>

                  {/* Accordion Content */}
                  {openMobileSection === section.label && (
                    <div className="pl-4 pb-2 space-y-0.5">
                      {section.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block px-4 py-2.5 rounded-lg hover:bg-[#FFDE59]/10 transition-colors"
                        >
                          <span className="text-[#1D4871]/80 font-medium text-sm hover:text-[#2367EE]">
                            {link.label}
                          </span>
                          {link.subtitle && (
                            <span className="block text-sm text-[#1D4871]/60 mt-0.5">
                              {link.subtitle}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile CTAs */}
              <div className="pt-3 space-y-2">
                <button
                  onClick={() => { setIsMobileMenuOpen(false); openDemoCalendar(); }}
                  className="block w-full px-4 py-3 rounded-full text-[#1D4871] font-bold text-base text-center border-2 border-[#1D4871] hover:bg-[#FFDE59]/20 transition-colors"
                >
                  Book a Demo
                </button>
                <button
                  onClick={() => { setIsMobileMenuOpen(false); openSystemSelect(); }}
                  className="block w-full px-4 py-3 rounded-full bg-[#2367EE] text-white font-bold text-lg text-center v2-comic-btn border-2 border-[#1D4871]"
                >
                  Download Sayso
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
