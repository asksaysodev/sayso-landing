'use client';

import { useState } from 'react';

// Inline SVG Icons (same as v3)
const GridIcon = () => (
  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 2H6V6H2V2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 2H12V6H8V2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 8H6V12H2V8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 8H12V12H8V8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ToggleOnIcon = () => (
  <svg width="20" height="12" viewBox="0 0 24 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="22" height="12" rx="6" fill="#2367EE" stroke="none"/>
    <circle cx="18" cy="7" r="4" fill="white"/>
  </svg>
);

const RecordIcon = () => (
  <svg width="10" height="10" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="7" cy="7" r="5" fill="#EF4444" stroke="currentColor" strokeWidth="0.5"/>
  </svg>
);

const CalendarIcon = ({ className }: { className?: string }) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="2" y="3" width="10" height="9" rx="1" stroke="currentColor" strokeWidth="1.2" fill="none"/>
    <path d="M2 5.5H12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M5 1.5V3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M9 1.5V3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    <circle cx="5" cy="8" r="0.8" fill="currentColor"/>
    <circle cx="7" cy="8" r="0.8" fill="currentColor"/>
    <circle cx="9" cy="8" r="0.8" fill="currentColor"/>
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M1.5 5L4 7.5L8.5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Comic-style hand-drawn arrow with speed lines
const ComicArrow = () => (
  <svg
    className="hidden md:block flex-shrink-0"
    width="90"
    height="60"
    viewBox="0 0 90 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 30 C 20 18, 32 14, 45 18 S 62 28, 72 24"
      stroke="#1D4871"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M64 16 L76 24 L64 33"
      stroke="#1D4871"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

// Small comic sound effect badge
function SoundEffectBadge({ text, color = '#FFDE59', rotate = 12, className = '' }: {
  text: string;
  color?: string;
  rotate?: number;
  className?: string;
}) {
  return (
    <div
      className={`absolute z-20 ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div className="relative">
        <svg viewBox="0 0 80 80" className="w-14 h-14 md:w-16 md:h-16" fill="none">
          <polygon
            points="40,2 48,18 68,8 60,26 78,30 62,40 78,52 60,50 65,70 48,58 40,76 32,58 15,70 20,50 2,52 18,40 2,30 20,26 12,8 32,18"
            fill={color}
            stroke="#1D4871"
            strokeWidth="2"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-comic text-[#1D4871] text-xs tracking-wide">
          {text}
        </span>
      </div>
    </div>
  );
}

// Panel number badge
function PanelNumberBadge({ number }: { number: number }) {
  return (
    <div className="absolute -top-2 -left-2 z-20">
      <span className="v2-pow-badge px-2 py-0.5 rounded text-base font-comic tracking-wider">
        STEP {number}
      </span>
    </div>
  );
}

// Step 1
function StepVisualStartSayso() {
  return (
    <div className="w-full h-full relative bg-gradient-to-br from-[#0d1b2a] to-[#1a2a3a] rounded-2xl overflow-hidden p-3 flex items-center justify-center">
      <div className="w-full max-w-[240px] flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 px-2.5 h-8 rounded-full showcase-glass border border-white/15 shadow-[0_10px_25px_rgba(0,0,0,0.35)]">
          <div className="p-0.5 text-white/80"><GridIcon /></div>
          <span className="text-[11px] text-white/80 whitespace-nowrap">Launch Coach</span>
          <div className="flex-shrink-0"><ToggleOnIcon /></div>
        </div>
        <button className="px-3 py-1.5 h-8 rounded-full bg-[#2367EE] text-white text-[11px] font-semibold whitespace-nowrap shadow-sm">
          Select Prospect
        </button>
      </div>
    </div>
  );
}

// Step 2
function StepVisualPrompts() {
  return (
    <div className="w-full h-full relative bg-gradient-to-br from-[#0d1b2a] to-[#1a2a3a] rounded-2xl overflow-hidden p-3 flex flex-col items-center justify-start gap-2">
      <div className="w-full max-w-[240px] flex items-center gap-1.5 px-2.5 h-8 rounded-full showcase-glass border border-white/15 shadow-[0_10px_25px_rgba(0,0,0,0.35)]">
        <div className="p-0.5 text-white/80"><GridIcon /></div>
        <span className="text-[11px] text-white/80 whitespace-nowrap">Sayso started</span>
        <div className="h-4 w-px bg-white/15" />
        <div className="relative p-0.5">
          <RecordIcon />
          <span className="absolute inset-0 rounded-full bg-red-500/30 animate-pulse" />
        </div>
        <div className="px-1.5 py-0.5 rounded-full bg-white/10 border border-white/10">
          <span className="text-[10px] font-mono text-white/80">0:25:21</span>
        </div>
      </div>
      <div className="w-full max-w-[240px] px-3 py-2 rounded-xl showcase-glass-strong border border-white/15 shadow-[0_10px_25px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(114,126,137,0.4)]">
        <p className="text-[11px] leading-tight text-white/90">
          Ask <span className="text-white font-medium">&quot;What would make a move worth it for you in the next 6 months?&quot;</span>
        </p>
        <p className="text-[10px] text-white/60 mt-1">to uncover the real motivation.</p>
      </div>
    </div>
  );
}

// Step 3
function StepVisualBooked() {
  return (
    <div className="w-full h-full relative bg-gradient-to-br from-[#FFDE59]/20 to-white/60 rounded-2xl overflow-hidden p-4 flex items-center justify-center">
      <div className="w-full max-w-[220px] bg-white rounded-xl v2-comic-border p-3 v2-comic-shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <CalendarIcon className="text-[#1D4871]" />
            <span className="text-[11px] font-bold text-[#1D4871] font-comic tracking-wide">Booked</span>
          </div>
          <div className="w-5 h-5 rounded-full bg-[#2367EE] flex items-center justify-center">
            <CheckIcon className="text-white" />
          </div>
        </div>
        <h4 className="text-[13px] font-bold text-[#1D4871] mb-1">Buyer Consultation</h4>
        <p className="text-[11px] text-[#1D4871]/70 mb-2">Tomorrow • 2:00 PM</p>
        <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#2367EE]/10 border-2 border-[#2367EE]/30">
          <span className="text-[10px] font-bold text-[#2367EE]">Confirmed</span>
        </div>
      </div>
    </div>
  );
}

interface StepProps {
  number: number;
  title: string;
  description: string;
  visual: React.ReactNode;
  tilt?: string;
  soundEffect: string;
  soundColor: string;
  soundRotate: number;
  soundPosition: string;
}

function StepCard({ title, description, visual, tilt, number, soundEffect, soundColor, soundRotate, soundPosition }: StepProps) {
  return (
    <div className={`flex flex-col items-center text-center ${tilt || ''}`}>
      {/* Visual Card — comic panel with V4 enhancements */}
      <div className="relative w-full max-w-[280px] aspect-[4/3] rounded-2xl v4-panel-border bg-[#F4F4F5] v2-comic-shadow mb-6 overflow-visible">
        <PanelNumberBadge number={number} />
        <div className="w-full h-full rounded-[13px] overflow-hidden">
          {visual}
        </div>
      </div>
      <h3 className="text-2xl md:text-3xl text-black mb-3 tracking-wide font-bold" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
        {title}
      </h3>
      <p className="text-[1.1rem] text-[#1D4871]/70 max-w-sm leading-relaxed min-h-[60px]">
        {description}
      </p>
    </div>
  );
}

export function ThreeStepsSection() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      number: 1,
      title: '1. Launch Coach',
      description: 'Turn Sayso on while you\'re calling to get real-time context-based guidance during the call.',
      visual: <StepVisualStartSayso />,
      tilt: 'v2-tilt-left',
      soundEffect: 'CLICK!',
      soundColor: '#60A5FA',
      soundRotate: 15,
      soundPosition: '-top-5 -right-5',
    },
    {
      number: 2,
      title: '2. Get Real-Time Prompts',
      description: 'Sayso suggests what to ask or say next.',
      visual: <StepVisualPrompts />,
      tilt: '',
      soundEffect: 'ZAP!',
      soundColor: '#FFDE59',
      soundRotate: -10,
      soundPosition: '-top-5 -right-5',
    },
    {
      number: 3,
      title: '3. Win the moment',
      description: 'Sayso helps you earn the meeting at the right moment—so appointments are more qualified and more likely to convert.',
      visual: <StepVisualBooked />,
      tilt: 'v2-tilt-right',
      soundEffect: 'BOOM!',
      soundColor: '#FFDE59',
      soundRotate: 12,
      soundPosition: '-top-5 -right-5',
    },
  ];

  const step = steps[currentStep];

  return (
    <section id="how-it-works" className="mt-16 md:mt-20 lg:mt-24 bg-white py-12 md:py-16 lg:py-20 v2-halftone relative">
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Headline */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <h2 className="font-comic text-3xl md:text-4xl lg:text-5xl text-[#1D4871] mb-4 tracking-wide">
            <svg width="24" height="24" viewBox="0 0 512 512" fill="none" className="inline-block mr-2 -mt-1">
              <path d="M294.4 25.6L115.2 281.6H256L217.6 486.4L396.8 230.4H256L294.4 25.6Z" fill="#2367EE" stroke="#2367EE" strokeWidth="20"/>
            </svg>
            Sayso in 3 Easy Steps
          </h2>
          <p className="text-[1.2rem] text-[#1D4871]/70 max-w-2xl mx-auto leading-relaxed">
            Real-time guidance that keeps prospecting calls structured and moving toward a booked appointment.
          </p>
        </div>

        {/* Mobile: carousel — hidden on md+ */}
        <div className="md:hidden flex flex-col items-center">
          <StepCard
            key={step.number}
            number={step.number}
            title={step.title}
            description={step.description}
            visual={step.visual}
            tilt={step.tilt}
            soundEffect={step.soundEffect}
            soundColor={step.soundColor}
            soundRotate={step.soundRotate}
            soundPosition={step.soundPosition}
          />
          <div className="flex items-center justify-center gap-4 mt-4">
            <button
              onClick={() => setCurrentStep(s => Math.max(0, s - 1))}
              disabled={currentStep === 0}
              aria-label="Previous step"
              className="w-9 h-9 rounded-full border-2 border-[#1D4871] bg-white flex items-center justify-center disabled:opacity-30 transition-opacity"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 12L6 8l4-4" stroke="#1D4871" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
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
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4l4 4-4 4" stroke="#1D4871" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop: all three steps side by side — unchanged */}
        <div className="hidden md:flex flex-row items-center md:items-start justify-center gap-8 md:gap-4 lg:gap-8">
          {steps.map((s, index) => (
            <div key={s.number} className="flex items-center gap-4 lg:gap-6">
              <StepCard
                number={s.number}
                title={s.title}
                description={s.description}
                visual={s.visual}
                tilt={s.tilt}
                soundEffect={s.soundEffect}
                soundColor={s.soundColor}
                soundRotate={s.soundRotate}
                soundPosition={s.soundPosition}
              />
              {index < steps.length - 1 && (
                <div className="hidden md:flex items-center self-start mt-[25%]">
                  <ComicArrow />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
