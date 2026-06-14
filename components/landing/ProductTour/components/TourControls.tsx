import { Play, Pause, RotateCcw } from 'lucide-react';

/**
 * Play / pause / restart controls plus the chapter progress bar shown beneath
 * the stage.
 */
interface TourControlsProps {
  playing: boolean;
  progress: number;
  onTogglePlay: () => void;
  onRestart: () => void;
}

export function TourControls({ playing, progress, onTogglePlay, onRestart }: TourControlsProps) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onTogglePlay}
        aria-label={playing ? 'Pause' : 'Play'}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white text-primary transition-colors hover:bg-slate-50"
      >
        {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </button>
      <button
        onClick={onRestart}
        aria-label="Restart"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white text-primary transition-colors hover:bg-slate-50"
      >
        <RotateCcw className="h-4 w-4" />
      </button>
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full bg-cta transition-[width] duration-100 ease-linear"
          style={{ width: `${Math.round(progress * 100)}%` }}
        />
      </div>
    </div>
  );
}
