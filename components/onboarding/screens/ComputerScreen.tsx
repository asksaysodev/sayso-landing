'use client';

interface ComputerScreenProps {
  isTeam: boolean;
  value: string | null;
  onChange: (value: string) => void;
  onAutoAdvance: () => void;
}

export function ComputerScreen({ isTeam, value, onChange, onAutoAdvance }: ComputerScreenProps) {
  const question = isTeam
    ? 'What hardware does your team have?'
    : 'What type of computer do you use?';

  const options = isTeam ? ['Mac', 'PC', 'Mix'] : ['Mac', 'PC'];

  const handleSelect = (option: string) => {
    onChange(option);
    onAutoAdvance();
  };

  return (
    <div className="text-center">
      <h1 className="text-xl md:text-2xl font-bold text-[#1D4871]">
        {question}
      </h1>

      <div
        className={`grid gap-4 max-w-md mx-auto mt-8 ${
          options.length === 3 ? 'grid-cols-3' : 'grid-cols-2'
        }`}
      >
        {options.map((option) => {
          const isSelected = value === option;
          return (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className={`rounded-2xl py-8 px-4 cursor-pointer text-center transition-all duration-200 border-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2367EE] focus-visible:ring-offset-2 ${
                isSelected
                  ? 'bg-[#2367EE]/5 border-[#2367EE] shadow-md ring-2 ring-[#2367EE]/20'
                  : 'bg-white border-[#D7DEE1] hover:border-[#2367EE] hover:shadow-md'
              }`}
            >
              {option === 'Mac' && (
                <img src="/apple-brands-solid-full.svg" alt="Mac logo" className="h-12 w-auto mx-auto mb-2 block" />
              )}
              {option === 'PC' && (
                <img src="/microsoft-brands-solid-full.svg" alt="Microsoft logo" className="h-12 w-auto mx-auto mb-2 block" />
              )}
              <span className="text-base font-bold text-[#1D4871]">{option}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
