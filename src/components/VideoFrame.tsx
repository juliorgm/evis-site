'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export type VideoFrameProps = {
  youtubeId: string;
  titulo: string;
  capa?: string;
  aspectRatio?: 'hero' | 'case';
  priority?: boolean;
  className?: string;
};

export function VideoFrame({
  youtubeId,
  titulo,
  capa,
  aspectRatio = 'case',
  priority = false,
  className = '',
}: VideoFrameProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const thumbnailUrl =
    capa || `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`;

  const ratioClass =
    aspectRatio === 'hero' ? 'aspect-[2.39/1]' : 'aspect-video';

  const handlePlay = () => {
    setIsPlaying(true);
    if (typeof window !== 'undefined' && (window as unknown as { gtag?: Function }).gtag) {
      (window as unknown as { gtag: Function }).gtag('event', 'play_video', {
        video_title: titulo,
        youtube_id: youtubeId,
      });
    }
  };

  return (
    <div
      className={`relative w-full overflow-hidden border border-(--color-line) bg-(--color-brand) shadow-2xl ${ratioClass} ${className}`}
    >
      {isPlaying ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
          title={`Vídeo: ${titulo}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <div className="group relative h-full w-full cursor-pointer" onClick={handlePlay}>
          {/* Thumbnail */}
          <Image
            src={thumbnailUrl}
            alt={`Capa do vídeo: ${titulo}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1240px) 90vw, 1200px"
            priority={priority}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.01]"
          />

          {/* Projection ambient light gradient (luz âmbar vinda de baixo) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-(--color-ground)/85 via-transparent to-black/30"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(243,134,39,0.22)_0%,transparent_70%)]"
          />

          {/* Circular Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              type="button"
              onClick={handlePlay}
              aria-label={`Reproduzir vídeo: ${titulo}`}
              className="flex h-14 w-14 sm:h-[78px] sm:w-[78px] items-center justify-center rounded-full border-2 border-(--color-cream)/55 bg-(--color-ground)/60 backdrop-blur-sm transition-all duration-200 ease-out group-hover:border-(--color-cream) group-hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-amber)"
            >
              <svg
                className="ml-1 h-6 w-6 sm:h-8 sm:w-8 fill-(--color-cream) transition-transform duration-200 group-hover:scale-110"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
