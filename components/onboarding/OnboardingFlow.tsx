'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OnboardingProgress } from './OnboardingProgress';
import { LightningIcon } from '@/components/icons/LightningIcon';
import { OnboardingNavButtons } from './OnboardingNavButtons';
import { FeelingCheckScreen } from './screens/FeelingCheckScreen';
import { CallFrequencyScreen } from './screens/CallFrequencyScreen';
import { SupportTechScreen } from './screens/SupportTechScreen';
import { LeadTypeScreen } from './screens/LeadTypeScreen';
import { GoalsScreen } from './screens/GoalsScreen';
import { SaysoHelpScreen } from './screens/SaysoHelpScreen';
import { ContactInfoScreen } from './screens/ContactInfoScreen';
import { AnalyzingScreen } from './screens/AnalyzingScreen';
import { VerdictScreen } from './screens/VerdictScreen';

const TOTAL_STEPS = 7;

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
  const [currentStep, setCurrentStep] = useState(0); // 0 = welcome screen
  const [direction, setDirection] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSaysoHelping, setIsSaysoHelping] = useState(false);
  const [saysoHelpReady, setSaysoHelpReady] = useState(false);

  // Screen state
  const [feeling, setFeeling] = useState<string | null>(null);
  const [callFrequency, setCallFrequency] = useState<string | null>(null);
  const [support, setSupport] = useState<string[]>([]);
  const [leadTypes, setLeadTypes] = useState<string[]>([]);
  const [homesTarget, setHomesTarget] = useState<string | null>(null);
  const [contactInfo, setContactInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
  });
  const [contactValid, setContactValid] = useState(false);

  const canContinue = (): boolean => {
    if (isSaysoHelping) return saysoHelpReady;
    switch (currentStep) {
      case 1: return feeling !== null;
      case 2: return callFrequency !== null;
      case 3: return support.length > 0;
      case 4: return leadTypes.length > 0;
      case 5: return homesTarget !== null;
      case 6: return contactValid;
      default: return false;
    }
  };

  const goNext = () => {
    if (!canContinue()) return;

    // If on step 5, launch the SaySo help animation first
    if (currentStep === 5 && !isSaysoHelping) {
      setIsSaysoHelping(true);
      return;
    }

    // If SaySo help result is showing, move to step 6
    if (isSaysoHelping) {
      setIsSaysoHelping(false);
      setSaysoHelpReady(false);
      setDirection(1);
      setCurrentStep(6);
      return;
    }

    if (currentStep === 6) {
      // Launch analyzing animation before going to step 7
      setIsAnalyzing(true);
      return;
    }

    setDirection(1);
    setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
  };

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

  const handleAnalyzingComplete = useCallback(() => {
    setIsAnalyzing(false);
    setDirection(1);
    setCurrentStep(7);
  }, []);

  const handleSaysoHelpReady = useCallback(() => {
    setSaysoHelpReady(true);
  }, []);

  const renderScreen = () => {
    if (isAnalyzing) {
      return <AnalyzingScreen onComplete={handleAnalyzingComplete} />;
    }

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
              className="mt-6 px-8 py-3 rounded-full bg-[#2367EE] text-white font-bold text-base hover:bg-[#1b56cc] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2367EE] focus-visible:ring-offset-2 cursor-pointer"
            >
              Get Started
            </button>
          </div>
        );
      case 1:
        return <FeelingCheckScreen value={feeling} onChange={setFeeling} />;
      case 2:
        return <CallFrequencyScreen value={callFrequency} onChange={setCallFrequency} />;
      case 3:
        return <SupportTechScreen value={support} onChange={setSupport} />;
      case 4:
        return <LeadTypeScreen value={leadTypes} onChange={setLeadTypes} />;
      case 5:
        return (
          <GoalsScreen
            homesTarget={homesTarget}
            onHomesChange={setHomesTarget}
          />
        );
      case 6:
        return (
          <ContactInfoScreen
            value={contactInfo}
            onChange={setContactInfo}
            onValidationChange={setContactValid}
          />
        );
      case 7:
        return <VerdictScreen />;
      default:
        return null;
    }
  };

  const isWelcome = currentStep === 0;
  const showNav = !isWelcome && !isAnalyzing && currentStep < 7;
  const progressStep = isSaysoHelping ? 5 : isAnalyzing ? 6 : currentStep;

  // Determine Continue button label
  let continueLabel = 'Continue';
  if (isSaysoHelping && saysoHelpReady) {
    continueLabel = 'Continue';
  } else if (currentStep === 5) {
    continueLabel = 'Let SaySo Help';
  } else if (currentStep === 6) {
    continueLabel = 'See My Results';
  }

  return (
    <div className="flex flex-col">
      {!isWelcome && (
        <OnboardingProgress currentStep={progressStep} totalSteps={TOTAL_STEPS} />
      )}

      <div className="px-6 py-6">
        <div className="max-w-lg mx-auto w-full">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={isSaysoHelping ? 'sayso-help' : isAnalyzing ? 'analyzing' : currentStep}
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
          canContinue={canContinue()}
          showBack={currentStep > 1 || isSaysoHelping}
          continueLabel={continueLabel}
        />
      )}
    </div>
  );
}
