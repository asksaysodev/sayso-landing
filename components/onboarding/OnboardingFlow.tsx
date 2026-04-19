'use client';

import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OnboardingProgress } from './OnboardingProgress';
import { LightningIcon } from '@/components/icons/LightningIcon';
import { OnboardingNavButtons } from './OnboardingNavButtons';
import { RoleScreen } from './screens/RoleScreen';
import { CallFrequencyScreen } from './screens/CallFrequencyScreen';
import { SaysoHelpScreen } from './screens/SaysoHelpScreen';
import { useDemoCalendar } from '@/app/context/landing/DemoCalendarContext';

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

export function OnboardingFlow() {
  const { openDemoCalendar } = useDemoCalendar();
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isSaysoHelping, setIsSaysoHelping] = useState(false);
  const [saysoHelpReady, setSaysoHelpReady] = useState(false);

  const [role, setRole] = useState<string | null>(null);
  const [callFrequency, setCallFrequency] = useState<string | null>(null);

  const TOTAL_STEPS = 2;

  const canContinue = useMemo((): boolean => {
    if (isSaysoHelping) return saysoHelpReady;
    switch (currentStep) {
      case 1: return role !== null;
      case 2: return callFrequency !== null;
      default: return false;
    }
  }, [isSaysoHelping, saysoHelpReady, currentStep, role, callFrequency]);

  const goNext = useCallback(() => {
    if (!canContinue) return;

    if (currentStep === TOTAL_STEPS && !isSaysoHelping) {
      setIsSaysoHelping(true);
      return;
    }

    if (isSaysoHelping) {
      openDemoCalendar();
      return;
    }

    setDirection(1);
    setCurrentStep((prev) => prev + 1);
  }, [currentStep, isSaysoHelping, TOTAL_STEPS, canContinue]);

  const goNextRef = useRef(goNext);
  useEffect(() => {
    goNextRef.current = goNext;
  });

  const autoAdvanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleAutoAdvance = useCallback(() => {
    if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
    autoAdvanceTimer.current = setTimeout(() => {
      goNextRef.current();
    }, 300);
  }, []);

  useEffect(() => {
    return () => {
      if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
    };
  }, []);

  const startOnboarding = () => {
    setDirection(1);
    setCurrentStep(1);
  };

  const goBack = () => {
    if (isSaysoHelping) {
      setIsSaysoHelping(false);
      setSaysoHelpReady(false);
      return;
    }
    setDirection(-1);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSaysoHelpReady = useCallback(() => {
    setSaysoHelpReady(true);
  }, []);

  useEffect(() => {
    if (!saysoHelpReady) return;
    const timer = setTimeout(() => {
      openDemoCalendar();
    }, 6000);
    return () => clearTimeout(timer);
  }, [saysoHelpReady]);

  const renderScreen = () => {
    if (isSaysoHelping) {
      return <SaysoHelpScreen onReady={handleSaysoHelpReady} />;
    }

    switch (currentStep) {
      case 0:
        return (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-2xl bg-[#2367EE] flex items-center justify-center mx-auto mb-4">
              <LightningIcon size={32} color="white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#1D4871]">
              Welcome to SaySo
            </h1>
            <p className="text-base text-[#1D4871]/60 mt-2 max-w-sm mx-auto">
              Let&apos;s see if it&apos;s the right fit for you.
            </p>
            <button
              onClick={startOnboarding}
              data-analytics-id="cta-onboarding-get-started"
              className="mt-6 px-8 py-3 rounded-full bg-[#2367EE] text-white font-bold text-base hover:bg-[#1b56cc] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2367EE] focus-visible:ring-offset-2 cursor-pointer"
            >
              Get Started
            </button>
          </div>
        );

      case 1:
        return (
          <RoleScreen
            value={role}
            onChange={setRole}
            onAutoAdvance={handleAutoAdvance}
          />
        );

      case 2:
        return (
          <CallFrequencyScreen
            value={callFrequency}
            onChange={setCallFrequency}
            onAutoAdvance={handleAutoAdvance}
          />
        );

      default:
        return null;
    }
  };

  const isWelcome = currentStep === 0;
  const isVerdict = false;
  const showNav = !isWelcome && !isVerdict;

  const progressStep = isSaysoHelping
    ? TOTAL_STEPS
    : Math.min(currentStep, TOTAL_STEPS + 1);

  return (
    <div className="flex flex-col">
      {!isWelcome && !isVerdict && (
        <OnboardingProgress currentStep={progressStep} totalSteps={TOTAL_STEPS} />
      )}

      <div className="px-6 py-6">
        <div className="max-w-lg mx-auto w-full">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={isSaysoHelping ? 'sayso-help' : currentStep}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              {renderScreen()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {showNav && (
        <OnboardingNavButtons
          onBack={goBack}
          onContinue={goNext}
          canContinue={canContinue}
          showBack={currentStep > 1 || isSaysoHelping}
          continueLabel={isSaysoHelping && saysoHelpReady ? 'Book a Demo' : undefined}
          continueDataAnalyticsId={isSaysoHelping && saysoHelpReady ? 'cta-book-demo-onboarding-complete' : undefined}
        />
      )}
    </div>
  );
}
