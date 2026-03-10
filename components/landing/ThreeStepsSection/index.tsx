'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { LightningIcon } from '@/components/icons/LightningIcon';
import { StepCard } from './StepCard';
import { StepVisualStartSayso, StepVisualPrompts, StepVisualBooked } from './StepVisuals';
import { ComicArrow } from './ComicArrow';
import { useDemoCalendar } from '@/app/context/landing/DemoCalendarContext';
import type { ThreeStepsContent } from '@/lib/content/personas/types';

const defaultContent: ThreeStepsContent = {
  headline: 'Sayso in 3 Easy Steps',
  subheading: 'Real-time guidance that keeps prospecting calls structured and moving toward a booked appointment.',
  steps: [
    {
      title: '1. Launch Coach',
      description: "Turn Sayso on while you're calling to get real-time context-based guidance during the call.",
    },
    {
      title: '2. Get Real-Time Prompts',
      description: 'Sayso suggests what to ask or say next.',
    },
    {
      title: '3. Win the moment',
      description: 'Sayso helps you earn the meeting at the right moment—so appointments are more qualified and more likely to convert.',
    },
  ],
};

export function ThreeStepsSection({ content = defaultContent }: { content?: ThreeStepsContent }) {
  const [currentStep, setCurrentStep] = useState(0);
  const { openDemoCalendar } = useDemoCalendar();

  const steps = [
    {
      number: 1,
      title: content.steps[0].title,
      description: content.steps[0].description,
      visual: <StepVisualStartSayso />,
      tilt: 'v2-tilt-left',
    },
    {
      number: 2,
      title: content.steps[1].title,
      description: content.steps[1].description,
      visual: <StepVisualPrompts />,
      tilt: '',
    },
    {
      number: 3,
      title: content.steps[2].title,
      description: content.steps[2].description,
      visual: <StepVisualBooked />,
      tilt: 'v2-tilt-right',
    },
  ];

  const step = steps[currentStep];

  return (
    <section id="how-it-works" className="mt-6 md:mt-20 lg:mt-24 bg-white py-12 md:py-16 lg:py-20 v2-halftone relative">
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <h2 className="font-comic text-3xl md:text-4xl lg:text-5xl text-[#1D4871] mb-4 tracking-wide">
            <LightningIcon size={24} color="#2367EE" className="inline-block mr-2 -mt-1" />
            {content.headline}
          </h2>
          <p className="text-[1.2rem] text-[#1D4871]/70 max-w-2xl mx-auto leading-relaxed">
            {content.subheading}
          </p>
        </div>

        {/* Mobile: carousel */}
        <div className="md:hidden flex flex-col items-center">
          <StepCard
            key={step.number}
            number={step.number}
            title={step.title}
            description={step.description}
            visual={step.visual}
            tilt={step.tilt}
          />
          <div className="flex items-center justify-center gap-4 mt-4">
            <button
              onClick={() => setCurrentStep(s => Math.max(0, s - 1))}
              disabled={currentStep === 0}
              aria-label="Previous step"
              className="w-9 h-9 rounded-full border-2 border-[#1D4871] bg-white flex items-center justify-center disabled:opacity-30 transition-opacity"
            >
              <ChevronLeft size={16} color="#1D4871" />
            </button>
            <div className="flex gap-2">
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentStep(i)}
                  aria-label={`Step ${i + 1}`}
                  className={`w-2 h-2 rounded-full transition-colors ${i === currentStep ? 'bg-[#1D4871]' : 'bg-[#1D4871]/30'}`}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrentStep(s => Math.min(steps.length - 1, s + 1))}
              disabled={currentStep === steps.length - 1}
              aria-label="Next step"
              className="w-9 h-9 rounded-full border-2 border-[#1D4871] bg-white flex items-center justify-center disabled:opacity-30 transition-opacity"
            >
              <ChevronRight size={16} color="#1D4871" />
            </button>
          </div>
        </div>

        {/* Desktop: all three steps side by side */}
        <div className="hidden md:flex flex-row items-center md:items-start justify-center gap-8 md:gap-4 lg:gap-8">
          {steps.map((s, index) => (
            <div key={s.number} className="flex items-center gap-4 lg:gap-6">
              <StepCard
                number={s.number}
                title={s.title}
                description={s.description}
                visual={s.visual}
                tilt={s.tilt}
              />
              {index < steps.length - 1 && (
                <div className="hidden md:flex items-center self-start mt-[25%]">
                  <ComicArrow />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-10 md:mt-14 flex gap-3 justify-center">
          <button
            onClick={openDemoCalendar}
            className="inline-flex items-center justify-center rounded-full bg-[#FFDE59] px-4 py-2.5 md:px-6 md:py-3.5 text-sm md:text-[1.1rem] font-bold text-[#1D4871] border-2 border-[#1D4871] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4871] focus-visible:ring-offset-2 whitespace-nowrap"
            style={{ boxShadow: '3px 3px 0px #1D4871' }}
          >
            <LightningIcon size={16} color="#1D4871" className="mr-1.5" />
            Activate Sayso
          </button>
          <button
            onClick={openDemoCalendar}
            className="inline-flex items-center justify-center rounded-full bg-[#2367EE] px-4 py-2.5 md:px-6 md:py-3.5 text-sm md:text-[1.1rem] font-bold text-white v4-hero-glow border-2 border-[#1D4871] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2367EE] focus-visible:ring-offset-2 whitespace-nowrap"
          >
            Book a Demo
          </button>
        </div>
      </div>
    </section>
  );
}
