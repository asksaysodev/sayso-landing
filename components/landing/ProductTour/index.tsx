'use client';

/**
 * Product Tour: a walkthrough of Sayso working as an overlay on top of a
 * Follow Up Boss-style dialer. Visitors pick a product pill (Cue, Smart Capture,
 * Pulse, Playbook) and watch that one feature in action; the active chapter
 * loops until another pill is chosen. Composition only; logic lives in the hook
 * and helpers, visuals in the sub-components.
 */
import './product-tour.css';
import { useState } from 'react';
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
import { MobileStage } from './components/MobileStage';
import { WebAppDemo } from './webapp/WebAppDemo';

const DESIGN_WIDTH = 1180;
const DESIGN_HEIGHT = 720;
// Where the floating Sayso widget sits over the CRM (anchored to the far right).
const OVERLAY_TOP = 132;
const OVERLAY_RIGHT = 44;

export function ProductTour() {
  const { featureKey, feature, chapter, elapsed, playing, jumpTo, togglePlay, restart } =
    useTourClock();
  const derived = deriveScene(chapter, elapsed);
  const { containerRef, scale } = useScaleToFit(DESIGN_WIDTH, DESIGN_HEIGHT, 0.74);
  const fubTimer = formatTimerForFub(derived.callSeconds);

  // 'dialer' = the four product chapters inside Follow Up Boss; 'app' = web app demo.
  const [mode, setMode] = useState<'dialer' | 'app'>('dialer');
  const isApp = mode === 'app';

  return (
    <section className="bg-white py-8">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-comic text-3xl tracking-wide text-primary sm:text-4xl">
            See Sayso in Action
          </h2>
          <p className="mt-2 text-sm text-primary/75 sm:text-base">
            Watch Sayso work with your existing CRM / dialer: coaching the call,
            real-time intelligence, capturing the details, and logging notes to your
            CRM automatically.
          </p>
        </div>

        {/* Feature pills + short caption for the selected feature */}
        <div className="mt-5">
          <FeatureTileBar
            activeKey={isApp ? null : featureKey}
            appActive={isApp}
            onSelect={(key) => {
              setMode('dialer');
              jumpTo(key);
            }}
            onSelectApp={() => setMode('app')}
          />
          <p className="mt-3 text-center text-sm font-semibold text-primary">
            {isApp ? (
              <>
                App:{' '}
                <span className="font-medium text-primary/75">
                  Review every conversation, the details Sayso captured, and the coaching, after the call.
                </span>
              </>
            ) : (
              <>
                {feature.label.split(' · ')[0]}:{' '}
                <span className="font-medium text-primary/75">{feature.tagline}</span>
              </>
            )}
          </p>
        </div>

        {isApp ? (
          <WebAppDemo />
        ) : (
          <>
        {/* Desktop stage: whole dialer window scaled to fit, widget on the far right */}
        <div ref={containerRef} className="mt-4 mx-auto hidden max-w-[1240px] lg:block">
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

        {/* Mobile stage: focused vertical layout */}
        <div className="mt-4">
          <MobileStage
            featureKey={featureKey}
            chapter={chapter}
            derived={derived}
            prospect={DEMO_PROSPECT}
            timer={fubTimer}
            elapsed={elapsed}
          />
        </div>

        {/* Controls */}
        <div className="mt-4">
          <TourControls playing={playing} onTogglePlay={togglePlay} onRestart={restart} />
        </div>
          </>
        )}
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
