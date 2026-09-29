/**
 * ScriptSheet: a compact, printable summary of every script in a blog post.
 * Used in MDX as <ScriptSheet title="FSBO call sheet">...</ScriptSheet>.
 * The print button prints only this sheet (see the print rules in app/globals.css).
 */
import { PrintSheetButton } from './components/PrintSheetButton';

interface ScriptSheetProps {
  title: string;
  children: React.ReactNode;
}

export function ScriptSheet({ title, children }: ScriptSheetProps) {
  return (
    <section
      className="script-sheet bg-white border-2 border-dashed border-[#1D4871]/40 rounded-xl p-6 my-8"
      aria-label={title}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <span className="text-xs uppercase tracking-wide text-[#1D4871]/50 font-bold block mb-1">
            Printable call sheet
          </span>
          <p className="font-hero text-xl text-[#1D4871] font-bold">{title}</p>
        </div>
        <PrintSheetButton />
      </div>
      <div className="script-sheet-body text-sm">{children}</div>
    </section>
  );
}
