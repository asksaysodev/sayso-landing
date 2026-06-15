import type { DemoProspect, LpmamaField, Speaker } from '../../types';
import { FubCallBar } from './FubCallBar';
import { FubNav } from './FubNav';
import { ContactPanel } from './ContactPanel';
import { CallConsole } from './CallConsole';
import { SidePanels } from './SidePanels';

/**
 * The full Follow Up Boss CRM screen during a live call: call bar, primary nav,
 * and the three-column contact view. This is static visual chrome; the Sayso
 * overlay floats on top of it (composed in ProductTour/index.tsx).
 */
interface FubFrameProps {
  prospect: DemoProspect;
  timer: string;
  speaker: Speaker | null;
  lpmama: Record<LpmamaField, string | null>;
  crmNoteVisible: boolean;
  crmNoteSummary: string;
}

export function FubFrame({
  prospect,
  timer,
  speaker,
  lpmama,
  crmNoteVisible,
  crmNoteSummary,
}: FubFrameProps) {
  return (
    <div className="flex h-full flex-col bg-[#eef2f5]">
      <FubCallBar prospectName={prospect.name} timer={timer} speaker={speaker} />
      <FubNav />
      <div className="flex flex-1 gap-5 overflow-hidden p-5">
        <ContactPanel prospect={prospect} />
        <CallConsole
          prospect={prospect}
          lpmama={lpmama}
          crmNoteVisible={crmNoteVisible}
          crmNoteSummary={crmNoteSummary}
        />
        <SidePanels />
      </div>
    </div>
  );
}
