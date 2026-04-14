'use client';

const SIGNALS = [
  {
    label: 'Motivation',
    value: 'Wants to downsize after kids moved out',
    color: '#8B5CF6',
  },
  {
    label: 'Timeline',
    value: 'Hoping to list by end of Q2',
    color: '#8B5CF6',
  },
  {
    label: 'Location',
    value: 'Considering 85323, Chandler area',
    color: '#A855F7',
    isLocation: true,
  },
  {
    label: 'Objection',
    value: 'Not sure if now is the right time',
    color: '#8B5CF6',
  },
];

interface SmartCaptureBubblesProps {
  maxSignals?: number;
}

export function SmartCaptureBubbles({ maxSignals = 3 }: SmartCaptureBubblesProps) {
  const visibleSignals = SIGNALS.slice(0, maxSignals);

  return (
    <div
      className="w-full flex flex-col gap-[8px]"
      style={{
        padding: '10px 12px',
        borderRadius: '16px',
        background: 'rgba(2, 25, 47, 0.28)',
        backdropFilter: 'blur(200px)',
        WebkitBackdropFilter: 'blur(200px)',
        boxShadow: 'inset 0 1px 0 rgba(114, 126, 137, 0.12)',
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M8 1l2 5h5l-4 3 1.5 5L8 11l-4.5 3L5 9 1 6h5z" fill="#8B5CF6" />
        </svg>
        <span className="text-white/70 text-[11px] font-medium uppercase tracking-wider">
          Smart Capture
        </span>
      </div>

      {visibleSignals.map((signal, i) => (
        <div
          key={i}
          className="flex items-start gap-2"
          style={{
            borderRadius: '12px',
            padding: '8px 12px',
            border: `0.5px solid ${signal.isLocation ? 'rgba(168, 85, 247, 0.4)' : 'rgba(255, 255, 255, 0.1)'}`,
            background: signal.isLocation
              ? 'rgba(139, 92, 246, 0.15)'
              : 'rgba(255, 255, 255, 0.07)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        >
          {/* Check icon */}
          <div className="flex-shrink-0 mt-0.5">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" fill={signal.color} opacity="0.3" />
              <path d="M5 8l2 2 4-4" stroke={signal.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex flex-col gap-0.5">
            <span
              className="text-[11px] font-semibold uppercase tracking-wider"
              style={{ color: signal.color }}
            >
              {signal.label}
            </span>
            <span className="text-white/85 text-[13px] leading-snug">
              {signal.isLocation && (
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" className="inline mr-1 -mt-0.5">
                  <path d="M6 1C4.067 1 2.5 2.567 2.5 4.5 2.5 7.25 6 11 6 11s3.5-3.75 3.5-6.5C9.5 2.567 7.933 1 6 1z" fill="#A855F7" />
                  <circle cx="6" cy="4.5" r="1.5" fill="white" />
                </svg>
              )}
              {signal.value}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
