'use client';

import { useState } from 'react';
import Image from 'next/image';

interface BlogHeroBackgroundProps {
  src: string;
}

export function BlogHeroBackground({ src }: BlogHeroBackgroundProps) {
  const [imgError, setImgError] = useState(false);

  if (!src || imgError) {
    return <div className="absolute inset-0 z-0 v2-halftone" />;
  }

  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      <Image
        src={src}
        alt=""
        fill
        className="object-cover"
        priority
        onError={() => setImgError(true)}
      />
      <div className="absolute inset-0 bg-[#F4F4F5]/60" />
    </div>
  );
}
