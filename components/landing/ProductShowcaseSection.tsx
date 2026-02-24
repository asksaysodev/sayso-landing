'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

// TODO: Use Lucide Icons instead
// === Inline SVG Icons ===

const GridIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 2H6V6H2V2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 2H12V6H8V2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 8H6V12H2V8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 8H12V12H8V8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PauseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="2" width="2" height="10" rx="1" fill="currentColor"/>
    <rect x="8" y="2" width="2" height="10" rx="1" fill="currentColor"/>
  </svg>
);

const RecordIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="7" cy="7" r="5" fill="#EF4444" stroke="currentColor" strokeWidth="0.5"/>
  </svg>
);

const ToggleOnIcon = () => (
  <svg width="24" height="14" viewBox="0 0 24 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="22" height="12" rx="6" fill="#2367EE" stroke="none"/>
    <circle cx="18" cy="7" r="4" fill="white"/>
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="7" fill="#219e66"/>
    <path d="M5 8L7 10L11 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SparkleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 1L8.5 5.5L13 7L8.5 8.5L7 13L5.5 8.5L1 7L5.5 5.5L7 1Z" fill="currentColor"/>
  </svg>
);

// === Data ===

const SUGGESTIONS = [
  {
    text: 'Ask "What would make a move worth it for you in the next 6 months?" to uncover the real motivation.',
    source: 'Past call with Sarah Chen',
  },
  {
    text: 'Try "What happens if you wait another year to sell?" — this reframes urgency without pressure.',
    source: 'Objection handling playbook',
  },
  {
    text: 'Say "Walk me through your ideal timeline from listing to closing" to anchor next steps.',
    source: 'Top performer pattern',
  },
];

const SMART_CAPTURE_SIGNALS = [
  { label: 'Pain Point', quote: '...paying too much in fees with current agent...' },
  { label: 'Timeline', quote: '...hoping to list by end of Q2...' },
  { label: 'Decision Maker', quote: '...need to talk it over with my wife...' },
  { label: 'Objection', quote: '...not sure if now is the right time to sell...' },
];

// === Subcomponents ===

function ControlPill({ timerSeconds }: { timerSeconds: number }) {
  const mins = Math.floor(timerSeconds / 60);
  const secs = timerSeconds % 60;
  const formatted = `0:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  return (
    <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 h-8 rounded-full bg-white/10 border border-white/10 overflow-hidden">
      <button className="p-1 text-white/80 flex-shrink-0">
        <GridIcon />
      </button>
      <span className="hidden sm:inline text-[12px] text-white/80 whitespace-nowrap">Show Smart Capture</span>
      <div className="hidden sm:block flex-shrink-0">
        <ToggleOnIcon />
      </div>
      <div className="hidden sm:block h-4 w-px bg-white/15" />
      <div className="flex items-center gap-1 sm:gap-1.5">
        <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
          <span className="text-[10px] font-semibold text-white">TL</span>
        </div>
        <span className="hidden md:inline text-[12px] text-white/80 whitespace-nowrap">Thomas Lopez</span>
        <button className="p-0.5 text-white/60 flex-shrink-0">
          <ChevronDownIcon />
        </button>
      </div>
      <div className="h-4 w-px bg-white/15" />
      <button className="p-1 text-white/80 flex-shrink-0">
        <PauseIcon />
      </button>
      <button className="p-1 text-white/80 flex-shrink-0">
        <div className="relative">
          <RecordIcon />
          <span className="absolute inset-0 rounded-full bg-red-500/30 animate-pulse" />
        </div>
      </button>
      <div className="px-2 py-0.5 rounded-full bg-white/10 border border-white/10 flex-shrink-0">
        <span className="text-[11px] font-mono text-white/80">{formatted}</span>
      </div>
    </div>
  );
}

function TypewriterSuggestion({ text, source, isActive }: { text: string; source: string; isActive: boolean }) {
  const [displayedChars, setDisplayedChars] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setDisplayedChars(0);
      setFadingOut(false);
      return;
    }

    setDisplayedChars(0);
    setFadingOut(false);

    // Start typing after a brief delay
    const startDelay = setTimeout(() => {
      let charIndex = 0;
      const interval = setInterval(() => {
        charIndex++;
        setDisplayedChars(charIndex);
        if (charIndex >= text.length) {
          clearInterval(interval);
        }
      }, 25);
      return () => clearInterval(interval);
    }, 300);

    return () => clearTimeout(startDelay);
  }, [isActive, text]);

  // Blink cursor
  useEffect(() => {
    const interval = setInterval(() => setShowCursor(prev => !prev), 530);
    return () => clearInterval(interval);
  }, []);

  const displayedText = text.slice(0, displayedChars);
  const isDoneTyping = displayedChars >= text.length;

  return (
    <div className={`showcase-glass-strong rounded-xl sm:rounded-2xl border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(114,126,137,0.4)] overflow-hidden transition-opacity duration-500 ${fadingOut ? 'opacity-0' : 'opacity-100'}`}>
      {/* Header */}
      <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 pt-2 sm:pt-3 pb-0.5 sm:pb-1">
        <span className="text-[#2367EE]"><SparkleIcon /></span>
        <span className="text-[9px] sm:text-[11px] font-semibold text-white/60 uppercase tracking-wider">Sayso suggests</span>
      </div>
      {/* Body */}
      <div className="px-2.5 sm:px-4 pb-1.5 sm:pb-2">
        <p className="text-[11px] sm:text-[14px] md:text-[15px] leading-relaxed text-white/95 font-medium">
          &quot;{displayedText}&quot;
          {!isDoneTyping && (
            <span className={`inline-block w-[2px] h-[14px] bg-white/80 ml-0.5 align-middle ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
          )}
        </p>
      </div>
      {/* Source chip */}
      <div className={`px-2.5 sm:px-4 pb-2 sm:pb-3 transition-opacity duration-300 ${isDoneTyping ? 'opacity-100' : 'opacity-0'}`}>
        <div className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-white/8 border border-white/10">
          <div className="w-3.5 sm:w-4 h-3.5 sm:h-4 rounded-full bg-[#2367EE]/30 flex items-center justify-center">
            <span className="text-[7px] sm:text-[8px] text-[#2367EE] font-bold">S</span>
          </div>
          <span className="text-[9px] sm:text-[11px] text-white/60">{source}</span>
        </div>
      </div>
    </div>
  );
}

