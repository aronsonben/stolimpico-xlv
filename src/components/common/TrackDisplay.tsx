import { useState, useEffect, useRef, useCallback, MouseEvent } from 'react';
import { motion } from "framer-motion";
import { useAudioPlayer } from "react-use-audio-player";
import { Track } from '../../types';
import { TrackInfoLinks } from './TrackInfoLinks';
import { LinkIcon } from './LinkIcon';
import { IconLinks } from '../../data/iconlinks';
import { YouTube } from '../youtube';
// import { ProgressBar } from '../ui/progress-bar';
import { formatTime } from '@/utils/timeFormat';
import '../../index.css';

const CoverArt = ({ src, alt }: { src: string; alt: string }) => (
  <>
    <div id="cover-art-wrap" className="w-full md:max-w-[500px] md:pr-8 mb-4 md:mb-0">
      <motion.img
        src={src}
        alt={`Artwork for ${alt}`}
        className="w-full rounded-lg shadow-2xl"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      />
    </div>
  </>
)

const TrackTimeTracker = ({ audioPosition, duration }: { audioPosition: number; duration: number }) => (
  <div className="flex items-center justify-between">
    <div id="track-time-tracking" className="text-sm text-gray-400">
      {formatTime(audioPosition)} / {formatTime(duration)}
    </div>
  </div>
)

interface TrackDisplayProps {
  track: Track;
  isMobile: boolean;
  toggleDrawer: () => void;
  onListen: () => void;
}

