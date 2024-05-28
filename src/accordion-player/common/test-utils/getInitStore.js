/**
 * Return a mock initial state for testing purposes
 *
 * @returns {object} Initial state of video reducer
 */
export default function getInitStore() {
  const initStoreState = {
    video: {
      width: 1980,
      height: 1020,
      volume: 1.0,
      prevVolume: 1.0,
      isPlaying: false,
      prevIsPlaying: false,
      currentTime: 0,
      duration: 0,
      isControlBarVisible: false,
      isControlBarActive: false,
      isVolumeSliderVisible: false,
      isVolumeMuted: false,
      isVolumeChanging: false,
      isFullScreen: false,
      isBtnFullScreen: false,
      videoUrl: null,
      isVideoPositionChanging: false,
      volumeMousePositionX: null,
      progressMousePositionX: null,
      backgroundImageUrl: null,
      videoData: null,
      currentVideoLabel: null,
      currentVideoName: null,
      isSelectPanelVisible: false,
      userSelection: null,
      readyForEnding: false,
      isLoaded: false,
      isMobile: false,
    },
  };

  return initStoreState;
}
