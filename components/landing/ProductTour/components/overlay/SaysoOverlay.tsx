import type { Chapter } from '../../types';
import type { DerivedScene } from '../../helpers/derive';
import { formatCallTimer } from '../../helpers/derive';
import { SaysoToolbar } from './SaysoToolbar';
import { CuePanel } from './CuePanel';
import { SmartCapturePanel } from './SmartCapturePanel';
import { ZipDropdown } from './ZipDropdown';
import { PlaybookPanel } from './PlaybookPanel';

/**
 * The floating Sayso coach widget, composed for whichever feature chapter is
 * active. Laid out as a compact right-aligned stack (toolbar on top, the
 * feature-specific element below) so it reads like a real always-on-top widget
 * tucked to the side of the call rather than covering it.
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

  const cueActive = isCue && (derived.cuePrompts?.condensed.length ?? 0) > 0;

  return (
    <div className="pt-root flex flex-col items-end gap-1.5">
      <SaysoToolbar
        leadType={chapter.leadType}
        timer={formatCallTimer(derived.callSeconds)}
        showZip={isPulse}
        zipValue={zipValue}
        zipActive={zipActive}
        insightsActive={cueActive || isSmartCapture}
        playbookActive={playbookOpen}
      />

      {isCue && derived.cuePrompts && cueActive && (
        <CuePanel prompts={derived.cuePrompts} />
      )}

      {isSmartCapture && (
        <SmartCapturePanel
          lpmama={derived.lpmama}
          recentCapture={derived.recentCapture}
          synced={derived.synced}
        />
      )}

      {isPulse && zipDropdownOpen && chapter.pulse && (
        <ZipDropdown pulse={chapter.pulse} showResults={zipResults} />
      )}

      {isPlaybook && playbookOpen && chapter.playbook && (
        <PlaybookPanel playbook={chapter.playbook} />
      )}
    </div>
  );
}
