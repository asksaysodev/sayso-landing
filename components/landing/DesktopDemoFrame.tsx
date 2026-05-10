'use client';

import { ReactNode, useRef, useEffect } from 'react';

// Chrome tab strip — Windows 10/11 style
function ChromeTabStrip() {
  return (
    <div
      className="flex items-end select-none flex-shrink-0"
      style={{ height: 36, background: '#DEE1E6' }}
    >
      {/* Active tab */}
      <div
        className="relative flex items-center h-[30px] px-3 gap-1.5 bg-white ml-2 flex-shrink-0"
        style={{
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          minWidth: 180,
          maxWidth: 240,
          boxShadow: '0 -1px 0 0 rgba(0,0,0,0.06)',
        }}
      >
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: 2,
            background: '#2367EE',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <svg viewBox="0 0 32 32" width="10" height="10" fill="white">
            <path d="M18.4 5.6L7.2 17.6H16L13.6 26.4L24.8 14.4H16L18.4 5.6Z" />
          </svg>
        </div>
        <span style={{ fontSize: 11, color: '#3c4043', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          Mojo Dialer - Alex Agent
        </span>
        <span style={{ fontSize: 14, color: '#9aa0a6', lineHeight: 1, cursor: 'default' }}>×</span>
      </div>
      {/* New tab button */}
      <div style={{ width: 30, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5f6368', cursor: 'default', marginBottom: 2 }}>
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
          <line x1="5.5" y1="1.5" x2="5.5" y2="9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="1.5" y1="5.5" x2="9.5" y2="5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      <div style={{ flex: 1 }} />
      {/* Windows window controls */}
      {[{ label: '─', fontSize: 13 }, { label: '□', fontSize: 10 }, { label: '✕', fontSize: 12 }].map(({ label, fontSize }, i) => (
        <div key={i} style={{ width: 40, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize, color: '#5f6368', cursor: 'default', borderTopRightRadius: i === 2 ? 8 : 0 }}>
          {label}
        </div>
      ))}
    </div>
  );
}

// Chrome address / toolbar bar
function ChromeAddressBar() {
  return (
    <div
      className="flex items-center gap-1 px-2 select-none flex-shrink-0"
      style={{ height: 40, background: '#FFFFFF', borderBottom: '1px solid #e0e0e0' }}
    >
      <div style={{ width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5f6368' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M15 18l-6-6 6-6" /></svg>
      </div>
      <div style={{ width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#bdbdbd' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6" /></svg>
      </div>
      <div style={{ width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5f6368' }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" />
        </svg>
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6, height: 28, background: '#f1f3f4', borderRadius: 14, padding: '0 10px' }}>
        <svg width="10" height="11" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <span style={{ fontSize: 11, color: '#3c4043', flex: 1 }}>app.mojosells.com</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <div style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5f6368' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7s2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z" />
          </svg>
        </div>
        <div style={{ width: 22, height: 22, borderRadius: 4, background: '#2367EE', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="12" height="12" viewBox="0 0 32 32" fill="white">
            <path d="M18.4 5.6L7.2 17.6H16L13.6 26.4L24.8 14.4H16L18.4 5.6Z" />
          </svg>
        </div>
        <div style={{ width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5f6368' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="19" r="1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export function DesktopDemoFrame({
  children,
  showRecording = false,
  desktopOverlay,
  fullscreen = false,
  onWidgetPosition,
}: {
  children: ReactNode;
  showRecording?: boolean;
  desktopOverlay?: ReactNode;
  fullscreen?: boolean;
  onWidgetPosition?: (pos: { bottom: number; centerX: number }) => void;
}) {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const widget = widgetRef.current;
    if (!widget || !onWidgetPosition) return;

    const update = () => {
      const parent = widget.offsetParent as HTMLElement;
      if (!parent) return;
      const bottom = parent.offsetTop + widget.offsetTop + widget.offsetHeight + 10;
      const centerX = parent.offsetLeft + widget.offsetLeft + widget.offsetWidth / 2;
      onWidgetPosition({ bottom, centerX });
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(widget);
    return () => observer.disconnect();
  }, [onWidgetPosition]);

  if (fullscreen) {
    return <div className="absolute inset-0">{children}</div>;
  }

  // Chrome UI: 36px tab strip + 40px address bar
  const CHROME_HEIGHT = 76;

  return (
    <div className="w-full relative">
      {/* 16/9 aspect ratio — shorter frame that fits in a single viewport */}
      <div
        className="relative overflow-hidden w-full aspect-[16/9] rounded-2xl border border-[#c4c4c4]"
        style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.08)' }}
      >
        <ChromeTabStrip />
        <ChromeAddressBar />

        {/* Content area: Sayso widget (left) + CRM dialer (right), side by side */}
        <div className="absolute inset-x-0 bottom-0 flex" style={{ top: CHROME_HEIGHT }}>

          {/* Left panel — Sayso widget on dark background */}
          {desktopOverlay && (
            <div
              className="flex-shrink-0 h-full overflow-hidden"
              style={{
                width: '36%',
                background: '#060f1e',
                borderRight: '1px solid rgba(255,255,255,0.06)',
                padding: '10px 10px',
              }}
            >
              <div ref={widgetRef} className="w-full">
                {desktopOverlay}
              </div>
            </div>
          )}

          {/* Right panel — CRM dialer */}
          <div className="flex-1 h-full relative overflow-hidden">
            {children}
          </div>

        </div>
      </div>
    </div>
  );
}
