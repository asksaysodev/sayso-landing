'use client';

/**
 * Product Tour: an autoplaying, browser-realistic walkthrough of Sayso working
 * as an overlay on top of a Follow Up Boss-style dialer. Visitors watch each of
 * the four products (Cue, Smart Capture, Pulse, Playbook) in action and can jump
 * between them with the feature pills. Composition only; logic lives in the hook
 * and helpers, visuals in the sub-components.
 */
import './product-tour.css';
import { useTourClock } from './hooks/useTourClock';
import { useScaleToFit } from './hooks/useScaleToFit';
import { deriveScene } from './helpers/derive';
import { DEMO_PROSPECT } from './data/prospect';
import { CRM_NOTE_SUMMARY } from './data/scenes';
import { FeatureTileBar } from './components/FeatureTileBar';
import { TourControls } from './components/TourControls';
import { BrowserChrome } from './components/BrowserChrome';
import { FubFrame } from './components/fub/FubFrame';
import { SaysoOverlay } from './components/overlay/SaysoOverlay';

const DESIGN_WIDTH = 1180;
const DESIGN_HEIGHT = 720;
// Where the floating Sayso widget sits over the CRM (within the design canvas).
const OVERLAY_TOP = 150;
const OVERLAY_LEFT = 300;

export function ProductTour() {
  const { featureKey, feature, chapter, elapsed, playing, progress, jumpTo, togglePlay, restart } =
    useTourClock();
  const derived = deriveScene(chapter, elapsed);
  const { containerRef, scale } = useScaleToFit(DESIGN_WIDTH);

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-comic text-4xl tracking-wide text-primary sm:text-5xl">
            See Sayso in Action
          </h2>
          <p className="mt-3 text-base text-primary/75 sm:text-lg">
            Watch Sayso work right inside your dialer, coaching the call, capturing
            the details, and logging notes to your CRM automatically.
          </p>
        </div>

        {/* Feature pills */}
        <div className="mt-8">
          <FeatureTileBar activeKey={featureKey} onSelect={jumpTo} />
        </div>

        {/* Stage: scaled desktop frame with the Sayso overlay floating on top */}
        <div ref={containerRef} className="mt-6">
          <div style={{ height: DESIGN_HEIGHT * scale }}>
            <div
              className="relative origin-top-left"
              style={{ width: DESIGN_WIDTH, height: DESIGN_HEIGHT, transform: `scale(${scale})` }}
            >
              <BrowserChrome url="app.followupboss.com/people">
                <FubFrame
                  prospect={DEMO_PROSPECT}
                  timer={formatTimerForFub(derived.callSeconds)}
                  speaker={derived.speaker}
                  lpmama={derived.lpmama}
                  crmNoteVisible={derived.crmNoteVisible}
                  crmNoteSummary={CRM_NOTE_SUMMARY}
                />
              </BrowserChrome>

              <div className="absolute" style={{ top: OVERLAY_TOP, left: OVERLAY_LEFT }}>
                <SaysoOverlay chapter={chapter} elapsed={elapsed} derived={derived} />
              </div>
            </div>
          </div>
        </div>

        {/* Controls + active feature caption */}
        <div className="mt-5">
          <TourControls
            playing={playing}
            progress={progress}
            onTogglePlay={togglePlay}
            onRestart={restart}
          />
          <p className="mt-4 text-center text-sm font-medium text-primary/70">
            <span className="font-semibold text-primary">{feature.label}.</span>{' '}
            {feature.caption}
          </p>
        </div>
      </div>
    </section>
  );
}

/** The FUB call bar shows m:ss; format the running call seconds accordingly. */
function formatTimerForFub(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}
