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
      className="script-sheet bg-white rounded-[20px] p-6 my-8 shadow-[0_0_0_1px_rgba(16,35,58,0.12),0_14px_34px_-16px_rgba(16,35,58,0.25)] print:shadow-none"
      aria-label={title}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <span className="text-xs uppercase tracking-wide text-[#1D4871]/50 font-bold block mb-1">
            Printable call sheet
          </span>
          <p className="font-hero text-xl text-[#10233A] font-extrabold tracking-[-0.01em]">{title}</p>
        </div>
        <PrintSheetButton />
      </div>
      <div className="script-sheet-body text-sm">{children}</div>
    </section>
  );
}
