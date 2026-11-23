'use client';

/**
 * Tabs for platform-specific steps in help articles:
 *
 * <Tabs>
 *   <Tab label="Mac">…</Tab>
 *   <Tab label="Windows">…</Tab>
 * </Tabs>
 *
 * Both Tab and Tabs are client components so Tabs can read each Tab's label.
 * The chosen platform is remembered for the visit so every tab set on the
 * page (and the next article) opens on the same one.
 */
import { Children, isValidElement, useEffect, useId, useState, type ReactElement, type ReactNode } from 'react';

const STORAGE_KEY = 'sayso-help-tab';

export function Tab({ children }: { label: string; children: ReactNode }) {
  return <>{children}</>;
}

export function Tabs({ children }: { children: ReactNode }) {
  const tabs = Children.toArray(children).filter(
    (c): c is ReactElement<{ label: string; children: ReactNode }> => isValidElement(c) && typeof (c.props as { label?: unknown }).label === 'string',
  );
  const labels = tabs.map((t) => t.props.label);
  const [active, setActive] = useState(0);
  const uid = useId();

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      const i = saved ? labels.indexOf(saved) : -1;
      if (i >= 0) setActive(i);
      else if (/Windows/i.test(navigator.userAgent)) {
        const w = labels.findIndex((l) => /windows/i.test(l));
        if (w >= 0) setActive(w);
      }
    } catch {
      // Storage blocked: keep the first tab.
    }
    // labels are static for a rendered tab set
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const choose = (i: number) => {
    setActive(i);
    try {
      sessionStorage.setItem(STORAGE_KEY, labels[i]);
    } catch {
      // ignore
    }
  };

  return (
    <div className="my-6 rounded-2xl bg-white shadow-card">
      <div role="tablist" className="flex gap-1 border-b border-[#D7DEE1] px-3 pt-3">
        {labels.map((label, i) => (
          <button
            key={label}
            type="button"
            role="tab"
            id={`${uid}-tab-${i}`}
            aria-selected={active === i}
            aria-controls={`${uid}-panel-${i}`}
            onClick={() => choose(i)}
            className={`-mb-px rounded-t-lg border-b-2 px-4 py-2 text-sm font-semibold transition ${
              active === i ? 'border-[#2367EE] text-[#2367EE]' : 'border-transparent text-[#1D4871]/60 hover:text-[#1D4871]'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      {tabs.map((tab, i) => (
        <div
          key={labels[i]}
          role="tabpanel"
          id={`${uid}-panel-${i}`}
          aria-labelledby={`${uid}-tab-${i}`}
          hidden={active !== i}
          className="px-5 pt-5 [&>*:last-child]:mb-0 pb-5"
        >
          {tab.props.children}
        </div>
      ))}
    </div>
  );
}