export const TrackDisplay = ({ track, isMobile, toggleDrawer, onListen }: TrackDisplayProps) => {
  const { togglePlayPause, seek, getPosition, play, pause, isPlaying, duration } = useAudioPlayer(track.audioFile);
  const [audioPosition, setAudioPosition] = useState(0);
  const frameRef = useRef<number>()
  const seekbarRef = useRef<HTMLDivElement>(null);
  const youtubeID = track.youtubeLink.split('v=')[1];
  const [overlayActive, setOverlayActive] = useState(true);

  /** useEffect to Load the YouTube Player API script if not already loaded */
  useEffect(() => {
    if (!document.getElementById("youtube-player-api")) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      tag.id = "youtube-player-api";
      document.body.appendChild(tag);
    }
  }, []);

  /** useEffect to handle audio position of AudioPlayer, when in use */
  useEffect(() => {
    const animate = () => {
      setAudioPosition(getPosition())
      frameRef.current = requestAnimationFrame(animate)
    }

    frameRef.current = window.requestAnimationFrame(animate)

    return () => {
      if (frameRef.current) {
          cancelAnimationFrame(frameRef.current)
      }
    }
  }, [getPosition])


  /** Handler function that waits 1 second before allowing use to claim reward */
  const handleRecordPlayClick = () => {
    console.log("Track listened to:", track.title);
    // Wait for 1 second, then mark the track as listened
    setTimeout(() => {
      onListen();
    }, 1000);
  }

  const handleOverlayClick = () => {
    handleRecordPlayClick(); // Call the function to mark the track as listened
    setOverlayActive(false); // Disable the overlay after the first click

    // Trigger video playback using the YouTube Player API
    const iframe = document.getElementById(`youtube-iframe-${youtubeID}`) as HTMLIFrameElement;
    if (iframe && (window as any).YT) {
      new (window as any).YT.Player(iframe, {
        events: {
          onReady: (event: any) => event.target.playVideo(),
        },
      });
    }
  };

  // Code borrowed from react-use-audio-player repo (AudioSeekBar.tsx)
  const goTo = useCallback(
    (event: MouseEvent) => {
      const { pageX: eventOffsetX } = event

      if (seekbarRef.current) { 
          const elementOffsetX = event.currentTarget.getBoundingClientRect() // modified borrowed code to use bounding rect
          const elementWidth = seekbarRef.current.clientWidth
          const percent = (eventOffsetX - elementOffsetX.left) / elementWidth
          seek(percent * duration)
          setAudioPosition(percent * duration)
          isPlaying ? play() : pause()  // Handling bug where button stops working after seeking
      }
  },
  [duration, isPlaying, seek]
  )

  const handleEnter = () => {
    track.id == 99 ? toggleDrawer() : null;
  }

  const handleLeave = () => {
    // Trigger video playback using the YouTube Player API
    const iframe = document.getElementById(`youtube-iframe-${youtubeID}`) as HTMLIFrameElement;
    if (iframe && (window as any).YT) {
      const player = (window as any).YT.get(iframe.id);
      if (player && typeof player.pauseVideo === 'function') {
        player.pauseVideo(); // Pause the video when leaving
      }
    }

    track.id == 99 ? toggleDrawer() : null;
    pause(); // pause track on leaving
  }

  return (
    <motion.div 
      id="track-display"
      className="md:h-full flex flex-col md:flex-row items-center justify-start md:justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      onViewportEnter={handleEnter}
      onViewportLeave={handleLeave}
    >
      {/* Cover Art */}
      {track.id == 99 ? (
        <CoverArt src={track.coverArt} alt={`Artwork for ${track.title}`} />
      ) : (
        <motion.div id="cover-art-audio-player" className="w-full rounded-[999px] md:max-w-[500px] md:pr-8 mb-4 md:mb-0">
          <div className="relative w-full">
            {isMobile ? (
              <YouTube 
                videoId={youtubeID}
                title="YouTube video player"
                overlayActive={overlayActive}
                onOverlayClick={handleOverlayClick}
                className="w-full rounded-full max-w-[290px] max-h-[280px] mx-auto shadow-lg"
              />
            ) : (
              <motion.img
              id="cover-art-img"
              src={track.coverArt}
              alt={`Artwork for ${track.title}`}
              className="w-full rounded-full md:rounded-none shadow-2xl"
              initial={{ rotate: 0 }}
              whileInView={{ 
                rotate: (isMobile ? 360 : 0),
                transition: isMobile ? { duration: 200, repeat: Infinity, ease: [.17,.67,.83,.67] } : {}
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              />
            )}
          </div>
          {/* Mobile Audio Progress Bar */}
          {/* {isMobile && (
            <>
            <div 
              id="new-track-progress-bar"
              className="flex-1 h-2 bg-gray-600 rounded-full cursor-pointer"
              ref={seekbarRef}
              onClick={goTo}
            >
              <motion.div 
                className="h-full bg-white rounded-full"
                style={{ width: `${(audioPosition / duration) * 100}%` }}
              />
            </div>
            <TrackTimeTracker audioPosition={audioPosition} duration={duration} />
            </>
          )} */}
        </motion.div>
      )}

      {/* Track Info */}
      <div id="track-info-wrap" className="w-full md:w-1/2 md:pl-8 md:flex md:flex-col md:gap-8">
        {/* Desktop - All Tracks (Except Album)  */}
        {!isMobile && track.id != 99 && (
          <div className="w-full">
            <motion.h2 
              className="text-3xl font-bold mb-1"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {track.title}
            </motion.h2>
          </div>
        )}
        {/* Desktop - All Tracks */}
        {!isMobile && track.id != 99 && (
         <motion.div
            id="link-icon-container" 
            className="md:grid md:grid-cols-3 md:gap-y-2 md:pt-4 md:pb-0 md:justify-items-start md:w-full"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* Add border on mobile if I want: rounded-lg py-8 px-4 border-solid border-[#80808040] */}
            {IconLinks.map((link) => (
              <LinkIcon 
                key={link.id}
                src={link.icon} 
                alt={link.name} 
                href={link.url} 
                text={link.name.charAt(0).toUpperCase() + link.name.slice(1)} 
                desktop />
            ))}
          </motion.div>
        )}
        {/* Mobile - Album Only */}
        {(track.id == 99) && (
          <TrackInfoLinks />
        )}
        {/* Mobile - All Tracks Except Album */}
        {(track.id != 99) && (
        <div id="mobile-title-text" className="w-full h-8 text-4xl text-center flex items-center justify-center font-bold font-sans scale-y-50 text-gray-100 uppercase">
          <h2>{track.title}</h2>
        </div>
        )}
        {/* BEN Audio Player - only visible on Desktop - All Tracks*/}
        {(!isMobile && track.id != 99) && (
          <div id="track-player" className="mt-4">
            <div className="flex gap-4 justify-between items-center bg-gray-800 rounded-lg p-4">
              <div id="track-play-button" className="flex items-center justify-between">
                <button
                  className="w-12 h-12 rounded-full bg-white text-black 
                            flex items-center justify-center text-xl"
                  onClick={togglePlayPause}
                >
                  {isPlaying ? '⏸' : '▶'}
                </button>
              </div>
              <div 
                id="track-progress-bar"
                className="flex-1 h-2 bg-gray-600 rounded-full cursor-pointer"
                onClick={goTo}
                ref={seekbarRef}
              >
                <motion.div 
                  className="h-full bg-white rounded-full"
                  style={{ width: `${(audioPosition / duration) * 100}%`  }}
                />
              </div>

              <TrackTimeTracker audioPosition={audioPosition} duration={duration} />
            </div>
          </div>
        )} 

      </div>
    </motion.div>
  );
};