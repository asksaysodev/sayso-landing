'use client';

import { useDialerState } from './hooks/useDialerState';
import { DialerHeader } from './DialerHeader';
import { DialerSplitView } from './DialerSplitView';
import { DialerBottomBar } from './DialerBottomBar';

export { SaysoWidget } from './SaysoWidget';
export { useSaysoWidget } from './hooks/useSaysoWidget';

export function CRMDialerShowcase() {
  const {
    currentCycle,
    showBuyerMessage,
    showPrompt,
    showSellerMessage,
    buyerSpeaking,
    sellerSpeaking,
    timerSeconds,
  } = useDialerState();

  return (
    <div className="absolute inset-0 flex flex-col bg-[#f0f2f5]">
      <DialerHeader timerSeconds={timerSeconds} />
      <DialerSplitView
        currentCycle={currentCycle}
        showBuyerMessage={showBuyerMessage}
        showSellerMessage={showSellerMessage}
        buyerSpeaking={buyerSpeaking}
        sellerSpeaking={sellerSpeaking}
      />
      <DialerBottomBar />
    </div>
  );
}
