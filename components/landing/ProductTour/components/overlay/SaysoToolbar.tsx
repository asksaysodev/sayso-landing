import { GripVertical, Search, ChevronDown, RotateCcw, Square, CircleCheckBig, List } from 'lucide-react';
import type { LeadType } from '../../types';

/**
 * The Sayso coach window toolbar pill, reproduced from the desktop app. Shown in
 * its active-session state (the call is live throughout the tour): lead type,
 * optional Pulse zip pill, reset/stop controls, call timer, and the right-side
 * insights (eye) + playbook buttons.
 */
interface SaysoToolbarProps {
  leadType: LeadType;
  timer: string;
  showZip: boolean;
  zipValue: string;
  zipActive: boolean;
  insightsActive: boolean;
  playbookActive: boolean;
}

export function SaysoToolbar({
  leadType,
  timer,
  showZip,
  zipValue,
  zipActive,
  insightsActive,
  playbookActive,
}: SaysoToolbarProps) {
  return (
    <div className="pt-glass pt-toolbar">
      <span className="pt-drag">
        <GripVertical />
      </span>
      <span className="pt-divider" />

      <div className="pt-toolbar-inner">
        {/* Lead type */}
        <span className="pt-leadtype">
          <span className="pt-leadtype-initial">{leadType[0]}</span>
          {leadType}
        </span>

        {/* Pulse zip pill */}
        {showZip && (
          <span className="pt-zip" data-active={zipActive}>
            <Search className="pt-zip-icon" />
            <span className="pt-zip-value" data-placeholder={zipValue.length === 0}>
              {zipValue.length > 0 ? zipValue : 'Zip Code'}
            </span>
            {zipActive && <ChevronDown className="h-4 w-4" />}
          </span>
        )}

        {/* Session controls */}
        <span className="pt-btn pt-btn-icon pt-btn-reset">
          <RotateCcw className="h-[15px] w-[15px]" />
        </span>
        <span className="pt-btn pt-btn-icon pt-btn-stop">
          <Square className="h-3 w-3 fill-current" />
        </span>
        <span className="pt-timer tabular-nums">{timer}</span>
      </div>

      {/* Right side buttons */}
      <div className="pt-right-buttons">
        <span className="pt-right-btn" data-active={insightsActive}>
          <CircleCheckBig size={15} />
        </span>
        <span className="pt-right-btn" data-active={playbookActive}>
          <List size={15} />
        </span>
      </div>
    </div>
  );
}
