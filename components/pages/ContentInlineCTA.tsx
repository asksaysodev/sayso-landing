'use client';

import { Button } from '@/components/ui/Button';
import { useDemoCalendar } from '@/app/context/landing/DemoCalendarContext';

interface ContentInlineCTAProps {
  location: string;
  headline?: string;
}

export function ContentInlineCTA({
  location,
  headline = 'See It in Action',
}: ContentInlineCTAProps) {
  const { openDemoCalendar, openSignup } = useDemoCalendar();

  return (
    <div className="my-10 bg-white rounded-[20px] shadow-card overflow-hidden">
      <div className="px-8 py-8 text-center">
        <h3 className="font-hero font-extrabold tracking-[-0.02em] text-2xl md:text-[28px] text-[#10233A] mb-5">
          {headline}
        </h3>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Button onClick={openDemoCalendar} data-analytics-id={`cta-book-demo-${location}-inline`}>
            Book a Demo
          </Button>
          <Button variant="secondary" onClick={openSignup} data-analytics-id={`cta-download-${location}-inline`}>
            Download Sayso
          </Button>
        </div>
      </div>
    </div>
  );
}
