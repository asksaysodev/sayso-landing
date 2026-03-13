type Step = { id: number; text: string };

export function StepsList({ steps }: { steps: Step[] }) {
  return (
    <ol className="space-y-4">
      {steps.map(({ id, text }, i) => (
        <li key={id} className="flex items-start gap-4">
          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FFDE59] flex items-center justify-center font-bold text-[#1D4871] text-sm">
            {i + 1}
          </span>
          <p className="text-base text-[#1D4871]/80 leading-relaxed pt-1">{text}</p>
        </li>
      ))}
    </ol>
  );
}
