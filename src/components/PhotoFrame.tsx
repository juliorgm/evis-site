import React from 'react';
import Image from 'next/image';

export type PhotoFrameProps = {
  src: string;
  alt: string;
  aspectRatio?: '16:9' | '4:3' | '1:1';
  priority?: boolean;
  className?: string;
};

export function PhotoFrame({
  src,
  alt,
  aspectRatio = '16:9',
  priority = false,
  className = '',
}: PhotoFrameProps) {
  const ratioClass = {
    '16:9': 'aspect-video',
    '4:3': 'aspect-[4/3]',
    '1:1': 'aspect-square',
  }[aspectRatio];

  return (
    <div
      className={`group relative w-full overflow-hidden border border-(--color-line) bg-(--color-brand) shadow-2xl ${ratioClass} ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1240px) 90vw, 1200px"
        priority={priority}
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.01]"
      />

      {/* Projection ambient light gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-(--color-ground)/85 via-transparent to-black/30"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(243,134,39,0.18)_0%,transparent_70%)]"
      />

      {/* Marcador de cruz quadrada — NUNCA play (T-023) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-[2px] border border-(--color-line) bg-(--color-ground)/70 backdrop-blur-sm text-(--color-amber)"
      >
        <svg
          className="h-3.5 w-3.5 stroke-current"
          viewBox="0 0 16 16"
          fill="none"
          strokeWidth="1.75"
        >
          <path d="M8 3v10M3 8h10" />
        </svg>
      </div>
    </div>
  );
}
