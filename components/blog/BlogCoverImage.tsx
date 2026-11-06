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
    <div className="relative aspect-video bg-[#F4F4F5] rounded-[20px] overflow-hidden shadow-[0_0_0_1px_rgba(16,35,58,0.12),0_14px_34px_-16px_rgba(16,35,58,0.25)]">
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
        <div className="absolute inset-0 flex items-center justify-center bg-[#E3E8EC]">
          <LightningIcon size={80} className="text-[#1D4871]/20" />
        </div>
      )}
    </div>
  );
}
