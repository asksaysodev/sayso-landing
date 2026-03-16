interface PanelNumberBadgeProps {
  number: number;
}

function PanelNumberBadge({ number }: PanelNumberBadgeProps) {
  return (
    <div className="absolute -top-2 -left-2 z-20">
      <span className="v2-pow-badge px-2 py-0.5 rounded text-base font-comic tracking-wider">
        STEP {number}
      </span>
    </div>
  );
}

export interface StepProps {
  number: number;
  title: string;
  description: string;
  visual: React.ReactNode;
  tilt?: string;
}

export function StepCard({ title, description, visual, tilt, number }: StepProps) {
  return (
    <div className={`flex flex-col items-center text-center ${tilt || ''}`}>
      <div className="relative w-full max-w-[280px] aspect-[4/3] rounded-2xl v4-panel-border bg-[#F4F4F5] v2-comic-shadow mb-6 overflow-visible">
        <PanelNumberBadge number={number} />
        <div className="w-full h-full rounded-[13px] overflow-hidden">
          {visual}
        </div>
      </div>
      <h3 className="text-2xl text-black mb-3 tracking-wide font-bold whitespace-nowrap" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
        {title}
      </h3>
      <p className="text-[1.1rem] text-[#1D4871]/70 max-w-sm leading-relaxed min-h-[60px]">
        {description}
      </p>
    </div>
  );
}
