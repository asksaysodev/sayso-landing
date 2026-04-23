'use client';

import { LightningIcon } from '@/components/icons/LightningIcon';
import { useDemoCalendar } from '@/app/context/landing/DemoCalendarContext';

export function BlogInArticleCTA() {
  const { openDemoCalendar, openSystemSelect } = useDemoCalendar();

  return (
    <div className="my-10 bg-gradient-to-r from-[#1D4871] to-[#2367EE] rounded-2xl border-2 border-[#1D4871] v2-comic-shadow overflow-hidden">
      <div className="px-8 py-10 text-center">
        <h3 className="font-hero text-xl md:text-2xl text-white mb-3">
          Ready to Win the Moment?
        </h3>
        <p className="text-sm text-white/70 max-w-md mx-auto mb-6 font-sans">
          See how Sayso gives your team real-time coaching on every call.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <button
            onClick={openDemoCalendar}
            data-analytics-id="cta-book-demo-blog-article"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-transparent text-white font-bold text-sm border-2 border-white hover:bg-white/10 transition-colors"
          >
            Book a Demo
          </button>
          <button
            onClick={openSystemSelect}
            data-analytics-id="cta-download-blog-article"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#2367EE] text-white font-bold text-sm v4-hero-glow border-2 border-[#1D4871]"
          >
            <LightningIcon size={14} className="mr-1.5" />
            Download Sayso
          </button>
        </div>
      </div>
    </div>
  );
}
