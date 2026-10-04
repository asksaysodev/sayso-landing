'use client';

/**
 * Small YouTube Short thumbnail that opens the agent's video testimonial.
 * Falls back to `hqdefault.jpg` when the `oar2.jpg` variant is missing.
 */

import { Play } from 'lucide-react';

type VideoThumbLinkProps = {
  videoId: string;
  name: string;
};

export function VideoThumbLink({ videoId, name }: VideoThumbLinkProps) {
  const fallback = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <a
      href={`https://www.youtube.com/shorts/${videoId}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Watch ${name}'s video testimonial`}
      className="relative flex-none size-14 overflow-hidden rounded-xl border-2 border-primary"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- remote YouTube thumbnail with runtime fallback, same as VideoCard */}
      <img
        src={`https://i.ytimg.com/vi/${videoId}/oar2.jpg`}
        onError={(e) => {
          if (e.currentTarget.src !== fallback) e.currentTarget.src = fallback;
        }}
        alt=""
        loading="lazy"
        className="size-full object-cover"
      />
      <span className="absolute inset-0 grid place-items-center bg-[#0D1B2A]/25" aria-hidden="true">
        <Play size={20} fill="white" stroke="white" />
      </span>
    </a>
  );
}
