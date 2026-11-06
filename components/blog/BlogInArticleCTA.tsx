'use client';

import { Button } from '@/components/ui/Button';
import { useDemoCalendar } from '@/app/context/landing/DemoCalendarContext';
import { BlogCtaCard } from './BlogCtaCard';

export function BlogInArticleCTA() {
  const { openDemoCalendar, openSignup } = useDemoCalendar();

  return (
    <BlogCtaCard>
      <div className="px-8 py-10 text-center">
        <h3 className="font-hero font-extrabold tracking-[-0.02em] text-2xl md:text-[28px] text-white mb-3">
          Ready to Win the Moment?
        </h3>
        <p className="text-base text-white/80 max-w-md mx-auto mb-6 font-sans">
          See how Sayso gives your team real-time guidance on every call.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Button onClick={openSignup} data-analytics-id="cta-download-blog-article">
            Get Sayso
          </Button>
          <Button variant="secondary" onClick={openDemoCalendar} data-analytics-id="cta-book-demo-blog-article">
            Book a demo
          </Button>
        </div>
      </div>
    </BlogCtaCard>
  );
}
