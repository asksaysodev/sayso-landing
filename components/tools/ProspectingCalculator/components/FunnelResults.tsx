/**
 * FunnelResults: shows the dials, conversations and appointments needed per day, week and year.
 */
import type { FunnelStage } from '../types';

interface FunnelResultsProps {
  /** Null while any input is empty or out of range. */
  stages: FunnelStage[] | null;
}

function fmt(n: number) {
  if (n >= 100) return Math.round(n).toLocaleString('en-US');
  if (n >= 10) return n.toFixed(0);
  return n.toFixed(1);
}

export function FunnelResults({ stages }: FunnelResultsProps) {
  if (!stages) {
    return <p className="text-sm text-[#1D4871]/70">Fix the highlighted fields to see your numbers.</p>;
  }

  const [dials, conversations, appointments] = stages;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {[dials, conversations, appointments].map((s) => (
          <div key={s.label} className="min-w-0 rounded-2xl bg-[#F4F4F5] p-3 sm:p-4 shadow-[0_0_0_1px_rgba(16,35,58,0.08)]">
            <p className="text-[11px] sm:text-xs uppercase tracking-wide font-bold text-[#1D4871]/80">{s.label} per day</p>
            <p className="font-hero text-2xl sm:text-3xl font-extrabold tracking-[-0.02em] text-[#10233A] mt-1">{fmt(s.perDay)}</p>
            <p className="text-xs text-[#1D4871]/60 mt-1">{fmt(s.perWeek)} per week</p>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto rounded-2xl shadow-[0_0_0_1px_rgba(16,35,58,0.12)]">
        <table className="w-full border-collapse text-sm font-sans">
          <thead>
            <tr>
              <th className="bg-[#1D4871] text-white px-4 py-2 text-left">KPI</th>
              <th className="bg-[#1D4871] text-white px-4 py-2 text-right">Daily</th>
              <th className="bg-[#1D4871] text-white px-4 py-2 text-right">Weekly</th>
              <th className="bg-[#1D4871] text-white px-4 py-2 text-right">Yearly</th>
            </tr>
          </thead>
          <tbody>
            {stages.map((s) => (
              <tr key={s.label}>
                <td className="border border-[#D7DEE1] px-4 py-2 text-[#1D4871] font-bold">{s.label}</td>
                <td className="border border-[#D7DEE1] px-4 py-2 text-right text-[#1D4871]/80 tabular-nums">{fmt(s.perDay)}</td>
                <td className="border border-[#D7DEE1] px-4 py-2 text-right text-[#1D4871]/80 tabular-nums">{fmt(s.perWeek)}</td>
                <td className="border border-[#D7DEE1] px-4 py-2 text-right text-[#1D4871]/80 tabular-nums">{fmt(s.perYear)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
