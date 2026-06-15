import { Calendar, ListChecks, MousePointerClick, ChevronRight, ChevronUp, Plus } from 'lucide-react';

/**
 * The right-hand column of the Follow Up Boss contact view: paging control plus
 * the Appointments / Tasks / Activity cards. Static chrome.
 */
export function SidePanels() {
  return (
    <div className="w-[260px] shrink-0 space-y-5">
      <div className="flex items-center justify-end gap-2 text-[14px] text-slate-500">
        Person 1 of 6
        <ChevronRight className="h-4 w-4" />
      </div>

      <Card icon={<Calendar className="h-4 w-4 text-slate-500" />} title="Appointments">
        <p className="text-[13px] text-slate-400">No upcoming appointments</p>
      </Card>

      <Card icon={<ListChecks className="h-4 w-4 text-slate-500" />} title="Tasks">
        <p className="text-[13px] text-slate-400">No upcoming tasks</p>
      </Card>

      <Card icon={<MousePointerClick className="h-4 w-4 text-slate-500" />} title="Activity">
        <p className="text-[13px] text-slate-400">No website activity yet</p>
      </Card>
    </div>
  );
}

function Card({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[15px] font-semibold text-slate-700">
          {icon}
          {title}
        </div>
        <div className="flex items-center gap-1.5 text-slate-400">
          <Plus className="h-4 w-4 rounded-full bg-cta p-0.5 text-white" />
          <ChevronUp className="h-4 w-4" />
        </div>
      </div>
      {children}
    </div>
  );
}
