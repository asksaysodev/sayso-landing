'use client';

interface SaysoToolbarProps {
  zipValue?: string;
  showZipSearch?: boolean;
  timer?: string;
}

export function SaysoToolbar({
  zipValue,
  showZipSearch = true,
  timer = '0:14:00',
}: SaysoToolbarProps) {
  return (
    <div
      className="h-[48px] flex items-center justify-between px-3"
      style={{
        borderRadius: '24px',
        background: 'rgba(2, 25, 47, 0.25)',
        backdropFilter: 'blur(200px)',
        WebkitBackdropFilter: 'blur(200px)',
        boxShadow: 'inset 0 1px 0 rgba(114, 126, 137, 0.12)',
      }}
    >
      {/* Left: grip dots + divider + Buyer pill + Zip search */}
      <div className="flex items-center">
        {/* Grip dots */}
        <div className="flex items-center justify-center text-white text-[20px] opacity-80">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="9" cy="5" r="1.5" />
            <circle cx="15" cy="5" r="1.5" />
            <circle cx="9" cy="12" r="1.5" />
            <circle cx="15" cy="12" r="1.5" />
            <circle cx="9" cy="19" r="1.5" />
            <circle cx="15" cy="19" r="1.5" />
          </svg>
        </div>

        {/* Divider */}
        <div
          className="mx-3"
          style={{ width: '1px', height: '28px', backgroundColor: 'rgba(255, 255, 255, 0.4)' }}
        />

        {/* Buyer pill */}
        <div className="flex items-center">
          <div className="w-[32px] h-[32px] rounded-full bg-white flex items-center justify-center z-10">
            <span className="text-black text-sm font-medium">B</span>
          </div>
          <div
            className="h-[30px] flex items-center gap-1.5 pl-[24px] pr-3 -ml-[12px] z-0"
            style={{
              borderTopRightRadius: '100px',
              borderBottomRightRadius: '100px',
              backgroundColor: 'rgba(255, 255, 255, 0.234)',
              border: '1px solid #2367EE',
            }}
          >
            <span className="text-white text-sm font-normal">Buyer</span>
          </div>
        </div>

        {/* Zip code search */}
        {showZipSearch && (
          <div className="ml-3 flex items-center">
            {zipValue ? (
              <div
                className="h-[30px] flex items-center gap-1.5 px-3 rounded-full"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                <span className="text-white/70 text-xs">Zip:</span>
                <span className="text-white text-sm font-medium">{zipValue}</span>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="opacity-60 ml-1">
                  <path d="M2 2l6 6M8 2l-6 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            ) : (
              <div
                className="h-[30px] flex items-center gap-1.5 px-3 rounded-full"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                }}
              >
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="opacity-60">
                  <circle cx="6" cy="6" r="4.5" stroke="white" strokeWidth="1.5" />
                  <line x1="9.5" y1="9.5" x2="13" y2="13" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span className="text-white/50 text-xs">Zip Code</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right: pause + stop + timer + list + checkmark */}
      <div className="flex items-center gap-2">
        {/* Pause button */}
        <button
          className="w-7 h-7 rounded-full flex items-center justify-center"
          style={{ backgroundColor: '#4f46e5' }}
        >
          <svg width="10" height="12" viewBox="0 0 12 14" fill="white">
            <rect x="1" y="1" width="3.5" height="12" rx="1" />
            <rect x="7.5" y="1" width="3.5" height="12" rx="1" />
          </svg>
        </button>

        {/* Stop button */}
        <button
          className="w-7 h-7 rounded-full flex items-center justify-center"
          style={{ backgroundColor: '#dc2626' }}
        >
          <svg width="10" height="10" viewBox="0 0 12 12" fill="white">
            <rect x="1" y="1" width="10" height="10" rx="1.5" />
          </svg>
        </button>

        {/* Timer */}
        <span className="text-white/80 text-xs font-mono ml-1">{timer}</span>

        {/* List icon */}
        <div className="w-6 h-6 flex items-center justify-center opacity-60">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="1.5">
            <line x1="4" y1="4" x2="14" y2="4" strokeLinecap="round" />
            <line x1="4" y1="8" x2="14" y2="8" strokeLinecap="round" />
            <line x1="4" y1="12" x2="14" y2="12" strokeLinecap="round" />
            <circle cx="1.5" cy="4" r="1" fill="white" stroke="none" />
            <circle cx="1.5" cy="8" r="1" fill="white" stroke="none" />
            <circle cx="1.5" cy="12" r="1" fill="white" stroke="none" />
          </svg>
        </div>

        {/* Checkmark icon */}
        <div className="w-6 h-6 flex items-center justify-center opacity-60">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" stroke="white" strokeWidth="1.5" />
            <path d="M5 8l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}
