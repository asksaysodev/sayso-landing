'use client';

const OPTIONS = [
  'Individual Agent',
  'Team Agent',
  'Team Lead',
  'Office Broker/Manager',
];

interface RoleScreenProps {
  value: string | null;
  onChange: (value: string) => void;
  onAutoAdvance: () => void;
}

export function RoleScreen({ value, onChange, onAutoAdvance }: RoleScreenProps) {
  const handleSelect = (option: string) => {
    onChange(option);
    onAutoAdvance();
  };

  return (
    <div className="text-center">
      <h1 className="text-xl md:text-2xl font-bold text-[#1D4871]">
        What is your role?
      </h1>

      <div className="flex flex-col gap-2.5 max-w-md mx-auto mt-6">
        {OPTIONS.map((option) => {
          const isSelected = value === option;
          return (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className={`w-full rounded-xl px-5 py-3 cursor-pointer text-left transition-all duration-200 border-2 flex items-center justify-between ${
                isSelected
                  ? 'bg-[#2367EE]/5 border-[#2367EE] shadow-sm ring-2 ring-[#2367EE]/20'
                  : 'bg-white border-[#D7DEE1] hover:border-[#2367EE] hover:shadow-sm'
              } focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2367EE] focus-visible:ring-offset-2`}
            >
              <span className="text-base font-semibold text-[#1D4871]">{option}</span>
              <div
                className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-200 ${
                  isSelected
                    ? 'bg-[#2367EE]'
                    : 'border-2 border-[#D7DEE1]'
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
