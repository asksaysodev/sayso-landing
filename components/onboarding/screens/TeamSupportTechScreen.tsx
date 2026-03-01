'use client';

const OPTIONS = [
  { label: 'Our agents get coached' },
  { label: 'We use a CRM / Dialer' },
  { label: 'We do group role play' },
];

interface TeamSupportTechScreenProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export function TeamSupportTechScreen({ value, onChange }: TeamSupportTechScreenProps) {
  const toggle = (label: string) => {
    if (value.includes(label)) {
      onChange(value.filter((v) => v !== label));
    } else {
      onChange([...value, label]);
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-xl md:text-2xl font-bold text-[#1D4871]">
        How do you help your agents create better conversations?
      </h1>

      <div className="flex flex-col gap-2.5 max-w-md mx-auto mt-6">
        {OPTIONS.map((option) => {
          const isSelected = value.includes(option.label);
          return (
            <button
              key={option.label}
              onClick={() => toggle(option.label)}
              className={`w-full rounded-xl px-5 py-3 cursor-pointer text-left transition-all duration-200 border-2 flex items-center gap-3 ${
                isSelected
                  ? 'bg-[#2367EE]/5 border-[#2367EE] shadow-sm ring-2 ring-[#2367EE]/20'
                  : 'bg-white border-[#D7DEE1] hover:border-[#2367EE] hover:shadow-sm'
              } focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2367EE] focus-visible:ring-offset-2`}
            >
              <span className="text-base font-semibold text-[#1D4871] flex-1">{option.label}</span>
              <div
                className={`w-6 h-6 rounded-md flex-shrink-0 flex items-center justify-center transition-all duration-200 ${
                  isSelected ? 'bg-[#2367EE]' : 'border-2 border-[#D7DEE1]'
                }`}
              >
                {isSelected && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 6L5 8.5L9.5 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
