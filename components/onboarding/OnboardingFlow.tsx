'use client';

import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OnboardingProgress } from './OnboardingProgress';
import { LightningIcon } from '@/components/icons/LightningIcon';
import { OnboardingNavButtons } from './OnboardingNavButtons';
import { RoleScreen } from './screens/RoleScreen';
// import { TeamSizeScreen } from './screens/TeamSizeScreen';         // DISABLED: simplified flow
// import { FeelingCheckScreen } from './screens/FeelingCheckScreen'; // DISABLED: simplified flow
// import { ConfidenceScreen } from './screens/ConfidenceScreen';     // DISABLED: simplified flow
import { CallFrequencyScreen } from './screens/CallFrequencyScreen';
// import { TeamCallFrequencyScreen } from './screens/TeamCallFrequencyScreen'; // DISABLED: simplified flow
// import { SupportTechScreen } from './screens/SupportTechScreen';   // DISABLED: simplified flow
// import { TeamSupportTechScreen } from './screens/TeamSupportTechScreen'; // DISABLED: simplified flow
// import { ComputerScreen } from './screens/ComputerScreen';         // DISABLED: simplified flow
// import { LeadTypeScreen } from './screens/LeadTypeScreen';         // DISABLED: simplified flow
// import { TeamLeadTypeScreen } from './screens/TeamLeadTypeScreen'; // DISABLED: simplified flow
import { SaysoHelpScreen } from './screens/SaysoHelpScreen';
// import { ContactInfoScreen } from './screens/ContactInfoScreen';   // DISABLED: simplified flow
// import { AnalyzingScreen } from './screens/AnalyzingScreen';       // DISABLED: simplified flow
// import { PaywallScreen } from './screens/PaywallScreen';           // DISABLED: simplified flow
// import { WindowsComingSoonScreen } from './screens/WindowsComingSoonScreen'; // DISABLED: simplified flow

// TODO: Replace with real book-a-demo calendar URL
const BOOK_DEMO_URL = '#book-demo';

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

// Simplified flow: 2 question steps (role + call frequency) → SaySo Help → Book Demo
// Step 0 = welcome, step 1 = role, step 2 = call frequency, then isSaysoHelping → redirect
//
// DISABLED screens (commented out, not deleted):
// Path A: FeelingCheckScreen, SupportTechScreen, LeadTypeScreen, ComputerScreen
// Path B: TeamSizeScreen, ConfidenceScreen, TeamCallFrequencyScreen, TeamSupportTechScreen, TeamLeadTypeScreen, ComputerScreen
// Shared: ContactInfoScreen, WindowsComingSoonScreen, AnalyzingScreen, PaywallScreen

