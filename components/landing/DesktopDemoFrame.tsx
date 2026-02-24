'use client';

import { ReactNode, useRef, useEffect } from 'react';
import Image from 'next/image';

// macOS Menu Bar Component
function MacOSMenuBar() {
  return (
    <div className="absolute top-0 left-0 right-0 h-[26px] bg-black/25 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-4 z-50">
      {/* Left side - App menu */}
      <div className="flex items-center gap-[18px] text-white/90 text-[13px] leading-none">
        {/* Apple logo */}
        <svg width="12" height="15" viewBox="0 0 14 17" fill="currentColor" className="opacity-90">
          <path d="M13.2 5.8c-.1 0-1.8 1-1.8 3.1 0 2.4 2.1 3.3 2.2 3.3 0 0-.3 1.1-1.1 2.2-.7 1-1.4 2-2.5 2s-1.4-.6-2.6-.6c-1.3 0-1.7.7-2.7.7s-1.7-.9-2.5-2.1C1.1 12.7.3 10.6.3 8.6c0-3.2 2.1-4.9 4.1-4.9 1.1 0 2 .7 2.6.7.6 0 1.6-.8 2.9-.8.5 0 2.2.1 3.3 1.2zM9.6 2.5c.5-.7.9-1.6.9-2.5 0-.1 0-.3 0-.3 0 0-1.8.2-2.5 1-.5.6-1 1.5-1 2.4 0 .2 0 .3 0 .4h.1c.8 0 1.9-.5 2.5-1z"/>
        </svg>
        <span className="font-semibold">Sayso</span>
        <span className="text-white/60">File</span>
        <span className="text-white/60">Edit</span>
        <span className="text-white/60">View</span>
        <span className="text-white/60">Window</span>
        <span className="text-white/60">Help</span>
      </div>

      {/* Right side - Status icons */}
      <div className="flex items-center gap-[10px] text-white/80 text-[13px] leading-none">
        {/* Battery */}
        <svg width="22" height="11" viewBox="0 0 25 12" fill="none" className="opacity-70">
          <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="currentColor" strokeWidth="1"/>
          <rect x="22" y="3.5" width="2" height="5" rx="1" fill="currentColor" opacity="0.4"/>
          <rect x="2" y="2" width="16" height="8" rx="1.5" fill="currentColor" opacity="0.8"/>
        </svg>
        {/* Wi-Fi */}
        <svg width="14" height="11" viewBox="0 0 16 12" fill="currentColor" className="opacity-70">
          <path d="M8 10.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM4.3 8.4a5.2 5.2 0 017.4 0l-1 1a3.7 3.7 0 00-5.4 0l-1-1zM1.5 5.6a9 9 0 0113 0l-1 1a7.5 7.5 0 00-11 0l-1-1z"/>
        </svg>
        {/* Search (Spotlight) */}
        <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="opacity-60">
          <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
          <line x1="9.5" y1="9.5" x2="13" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        {/* Control Center */}
        <svg width="12" height="12" viewBox="0 0 14 14" fill="currentColor" className="opacity-60">
          <rect x="1" y="1" width="5" height="5" rx="1.5"/>
          <rect x="8" y="1" width="5" height="5" rx="1.5"/>
          <rect x="1" y="8" width="5" height="5" rx="1.5"/>
          <rect x="8" y="8" width="5" height="5" rx="1.5"/>
        </svg>
        <span className="font-medium text-[12px]">Sun 7:21 PM</span>
      </div>
    </div>
  );
}

// Window Chrome (3 traffic light dots)
function WindowChrome() {
  return (
    <div className="absolute top-0 left-0 right-0 h-8 bg-[#1a2332] flex items-center px-4 z-10 rounded-t-2xl">
      <div className="flex gap-2">
        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <div className="w-3 h-3 rounded-full bg-[#28c840]" />
      </div>
    </div>
  );
}

