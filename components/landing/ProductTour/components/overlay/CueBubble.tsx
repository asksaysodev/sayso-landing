/**
 * The live Cue coaching prompt that slides in beside the toolbar. Mirrors the
 * app's toast: dark glass bubble with a left-pointing pointer and spring entrance.
 */
export function CueBubble({ text }: { text: string }) {
  return (
    <div className="pt-glass pt-toast pt-toast-enter">
      <p className="pt-toast-text">{text}</p>
    </div>
  );
}
