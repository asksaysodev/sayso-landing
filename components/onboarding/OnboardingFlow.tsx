'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OnboardingProgress } from './OnboardingProgress';
import { LightningIcon } from '@/components/icons/LightningIcon';
import { OnboardingNavButtons } from './OnboardingNavButtons';
import { RoleScreen } from './screens/RoleScreen';
import { TeamSizeScreen } from './screens/TeamSizeScreen';
import { FeelingCheckScreen } from './screens/FeelingCheckScreen';
import { ConfidenceScreen } from './screens/ConfidenceScreen';
import { CallFrequencyScreen } from './screens/CallFrequencyScreen';
import { TeamCallFrequencyScreen } from './screens/TeamCallFrequencyScreen';
import { SupportTechScreen } from './screens/SupportTechScreen';
import { TeamSupportTechScreen } from './screens/TeamSupportTechScreen';
import { ComputerScreen } from './screens/ComputerScreen';
import { LeadTypeScreen } from './screens/LeadTypeScreen';
import { TeamLeadTypeScreen } from './screens/TeamLeadTypeScreen';
import { SaysoHelpScreen } from './screens/SaysoHelpScreen';
import { ContactInfoScreen } from './screens/ContactInfoScreen';
import { AnalyzingScreen } from './screens/AnalyzingScreen';
import { PaywallScreen } from './screens/PaywallScreen';

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

// Path A: role=Individual/Team Agent — 6 question steps (1-6)
// Path B: role=Team Lead/Office Broker — 7 question steps (1-7)
// Step 0 = welcome, contact = TOTAL_STEPS+1, verdict = TOTAL_STEPS+2

