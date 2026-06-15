import { Play, Pause, RotateCcw } from 'lucide-react';

/**
 * Play / pause / restart controls for the active chapter. No progress bar by
 * design; the tour stays on one feature until the visitor picks another pill.
 */
interface TourControlsProps {
  playing: boolean;
  onTogglePlay: () => void;
  onRestart: () => void;
}

export function TourControls({ playing, onTogglePlay, onRestart }: TourControlsProps) {
  return (
    <div className="flex items-center justify-center gap-3">
      <button
        onClick={onTogglePlay}
        aria-label={playing ? 'Pause' : 'Play'}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white text-primary transition-colors hover:bg-slate-50"
      >
        {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </button>
      <button
        onClick={onRestart}
        aria-label="Replay"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white text-primary transition-colors hover:bg-slate-50"
      >
        <RotateCcw className="h-4 w-4" />
      </button>
    </div>
  );
}
