import { ImageIcon } from 'lucide-react';

interface ImagePlaceholderProps {
  alt: string;
  aspectRatio?: string;
  className?: string;
}

export function ImagePlaceholder({
  alt,
  aspectRatio = '16/9',
  className = '',
}: ImagePlaceholderProps) {
  return (
    <div
      className={`border-2 border-dashed border-[#1D4871]/30 rounded-2xl bg-white/50 flex flex-col items-center justify-center gap-3 px-6 py-10 ${className}`}
      style={{ aspectRatio }}
      role="img"
      aria-label={alt}
    >
      <ImageIcon size={32} className="text-[#1D4871]/20" strokeWidth={1.5} />
      <p className="text-sm text-[#1D4871]/40 font-sans text-center max-w-xs">
        {alt}
      </p>
    </div>
  );
}
