'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { X } from 'lucide-react';
import { openCalendlyPopup } from '@/lib/calendly';

const CONTACT_FORM_URL = 'https://asksayso.notion.site/ebd/2f04de400468813784b3cd2d7a1290af';
// Mac and Windows users sign up and download through the same web app flow.
const SIGNUP_URL = 'https://app.asksayso.com/login?signup=true';

interface IDemoCalendarContext {
    openDemoCalendar: () => void;
    openContactForm: () => void;
    /** Opens signup and download in a new tab. */
    openSignup: () => void;
}

const DemoCalendarContext = createContext<IDemoCalendarContext | null>(null);

export function DemoCalendarProvider({ children }: { children: React.ReactNode }) {
  const [isContactOpen, setIsContactOpen] = useState(false);
  // "Book a Demo" now opens Calendly in a popup overlay (replaces the old
  // Google Calendar iframe modal). See lib/calendly.ts.
  const openDemoCalendar = useCallback(() => openCalendlyPopup(), []);
  const openContactForm = useCallback(() => setIsContactOpen(true), []);
  const openSignup = useCallback(() => window.open(SIGNUP_URL, '_blank', 'noopener'), []);

  return (
    <DemoCalendarContext.Provider value={{ openDemoCalendar, openContactForm, openSignup }}>
      {children}

      {/* Shared Contact Form Popup Modal */}
      {isContactOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setIsContactOpen(false)}
        >
          <div
            className="relative bg-white rounded-2xl border-2 border-[#1D4871] v2-comic-shadow w-[90vw] max-w-[600px] h-[80vh] max-h-[700px] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsContactOpen(false)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white border-2 border-[#1D4871] text-[#1D4871] hover:bg-gray-100 transition-colors"
              aria-label="Close contact form"
            >
              <X size={20} strokeWidth={2.5} />
            </button>
            <iframe
              src={CONTACT_FORM_URL}
              className="w-full h-full border-0"
              title="Contact Us"
            />
          </div>
        </div>
      )}
    </DemoCalendarContext.Provider>
  );
}

export function useDemoCalendar() {
  const context = useContext(DemoCalendarContext);
  if (!context) throw new Error('useDemoCalendar must be used within DemoCalendarProvider');
  return context;
}
