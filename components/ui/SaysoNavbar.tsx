'use client';

import { useState, useEffect, useRef } from 'react';

const NAV_LINKS = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Security', href: '#security' },
  { label: 'Help', href: '#help' },
];

export default function SaysoNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close menu on ESC key
  useEffect(() => {
    function handleEsc(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      className="sticky top-4 z-50 flex justify-center px-4"
      aria-label="Main navigation"
    >
      {/* Pill Container */}
      <div className="relative w-full max-w-[1200px]">
        {/* Main Navbar */}
        <div
          className="flex items-center justify-between h-14 md:h-16 px-4 md:px-6 rounded-full bg-background border border-[#D7DEE1] shadow-[0_2px_8px_rgba(0,0,0,0.08)] backdrop-blur-sm"
          style={{ backgroundColor: 'rgba(244, 244, 245, 0.95)' }}
        >
          {/* Logo - Left */}
          <a
            href="/"
            className="flex items-center gap-2 text-primary font-bold text-lg md:text-xl hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-cta focus:ring-offset-2 rounded-lg px-2 -ml-2"
            aria-label="Sayso home"
          >
            <img src="/logo-pos-horizontal.png" alt="Sayso" className="h-8" />
          </a>

          {/* Desktop Nav Links - Center */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-primary font-medium text-sm md:text-base hover:text-primary/80 transition-colors focus:outline-none focus:ring-2 focus:ring-cta focus:ring-offset-2 rounded-lg px-2 py-1 relative group"
              >
                <span className="relative z-10">{link.label}</span>
                {/* Subtle hover background */}
                <span className="absolute inset-0 rounded-full bg-accent-bg/0 group-hover:bg-accent-bg/30 transition-all duration-200 -z-0" />
              </a>
            ))}
          </div>

          {/* Right Section - CTA + Mobile Menu Button */}
          <div className="flex items-center gap-3">
            {/* Desktop CTA Button */}
            <a
              href="#get-started"
              data-analytics-id="cta-get-started-navbar"
              className="hidden md:inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-cta text-white font-medium text-sm md:text-base hover:bg-[#1e5ad8] active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cta focus:ring-offset-2 shadow-sm hover:shadow-md hover:-translate-y-[1px]"
            >
              Get Started
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-lg text-primary hover:bg-accent-bg/30 transition-colors focus:outline-none focus:ring-2 focus:ring-cta focus:ring-offset-2"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                // Close icon (X)
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                // Hamburger icon
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 12H21M3 6H21M3 18H21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div
            ref={menuRef}
            className="absolute top-full left-0 right-0 mt-2 rounded-2xl bg-background border border-[#D7DEE1] shadow-lg backdrop-blur-sm overflow-hidden transition-all duration-200 opacity-100"
            style={{ backgroundColor: 'rgba(244, 244, 245, 0.98)' }}
          >
            <div className="py-4 px-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg text-primary font-medium text-base hover:bg-accent-bg/30 transition-colors focus:outline-none focus:ring-2 focus:ring-cta focus:ring-offset-2"
                >
                  {link.label}
                </a>
              ))}
              {/* Mobile CTA Button */}
              <a
                href="#get-started"
                onClick={() => setIsMobileMenuOpen(false)}
                data-analytics-id="cta-get-started-mobile-menu"
                className="block w-full mt-3 px-4 py-3 rounded-full bg-cta text-white font-medium text-base text-center hover:bg-[#1e5ad8] active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cta focus:ring-offset-2"
              >
                Get Started
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
