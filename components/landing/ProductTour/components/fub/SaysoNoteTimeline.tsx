import { Pin } from 'lucide-react';
import type { LpmamaField } from '../../types';

/**
 * The "Sayso Note" pinned into the Follow Up Boss activity timeline once the
 * call wraps. This is the auto-log-to-CRM payoff: the Smart Capture LPMAMA data
 * written straight into the CRM, mirroring the real product output.
 */
const LPMAMA_ORDER: { field: LpmamaField; label: string }[] = [
  { field: 'location', label: 'Location' },
  { field: 'price', label: 'Price' },
  { field: 'motivation', label: 'Motivation' },
  { field: 'agent', label: 'Agent' },
  { field: 'mortgage', label: 'Mortgage' },
  { field: 'appointment', label: 'Appointment' },
];

interface SaysoNoteTimelineProps {
  lpmama: Record<LpmamaField, string | null>;
  summary: string;
}

export function SaysoNoteTimeline({ lpmama, summary }: SaysoNoteTimelineProps) {
  return (
    <div className="pt-fade-up flex gap-3">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-400 text-white">
        <Pin className="h-3.5 w-3.5" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="text-[14px] font-semibold text-slate-700">Sayso</span>
          <span className="text-[12px] text-slate-400">just now</span>
        </div>
        <div className="mt-1 text-[14px] font-semibold text-slate-700">Sayso Note</div>
        <div className="mt-2 space-y-3 border-t border-slate-100 pt-3 text-[13px] text-slate-600">
          <p>This lead was linked to a Sayso Coach conversation.</p>
          <div>
            <div className="font-semibold text-slate-700">Summary:</div>
            <p>{summary}</p>
          </div>
          <div>
            <div className="font-semibold text-slate-700">Smart Capture:</div>
            <ul className="mt-1 space-y-0.5">
              {LPMAMA_ORDER.map(({ field, label }) => (
                <li key={field}>
                  - {label}: {lpmama[field] ?? '...'}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