// macOS Dock
function MacOSDock() {
  const dockApps = [
    // Finder
    <svg key="finder" width="28" height="28" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="8" fill="linear" />
      <defs><linearGradient id="finder-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6EC6F5"/><stop offset="100%" stopColor="#2196F3"/></linearGradient></defs>
      <rect width="32" height="32" rx="8" fill="url(#finder-bg)"/>
      <rect x="9" y="7" width="14" height="18" rx="2" fill="white" opacity="0.9"/>
      <circle cx="16" cy="14" r="3" fill="#2196F3"/>
      <rect x="12" y="19" width="8" height="1.5" rx="0.75" fill="#2196F3" opacity="0.5"/>
    </svg>,
    // Safari
    <svg key="safari" width="28" height="28" viewBox="0 0 32 32">
      <defs><linearGradient id="safari-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#5AC8FA"/><stop offset="100%" stopColor="#007AFF"/></linearGradient></defs>
      <rect width="32" height="32" rx="8" fill="url(#safari-bg)"/>
      <circle cx="16" cy="16" r="10" fill="none" stroke="white" strokeWidth="1.5" opacity="0.9"/>
      <polygon points="16,8 19,15 16,24 13,17" fill="white" opacity="0.8"/>
      <polygon points="16,8 19,15 16,16" fill="#ff3b30" opacity="0.6"/>
    </svg>,
    // Messages
    <svg key="messages" width="28" height="28" viewBox="0 0 32 32">
      <defs><linearGradient id="msg-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#5EF58E"/><stop offset="100%" stopColor="#34C759"/></linearGradient></defs>
      <rect width="32" height="32" rx="8" fill="url(#msg-bg)"/>
      <ellipse cx="16" cy="15" rx="9" ry="7" fill="white" opacity="0.9"/>
      <ellipse cx="14" cy="22" rx="3" ry="2" fill="white" opacity="0.9"/>
    </svg>,
    // Mail
    <svg key="mail" width="28" height="28" viewBox="0 0 32 32">
      <defs><linearGradient id="mail-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#5AC8FA"/><stop offset="100%" stopColor="#007AFF"/></linearGradient></defs>
      <rect width="32" height="32" rx="8" fill="url(#mail-bg)"/>
      <rect x="6" y="10" width="20" height="13" rx="2" fill="white" opacity="0.9"/>
      <polyline points="6,10 16,18 26,10" fill="none" stroke="#007AFF" strokeWidth="1.5"/>
    </svg>,
    // Calendar
    <svg key="cal" width="28" height="28" viewBox="0 0 32 32">
      <rect width="32" height="32" rx="8" fill="white"/>
      <rect x="0" y="0" width="32" height="10" rx="8" fill="#ff3b30"/>
      <rect x="0" y="6" width="32" height="4" fill="#ff3b30"/>
      <text x="16" y="24" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1a1a1a">1</text>
    </svg>,
    // SaySo (lightning bolt logo)
    <svg key="sayso" width="28" height="28" viewBox="0 0 32 32">
      <defs><linearGradient id="sayso-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4B8BF5"/><stop offset="100%" stopColor="#2367EE"/></linearGradient></defs>
      <rect width="32" height="32" rx="8" fill="url(#sayso-bg)"/>
      <path d="M18.4 5.6L7.2 17.6H16L13.6 26.4L24.8 14.4H16L18.4 5.6Z" fill="white" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>,
    // Notes
    <svg key="notes" width="28" height="28" viewBox="0 0 32 32">
      <defs><linearGradient id="notes-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FEFCE8"/><stop offset="100%" stopColor="#FDE047"/></linearGradient></defs>
      <rect width="32" height="32" rx="8" fill="url(#notes-bg)"/>
      <rect x="8" y="8" width="16" height="2" rx="1" fill="#92400e" opacity="0.3"/>
      <rect x="8" y="13" width="16" height="2" rx="1" fill="#92400e" opacity="0.3"/>
      <rect x="8" y="18" width="12" height="2" rx="1" fill="#92400e" opacity="0.3"/>
    </svg>,
    // Settings
    <svg key="settings" width="28" height="28" viewBox="0 0 32 32">
      <defs><linearGradient id="set-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8E8E93"/><stop offset="100%" stopColor="#636366"/></linearGradient></defs>
      <rect width="32" height="32" rx="8" fill="url(#set-bg)"/>
      <circle cx="16" cy="16" r="6" fill="none" stroke="white" strokeWidth="2" opacity="0.9"/>
      <circle cx="16" cy="16" r="2.5" fill="white" opacity="0.9"/>
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <rect key={deg} x={15} y={7} width={2} height={4} rx={1} fill="white" opacity="0.9" transform={`rotate(${deg} 16 16)`} />
      ))}
    </svg>,
  ];

  return (
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-40">
      <div
        className="flex items-center gap-[6px] px-2 py-1.5 rounded-2xl"
        style={{
          background: 'rgba(255, 255, 255, 0.18)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        }}
      >
        {dockApps.map((icon, i) => (
          <div
            key={i}
            className="w-[30px] h-[30px] md:w-[36px] md:h-[36px] flex items-center justify-center rounded-lg hover:scale-110 transition-transform"
            style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}
          >
            {icon}
          </div>
        ))}
        {/* Separator before Trash */}
        <div className="w-px h-6 bg-white/20 mx-0.5" />
        {/* Trash */}
        <div
          className="w-[30px] h-[30px] md:w-[36px] md:h-[36px] flex items-center justify-center rounded-lg"
          style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}
        >
          <svg width="28" height="28" viewBox="0 0 32 32">
            <defs><linearGradient id="trash-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8E8E93"/><stop offset="100%" stopColor="#636366"/></linearGradient></defs>
            <rect width="32" height="32" rx="8" fill="url(#trash-bg)"/>
            <rect x="10" y="12" width="12" height="12" rx="1.5" fill="none" stroke="white" strokeWidth="1.5" opacity="0.8"/>
            <line x1="9" y1="12" x2="23" y2="12" stroke="white" strokeWidth="1.5" opacity="0.8" strokeLinecap="round"/>
            <rect x="13" y="9" width="6" height="3" rx="1" fill="none" stroke="white" strokeWidth="1.2" opacity="0.8"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

// Recording Indicator
function RecordingIndicator({ time }: { time: string }) {
  return (
    <div className="absolute top-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
      <span className="text-xs font-mono text-white/90">{time}</span>
    </div>
  );
}

// Main Desktop Demo Frame
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
      // Use offset properties for un-scaled layout coordinates
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

  return (
    <div className={fullscreen ? "absolute inset-0" : "w-full relative"}>
      {/* Desktop container */}
      <div className={`relative overflow-hidden ${fullscreen ? 'w-full h-full' : 'w-full aspect-[16/10] rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.4)] border border-[#3a3a3c]'}`}>
        {/* macOS Sonoma/Sequoia-style wallpaper — dark navy to teal */}
        <div className="absolute inset-0">
          {/* Base gradient */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, #0a1628 0%, #0f2847 25%, #1a3a5c 45%, #1e5478 60%, #1a6b7a 75%, #0f3d5e 90%, #0a1628 100%)',
            }}
          />
          {/* Subtle warm accent blob (bottom-left) */}
          <div
            className="absolute bottom-0 left-0 w-[60%] h-[50%] opacity-20"
            style={{
              background: 'radial-gradient(ellipse at 20% 80%, #2367EE 0%, transparent 70%)',
            }}
          />
          {/* Cool accent blob (top-right) */}
          <div
            className="absolute top-0 right-0 w-[50%] h-[50%] opacity-15"
            style={{
              background: 'radial-gradient(ellipse at 80% 20%, #5AC8FA 0%, transparent 70%)',
            }}
          />
          {/* Vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />
        </div>

        {/* macOS Menu Bar */}
        <MacOSMenuBar />

        {/* Recording Indicator */}
        {showRecording && <RecordingIndicator time="0:17" />}

        {/* SaySo widget — left side, vertically centered */}
        {desktopOverlay && (
          <div className="absolute top-[24%] left-[3%] z-30" style={{ width: 'clamp(280px, 34%, 440px)' }}>
            {/* Widget container with highlight border */}
            <div ref={widgetRef} className="relative">
              {/* Highlight border box - always visible */}
              <div
                className="absolute inset-[-10px] rounded-3xl border-[3px] border-[#2367EE] pointer-events-none"
                style={{
                  boxShadow: '0 0 25px rgba(35, 103, 238, 0.5), inset 0 0 15px rgba(35, 103, 238, 0.1)',
                }}
              />
              {desktopOverlay}
            </div>
          </div>
        )}

        {/* App Window — right area */}
        <div className="absolute top-[52%] right-[36%] translate-x-1/2 -translate-y-1/2 w-[62%] h-[76%] z-10">
          {/* Highlight border box - always visible */}
          <div
            className="absolute inset-[-12px] rounded-3xl border-[3px] border-[#2367EE] pointer-events-none z-20"
            style={{
              boxShadow: '0 0 30px rgba(35, 103, 238, 0.5), inset 0 0 20px rgba(35, 103, 238, 0.1)',
            }}
          />
          <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-white/10 bg-[#f8f9fa]">
            {/* Window Chrome */}
            <WindowChrome />

            {/* Product content */}
            <div className="absolute inset-0 top-8 overflow-hidden">
              {children}
            </div>
          </div>
        </div>

        {/* macOS Dock */}
        <MacOSDock />
      </div>


    </div>
  );
}
