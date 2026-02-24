'use client';

import { useState, useEffect, useCallback } from 'react';
import { CONVERSATION_CYCLES } from '../data';

const CYCLE_DURATION = 11000;

export function useDialerState() {
  const [currentCycle, setCurrentCycle] = useState(0);
  const [showBuyerMessage, setShowBuyerMessage] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [showSellerMessage, setShowSellerMessage] = useState(false);
  const [buyerSpeaking, setBuyerSpeaking] = useState(false);
  const [sellerSpeaking, setSellerSpeaking] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(29);

  // Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimerSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const startCycle = useCallback(() => {
    setShowBuyerMessage(false);
    setShowPrompt(false);
    setShowSellerMessage(false);
    setBuyerSpeaking(false);
    setSellerSpeaking(false);

    setTimeout(() => setBuyerSpeaking(true), 300);
    setTimeout(() => setShowBuyerMessage(true), 800);
    setTimeout(() => setBuyerSpeaking(false), 3200);
    setTimeout(() => setShowPrompt(true), 3500);
    setTimeout(() => setSellerSpeaking(true), 5500);
    setTimeout(() => setShowSellerMessage(true), 6000);
    setTimeout(() => setSellerSpeaking(false), 8500);
  }, []);

  useEffect(() => {
    startCycle();
    const interval = setInterval(() => {
      setCurrentCycle((prev) => (prev + 1) % CONVERSATION_CYCLES.length);
    }, CYCLE_DURATION);
    return () => clearInterval(interval);
  }, [startCycle]);

  useEffect(() => {
    startCycle();
  }, [currentCycle, startCycle]);

  return {
    currentCycle,
    showBuyerMessage,
    showPrompt,
    showSellerMessage,
    buyerSpeaking,
    sellerSpeaking,
    timerSeconds,
  };
}
