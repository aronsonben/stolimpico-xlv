import { useState, useEffect } from 'react';
import { Track } from '../types';

export interface CollectedItem {
  trackId: number;
  imagePath: string;
  dateCollected?: string;
}

/**
 * NOTE for LEARNING (3/26): I am using a hook here because I am working with
 * **external state** saved in localStorage. 
 * @returns 
 */
export const useInventory = () => {
  /** List of items that have been collected, saved in localStorage */
  const [collectedItems, setCollectedItems] = useState<CollectedItem[]>(() => {
    const saved = localStorage.getItem('stolimpico-inventory');
    return saved ? JSON.parse(saved) : [];
  });

  /** Updates localStorage whenever collectedItems changes */
  useEffect(() => {
    localStorage.setItem('stolimpico-inventory', JSON.stringify(collectedItems));
  }, [collectedItems]);

  /** Gets current inventory of collected items */
  const getInventory = () => collectedItems;

  /** Checks if a given track has been collected */
  const hasCollected = (trackId: number): boolean => {
    return collectedItems.some(item => item.trackId === trackId);
  };

  const hasAll = (): boolean => {
    return collectedItems.length === 4;
  }

  /** Adds a new track to the inventory via localStorage */
  const addToInventory = (track: Track) => {
    if (!hasCollected(track.id)) {
      setCollectedItems(prev => [...prev, {
        trackId: track.id,
        imagePath: track.coverArt,
        dateCollected: new Date().toISOString()
      }]);
    }
  };

  /** Ben Functions ***** */

  /** Clears the inventory */
  const clearInventory = () => {
    setCollectedItems([]);
  };

  return {
    addToInventory,
    hasAll,
    hasCollected,
    getInventory,
    clearInventory,
    collectedItems
  };
};