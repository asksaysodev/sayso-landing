'use client';

/**
 * Hero call-to-action row: Download Sayso, Book a demo, Try it live (jumps to
 * the guided demo) and Watch the demo (opens the video pop-out).
 */
import { useCallback, useRef, useState } from 'react';
import { useDemoCalendar } from '@/app/context/landing/DemoCalendarContext';
import { Button } from '@/components/ui/Button';
import { focusRing } from '../../HomeShared/styles';
import { DemoVideoModal } from './DemoVideoModal';

const textButton = `inline-flex h-12 items-center gap-2 rounded-full px-3.5 font-semibold text-[#1D4871] hover:bg-[rgba(29,72,113,0.07)] ${focusRing}`;

export function HeroActions() {
  const { openDemoCalendar, openSignup } = useDemoCalendar();
  const [videoOpen, setVideoOpen] = useState(false);
  const videoButtonRef = useRef<HTMLButtonElement>(null);
  const closeVideo = useCallback(() => setVideoOpen(false), []);

  return (
    <>
      <div className="mt-[30px] flex flex-wrap justify-center gap-x-3 gap-y-2.5">
        <Button withArrow onClick={openSignup} data-analytics-id="cta-download-hero">
          Download Sayso
        </Button>
        <Button variant="secondary" onClick={openDemoCalendar} data-analytics-id="cta-book-demo-hero">
          Book a demo
        </Button>
        <a href="#demo" className={textButton}>
          Try it live &darr;
        </a>
        <button ref={videoButtonRef} type="button" className={textButton} onClick={() => setVideoOpen(true)} data-analytics-id="cta-watch-video-hero">
          <span aria-hidden="true" className="grid h-6 w-6 place-items-center rounded-full bg-[#1D4871] pl-0.5 text-[9px] text-white">
            &#9654;
          </span>
          Watch the demo
        </button>
      </div>
      <DemoVideoModal open={videoOpen} onClose={closeVideo} returnFocusRef={videoButtonRef} />
    </>
  );
}
