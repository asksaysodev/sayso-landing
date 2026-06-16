'use client';

/**
 * Hero variant of the Product Tour stage: the same Follow Up Boss dialer with
 * the Sayso overlay, auto-playing and looping the Cue chapter, but without the
 * tour's header, feature pills, or playback controls. Used as the homepage
 * "wow moment"; the full interactive tour lives on /product-tour.
 */
import './product-tour.css';
import { useTourClock } from './hooks/useTourClock';
import { useScaleToFit } from './hooks/useScaleToFit';
import { deriveScene } from './helpers/derive';
import { DEMO_PROSPECT } from './data/prospect';
import { CRM_NOTE_SUMMARY } from './data/scenes';
import { BrowserChrome } from './components/BrowserChrome';
import { FubFrame } from './components/fub/FubFrame';
import { SaysoOverlay } from './components/overlay/SaysoOverlay';
import { MobileStage } from './components/MobileStage';

const DESIGN_WIDTH = 1180;
const DESIGN_HEIGHT = 720;
// Where the floating Sayso widget sits over the CRM (anchored to the far right).
const OVERLAY_TOP = 132;
const OVERLAY_RIGHT = 44;

export function HeroTourDemo() {
  const { featureKey, chapter, elapsed } = useTourClock();
  const derived = deriveScene(chapter, elapsed);
  const { containerRef, scale } = useScaleToFit(DESIGN_WIDTH, DESIGN_HEIGHT, 0.7);
  const fubTimer = formatTimerForFub(derived.callSeconds);

  return (
    <>
      {/* Desktop stage: the whole dialer window scaled to fit, widget on the far right */}
      <div ref={containerRef} className="mx-auto hidden w-full lg:block">
        <div
          className="mx-auto"
          style={{ width: DESIGN_WIDTH * scale, height: DESIGN_HEIGHT * scale }}
        >
          <div
            className="relative origin-top-left"
            style={{ width: DESIGN_WIDTH, height: DESIGN_HEIGHT, transform: `scale(${scale})` }}
          >
            <BrowserChrome url="app.followupboss.com/people">
              <FubFrame
                prospect={DEMO_PROSPECT}
                timer={fubTimer}
                speaker={derived.speaker}
                lpmama={derived.lpmama}
                crmNoteVisible={derived.crmNoteVisible}
                crmNoteSummary={CRM_NOTE_SUMMARY}
              />
            </BrowserChrome>

            <div className="absolute" style={{ top: OVERLAY_TOP, right: OVERLAY_RIGHT }}>
              <SaysoOverlay chapter={chapter} elapsed={elapsed} derived={derived} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile stage: focused vertical layout (own lg:hidden wrapper) */}
      <MobileStage
        featureKey={featureKey}
        chapter={chapter}
        derived={derived}
        prospect={DEMO_PROSPECT}
        timer={fubTimer}
      />
    </>
  );
}

/** The FUB call bar shows m:ss; format the running call seconds accordingly. */
function formatTimerForFub(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}
