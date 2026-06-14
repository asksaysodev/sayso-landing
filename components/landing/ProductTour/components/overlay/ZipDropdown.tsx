import { MoveUpRight, MoveDownRight, Minus } from 'lucide-react';
import type { PulseScene } from '../../types';

/**
 * The Pulse market-data dropdown that expands below the toolbar. Shows a brief
 * "Processing" state, then the results grid (days on market, price trend, etc.).
 * Reproduced from the app's ZipCodeDropdown.
 */
interface ZipDropdownProps {
  pulse: PulseScene;
  showResults: boolean;
}

export function ZipDropdown({ pulse, showResults }: ZipDropdownProps) {
  return (
    <div className="pt-glass pt-zip-dropdown pt-fade-up">
      <div className="pt-zip-inner">
        {!showResults ? (
          <div className="flex items-center gap-2 text-[15px] text-[#c7c7c7]">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            Processing Information
          </div>
        ) : (
          <>
            <div className="pt-zip-city">{pulse.city}</div>
            <div className="pt-zip-facts">
              {pulse.facts.map((fact) => (
                <div key={fact.label} className="pt-zip-fact">
                  <span>•</span>
                  <span>
                    {fact.label}: <span className="pt-zip-fact-value">{fact.value}</span>
                    {fact.trend === 'up' && <MoveUpRight size={13} className="pt-trend-up ml-1 inline" />}
                    {fact.trend === 'down' && (
                      <MoveDownRight size={13} className="pt-trend-down ml-1 inline" />
                    )}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
        <Minus size={16} className="mt-2 text-white/50" />
      </div>
    </div>
  );
}
