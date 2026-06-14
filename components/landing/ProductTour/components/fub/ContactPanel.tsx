import { Phone, Mail, Home, Users, ChevronUp, Plus } from 'lucide-react';
import type { DemoProspect } from '../../types';

/**
 * The left contact card in the Follow Up Boss people view: avatar, name,
 * contact details, and collapsible Relationships / Details sections. Static.
 */
export function ContactPanel({ prospect }: { prospect: DemoProspect }) {
  return (
    <div className="w-[300px] shrink-0 space-y-4 rounded-lg border border-slate-200 bg-white p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 text-[15px] font-semibold text-slate-600">
          {prospect.initials}
        </div>
        <div>
          <div className="text-[18px] font-semibold text-slate-800">{prospect.name}</div>
          <div className="text-[12px] text-slate-400">
            Last Communication {prospect.lastCommunication}
          </div>
        </div>
      </div>

      <div className="space-y-3 border-t border-slate-100 pt-4 text-[13px]">
        <div className="flex items-center gap-3 text-cta">
          <Phone className="h-4 w-4 text-slate-400" />
          <span>
            {prospect.phone} <span className="text-slate-400">(mobile)</span>
          </span>
        </div>
        <div className="flex items-center gap-3 text-cta">
          <Mail className="h-4 w-4 text-slate-400" />
          <span>{prospect.email}</span>
        </div>
        <div className="flex items-start gap-3 text-cta">
          <Home className="mt-0.5 h-4 w-4 text-slate-400" />
          <span>
            {prospect.address.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </span>
        </div>
      </div>

      <Section icon={<Users className="h-4 w-4 text-slate-500" />} title="Relationships">
        <div className="text-[13px] text-slate-400">No relationships</div>
      </Section>

      <Section title="Details">
        <div className="text-[13px] text-slate-600">
          <span className="font-semibold">Stage</span> {prospect.stage}
        </div>
        <div className="mt-1 text-[13px] text-slate-600">
          <span className="font-semibold">Source</span> {prospect.leadSource}
        </div>
      </Section>
    </div>
  );
}

function Section({
  icon,
  title,
  children,
}: {
  icon?: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-slate-100 pt-4">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[14px] font-semibold text-slate-700">
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
