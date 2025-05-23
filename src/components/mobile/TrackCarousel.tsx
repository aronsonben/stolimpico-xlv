import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { Track } from "@/types"
import { TrackDisplay } from '../common/TrackDisplay';
import Collect from "../ui/collect";

interface TrackCarouselProps {
  tracks: Track[];
  onListen: (track: Track) => void;
  onCollect: (track: Track) => void;
  hasListened: (trackId: number) => boolean;
  hasCollected: (trackId: number) => boolean;
  clearListenRecord: () => void;
  toggleDrawer: () => void;
}

export const TrackCarousel = ({ tracks, onListen, onCollect, hasListened, hasCollected, clearListenRecord, toggleDrawer }: TrackCarouselProps) => {
  return (
    <Carousel id="track-carousel-wrap" className="w-full" opts={{ align: "center", "loop": true}}>
      <CarouselContent id="carousel-content">
        {tracks.map((currentTrack, index) => (
          <CarouselItem key={index} id="carousel-item" className="flex flex-col justify-center">
            <TrackDisplay 
              track={currentTrack} 
              isMobile={true} 
              toggleDrawer={toggleDrawer}
              onListen={() => onListen(currentTrack)}
            />
            {/* Claim Collectible */}
            {currentTrack.id !== 99 && ( 
              <Collect 
                track={currentTrack}
                onCollect={() => onCollect(currentTrack)}
                hasCollected={() => hasCollected(currentTrack.id)}
                hasListened={() => hasListened(currentTrack.id)}
                clearListenRecord={clearListenRecord}
              />
            )}
            {/* <p onClick={clearListenRecord} className="text-sm text-gray-400">clear</p>
            {hasListened(currentTrack.id) && (
              <div className="text-sm text-gray-400">
                You have listened to this track!
              </div>
            )} */}
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};