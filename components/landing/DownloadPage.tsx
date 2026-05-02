'use client';

import { useDemoCalendar } from '@/app/context/landing/DemoCalendarContext';
import { LightningIcon } from '@/components/icons/LightningIcon';

export function DownloadPage() {
  const { openSystemSelect } = useDemoCalendar();

  return (
    <main className="bg-[#F4F4F5] min-h-screen">
      <div className="max-w-[760px] mx-auto px-6 py-20 md:py-28">
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-[#1D4871]/60 mb-3">
            Get Started
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1D4871] leading-tight mb-4">
            Download Sayso
          </h1>
          <p className="text-base md:text-lg text-[#1D4871]/80 leading-relaxed max-w-[560px] mx-auto mb-10">
            Set up Sayso on your computer to get real-time call coaching, automatic call notes,
            and live market data on every prospecting call. The download takes about a minute, and
            you can start your first call right after.
          </p>
          <button
            onClick={openSystemSelect}
            data-analytics-id="cta-download-page"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-[#2367EE] text-white font-bold text-base md:text-lg v4-hero-glow border-2 border-[#1D4871] focus:outline-none focus:ring-2 focus:ring-[#2367EE] focus:ring-offset-2"
          >
            <LightningIcon size={16} className="mr-2" />
            Download Sayso
          </button>
        </div>
      </div>
    </main>
  );
}
