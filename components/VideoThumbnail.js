"use client";
import { useState } from "react";
import { IconPlay } from "./Icons";

export default function VideoThumbnail({ title, videoId, subtitle }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div>
      <div
        className="relative w-full pb-[56.25%] rounded-[10px] overflow-hidden bg-brand-blue-deep shadow-lg cursor-pointer"
        onClick={() => !playing && setPlaying(true)}
      >
        {!playing ? (
          <>
            {/* YouTube thumbnail */}
            <img
              src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,31,66,0.7)] to-transparent flex items-center justify-center">
              {/* Play button */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-orange to-brand-orange-dark flex items-center justify-center shadow-[0_4px_24px_rgba(232,168,37,0.4)] hover:scale-105 transition-transform">
                <IconPlay size={28} className="fill-white" />
              </div>
            </div>

            {/* Subtitle label */}
            {subtitle && (
              <div className="absolute bottom-3.5 left-4">
                <p className="text-[11px] text-white/85 font-mono tracking-[1px] uppercase m-0">
                  {subtitle}
                </p>
              </div>
            )}
          </>
        ) : (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title}
            frameBorder="0"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="absolute inset-0 w-full h-full"
          />
        )}
      </div>
    </div>
  );
}
