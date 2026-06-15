import { StickyNote, Mail, MessageSquare, Phone, Info, ChevronDown, Filter } from 'lucide-react';
import type { DemoProspect, LpmamaField } from '../../types';
import { SaysoNoteTimeline } from './SaysoNoteTimeline';

/**
 * The center "Log Call" console of the Follow Up Boss contact view. While the
 * call is live it shows the note-taking box; once Sayso writes the note it
 * appears pinned in the activity timeline below.
 */
interface CallConsoleProps {
  prospect: DemoProspect;
  lpmama: Record<LpmamaField, string | null>;
  crmNoteVisible: boolean;
  crmNoteSummary: string;
}

const TABS = [
  { label: 'Create Note', icon: StickyNote },
  { label: 'Send Email', icon: Mail },
  { label: 'Messages', icon: MessageSquare },
  { label: 'Log Call', icon: Phone, active: true },
];

export function CallConsole({ prospect, lpmama, crmNoteVisible, crmNoteSummary }: CallConsoleProps) {
  return (
    <div className="flex-1 rounded-lg border border-slate-200 bg-white">
      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-slate-100 px-4 pt-3">
        {TABS.map(({ label, icon: Icon, active }) => (
          <div
            key={label}
            className={`flex items-center gap-1.5 px-3 pb-3 text-[14px] ${
              active
                ? 'border-b-2 border-emerald-500 font-semibold text-slate-700'
                : 'text-slate-400'
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </div>
        ))}
        <div className="ml-auto mb-2 flex items-center gap-1 rounded-full border border-cta/40 px-3 py-1 text-[12px] text-cta">
          <Info className="h-3.5 w-3.5" />
          How it works
        </div>
      </div>

      {/* Note box */}
      <div className="p-4">
        <div className="rounded-md border border-slate-200 p-3">
          <div className="min-h-[64px] text-[14px] text-slate-400">Add call notes...</div>
          <div className="mt-2 flex gap-2">
            {['No Answer', 'Left Voicemail', 'Bad Number'].map((b) => (
              <span
                key={b}
                className="rounded-full border border-emerald-300 px-3 py-1 text-[12px] text-emerald-600"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-[13px] text-slate-600">
            {prospect.phone} <span className="text-slate-400">(mobile)</span>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </div>
          <span className="rounded-full bg-emerald-500 px-6 py-2 text-[14px] font-semibold text-white">
            Log Call
          </span>
        </div>
      </div>

      {/* Activity timeline */}
      <div className="border-t border-slate-100 px-4 py-3">
        <div className="flex items-center gap-4 text-[13px] text-slate-400">
          <span className="font-semibold text-slate-600">All</span>
          <span>✉ 0</span>
          <span>💬 4</span>
          <span>📞 20</span>
          <span className="ml-auto flex items-center gap-1 rounded border border-slate-200 px-2 py-1">
            <Filter className="h-3.5 w-3.5" />
            Filters
          </span>
        </div>

        {crmNoteVisible && (
          <div className="mt-4 border-t border-slate-100 pt-4">
            <SaysoNoteTimeline lpmama={lpmama} summary={crmNoteSummary} />
          </div>
        )}
      </div>
    </div>
  );
}
