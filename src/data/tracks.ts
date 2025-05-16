import { Track } from '../types';

export const tracks: Track[] = [
  {
    id: 1,
    title: "c2c",
    audioFile: "https://boriceexposed.s3.us-east-1.amazonaws.com/stolimpico-xiv/c2c.mp3",
    coverArt: "/assets/images/cover_c2c.png",
    collectibleImage: "/assets/images/collectible_c2c.png",
    youtubeLink: "https://www.youtube.com/watch?v=xLcPkNO3g_o",
    soundcloud: "https://soundcloud.com/levrsn/c2c?in=levrsn/sets/stolimpico-xlv",
    spotify: "https://open.spotify.com/track/5g6APf35gRfAYNdqwcdMht?si=c199f784a1784988",
    apple: "https://music.apple.com/be/song/c2c/1804634721",
    bandcamp: "https://lowjamz.bandcamp.com/track/c2c"
  },
  {
    id: 2,
    title: "sayin",
    audioFile: "https://boriceexposed.s3.us-east-1.amazonaws.com/stolimpico-xiv/sayin.mp3",
    coverArt: "/assets/images/cover_sayin.png",
    collectibleImage: "/assets/images/collectible_sayin.png",
    youtubeLink: "https://www.youtube.com/watch?v=fu53z0riuIo",
    soundcloud: "https://soundcloud.com/levrsn/sayin?in=levrsn/sets/stolimpico-xlv",
    spotify: "https://open.spotify.com/track/6hJNHfIWoTEDjeUiUjLTyy?si=35d2d9932bed4aeb",
    apple: "https://music.apple.com/be/song/sayin/1804634722",
    bandcamp: "https://lowjamz.bandcamp.com/track/sayin"
  },
  {
    id: 3,
    title: "spaace",
    audioFile: "https://boriceexposed.s3.us-east-1.amazonaws.com/stolimpico-xiv/spaace.mp3",
    coverArt: "/assets/images/cover_spaace.png",
    collectibleImage: "/assets/images/collectible_spaace.png",
    youtubeLink: "https://www.youtube.com/watch?v=soprVg2c5AA",
    soundcloud: "https://soundcloud.com/levrsn/spaace?in=levrsn/sets/stolimpico-xlv",
    spotify: "https://open.spotify.com/track/6vaQvQkhJmnpWs2WvittCe?si=37f3cf8cdc224894",
    apple: "https://music.apple.com/be/song/spaace/1804634723",
    bandcamp: "https://lowjamz.bandcamp.com/track/spaace"
  },
  {
    id: 4,
    title: "aimhigher",
    audioFile: "https://boriceexposed.s3.us-east-1.amazonaws.com/stolimpico-xiv/aimhigher.mp3",
    coverArt: "/assets/images/cover_aimhigher.png",
    collectibleImage: "/assets/images/collectible_aimhigher.png",
    youtubeLink: "https://www.youtube.com/watch?v=6Hag4GSufd0",
    soundcloud: "https://soundcloud.com/levrsn/aim-higher?in=levrsn/sets/stolimpico-xlv",
    spotify: "https://open.spotify.com/track/69cFRZAoQahndN5iR24dks?si=cec8c7c7f6254f8f",
    apple: "https://music.apple.com/be/song/aim-higher/1804634724",
    bandcamp: "https://lowjamz.bandcamp.com/track/aim-higher"
  }
];

export const albumTrack: Track = {
  id: 99,
  title: "STOLIMPICO XLV",
  audioFile: "",
  coverArt: "/assets/images/cover_sto45.png",
  collectibleImage: "/assets/images/collectible_sto45.png",
  youtubeLink: "https://www.youtube.com/watch?v=Z63ZqCNbgbk",
  soundcloud: "https://soundcloud.com/levrsn/sets/stolimpico-xlv",
  spotify: "https://open.spotify.com/album/1eTqHHWgMHcP3vZesJiuHS",
  apple: "https://music.apple.com/be/album/stolimpico-xlv-ep/1804634720",
  bandcamp: "https://lowjamz.bandcamp.com/album/stolimpico-xlv"
}

export const allTracks = [albumTrack, ...tracks];

export const albumArt = "/assets/images/cover_sto45.png";