'use client';

const SCRIPT_SECTIONS = [
  {
    title: 'Introduction',
    content:
      'Hey [Name], this is [Your first name]. I\'m calling about your home on [Street]. Are you still trying to sell it, or are you waiting for something to change?',
  },
  {
    title: 'If still trying to sell:',
    bullets: [
      'Got it.',
      'On a scale of 1 to 7, how frustrated are you with how it played out?',
      'When you first listed, where were you planning on going?',
      'Is that move still important?',
      'If you had to do it again, what would you change?',
    ],
  },
  {
    title: 'Transition',
    bullets: [
      'Got it.',
      'On a scale of 1 to 7, how frustrated are you with how it played out?',
      'When you first listed, where were you planning on going?',
    ],
  },
];

export function PlaybookScriptWindow() {
  return (
    <div
      className="relative"
      style={{
        borderRadius: '16px',
        background: 'rgba(2, 25, 47, 0.75)',
        backdropFilter: 'blur(40px)',
        WebkitBackdropFilter: 'blur(40px)',
        boxShadow:
          '0 8px 32px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(114, 126, 137, 0.12)',
        border: '0.5px solid rgba(255, 255, 255, 0.12)',
        padding: '14px 16px',
        maxHeight: '320px',
        overflow: 'hidden',
      }}
    >
      {/* Header with dropdown chevron */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-white font-semibold text-sm">Expired Script</span>
          {/* Dropdown chevron */}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="opacity-60">
            <path d="M3 5l3 3 3-3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        {/* Minimize button */}
        <div className="w-5 h-5 flex items-center justify-center opacity-50">
          <svg width="12" height="2" viewBox="0 0 12 2" fill="white">
            <rect width="12" height="2" rx="1" />
          </svg>
        </div>
      </div>

      {/* Script sections */}
      <div className="flex flex-col gap-3">
        {SCRIPT_SECTIONS.map((section, i) => (
          <div key={i}>
            <h4 className="text-[#FFDE59] text-[12px] font-semibold mb-1.5">
              {section.title}
            </h4>
            {section.content && (
              <p className="text-white/85 text-[13px] leading-relaxed">
                - {section.content}
              </p>
            )}
            {section.bullets && (
              <div className="flex flex-col gap-1">
                {section.bullets.map((bullet, j) => (
                  <p key={j} className="text-white/85 text-[13px] leading-relaxed">
                    - {bullet}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Fade-out gradient at bottom to indicate scrollable content */}
      <div
        className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
        style={{
          background: 'linear-gradient(transparent, rgba(2, 25, 47, 0.75))',
          borderRadius: '0 0 16px 16px',
        }}
      />
    </div>
  );
}
