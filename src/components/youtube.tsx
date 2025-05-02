// import { useState, useEffect } from "react";

interface YouTubeProps {
  videoId: string;
  title: string;
  overlayActive?: boolean;
  onOverlayClick: () => void;
  className?: string;
}

export const YouTube: React.FC<YouTubeProps> = ({ videoId, title, overlayActive, onOverlayClick, className }) => {
  return (
    <div id="youtube-round-embed-wrap" className={`relative aspect-square overflow-hidden rounded-full h-[280px] ${className}`}>
      {overlayActive && (
        <div
          id="youtube-overlay"
          className="absolute inset-0 z-10 bg-transparent cursor-pointer pointer-events-auto"
          onClick={onOverlayClick}
        ></div>
      )}
      <div id="youtube-round-embed" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[225%] h-[200%] overflow-hidden">
        <iframe
          id={`youtube-iframe-${videoId}`}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&rel=0&modestbranding=1&playsinline=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </div>
  );
};

export default YouTube;