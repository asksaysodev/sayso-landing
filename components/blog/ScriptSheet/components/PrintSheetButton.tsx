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
      className="script-sheet-print bg-[#1D4871] text-white text-sm font-bold rounded-lg px-4 py-2 hover:bg-[#2367EE] transition-colors"
    >
      Print this sheet
    </button>
  );
}