function SmartCapturePanel({ visibleSignals }: { visibleSignals: number }) {
  return (
    <div className="showcase-glass-strong rounded-2xl border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(114,126,137,0.4)] overflow-hidden">
      <div className="px-3 pt-2.5 pb-1.5">
        <span className="text-[11px] font-semibold text-white/60 uppercase tracking-wider">Smart Capture</span>
      </div>
      <div className="px-2 pb-2">
        {SMART_CAPTURE_SIGNALS.map((signal, i) => {
          const isVisible = i < visibleSignals;
          const isNew = i === visibleSignals - 1;
          return (
            <div
              key={signal.label}
              className={`flex items-start gap-2 px-2 py-1.5 rounded-lg transition-all duration-500 ${
                isNew ? 'showcase-signal-enter bg-white/8' : ''
              } ${isVisible ? 'opacity-100' : 'opacity-30'}`}
            >
              <div className={`mt-0.5 flex-shrink-0 transition-all duration-300 ${isVisible ? 'scale-100' : 'scale-75'}`}>
                {isVisible ? (
                  <CheckCircleIcon />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-white/20" />
                )}
              </div>
              <div className="min-w-0">
                <span className={`text-[12px] font-semibold block ${isVisible ? 'text-white/90' : 'text-white/40'}`}>
                  {signal.label}
                </span>
                {isVisible && (
                  <p className="text-[11px] text-white/50 leading-tight mt-0.5 showcase-fade-in">
                    {signal.quote}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ActionBar() {
  return (
    <div className="flex items-center gap-2">
      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2367EE] text-white text-[12px] font-semibold shadow-[0_4px_12px_rgba(35,103,238,0.4)] showcase-glow-pulse">
        <SparkleIcon />
        What should I say?
      </button>
      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/80 text-[12px]">
        Follow-up questions
      </button>
    </div>
  );
}

function InputBar() {
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10">
      <span className="text-[13px] text-white/30">Ask anything about the call...</span>
    </div>
  );
}

// === Video Call Background ===

function VideoCallMockup() {
  return (
    <div className="absolute inset-0 flex">
      {/* Left participant - Seller */}
      <div className="flex-1 relative bg-[#0d1b2a] overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/sayso_seller.mp4" type="video/mp4" />
        </video>
        {/* Name tag */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2 z-10">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-black/50 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.6)]" />
            <span className="text-[11px] text-white/80 font-medium">You</span>
          </div>
        </div>
      </div>

      {/* Right participant - Buyer */}
      <div className="flex-1 relative bg-[#0d1b2a] overflow-hidden border-l border-white/5">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/sayso_buyer.mp4" type="video/mp4" />
        </video>
        {/* Name tag */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2 z-10">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-black/50 backdrop-blur-sm">
            <span className="text-[11px] text-white/80 font-medium">Jane Smith</span>
          </div>
        </div>
        {/* Speaking indicator */}
        <div className="absolute bottom-3 right-3 z-10">
          <div className="flex gap-1 px-2 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/10">
            <div className="w-1 h-3 rounded-full bg-green-400/80 showcase-bar-1" />
            <div className="w-1 h-3 rounded-full bg-green-400/80 showcase-bar-2" />
            <div className="w-1 h-3 rounded-full bg-green-400/80 showcase-bar-3" />
            <div className="w-1 h-3 rounded-full bg-green-400/80 showcase-bar-4" />
          </div>
        </div>
      </div>
    </div>
  );
}

// === Main Component ===

export function ProductShowcaseSection() {
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [currentSuggestion, setCurrentSuggestion] = useState(0);
  const [visibleSignals, setVisibleSignals] = useState(0);
  const [cycleKey, setCycleKey] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const CYCLE_DURATION = 12000; // 12s per suggestion cycle

  const startCycle = useCallback(() => {
    // Reset for new cycle
    setVisibleSignals(0);

    // Stagger smart capture signals
    const signalTimers = SMART_CAPTURE_SIGNALS.map((_, i) =>
      setTimeout(() => setVisibleSignals(i + 1), 2000 + i * 2000)
    );

    return () => signalTimers.forEach(clearTimeout);
  }, []);

  // Timer ticking
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimerSeconds(prev => prev + 1);
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Suggestion cycling
  useEffect(() => {
    const cleanup = startCycle();

    const cycleInterval = setInterval(() => {
      setCurrentSuggestion(prev => (prev + 1) % SUGGESTIONS.length);
      setCycleKey(prev => prev + 1);
    }, CYCLE_DURATION);

    return () => {
      cleanup();
      clearInterval(cycleInterval);
    };
  }, [startCycle]);

  // Restart signal animations on each new suggestion
  useEffect(() => {
    const cleanup = startCycle();
    return cleanup;
  }, [cycleKey, startCycle]);

  return (
    <section className="bg-white py-12 md:py-14 lg:py-16">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Copy Section */}
        <div className="text-center mb-8 md:mb-12">
          <p className="text-[12px] uppercase tracking-wider text-[#1D4871]/60 font-semibold mb-3 md:mb-4">
            LIVE DURING THE CALL
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1D4871] mb-3 md:mb-4">
            See the moment before it passes.
          </h2>
          <p className="text-base md:text-lg text-[#1D4871]/80 max-w-2xl mx-auto">
            Sayso surfaces the next best question while you&apos;re still in the conversation.
          </p>
        </div>

        <ProductShowcaseVideo
          timerSeconds={timerSeconds}
          cycleKey={cycleKey}
          currentSuggestion={currentSuggestion}
          visibleSignals={visibleSignals}
        />
      </div>
    </section>
  );
}

// Standalone video mock — used in hero area
export function ProductShowcaseVideo({
  timerSeconds,
  cycleKey,
  currentSuggestion,
  visibleSignals,
  cropped,
}: {
  timerSeconds: number;
  cycleKey: number;
  currentSuggestion: number;
  visibleSignals: number;
  cropped?: boolean;
}) {
  return (
    <div className={`w-full rounded-3xl border border-[#1D4871]/10 bg-[#0d1b2a] shadow-[0_24px_70px_rgba(0,0,0,0.35)] overflow-hidden ${cropped ? 'max-h-[340px] md:max-h-[420px] lg:max-h-[480px]' : ''}`}>
      <div className="aspect-[3/4] sm:aspect-[21/9] relative">
        {/* Video call background */}
        <VideoCallMockup />

        {/* Top header bar with control pill centered */}
        <div className="absolute top-0 left-0 right-0 h-10 bg-black/60 backdrop-blur-sm flex items-center justify-between px-4 z-20 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
          </div>
          {/* Control pill centered in header */}
          <ControlPill timerSeconds={timerSeconds} />
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-white/40">HD</span>
            <button className="px-2.5 py-1 rounded bg-red-600 text-white text-[11px] font-semibold">End</button>
          </div>
        </div>

        {/* Suggestion box just below header */}
        <div className="absolute top-12 left-3 sm:left-4 md:left-5 z-10">
          <div className="max-w-[45%] sm:max-w-xs md:max-w-lg">
            <TypewriterSuggestion
              key={cycleKey}
              text={SUGGESTIONS[currentSuggestion].text}
              source={SUGGESTIONS[currentSuggestion].source}
              isActive={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Copy section shown below the video
export function ProductShowcaseCopy() {
  return (
    <section className="bg-white py-12 md:py-14 lg:py-16">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center">
          <p className="text-[12px] uppercase tracking-wider text-[#1D4871]/60 font-semibold mb-3 md:mb-4">
            LIVE DURING THE CALL
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1D4871] mb-3 md:mb-4">
            See the moment before it passes.
          </h2>
          <p className="text-base md:text-lg text-[#1D4871]/80 max-w-2xl mx-auto">
            Sayso surfaces the next best question while you&apos;re still in the conversation.
          </p>
        </div>
      </div>
    </section>
  );
}
