import { CONVERSATION_CYCLES } from './data';
import { AudioWaveform } from './AudioWaveform';
import { ParticipantAvatar } from './ParticipantAvatar';
import { SpeechBubble } from './SpeechBubble';

export function DialerSplitView({
  currentCycle,
  showBuyerMessage,
  showSellerMessage,
  buyerSpeaking,
  sellerSpeaking,
}: {
  currentCycle: number;
  showBuyerMessage: boolean;
  showSellerMessage: boolean;
  buyerSpeaking: boolean;
  sellerSpeaking: boolean;
}) {
  const cycle = CONVERSATION_CYCLES[currentCycle];

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* YOU Side (Left) */}
      <div className="flex-1 flex flex-col items-center justify-start pt-3 md:pt-5 px-3 md:px-5 bg-gradient-to-b from-[#f7f8fa] to-[#eef1f5] border-r border-gray-200">
        <div className="flex items-center gap-3 justify-center">
          <ParticipantAvatar
            initials="AW"
            color="linear-gradient(135deg, #2367EE, #1D4871)"
            speaking={sellerSpeaking}
            ringColor="#2367EE"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#2367EE' }} />
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">You</span>
            </div>
            <p className="text-sm font-bold text-[#1D4871]">Alex Agent</p>
            <p className="text-[11px] text-gray-500">Sayso</p>
          </div>
        </div>

        <div className="mt-2">
          <AudioWaveform active={sellerSpeaking} color="#2367EE" />
        </div>

        <div className="w-full mt-2 max-w-[220px]">
          <SpeechBubble text={cycle.sellerMessage} visible={showSellerMessage} side="seller" />
        </div>
      </div>

      {/* BUYER Side (Right) */}
      <div className="flex-1 flex flex-col items-center justify-start pt-3 md:pt-5 px-3 md:px-5 bg-gradient-to-b from-[#f0f2f5] to-[#e8eaed]">
        <div className="flex items-center gap-3 justify-center">
          <ParticipantAvatar
            initials="JS"
            color="linear-gradient(135deg, #F59E0B, #D97706)"
            speaking={buyerSpeaking}
            ringColor="#F59E0B"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#F59E0B' }} />
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Prospect</span>
            </div>
            <p className="text-sm font-bold text-[#1D4871]">Mrs. Smith</p>
            <p className="text-[11px] text-gray-500">(310) 488-1179</p>
          </div>
        </div>

        <div className="mt-2">
          <AudioWaveform active={buyerSpeaking} color="#F59E0B" />
        </div>

        <div className="w-full mt-2 max-w-[220px]">
          <SpeechBubble text={cycle.buyerMessage} visible={showBuyerMessage} side="buyer" />
        </div>
      </div>
    </div>
  );
}
