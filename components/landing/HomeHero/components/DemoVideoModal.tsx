'use client';

/**
 * Pop-out that plays the Sayso demo video (Loom embed). Closes on the X,
 * Escape or a click on the backdrop, locks page scroll while open and returns
 * focus to the button that opened it.
 */
import { useEffect, useRef, type RefObject } from 'react';
import { DEMO_VIDEO_EMBED } from '../data';

interface DemoVideoModalProps {
  open: boolean;
  onClose: () => void;
  /** Element that gets focus back when the pop-out closes (the button that opened it). */
  returnFocusRef: RefObject<HTMLElement>;
}

export function DemoVideoModal({ open, onClose, returnFocusRef }: DemoVideoModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const opener = returnFocusRef.current;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      opener?.focus?.();
    };
  }, [open, onClose, returnFocusRef]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Sayso demo video"
      className="fixed inset-0 z-[90] grid place-items-center bg-[rgba(10,20,34,0.78)] p-4 backdrop-blur-[6px]"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-[980px]">
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close video"
          className="absolute -top-12 right-0 grid h-10 w-10 place-items-center rounded-full border border-[rgba(16,35,58,0.14)] bg-white text-2xl text-[#1D4871] focus:outline-none focus-visible:ring-[3px] focus-visible:ring-[#FFDE59]"
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <div className="relative aspect-video overflow-hidden rounded-2xl border-[3px] border-[#1D4871] bg-[#0d1420] shadow-[0_1px_2px_rgba(16,35,58,0.06),0_14px_34px_-16px_rgba(16,35,58,0.25)]">
          <iframe
            src={DEMO_VIDEO_EMBED}
            title="Sayso demo video"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>
      </div>
    </div>
  );
}
