import { useState, useEffect } from 'react';
import { Track } from '../types';

export interface ListenedTrack {
  trackId: number;
  listened: boolean;
}

/**
 * This hook will be used to verify if the user has listened to a track
 */
export const useListenVerifier = () => {
  /** List of items that have been collected, saved in localStorage */
  const [listenedTracks, setListenedTracks] = useState<ListenedTrack[]>(() => {
    const initialTracks = [
      { trackId: 1, listened: false },
      { trackId: 2, listened: false },
      { trackId: 3, listened: false },
      { trackId: 4, listened: false }
    ];
    const saved = localStorage.getItem('stolimpico-listened');
    if (saved === "[]") {
      localStorage.setItem('stolimpico-listened', JSON.stringify(initialTracks));
      return initialTracks;
    }
    // TODO: should prob not just reeturn empty array but do some handling
    return saved ? JSON.parse(saved) : [];
  });

  /** Updates localStorage whenever listenedTracks changes */
  useEffect(() => {
    localStorage.setItem('stolimpico-listened', JSON.stringify(listenedTracks));
  }, [listenedTracks]);

  /** Gets current list of listened tracks */
  const getListenedTracks = () => listenedTracks;

  /** Marks a new track to the inventory as being listened to */
  const markListened = (track: Track) => {
    setListenedTracks(prev =>
      prev.map(item =>
        item.trackId === track.id
          ? { ...item, listened: true } // Update the matching item
          : item // Leave other items unchanged
      )
    );
  };

  /** Checks if a given track has been listened to */
  const hasListened = (trackId: number): boolean => {
    return listenedTracks.some(item => (item.trackId === trackId) && item.listened);
  };

  /** Checks if all tracks have been listened to */
  const hasListenedToAll = (): boolean => {
    return listenedTracks.filter(item => item.listened).length === 4;
  }

  /** Clears the inventory */
  const clearListenRecord = () => {
    console.log('Clearing listen record');
    setListenedTracks([]);
  };

  return {
    markListened,
    hasListened,
    hasListenedToAll,
    getListenedTracks,
    clearListenRecord,
    listenedTracks
  };
};