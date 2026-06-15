import { Mail, Phone, MessageSquare, UserPlus, Bell, Search, ChevronsUp } from 'lucide-react';

/**
 * The Follow Up Boss primary navigation bar (People / Inbox / Tasks / ...).
 * Static chrome; "People" is the active tab to match the contact view.
 */
const TABS = ['People', 'Inbox', 'Tasks', 'Calendar', 'Deals', 'Reporting', 'Admin'];

export function FubNav() {
  return (
    <div className="flex items-center gap-6 bg-[#37474f] px-6 py-3 text-white">
      <ChevronsUp className="h-5 w-5 rotate-180 text-white/70" />

      <nav className="flex items-center gap-5 text-[14px]">
        {TABS.map((tab) => (
          <span key={tab} className="relative">
            {tab === 'People' ? (
              <span className="font-semibold">{tab}</span>
            ) : (
              <span className="text-white/70">{tab}</span>
            )}
            {tab === 'Inbox' && (
              <span className="absolute -left-2 top-1 h-1.5 w-1.5 rounded-full bg-orange-400" />
            )}
          </span>
        ))}
      </nav>

      <div className="ml-2 flex flex-1 items-center rounded-full bg-white px-4 py-1.5 text-slate-400">
        <Search className="h-4 w-4" />
        <span className="ml-2 text-[13px]">Search</span>
      </div>

      <div className="flex items-center gap-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cta text-white">
          <Mail className="h-3.5 w-3.5" />
        </span>
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white">
          <Phone className="h-3.5 w-3.5" />
        </span>
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cta text-white">
          <MessageSquare className="h-3.5 w-3.5" />
        </span>
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cta text-white">
          <UserPlus className="h-3.5 w-3.5" />
        </span>
        <span className="relative">
          <Bell className="h-5 w-5 text-white/80" />
          <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-orange-400" />
        </span>
        <span className="h-7 w-7 rounded-full bg-slate-300" />
      </div>
    </div>
  );
}
