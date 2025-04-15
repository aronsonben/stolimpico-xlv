// import { motion } from 'framer-motion';
import { useState } from 'react';
import { allTracks } from '../../data/tracks';
import { TrackCarousel } from '../mobile/TrackCarousel';
import { useInventory } from '../../hooks/useInventory';
import { InventoryDrawer } from '../mobile/InventoryDrawer';
import { InventoryIcon } from '../mobile/InventoryIcon';
import '../../styles/components.css';
import EmailDialog from '../ui/email-dialog';

export const MobileLayout = () => {
  const { hasAll, hasCollected, addToInventory, clearInventory } = useInventory();
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
    <div id="mobile-layout" className="GradientBkg flex flex-col justify-between items-center w-screen h-screen bg-black text-white overflow-hidden">
      <TrackCarousel 
        tracks={allTracks} 
        onCollect={addToInventory}
        hasCollected={hasCollected}
        toggleDrawer={() => setShowingAlbumMobile(!showingAlbumMobile)}
      />

      <InventoryDrawer 
        show={showingAlbumMobile}
        inventory={allTracks}
        hasCollected={hasCollected}
        clearInventory={clearInventory}
      />

       {/* Show InventoryIcon only on the album page (track.id == 99) */}
      <div id="collect-all-icon" className="flex items-center justify-center w-full">
        <InventoryIcon 
          tracks={allTracks} 
          show={!showingAlbumMobile}
          hasCollected={hasCollected}
          onIconClick={handleInventoryIconClick}
        />
      </div>
      
      {/* Display pop-up once user has collected all inventory items */}
      <EmailDialog 
        isCompleted={allCollected} 
        isOpen={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
};