import VideoDataType from './video-data';

export default interface VideoType {
  width: number;
  height: number;
  volume: number;
  prevVolume: number;
  isPlaying: boolean;
  prevIsPlaying: boolean;
  restartVideo: boolean;
  currentTime: number;
  duration: number;
  isControlBarVisible: boolean;
  isControlBarActive: boolean;
  isVolumeSliderVisible: boolean;
  isVolumeMuted: boolean;
  isVolumeChanging: boolean;
  isFullScreen: boolean;
  isBtnFullScreen: boolean;
  videoUrl: string | null;
  isVideoPositionChanging: boolean;
  volumeMousePositionX: number | null;
  progressMousePositionX: number | null;
  backgroundImageUrl: string | null;
  videoData: VideoDataType | null;
  currentVideoLabel: string | null;
  currentVideoName: string | null;
  isSelectPanelVisible: boolean;
  userSelection: (string | null)[] | null;
  readyForEnding: boolean;
  isLoaded: boolean;
  isMobile: boolean;
}

export {};
