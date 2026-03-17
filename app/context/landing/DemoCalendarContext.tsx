'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { X } from 'lucide-react';
import { OnboardingModal } from '@/components/onboarding/OnboardingModal';
import { SystemSelectModal } from '@/components/landing/SystemSelectModal';

const DEMO_CALENDAR_URL = 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ0eeiee8mED3XOLfAhzApvxOvHL96hIK8pNfAcZBY89TaKTa_LeVrtJr_kEbOlbQyb1juvLNPG3?gv=true';
const CONTACT_FORM_URL = 'https://alert-tartan-008.notion.site/ebd/2f04de400468813784b3cd2d7a1290af';

interface IDemoCalendarContext {
    openDemoCalendar: () => void;
    openContactForm: () => void;
    openOnboarding: () => void;
    openSystemSelect: () => void;
}

const DemoCalendarContext = createContext<IDemoCalendarContext | null>(null);

export function DemoCalendarProvider({ children }: { children: React.ReactNode }) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isSystemSelectOpen, setIsSystemSelectOpen] = useState(false);
  const openDemoCalendar = useCallback(() => setIsCalendarOpen(true), []);
  const openContactForm = useCallback(() => setIsContactOpen(true), []);
  const openOnboarding = useCallback(() => setIsOnboardingOpen(true), []);
  const openSystemSelect = useCallback(() => setIsSystemSelectOpen(true), []);

  return (
    <DemoCalendarContext.Provider value={{ openDemoCalendar, openContactForm, openOnboarding, openSystemSelect }}>
      {children}

      {/* Shared Calendar Popup Modal */}
      {isCalendarOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setIsCalendarOpen(false)}
        >
          <div
            className="relative bg-white rounded-2xl border-2 border-[#1D4871] v2-comic-shadow w-[90vw] max-w-[600px] h-[80vh] max-h-[700px] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsCalendarOpen(false)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white border-2 border-[#1D4871] text-[#1D4871] hover:bg-gray-100 transition-colors"
              aria-label="Close calendar"
            >
              <X size={20} strokeWidth={2.5} />
            </button>
            <iframe
              src={DEMO_CALENDAR_URL}
              className="w-full h-full border-0"
              title="Book a Demo"
            />
          </div>
        </div>
      )}

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

      {/* Onboarding Flow Modal */}
      {isOnboardingOpen && (
        <OnboardingModal onClose={() => setIsOnboardingOpen(false)} />
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
