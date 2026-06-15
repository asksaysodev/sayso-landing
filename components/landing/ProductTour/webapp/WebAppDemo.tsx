'use client';

/**
 * Web App demo: a scaled browser window showing the real Sayso web app
 * (sidebar + dashboard + conversations). It autoplays a flow: start on the
 * dashboard, scroll down to the conversations, open one and cycle through its
 * Cue / Smart Capture / Pulse tabs, then move to the next, and loop.
 */
import './webapp.css';
import { useEffect, useMemo, useRef, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { useScaleToFit } from '../hooks/useScaleToFit';
import { BrowserChrome } from '../components/BrowserChrome';
import { Sidebar } from './components/Sidebar';
import { DashboardTop } from './components/DashboardTop';
import { Conversations } from './components/Conversations';
import type { ConversationTab } from './components/ConversationTabs';

const DESIGN_WIDTH = 1180;
const DESIGN_HEIGHT = 720;
const TICK = 100;

type Scroll = 'top' | 'list' | 'item';
interface Step {
  at: number;
  scroll: Scroll;
  openId: string | null;
  tab: ConversationTab;
}

// The scripted walkthrough. Loops at LOOP_MS.
const STEPS: Step[] = [
  { at: 0, scroll: 'top', openId: null, tab: 'Cue' },
  { at: 3200, scroll: 'list', openId: null, tab: 'Cue' },
  { at: 5200, scroll: 'item', openId: 'c1', tab: 'Cue' },
  { at: 9000, scroll: 'item', openId: 'c1', tab: 'Smart Capture' },
  { at: 12500, scroll: 'item', openId: 'c1', tab: 'Pulse' },
  { at: 15500, scroll: 'item', openId: 'c2', tab: 'Cue' },
  { at: 19000, scroll: 'item', openId: 'c2', tab: 'Smart Capture' },
  { at: 22000, scroll: 'top', openId: null, tab: 'Cue' },
];
const LOOP_MS = 25000;

export function WebAppDemo() {
  const { containerRef, scale } = useScaleToFit(DESIGN_WIDTH, DESIGN_HEIGHT, 0.74);
  const mainRef = useRef<HTMLDivElement | null>(null);
  const convRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const [elapsed, setElapsed] = useState(0);
  const [openId, setOpenId] = useState<string | null>(null);
  const [tab, setTab] = useState<ConversationTab>('Cue');

  useEffect(() => {
    const id = setInterval(() => setElapsed((e) => (e + TICK) % LOOP_MS), TICK);
    return () => clearInterval(id);
  }, []);

  const stepIndex = useMemo(() => {
    let idx = 0;
    for (let i = 0; i < STEPS.length; i++) if (elapsed >= STEPS[i].at) idx = i;
    return idx;
  }, [elapsed]);

  // Apply the active step: set open/tab state, then scroll after it renders.
  useEffect(() => {
    const step = STEPS[stepIndex];
    setOpenId(step.openId);
    setTab(step.tab);

    const t = setTimeout(() => {
      const main = mainRef.current;
      if (!main) return;
      if (step.scroll === 'top') {
        main.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (step.scroll === 'list' && convRef.current) {
        scrollToEl(main, convRef.current, 16);
      } else if (step.scroll === 'item' && step.openId && itemRefs.current[step.openId]) {
        scrollToEl(main, itemRefs.current[step.openId]!, 64);
      }
    }, 280);
    return () => clearTimeout(t);
  }, [stepIndex]);

  return (
    <div ref={containerRef} className="mt-4 mx-auto max-w-[1240px]">
      <div className="mx-auto" style={{ width: DESIGN_WIDTH * scale, height: DESIGN_HEIGHT * scale }}>
        <div
          className="origin-top-left"
          style={{ width: DESIGN_WIDTH, height: DESIGN_HEIGHT, transform: `scale(${scale})` }}
        >
          <BrowserChrome url="app.asksayso.com">
            <div className="pt-webapp">
              <Sidebar />
              <div ref={mainRef} className="wa-main">
                <div className="wa-view">
                  <div className="wa-title">
                    My Dashboard
                    <RefreshCw size={18} className="text-[color:var(--sayso-lightgray)]" />
                  </div>
                  <DashboardTop />
                  <div ref={convRef}>
                    <Conversations
                      openId={openId}
                      activeTab={tab}
                      setItemRef={(id, el) => {
                        itemRefs.current[id] = el;
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </BrowserChrome>
        </div>
      </div>
    </div>
  );
}

/** Smoothly scrolls a scroll container so `el` sits near its top. */
function scrollToEl(container: HTMLElement, el: HTMLElement, offset: number) {
  const top = container.scrollTop + (el.getBoundingClientRect().top - container.getBoundingClientRect().top) - offset;
  container.scrollTo({ top, behavior: 'smooth' });
}
