'use client';

import { Button } from '@/components/ui/Button';
import { useDemoCalendar } from '@/app/context/landing/DemoCalendarContext';

interface ContentCTAProps {
  location: string;
  headline?: string;
  subheading?: string;
}

export function ContentCTA({
  location,
  headline = 'Ready to Win the Moment?',
  subheading = 'See how Sayso gives you real-time guidance on every call.',
}: ContentCTAProps) {
  const { openDemoCalendar, openSignup } = useDemoCalendar();

  return (
    <section className="max-w-[1200px] mx-auto px-6 py-10">
      <div className="bg-[#1D4871] rounded-[20px] shadow-[0_1px_2px_rgba(16,35,58,0.1),0_18px_40px_-18px_rgba(16,35,58,0.55)] overflow-hidden">
        <div className="px-8 py-12 md:py-16 text-center">
          <h2 className="font-hero font-extrabold tracking-[-0.03em] leading-[1.08] text-[32px] md:text-5xl text-white mb-4">
            {headline}
          </h2>
          <p className="text-[17px] text-white/80 max-w-md mx-auto mb-8 font-sans">
            {subheading}
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Button onClick={openSignup} data-analytics-id={`cta-download-${location}`}>
              Get Sayso
            </Button>
            <Button variant="secondary" onClick={openDemoCalendar} data-analytics-id={`cta-book-demo-${location}`}>
              Book a demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
