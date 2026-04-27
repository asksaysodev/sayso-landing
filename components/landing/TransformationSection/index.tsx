'use client';

import Image from 'next/image';
import { useDemoCalendar } from '@/app/context/landing/DemoCalendarContext';
import { LightningIcon } from '@/components/icons/LightningIcon';
import { metrics as defaultMetrics } from './metrics';
import { HeroStarburst } from './HeroStarburst';
import type { TransformationContent } from '@/lib/content/personas/types';

const defaultContent: TransformationContent = {
  headline: "With SaySo, You're Unstoppable",
  subheading: 'Transform every prospecting call into a winning conversation.',
  metrics: defaultMetrics,
};

export function TransformationSection({ content = defaultContent }: { content?: TransformationContent }) {
  const { openDemoCalendar, openSystemSelect } = useDemoCalendar();
  const { headline, subheading, metrics } = content;

  return (
    <section className="relative bg-[#1D4871] py-10 md:py-20 lg:py-24 overflow-hidden v4-halftone-dark">
      {/* Yellow accent stripe at top */}
      <div className="absolute top-0 left-0 right-0 h-3 md:h-4 bg-[#FFDE59]" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12 items-center">
          {/* Left column - Hero imagery (3/5 width on desktop) */}
          <div className="lg:col-span-2 flex-col items-center relative hidden md:flex">
            <HeroStarburst />

            {/* Large superhero character */}
            <div className="relative z-10">
              <Image
                src="/sayso_superhero_point_right.png"
                alt="SaySo Superhero"
                width={484}
                height={515}
                className="w-48 md:w-64 lg:w-72 xl:w-80 h-auto drop-shadow-2xl v4-hero-float"
              />
            </div>
          </div>

          {/* Right column - Victory metrics (2/5 width on desktop) */}
          <div className="lg:col-span-3">
            <h2 className="font-comic text-3xl md:text-4xl lg:text-5xl text-white mb-3 tracking-wide text-center lg:text-left">
              {headline}
            </h2>
            <p className="text-base md:text-lg text-white/70 mb-5 md:mb-10 text-center lg:text-left max-w-xl">
              {subheading}
            </p>

            {/* Victory metric cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
              {metrics.map((metric, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl v2-comic-border v2-comic-shadow p-3 md:p-5"
                >
                  <div className="mb-2">{metric.icon}</div>
                  {metric.label && (
                    <p className="text-xs font-bold tracking-widest text-[#2367EE] uppercase mb-1">
                      {metric.label}
                    </p>
                  )}
                  <h3 className="font-comic text-xl md:text-2xl text-black tracking-wide mb-1">
                    {metric.title}
                  </h3>
                  <p className="text-base text-[#1D4871]/70 leading-relaxed">
                    {metric.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Final CTA */}
            <div className="mt-5 md:mt-10 flex gap-3 justify-center lg:justify-start">
              <button
                onClick={openSystemSelect}
                data-analytics-id="cta-download-transformation-section"
                className="inline-flex items-center justify-center rounded-full bg-[#FFDE59] px-4 py-2.5 md:px-6 md:py-3.5 text-sm md:text-[1.1rem] font-bold text-[#1D4871] border-2 border-[#1D4871] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4871] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1D4871] whitespace-nowrap"
                style={{ boxShadow: '3px 3px 0px #1D4871' }}
              >
                <LightningIcon size={16} color="#1D4871" className="mr-1.5" />
                <span className="lg:hidden">Create an Account</span>
                <span className="hidden lg:inline">Download Sayso</span>
              </button>
              <button
                onClick={openDemoCalendar}
                data-analytics-id="cta-book-demo-transformation-section"
                className="inline-flex items-center justify-center rounded-full bg-[#2367EE] px-4 py-2.5 md:px-6 md:py-3.5 text-sm md:text-[1.1rem] font-bold text-white v4-hero-glow border-2 border-[#1D4871] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2367EE] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1D4871] whitespace-nowrap"
              >
                Book a Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
