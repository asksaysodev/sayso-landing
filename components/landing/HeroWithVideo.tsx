'use client';

import Image from 'next/image';
import { useDemoCalendar } from '@/app/context/landing/DemoCalendarContext';
import { DesktopDemoFrame } from './DesktopDemoFrame';
import { LightningIcon } from '@/components/icons/LightningIcon';
import type { HeroContent } from '@/lib/content/personas/types';

const logos = [
  { name: 'eXp Realty', src: '/exp realty.png' },
  { name: 'Anderson Group', src: '/anderson group.png' },
  { name: 'Olaf', src: '/olaf logo.png' },
];

const defaultContent: HeroContent = {
  headline: 'Book 2x More Appointments from Prospecting Calls',
  tagline:
    'Real-time coaching during live calls helps agents handle objections, stay on track, and automatically log notes in your CRM.',
};

export function HeroWithVideo({ content = defaultContent }: { content?: HeroContent }) {
  const { openSystemSelect } = useDemoCalendar();

  return (
    <section className="relative bg-white pt-[50px] lg:pt-[60px] pb-[40px] lg:pb-[60px] overflow-x-hidden v2-halftone">
      <div className="max-w-[1600px] mx-auto px-6">

        {/* Centered headline + tagline + CTA */}
        <div className="text-center max-w-[820px] mx-auto">
          <h1
            className={`font-comic tracking-wide leading-[1.05] text-[#1D4871] v4-slide-in-left ${content.headlineSize ?? 'text-4xl sm:text-5xl lg:text-6xl xl:text-7xl'}`}
          >
            {content.headline}
          </h1>

          <p className="mt-4 text-base md:text-lg lg:text-xl leading-relaxed text-[#1D4871]/80 max-w-2xl mx-auto">
            {content.tagline}
          </p>
          {content.taglineSub && (
            <p className="mt-2 text-base md:text-lg lg:text-xl leading-relaxed text-[#1D4871]/80 max-w-2xl mx-auto">
              {content.taglineSub}
            </p>
          )}

          <div className="mt-6 md:mt-8 flex justify-center">
            <button
              onClick={openSystemSelect}
              data-analytics-id="cta-download-hero"
              className="inline-flex items-center justify-center rounded-full bg-[#FFDE59] px-6 sm:px-9 py-3 sm:py-3.5 text-base sm:text-lg font-semibold text-[#1D4871] border-2 border-[#1D4871] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4871] focus-visible:ring-offset-2 whitespace-nowrap"
              style={{ boxShadow: '3px 3px 0px #1D4871' }}
            >
              <LightningIcon size={16} className="mr-2 flex-shrink-0" />
              Download Sayso
            </button>
          </div>
        </div>

        {/* Full-width demo showcase */}
        <div className="mt-6 md:mt-8 max-w-[1400px] mx-auto">
          <DesktopDemoFrame>
            <video
              src="/sayso-demo.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          </DesktopDemoFrame>
        </div>

        {/* Social proof */}
        <div className="mt-8 md:mt-10 pt-2 md:pt-4">
          <div className="flex justify-center mb-5">
            <span
              className="text-sm md:text-base font-bold tracking-widest uppercase text-black text-center"
              style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
            >
              Trusted by Top Teams and Agents Nationwide
            </span>
          </div>
          <div className="flex items-center justify-center gap-10 md:gap-20">
            {logos.map((logo) => (
              <div
                key={logo.name}
                className="flex flex-1 items-center justify-center max-w-[180px] md:max-w-[260px]"
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={260}
                  height={100}
                  className="h-16 md:h-24 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
