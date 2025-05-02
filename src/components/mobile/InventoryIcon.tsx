import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Track } from '@/types';

interface InventoryIconProps {
  tracks: Track[];
  show: boolean;
  hasCollected: (trackId: number) => boolean;
  onIconClick?: () => void; // New prop for handling clicks on the icon
}

const iconVariants = {
  pulse: {
      scale: [1, 1.5, 1],
      transition: {
          duration: 1.2,
          repeat: Infinity,
          ease: "easeInOut",
      },
  },
}

export const InventoryIcon = ({ tracks, show, hasCollected, onIconClick }: InventoryIconProps) => {
  const [showMessage, setShowMessage] = useState(false);

  const strokeColor = "#4a3e18";
  const activeStrokeColor = "#998032";

  // Remove the album track from the list
  const collectibleTracks = tracks.filter(track => track.id !== 99);
  
  // Check if all collectibles have been collected
  const allCollected = collectibleTracks.every(track => hasCollected(track.id));

  // Handle click to show message temporarily or trigger onIconClick if all items collected
  const handleClick = () => {
    // If all items are collected and onIconClick is provided, call it
    if (allCollected && onIconClick) {
      onIconClick();
    } else {
      // Otherwise show the standard message
      setShowMessage(true);
      // Hide the message after 3 seconds
      setTimeout(() => setShowMessage(false), 3000);
    }
  };

  return (
    <div className="relative flex flex-col items-center mb-2">
      <motion.div
        className={`w-12 h-12 rounded-full overflow-hidden cursor-pointer`}
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.90 }}
        initial={{ opacity: 0, y: show ? 100 : 0 }}
        animate={{ opacity: 1, y: show ? 0 : 100 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.3 }}
        variants={iconVariants}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
          <rect width="256" height="256" fill="none" />
          <circle
            cx="80"
            cy="80"
            r="32"
            fill="none"
            stroke={hasCollected(1) ? activeStrokeColor : strokeColor}
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="16"
          />
          <circle
            cx="176"
            cy="80"
            r="32"
            fill="none"
            stroke={hasCollected(2) ? activeStrokeColor : strokeColor}
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="16"
          />
          <circle
            cx="80"
            cy="176"
            r="32"
            fill="none"
            stroke={hasCollected(3) ? activeStrokeColor : strokeColor}
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="16"
          />
          <circle
            cx="176"
            cy="176"
            r="32"
            fill="none"
            stroke={hasCollected(4) ? activeStrokeColor : strokeColor}
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="16"
          />
        </svg>
      </motion.div>

      {/* Message that fades in and out */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            className="absolute top-full mt-4 bg-black bg-opacity-70 px-4 py-2 rounded-lg text-white text-sm text-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{
              opacity: { duration: 0.5 },
              y: { duration: 0.3 },
            }}
          >
            {allCollected ? "Click to claim your reward" : "Collect all items to explore"}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InventoryIcon;