export function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(0); // 0 = welcome
  const [direction, setDirection] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSaysoHelping, setIsSaysoHelping] = useState(false);
  const [saysoHelpReady, setSaysoHelpReady] = useState(false);

  // Role + path
  const [role, setRole] = useState<string | null>(null);
  const isPathB = role === 'Team Lead' || role === 'Office Broker/Manager';
  const TOTAL_STEPS = isPathB ? 7 : 6;

  // Path B state
  const [teamSize, setTeamSize] = useState<number>(5);
  const [callersCount, setCallersCount] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [teamCallFrequency, setTeamCallFrequency] = useState<string | null>(null);
  const [teamSupport, setTeamSupport] = useState<string[]>([]);

  // Path A state
  const [feeling, setFeeling] = useState<string | null>(null);
  const [callFrequency, setCallFrequency] = useState<string | null>(null);
  const [support, setSupport] = useState<string[]>([]);

  // Shared state
  const [computerType, setComputerType] = useState<string | null>(null);
  const [leadTypes, setLeadTypes] = useState<string[]>([]);

  // Contact / tail
  const [contactInfo, setContactInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
  });
  const [contactValid, setContactValid] = useState(false);

  // Contact step and verdict step numbers (relative to TOTAL_STEPS)
  const CONTACT_STEP = TOTAL_STEPS + 1;
  const VERDICT_STEP = TOTAL_STEPS + 2;

  const canContinue = (): boolean => {
    if (isSaysoHelping) return saysoHelpReady;
    if (currentStep === CONTACT_STEP) return contactValid;

    if (isPathB) {
      switch (currentStep) {
        case 1: return role !== null;
        case 2: return teamSize > 0 && callersCount !== null;
        case 3: return confidence !== null;
        case 4: return teamCallFrequency !== null;
        case 5: return teamSupport.length > 0;
        case 6: return computerType !== null;
        case 7: return leadTypes.length > 0;
        default: return false;
      }
    } else {
      switch (currentStep) {
        case 1: return role !== null;
        case 2: return feeling !== null;
        case 3: return callFrequency !== null;
        case 4: return support.length > 0;
        case 5: return computerType !== null;
        case 6: return leadTypes.length > 0;
        default: return false;
      }
    }
  };

  const goNext = useCallback(() => {
    if (!canContinue()) return;

    // Last question step → SaysoHelp
    if (currentStep === TOTAL_STEPS && !isSaysoHelping) {
      setIsSaysoHelping(true);
      return;
    }

    // SaysoHelp complete → all users go to contact form
    if (isSaysoHelping) {
      setIsSaysoHelping(false);
      setSaysoHelpReady(false);
      setDirection(1);
      setCurrentStep(CONTACT_STEP);
      return;
    }

    // Contact → Analyzing
    if (currentStep === CONTACT_STEP) {
      setIsAnalyzing(true);
      return;
    }

    setDirection(1);
    setCurrentStep((prev) => prev + 1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep, isSaysoHelping, TOTAL_STEPS, CONTACT_STEP, canContinue]);

  // Auto-advance: called by single-choice screens after selection
  const autoAdvanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleAutoAdvance = useCallback(() => {
    if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
    autoAdvanceTimer.current = setTimeout(() => {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    }, 300);
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
    // Going back from contact step returns to last question step
    if (currentStep === CONTACT_STEP) {
      setDirection(-1);
      setCurrentStep(TOTAL_STEPS);
      return;
    }
    setDirection(-1);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleAnalyzingComplete = useCallback(() => {
    setIsAnalyzing(false);
    setDirection(1);
    setCurrentStep(VERDICT_STEP);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [VERDICT_STEP]);

  const handleSaysoHelpReady = useCallback(() => {
    setSaysoHelpReady(true);
  }, []);

  // Auto-advance from SaysoHelp after result is shown — all users go to contact form
  useEffect(() => {
    if (!saysoHelpReady) return;
    const timer = setTimeout(() => {
      setIsSaysoHelping(false);
      setSaysoHelpReady(false);
      setDirection(1);
      setCurrentStep(CONTACT_STEP);
    }, 6000);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saysoHelpReady]);

  const renderScreen = () => {
    if (isAnalyzing) {
      return <AnalyzingScreen onComplete={handleAnalyzingComplete} />;
    }

    if (isSaysoHelping) {
      return <SaysoHelpScreen onReady={handleSaysoHelpReady} />;
    }

    if (currentStep === CONTACT_STEP) {
      return (
        <ContactInfoScreen
          value={contactInfo}
          onChange={setContactInfo}
          onValidationChange={setContactValid}
        />
      );
    }

    if (currentStep === VERDICT_STEP) {
      return <PaywallScreen computerType={computerType} isPathB={isPathB} />;
    }

    switch (currentStep) {
      case 0:
        return (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-2xl bg-[#2367EE] flex items-center justify-center mx-auto mb-4">
              <LightningIcon size={32} color="white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#1D4871]">
              Welcome to Sayso
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
        return (
          <RoleScreen
            value={role}
            onChange={setRole}
            onAutoAdvance={handleAutoAdvance}
          />
        );

      default:
        if (isPathB) {
          return renderPathBScreen();
        }
        return renderPathAScreen();
    }
  };

  const renderPathAScreen = () => {
    switch (currentStep) {
      case 2:
        return (
          <FeelingCheckScreen
            value={feeling}
            onChange={setFeeling}
            onAutoAdvance={handleAutoAdvance}
          />
        );
      case 3:
        return (
          <CallFrequencyScreen
            value={callFrequency}
            onChange={setCallFrequency}
            onAutoAdvance={handleAutoAdvance}
          />
        );
      case 4:
        return <SupportTechScreen value={support} onChange={setSupport} />;
      case 5:
        return (
          <ComputerScreen
            isTeam={false}
            value={computerType}
            onChange={setComputerType}
            onAutoAdvance={handleAutoAdvance}
          />
        );
      case 6:
        return <LeadTypeScreen value={leadTypes} onChange={setLeadTypes} />;
      default:
        return null;
    }
  };

  const renderPathBScreen = () => {
    switch (currentStep) {
      case 2:
        return (
          <TeamSizeScreen
            teamSize={teamSize}
            onTeamSizeChange={setTeamSize}
            callersCount={callersCount}
            onCallersCountChange={setCallersCount}
            onAutoAdvance={handleAutoAdvance}
          />
        );
      case 3:
        return (
          <ConfidenceScreen
            value={confidence}
            onChange={setConfidence}
            onAutoAdvance={handleAutoAdvance}
          />
        );
      case 4:
        return (
          <TeamCallFrequencyScreen
            value={teamCallFrequency}
            onChange={setTeamCallFrequency}
            onAutoAdvance={handleAutoAdvance}
          />
        );
      case 5:
        return <TeamSupportTechScreen value={teamSupport} onChange={setTeamSupport} />;
      case 6:
        return (
          <ComputerScreen
            isTeam={true}
            value={computerType}
            onChange={setComputerType}
            onAutoAdvance={handleAutoAdvance}
          />
        );
      case 7:
        return <TeamLeadTypeScreen value={leadTypes} onChange={setLeadTypes} />;
      default:
        return null;
    }
  };

  const isWelcome = currentStep === 0;
  const isVerdict = currentStep === VERDICT_STEP;
  const showNav = !isWelcome && !isAnalyzing && !isVerdict;

  // Progress bar: show question step number capped at TOTAL_STEPS
  const progressStep = isSaysoHelping
    ? TOTAL_STEPS
    : isAnalyzing
    ? TOTAL_STEPS + 1
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
              key={
                isSaysoHelping
                  ? 'sayso-help'
                  : isAnalyzing
                  ? 'analyzing'
                  : currentStep
              }
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
          continueLabel={isSaysoHelping && saysoHelpReady ? 'Get Started' : undefined}
        />
      )}
    </div>
  );
}
