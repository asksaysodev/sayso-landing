'use client';

import { useState } from 'react';
import Image from 'next/image';
import { LightningIcon } from '@/components/icons/LightningIcon';

interface BlogCoverImageProps {
  src: string;
  alt: string;
}

export function BlogCoverImage({ src, alt }: BlogCoverImageProps) {
  const [imgError, setImgError] = useState(false);
  const hasImage = src && !imgError;

  return (
    <div className="relative aspect-video bg-[#F4F4F5] rounded-xl border-2 border-[#1D4871] overflow-hidden">
      {hasImage ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          priority
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1D4871] to-[#2367EE]">
          <LightningIcon size={80} className="text-white/30" />
        </div>
      )}
    </div>
  );
}
