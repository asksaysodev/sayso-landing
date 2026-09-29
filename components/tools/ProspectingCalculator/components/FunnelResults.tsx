/**
 * FunnelResults: shows the dials, conversations and appointments needed per day, week and year.
 */
import type { FunnelStage } from '../types';

interface FunnelResultsProps {
  stages: FunnelStage[];
}

function fmt(n: number) {
  if (!Number.isFinite(n)) return '0';
  if (n >= 100) return Math.round(n).toLocaleString('en-US');
  if (n >= 10) return n.toFixed(0);
  return n.toFixed(1);
}

export function FunnelResults({ stages }: FunnelResultsProps) {
  const [dials, conversations, appointments] = stages;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-3 sm:grid-cols-3">
        {[dials, conversations, appointments].map((s) => (
          <div key={s.label} className="rounded-xl border-2 border-[#1D4871] bg-[#FFDE59]/30 p-4">
            <p className="text-xs uppercase tracking-wide font-bold text-[#1D4871]/60">{s.label} per day</p>
            <p className="font-hero text-3xl font-bold text-[#1D4871] mt-1">{fmt(s.perDay)}</p>
            <p className="text-xs text-[#1D4871]/60 mt-1">{fmt(s.perWeek)} per week</p>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border-2 border-[#1D4871] text-sm font-sans">
          <thead>
            <tr>
              <th className="bg-[#1D4871] text-white px-4 py-2 text-left">Stage</th>
              <th className="bg-[#1D4871] text-white px-4 py-2 text-right">Per day</th>
              <th className="bg-[#1D4871] text-white px-4 py-2 text-right">Per week</th>
              <th className="bg-[#1D4871] text-white px-4 py-2 text-right">Per year</th>
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
