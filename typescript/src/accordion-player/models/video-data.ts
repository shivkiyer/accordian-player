export default interface VideoDataType {
  backgroundColor?: string;
  framesPerSecond: number;
  introVideo?: {
    title: string;
    url: string;
    image?: string;
  };
  selectInfo?: {
    title: string;
    url: string;
    selectText: string;
    startInteraction?: number;
    startLoopback: number;
    jumpToTimestamp: number;
  };
  videoSequence?: string[];
  videoOptions: {
    name: string;
    longVideoUrl: string;
    shortVideoUrl?: string;
  }[];
  endscreenInfo?: {
    title: string;
    url: string;
    startLoopback: number;
    jumpToTimestamp: number;
    startHotSpot: number;
    jumpToUrl?: string;
  };
}

export {};
