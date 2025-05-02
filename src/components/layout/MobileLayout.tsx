// import { motion } from 'framer-motion';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { allTracks } from '../../data/tracks';
import { TrackCarousel } from '../mobile/TrackCarousel';
import { useInventory } from '../../hooks/useInventory';
import { useListenVerifier } from '../../hooks/useListenVerifier';
import { InventoryDrawer } from '../mobile/InventoryDrawer';
import { InventoryIcon } from '../mobile/InventoryIcon';
import '../../styles/components.css';
import EmailDialog from '../ui/email-dialog';

export const MobileLayout = () => {
  const { hasAll, hasCollected, addToInventory, clearInventory } = useInventory();
  const { hasListened, markListened, clearListenRecord } = useListenVerifier();
  const [showingAlbumMobile, setShowingAlbumMobile] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

  // const [hasListened, setHasListened] = useState(false);
  // const handleAudioComplete = () => {
  //   setHasListened(true);
// };

  const allCollected = hasAll();
  
  // Handler for when the inventory icon is clicked
  const handleInventoryIconClick = () => {
    if (allCollected) {
      setDialogOpen(true);
    }
  };

  return (
    <div id="mobile-layout" className="GradientBkg flex flex-col justify-between items-center w-screen h-screen bg-black text-white overflow-x-hidden">
      <TrackCarousel 
        tracks={allTracks} 
        onListen={markListened}
        onCollect={addToInventory}
        hasListened={hasListened}
        hasCollected={hasCollected}
        clearListenRecord={clearListenRecord}
        toggleDrawer={() => setShowingAlbumMobile(!showingAlbumMobile)}
      />

      <InventoryDrawer 
        show={showingAlbumMobile}
        inventory={allTracks}
        hasCollected={hasCollected}
        clearInventory={clearInventory}
      />

       {/* Show InventoryIcon only on the album page (track.id == 99) */}
       {!showingAlbumMobile && (
        <div id="collect-all-icon" className="flex flex-col gap-2 mt-12 items-center justify-center w-full ">
          <hr />
          <motion.p 
            initial={{ opacity: 0, y: !showingAlbumMobile ? 100 : 0 }}
            animate={{ opacity: 1, y: !showingAlbumMobile ? 0 : 100 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.3 }}
            className="text-sm text-[#ccbb8b]">
            swipe to collect tokens & unlock your reward
          </motion.p>
          <InventoryIcon 
            tracks={allTracks} 
            show={!showingAlbumMobile}
            hasCollected={hasCollected}
            onIconClick={handleInventoryIconClick}
          />
        </div>
      )}
      
      {/* Display pop-up once user has collected all inventory items */}
      <EmailDialog 
        isCompleted={allCollected} 
        isOpen={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
};