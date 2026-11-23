'use client';

/**
 * Short silent screen clip for help articles: <Clip src="/help/clips/x.mp4" poster="/help/clips/x.webp" alt="…" />
 * Loops while on screen and pauses when scrolled away. Respects reduced motion
 * (shows the poster with a play button instead of autoplaying).
 */
import { useEffect, useRef, useState } from 'react';
import { Play } from 'lucide-react';

export function Clip({ src, poster, alt, caption, width }: { src: string; poster?: string; alt: string; caption?: string; width?: number }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(true);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.4 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <figure className="my-6">
      <div className="relative mx-auto overflow-hidden rounded-xl bg-black shadow-card" style={width ? { maxWidth: width } : undefined}>
        <video
          ref={ref}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={alt}
          onPlay={() => setPaused(false)}
          onPause={() => setPaused(true)}
          onClick={(e) => (e.currentTarget.paused ? e.currentTarget.play() : e.currentTarget.pause())}
          className="block w-full cursor-pointer"
        />
        {paused && (
          <button
            type="button"
            aria-label={`Play: ${alt}`}
            onClick={() => ref.current?.play()}
            className="absolute inset-0 flex items-center justify-center"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-[#2367EE] shadow-card">
              <Play className="ml-0.5 h-5 w-5" aria-hidden />
            </span>
          </button>
        )}
      </div>
      {caption && <figcaption className="mt-2 text-center text-sm text-[#1D4871]/60">{caption}</figcaption>}
    </figure>
  );
}
