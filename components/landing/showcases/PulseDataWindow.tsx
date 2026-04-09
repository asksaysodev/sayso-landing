'use client';

const PULSE_DATA = [
  { label: 'Avg. DOM', value: '47', bold: true },
  { label: 'L90D Sale Price/List Price %', value: '98%', bold: true },
  { label: 'Price / sqft', value: '$287', bold: true },
  { label: 'L90D Price Trend', value: 'Stable', bold: true },
  { label: 'Inventory Level', value: 'Low', bold: true },
];

export function PulseDataWindow() {
  return (
    <div
      style={{
        borderRadius: '16px',
        background: 'rgba(2, 25, 47, 0.75)',
        backdropFilter: 'blur(40px)',
        WebkitBackdropFilter: 'blur(40px)',
        boxShadow:
          '0 8px 32px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(114, 126, 137, 0.12)',
        border: '0.5px solid rgba(255, 255, 255, 0.12)',
        padding: '14px 16px',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-white font-semibold text-sm">Pulse</span>
          <div
            className="flex items-center gap-1 px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: 'rgba(139, 92, 246, 0.2)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
            }}
          >
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
              <path d="M6 1C4.067 1 2.5 2.567 2.5 4.5 2.5 7.25 6 11 6 11s3.5-3.75 3.5-6.5C9.5 2.567 7.933 1 6 1z" fill="#A855F7" />
              <circle cx="6" cy="4.5" r="1.5" fill="white" />
            </svg>
            <span className="text-[11px] text-purple-300 font-medium">85323</span>
          </div>
        </div>
        {/* Minimize button */}
        <div className="w-5 h-5 flex items-center justify-center opacity-50 cursor-pointer">
          <svg width="12" height="2" viewBox="0 0 12 2" fill="white">
            <rect width="12" height="2" rx="1" />
          </svg>
        </div>
      </div>

      {/* Data rows */}
      <div className="flex flex-col gap-2">
        {PULSE_DATA.map((row, i) => (
          <div key={i} className="flex items-center justify-between">
            <span className="text-white/60 text-[13px]">{row.label}:</span>
            <span className={`text-white text-[13px] ${row.bold ? 'font-bold' : ''}`}>
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
