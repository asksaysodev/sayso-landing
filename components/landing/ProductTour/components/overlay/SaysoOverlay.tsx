import type { Chapter } from '../../types';
import type { DerivedScene } from '../../helpers/derive';
import { formatCallTimer } from '../../helpers/derive';
import { SaysoToolbar } from './SaysoToolbar';
import { CueBubble } from './CueBubble';
import { InsightsPanel } from './InsightsPanel';
import { ZipDropdown } from './ZipDropdown';
import { PlaybookPanel } from './PlaybookPanel';

/**
 * The floating Sayso coach widget, composed for whichever feature chapter is
 * active. It arranges the toolbar plus the feature-specific elements (Cue
 * bubble + insights, Smart Capture LPMAMA, Pulse dropdown, Playbook panel)
 * exactly as they appear stacked/beside the widget in the real app.
 */
interface SaysoOverlayProps {
  chapter: Chapter;
  elapsed: number;
  derived: DerivedScene;
}

export function SaysoOverlay({ chapter, elapsed, derived }: SaysoOverlayProps) {
  const isCue = chapter.key === 'cue';
  const isSmartCapture = chapter.key === 'smart-capture';
  const isPulse = chapter.key === 'pulse';
  const isPlaybook = chapter.key === 'playbook';

  // Pulse derived state
  const zipActive = !!chapter.pulse && elapsed >= chapter.pulse.zipValidAt;
  const zipValue = zipActive && chapter.pulse ? chapter.pulse.zip : '';
  const zipDropdownOpen = !!chapter.pulse && elapsed >= chapter.pulse.openAt;
  const zipResults = !!chapter.pulse && elapsed >= chapter.pulse.resultsAt;

  // Playbook derived state
  const playbookOpen = !!chapter.playbook && elapsed >= chapter.playbook.openAt;

  // For Cue, the newest insight shows as the toast bubble; the eye panel holds
  // the earlier ones so the same text never appears twice at once.
  const cuePanelInsights = derived.panelInsights.filter(
    (p) => p.id !== derived.toastInsight?.id,
  );
  const showInsightsPanel = (isCue && cuePanelInsights.length > 0) || isSmartCapture;
  const copied =
    derived.lpmamaComplete &&
    chapter.crmNoteAt !== undefined &&
    elapsed >= chapter.crmNoteAt - 1200;

  return (
    <div className="pt-root flex items-start gap-3">
      {/* Left column: toolbar + stacked panels */}
      <div className="flex flex-col gap-1.5">
        <SaysoToolbar
          leadType={chapter.leadType}
          timer={formatCallTimer(derived.callSeconds)}
          showZip={isPulse}
          zipValue={zipValue}
          zipActive={zipActive}
          insightsActive={showInsightsPanel}
          playbookActive={playbookOpen}
          hasUnseenInsight={isCue && derived.toastInsight !== null}
        />

        {isPulse && zipDropdownOpen && chapter.pulse && (
          <ZipDropdown pulse={chapter.pulse} showResults={zipResults} />
        )}

        {showInsightsPanel && (
          <InsightsPanel
            insights={isCue ? cuePanelInsights : []}
            lpmama={derived.lpmama}
            copied={copied}
            showLpmama={isSmartCapture}
          />
        )}
      </div>

      {/* Right column: cue bubble or playbook panel */}
      <div className="flex flex-col gap-2 pt-1">
        {isCue && derived.toastInsight && (
          <CueBubble key={derived.toastInsight.id} text={derived.toastInsight.text} />
        )}
        {isPlaybook && playbookOpen && chapter.playbook && (
          <PlaybookPanel playbook={chapter.playbook} />
        )}
      </div>
    </div>
  );
}
