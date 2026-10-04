'use client';

/**
 * "Is Sayso for You?" picker. Visitors choose their role to reveal a short
 * pitch and a link to the matching persona page. Nothing is selected at first.
 */

import { useState } from 'react';
import { roles } from '../data';
import { ArrowLink } from './ArrowLink';
import { Card } from './Card';

export function RolePicker() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = roles.find((role) => role.id === selectedId);

  return (
    <>
      <div
        role="tablist"
        aria-label="Your role"
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-[400px] sm:max-w-[640px] mx-auto mb-7"
      >
        {roles.map((role) => (
          <button
            key={role.id}
            type="button"
            role="tab"
            id={`tab-${role.id}`}
            aria-selected={role.id === selectedId}
            aria-controls={`role-${role.id}`}
            onClick={() => setSelectedId(role.id)}
            className="min-h-[44px] rounded-md border-2 border-primary bg-white px-5 py-3 font-extrabold text-[15px] leading-none text-primary transition-colors hover:bg-[#F7F8FA] aria-selected:bg-primary aria-selected:text-white focus:outline-none focus-visible:ring-[3px] focus-visible:ring-cta focus-visible:ring-offset-2"
          >
            {role.tab}
          </button>
        ))}
      </div>
      {selected && (
        <div id={`role-${selected.id}`} role="tabpanel" aria-labelledby={`tab-${selected.id}`} className="max-w-[640px] mx-auto">
          <Card className="items-center text-center">
            <h3 className="mb-2.5 text-lg md:text-xl font-extrabold text-primary">{selected.title}</h3>
            <p className="text-[#515C6C]">{selected.body}</p>
            <ArrowLink href={selected.href} label={selected.linkLabel} />
          </Card>
        </div>
      )}
    </>
  );
}
