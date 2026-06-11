'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { X } from 'lucide-react';
import { SystemSelectModal } from '@/components/landing/SystemSelectModal';
import { openCalendlyPopup } from '@/lib/calendly';

const CONTACT_FORM_URL = 'https://asksayso.notion.site/ebd/2f04de400468813784b3cd2d7a1290af';

interface IDemoCalendarContext {
    openDemoCalendar: () => void;
    openContactForm: () => void;
    openSystemSelect: () => void;
}

const DemoCalendarContext = createContext<IDemoCalendarContext | null>(null);

export function DemoCalendarProvider({ children }: { children: React.ReactNode }) {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isSystemSelectOpen, setIsSystemSelectOpen] = useState(false);
  const openDemoCalendar = useCallback(() => openCalendlyPopup(), []);
  const openContactForm = useCallback(() => setIsContactOpen(true), []);
  const openSystemSelect = useCallback(() => setIsSystemSelectOpen(true), []);

  return (
    <DemoCalendarContext.Provider value={{ openDemoCalendar, openContactForm, openSystemSelect }}>
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

      {/* System Select Modal */}
      {isSystemSelectOpen && (
        <SystemSelectModal onClose={() => setIsSystemSelectOpen(false)} />
      )}
    </DemoCalendarContext.Provider>
  );
}

export function useDemoCalendar() {
  const context = useContext(DemoCalendarContext);
  if (!context) throw new Error('useDemoCalendar must be used within DemoCalendarProvider');
  return context;
}
