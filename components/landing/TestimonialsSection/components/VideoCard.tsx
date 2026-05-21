'use client';

/**
 * YouTube Short thumbnail that swaps to an inline iframe player on click.
 * The thumbnail falls back to `hqdefault.jpg` if the high-res `oar2.jpg`
 * variant is unavailable for a given video.
 */

import { useState } from 'react';
import type { Testimonial } from '../types';

type VideoCardProps = {
  testimonial: Testimonial;
};

export function VideoCard({ testimonial }: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const thumbnail = `https://i.ytimg.com/vi/${testimonial.videoId}/oar2.jpg`;

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl bg-black v2-comic-border v2-comic-shadow"
      style={{ aspectRatio: '9 / 14' }}
    >
      {isPlaying ? (
        <iframe
          src={`https://www.youtube.com/embed/${testimonial.videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title={`${testimonial.name} testimonial`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setIsPlaying(true)}
          aria-label={`Play ${testimonial.name}'s testimonial video`}
          className="group absolute inset-0 h-full w-full focus:outline-none focus-visible:ring-4 focus-visible:ring-[#2367EE] focus-visible:ring-inset"
        >
          <img
            src={thumbnail}
            onError={(e) => {
              const img = e.currentTarget;
              const fallback = `https://i.ytimg.com/vi/${testimonial.videoId}/hqdefault.jpg`;
              if (img.src !== fallback) img.src = fallback;
            }}
            alt={`${testimonial.name} testimonial thumbnail`}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30" />

          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src="/icons/youtube-shorts-icon.svg"
              alt=""
              aria-hidden="true"
              className="w-20 h-auto md:w-24 drop-shadow-[0_4px_12px_rgba(0,0,0,0.45)] transition-transform duration-200 group-hover:scale-110"
            />
          </div>
        </button>
      )}
    </div>
  );
}
