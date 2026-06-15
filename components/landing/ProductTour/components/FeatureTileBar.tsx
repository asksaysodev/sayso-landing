import { AppWindow } from 'lucide-react';
import { FEATURES } from '../data/scenes';
import type { FeatureKey } from '../types';

/**
 * The row of oval feature pills above the stage. The active feature is
 * highlighted; clicking a pill jumps the tour to that chapter. A separate
 * yellow "App" pill switches to the web app demo.
 */
interface FeatureTileBarProps {
  activeKey: FeatureKey | null;
  appActive: boolean;
  onSelect: (key: FeatureKey) => void;
  onSelectApp: () => void;
}

export function FeatureTileBar({ activeKey, appActive, onSelect, onSelectApp }: FeatureTileBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
      {FEATURES.map((feature) => {
        const active = feature.key === activeKey;
        return (
          <button
            key={feature.key}
            onClick={() => onSelect(feature.key)}
            aria-pressed={active}
            className={`rounded-full border px-4 py-2 text-[13px] font-semibold transition-colors sm:text-sm ${
              active
                ? 'border-primary bg-primary text-white'
                : 'border-slate-300 bg-white text-primary hover:bg-slate-50'
            }`}
          >
            {feature.shortLabel}
          </button>
        );
      })}

      <span className="mx-1 hidden h-5 w-px bg-slate-300 sm:block" aria-hidden="true" />

      <button
        onClick={onSelectApp}
        aria-pressed={appActive}
        className={`inline-flex items-center justify-center gap-1.5 rounded-full border-2 border-[#1D4871] bg-accent px-4 py-2 text-[13px] font-bold text-[#1D4871] v2-comic-shadow-sm transition-transform hover:-translate-y-[1px] sm:text-sm ${
          appActive ? 'ring-2 ring-[#1D4871] ring-offset-1' : ''
        }`}
      >
        <AppWindow size={14} />
        App
      </button>
    </div>
  );
}
