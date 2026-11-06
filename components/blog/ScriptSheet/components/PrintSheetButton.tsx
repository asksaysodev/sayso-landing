'use client';

/**
 * PrintSheetButton: prints only the surrounding ScriptSheet by toggling a body
 * class that the print stylesheet in app/globals.css keys off.
 */
export function PrintSheetButton() {
  function handlePrint() {
    document.body.classList.add('printing-script-sheet');
    const cleanup = () => {
      document.body.classList.remove('printing-script-sheet');
      window.removeEventListener('afterprint', cleanup);
    };
    window.addEventListener('afterprint', cleanup);
    window.print();
  }

  return (
    <button
      type="button"
      onClick={handlePrint}
      className="script-sheet-print h-10 rounded-full bg-[#2367EE] px-5 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(16,35,58,0.18),0_8px_20px_-8px_rgba(35,103,238,0.55)] hover:bg-[#1F5AD6] transition"
    >
      Print this sheet
    </button>
  );
}
