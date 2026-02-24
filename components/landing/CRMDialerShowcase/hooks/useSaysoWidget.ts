'use client';

import { CONVERSATION_CYCLES } from '../data';
import { useDialerState } from './useDialerState';

export function useSaysoWidget() {
  const state = useDialerState();
  return {
    currentCycle: state.currentCycle,
    showBuyerMessage: state.showBuyerMessage,
    showPrompt: state.showPrompt,
    promptText: CONVERSATION_CYCLES[state.currentCycle].saysoPrompt,
    timerSeconds: state.timerSeconds,
  };
}