export function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(0); // 0 = welcome
  const [direction, setDirection] = useState(1);
  // const [isAnalyzing, setIsAnalyzing] = useState(false); // DISABLED: no analyzing screen
  const [isSaysoHelping, setIsSaysoHelping] = useState(false);
  const [saysoHelpReady, setSaysoHelpReady] = useState(false);

  // Role
  const [role, setRole] = useState<string | null>(null);
  // const isPathB = role === 'Team Lead' || role === 'Office Broker/Manager'; // DISABLED: no path branching

  // Simplified: 2 question steps (step 1 = role, step 2 = call frequency)
  const TOTAL_STEPS = 2;

  // Path B state — DISABLED: all paths use same simplified flow
  // const [teamSize, setTeamSize] = useState<number>(5);
  // const [callersCount, setCallersCount] = useState<string | null>(null);
  // const [confidence, setConfidence] = useState<number | null>(null);
  // const [teamCallFrequency, setTeamCallFrequency] = useState<string | null>(null);
  // const [teamSupport, setTeamSupport] = useState<string[]>([]);

  // Path A state — only callFrequency kept
  // const [feeling, setFeeling] = useState<string | null>(null);
  const [callFrequency, setCallFrequency] = useState<string | null>(null);
  // const [support, setSupport] = useState<string[]>([]);

  // Shared state — DISABLED: no computer/lead screens
  // const [computerType, setComputerType] = useState<string | null>(null);
  // const [leadTypes, setLeadTypes] = useState<string[]>([]);

  // Contact / tail — DISABLED: no contact/paywall screens
  // const [contactInfo, setContactInfo] = useState({ fullName: '', email: '', phone: '', company: '' });
  // const [contactValid, setContactValid] = useState(false);

  // DISABLED: no contact/verdict steps
  // const CONTACT_STEP = TOTAL_STEPS + 1;
  // const VERDICT_STEP = TOTAL_STEPS + 2;

  const canContinue = useMemo((): boolean => {
    if (isSaysoHelping) return saysoHelpReady;
    switch (currentStep) {
      case 1: return role !== null;
      case 2: return callFrequency !== null;
      default: return false;
    }
    // DISABLED cases (path branching):
    // case 2: return feeling !== null;          // FeelingCheck
    // case 3: return callFrequency !== null;    // CallFrequency (was step 3)
    // case 4: return support.length > 0;        // SupportTech
    // case 5: return leadTypes.length > 0;      // LeadTypes
    // case 6: return computerType !== null;     // Computer
    // Path B cases omitted
  }, [isSaysoHelping, saysoHelpReady, currentStep, role, callFrequency]);

  const goNext = useCallback(() => {
    if (!canContinue) return;

    // Last question step → SaysoHelp
    if (currentStep === TOTAL_STEPS && !isSaysoHelping) {
      setIsSaysoHelping(true);
      return;
    }

    // SaysoHelp complete → redirect to book demo
    if (isSaysoHelping) {
      window.location.href = BOOK_DEMO_URL;
      return;
    }

    // DISABLED: contact and analyzing steps
    // if (currentStep === CONTACT_STEP) {
    //   setIsAnalyzing(true);
    //   return;
    // }

    setDirection(1);
    setCurrentStep((prev) => prev + 1);
  }, [currentStep, isSaysoHelping, TOTAL_STEPS, canContinue]);

  // Ref keeps the timer callback pointed at the latest goNext.
  const goNextRef = useRef(goNext);
  useEffect(() => {
    goNextRef.current = goNext;
  });

  // Auto-advance: called by single-choice screens after selection.
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
    // DISABLED: back from contact step
    // if (currentStep === CONTACT_STEP) {
    //   setDirection(-1);
    //   setCurrentStep(TOTAL_STEPS);
    //   return;
    // }
    setDirection(-1);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  // DISABLED: analyzing screen handler
  // const handleAnalyzingComplete = useCallback(() => {
  //   setIsAnalyzing(false);
  //   setDirection(1);
  //   setCurrentStep(VERDICT_STEP);
  // }, [VERDICT_STEP]);

  const handleSaysoHelpReady = useCallback(() => {
    setSaysoHelpReady(true);
  }, []);

  // Auto-advance from SaysoHelp after result is shown → redirect to book demo
  useEffect(() => {
    if (!saysoHelpReady) return;
    const timer = setTimeout(() => {
      window.location.href = BOOK_DEMO_URL;
    }, 6000);
    return () => clearTimeout(timer);
  }, [saysoHelpReady]);

  const renderScreen = () => {
    // DISABLED: analyzing screen
    // if (isAnalyzing) {
    //   return <AnalyzingScreen onComplete={handleAnalyzingComplete} />;
    // }

    if (isSaysoHelping) {
      return <SaysoHelpScreen onReady={handleSaysoHelpReady} />;
    }

    // DISABLED: contact and paywall screens
    // if (currentStep === CONTACT_STEP) {
    //   if (computerType === 'PC') {
    //     return (
    //       <WindowsComingSoonScreen
    //         value={contactInfo}
    //         onChange={setContactInfo}
    //         onValidationChange={setContactValid}
    //         onSwitchToApple={() => setComputerType('Mac')}
    //       />
    //     );
    //   }
    //   return (
    //     <ContactInfoScreen
    //       value={contactInfo}
    //       onChange={setContactInfo}
    //       onValidationChange={setContactValid}
    //     />
    //   );
    // }
    // if (currentStep === VERDICT_STEP) {
    //   return <PaywallScreen computerType={computerType} isPathB={isPathB} />;
    // }

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

    // DISABLED: path branching (all screens below are temporarily removed)
    // default:
    //   if (isPathB) return renderPathBScreen();
    //   return renderPathAScreen();
  };

  // DISABLED: full Path A screen set
  // const renderPathAScreen = () => {
  //   switch (currentStep) {
  //     case 2: return <FeelingCheckScreen value={feeling} onChange={setFeeling} onAutoAdvance={handleAutoAdvance} />;
  //     case 3: return <CallFrequencyScreen value={callFrequency} onChange={setCallFrequency} onAutoAdvance={handleAutoAdvance} />;
  //     case 4: return <SupportTechScreen value={support} onChange={setSupport} />;
  //     case 5: return <LeadTypeScreen value={leadTypes} onChange={setLeadTypes} />;
  //     case 6: return <ComputerScreen isTeam={false} value={computerType} onChange={setComputerType} onAutoAdvance={handleAutoAdvance} />;
  //     default: return null;
  //   }
  // };

  // DISABLED: full Path B screen set
  // const renderPathBScreen = () => {
  //   switch (currentStep) {
  //     case 2: return <TeamSizeScreen teamSize={teamSize} onTeamSizeChange={setTeamSize} callersCount={callersCount} onCallersCountChange={setCallersCount} onAutoAdvance={handleAutoAdvance} />;
  //     case 3: return <ConfidenceScreen value={confidence} onChange={setConfidence} onAutoAdvance={handleAutoAdvance} />;
  //     case 4: return <TeamCallFrequencyScreen value={teamCallFrequency} onChange={setTeamCallFrequency} onAutoAdvance={handleAutoAdvance} />;
  //     case 5: return <TeamSupportTechScreen value={teamSupport} onChange={setTeamSupport} />;
  //     case 6: return <TeamLeadTypeScreen value={leadTypes} onChange={setLeadTypes} />;
  //     case 7: return <ComputerScreen isTeam={true} value={computerType} onChange={setComputerType} onAutoAdvance={handleAutoAdvance} />;
  //     default: return null;
  //   }
  // };

  const isWelcome = currentStep === 0;
  const isVerdict = false; // DISABLED: no verdict/paywall step
  const showNav = !isWelcome && !isVerdict; // DISABLED: !isAnalyzing removed

  // Progress bar: show question step number capped at TOTAL_STEPS
  const progressStep = isSaysoHelping
    ? TOTAL_STEPS
    : Math.min(currentStep, TOTAL_STEPS + 1);
  // DISABLED: isAnalyzing case removed from progressStep

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
                  : currentStep
                // DISABLED: isAnalyzing key case removed
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
          canContinue={canContinue}
          showBack={currentStep > 1 || isSaysoHelping}
          continueLabel={isSaysoHelping && saysoHelpReady ? 'Get Started' : undefined}
        />
      )}
    </div>
  );
}
