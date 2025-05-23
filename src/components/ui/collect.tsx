import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { Switch } from "radix-ui";
import { useState, useEffect, useRef } from "react";
import { Track } from "../../types";
import "../../styles/components.css";

interface CollectProps {
  track: Track;
  onCollect: (track: Track) => void;
  hasCollected: (trackId: number) => boolean;
  hasListened: () => boolean;
  clearListenRecord?: () => void;
}

const StyledThumb = styled(Switch.Thumb)<{ $containerWidth: number }>`
  display: block;
	width: 32px;
	height: 3rem;
	background-color: white;
	border-radius: 0.5rem;
	box-shadow: 0 2px 2px black;
	transition: transform 350ms;
	will-change: transform;
	
  &[data-state="checked"] {
		transform: translateX(calc(${props => props.$containerWidth}px - 64px));
	}
`;

export const Collect = ({ track, onCollect, hasCollected, hasListened, clearListenRecord }: CollectProps) => {
  const [text, setText] = useState(hasListened() ? (hasCollected(track.id) ? "claimed" : "tap to claim") : "listen to claim");
  const [containerWidth, setContainerWidth] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (wrapperRef.current) {
      const updateWidth = () => {
        // console.log("updatedWidth", wrapperRef.current?.offsetWidth);
        setContainerWidth(wrapperRef.current?.offsetWidth || 0);
      };
      
      updateWidth();
      window.addEventListener('resize', updateWidth);
      return () => window.removeEventListener('resize', updateWidth);
    }
  }, []);

  useEffect(() => {
    if (hasCollected(track.id)) {
      setText("claimed");
    } else if (hasListened()) {
      setText("tap to claim");
    } else {
      setText("listen to claim");
    }
  }, [track.id, hasCollected, hasListened]);

  const handleCheckedChange = (checked: boolean) => {
    onCollect(track);
    setText(checked ? "claimed" : "tap to claim");
  };

  const textVariants = {
    initial: { opacity: 0},
    animate: { opacity: 1},
    exit: { opacity: 0}
  };

  return (
    <div
      id="claim-wrapper"
      ref={wrapperRef}
      className={`flex justify-center px-4 items-center md:justify-start ${
        !hasListened() ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      <div id="claim-collectible" className="flex my-4 h-12 w-full bg-slate-800 rounded-lg justify-center md:justify-start">
        <Switch.Root
          className="CollectSwitch"
          checked={hasCollected(track.id)}
          onCheckedChange={handleCheckedChange}
          disabled={hasCollected(track.id)}
        >
          <StyledThumb $containerWidth={containerWidth} />
            <AnimatePresence mode="wait">
              <motion.p 
                key={text}
                className="CollectText"
                variants={textVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                {text.toUpperCase()}
              </motion.p>
            </AnimatePresence>
        </Switch.Root>
      </div>
      {process.env.NODE_ENV === 'development' && (
        <button onClick={clearListenRecord} className="text-white text-xs bg-slate-400">
          Clear Inventory
        </button>
      )}
    </div>
  );
};

export default Collect;
