import { PhoneOff, Pin } from 'lucide-react';
import type { Chapter, DemoProspect, FeatureKey } from '../types';
import type { DerivedScene } from '../helpers/derive';
import { CRM_NOTE_SUMMARY } from '../data/scenes';
import { SpeakingBars } from './SpeakingBars';
import { CuePanel } from './overlay/CuePanel';
import { SmartCapturePanel } from './overlay/SmartCapturePanel';
import { ZipDropdown } from './overlay/ZipDropdown';
import { PlaybookPanel } from './overlay/PlaybookPanel';

/**
 * Mobile layout for the Product Tour. The full Follow Up Boss dialer is too wide
 * to read on a phone, so instead we show a focused, vertical view: a phone-style
 * call header with the active Sayso element below it at full, readable width.
 */
interface MobileStageProps {
  featureKey: FeatureKey;
  chapter: Chapter;
  derived: DerivedScene;
  prospect: DemoProspect;
  timer: string;
}

export function MobileStage({ featureKey, chapter, derived, prospect, timer }: MobileStageProps) {
  return (
    <div className="lg:hidden">
      <div className="pt-root pt-mobile mx-auto flex max-w-[400px] flex-col gap-3">
        {/* Phone-style call header */}
        <div className="pt-glass flex items-center justify-between rounded-2xl px-4 py-3 text-white">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[13px] font-semibold text-slate-700">
              {prospect.initials}
            </span>
            <div className="leading-tight">
              <div className="text-[14px] font-semibold">{prospect.name}</div>
              <div className="flex items-center gap-2 text-[12px] text-white/70">
                <span className="tabular-nums">{timer}</span>
                <SpeakingBars active={derived.speaker !== null} />
              </div>
            </div>
          </div>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f15b5b] text-white">
            <PhoneOff className="h-4 w-4" />
          </span>
        </div>

        {/* Active Sayso element */}
        <div className="flex flex-col gap-3">
          {featureKey === 'cue' && derived.cuePrompts && <CuePanel prompts={derived.cuePrompts} />}
          {featureKey === 'smart-capture' && (
            <SmartCapturePanel
              lpmama={derived.lpmama}
              recentCapture={derived.recentCapture}
              synced={derived.synced}
            />
          )}
          {featureKey === 'pulse' && chapter.pulse && (
            <ZipDropdown pulse={chapter.pulse} showResults />
          )}
          {featureKey === 'playbook' && chapter.playbook && (
            <PlaybookPanel playbook={chapter.playbook} />
          )}

          {/* Logged-to-CRM confirmation (mobile has no FUB timeline) */}
          {featureKey === 'smart-capture' && derived.crmNoteVisible && (
            <div className="rounded-xl border border-slate-200 bg-white p-3 text-left">
              <div className="flex items-center gap-2 text-[13px] font-semibold text-slate-700">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-white">
                  <Pin className="h-3 w-3" />
                </span>
                Sayso Note · logged to Follow Up Boss
              </div>
              <p className="mt-1.5 text-[12px] leading-relaxed text-slate-600">{CRM_NOTE_SUMMARY}</p>
            </div>
          )}
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-primary/60">
        Viewing the full Follow Up Boss dialer is best on desktop.
      </p>
    </div>
  );
}
