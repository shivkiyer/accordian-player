import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import VideoType from '../models/video-type';

const initialVideoState: VideoType = {
  width: 1980,
  height: 1020,
  volume: 1.0,
  prevVolume: 1.0,
  isPlaying: false,
  restartVideo: false,
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
};

/**
 * Video Reducer
 *
 * States:
 * width {number} The width of the video player
 * height {number} The height of the video player
 * volume {number} Volume level between 0 and 1
 * isPlaying {boolean} Indicated whether the video is playing
 * restartVideo {boolean} Flag to restart video
 * prevIsPlaying {boolean} Stores video playing status
 * currentTime {number} Current time position in seconds of the video
 * duration {number} Duration in seconds of the video
 * isControlBarVisible {boolean} Indicates whether the control bar is visible
 * isVolumeSliderVisible {boolean} Indicates whether volume is being controlled
 * isVolumeMuted {boolean} Indicates whether volume is muted
 * isVolumeChanging {boolean} Indicates whether volume slider is being changed
 * isFullScreen {boolean} Indicates whether video playing in full screen mode
 * isBtnFullScreen {boolean} User enter/leave fullscreen with control button
 * videoUrl {string} The URL of the video
 * isVideoPositionChanging {boolean} Indicates whether user is moving through video
 * volumeMousePositonX {number} X-positon of the mouse for volume change
 * progressMousePositonX {number} X-position of the mouse for progress change
 * backgroundImageUrl {string} - A background image before video loads
 * videoData {object} - Contents of config.csv file
 * currentVideoLabel {string} - Label of current video
 * currentVideoName {string} - Name of current video
 * isSelectPanelVisible {boolean} - Visibility of user select panel
 * userSelection: {Array} - User choice on video options
 * readyForEnding: {boolean} - Is the video ready for the ending action
 * isLoaded: {boolean} - Flag to indicate when app is first loaded onto browser
 * isMobile: {boolean} - Flag to indicate whether device is mobile
 *
 * Reducers:
 * setDimensions : Setting the width and height of the video player
 * playPauseVideo: Toggling play/pause status of the video
 * setRestartVideo: Set the flag to restart the video
 * setCurrentTime: Set the current playing time instant of the video
 * setDuration: Set the duration of the video
 * setControlBarVisible: Change visibility of control bar
 * setControlBarActive: Flag to indicate user interaction with control bar
 * setVolumeSlider: Toggle visible status of volume slider
 * toggleVolumeMute: Mute/unmute volume
 * setVolumeLevel: Set the volume of the video
 * setIsVolumeChanging: Set the flag whether volume slider is being changed
 * toggleFullScreen: Toggle the full screen status flag
 * setIsBtnFullScreen: Is user clicking on fullscreen control button
 * setVideoUrl: Sets the url of the video
 * setIsVideoPositionChanging: Set the flag if video position is changing
 * setVolumeMousePositionX: Set the X-position of the mouse for volume change
 * setProgressMousePositionX: Set the X-position of the mouse for progress change
 * setBackgroundImageUrl: Set the Url of the background image
 * setVideoData: Set the video config data
 * setCurrentVideoLabel: Set the label of the current video
 * setCurrentVideoName: Sets the name of the current video
 * setSelectPanelVisible : Sets the visibility of the user select panel
 * setUserSelection: Sets the user video selection array
 * setReadyForEnding: Sets the ending state of the video collection
 * setIsLoaded: Sets the initialization flag that is null/false at time of app load
 * setIsMobile: Sets the flag that device used is a mobile
 *
 */
export const videoSlice = createSlice({
  name: 'video',
  initialState: initialVideoState,
  reducers: {
    /**
     * Sets the dimension of the video player
     *
     * @param {object} payload Contains the width and height of the video player
     */
    setDimensions: (
      state,
      action: PayloadAction<{ width: number; height: number }>
    ) => {
      state.width = action.payload.width;
      state.height = action.payload.height;
    },
    /**
     * Changes video state between pause and play
     *
     * @param {string} payload Play/pause status of video JS node
     *
     */
    playPauseVideo: (
      state,
      action: PayloadAction<string | null | undefined>
    ) => {
      state.prevIsPlaying = state.isPlaying;
      if (action.payload === 'paused') {
        state.isPlaying = false;
      } else if (action.payload === 'playing') {
        state.isPlaying = true;
      } else {
        state.isPlaying = !state.isPlaying;
      }
    },
    /**
     * Sets the flag to restart the video
     *
     * @param {boolean} payload Restart flag
     */
    setRestartVideo: (state, action: PayloadAction<boolean>) => {
      state.restartVideo = action.payload;
    },
    /**
     * Set the current play time of the video
     *
     * @param {number} payload currentTime from video
     */
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
    /**
     * Set the duration of the video
     *
     * @param {number} payload duration from video
     */
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
    /**
     * Change the visibility status of the control bar
     *
     * @param {boolean} payload
     */
    setControlBarVisible: (
      state,
      action: PayloadAction<boolean | null | undefined>
    ) => {
      if (action.payload === null || action.payload === undefined) {
        state.isControlBarVisible = !state.isControlBarVisible;
      } else {
        state.isControlBarVisible = action.payload;
      }
    },
    /**
     * Sets the control bar as actively used by user
     *
     * @param {boolean} payload
     */
    setControlBarActive: (
      state,
      action: PayloadAction<boolean | null | undefined>
    ) => {
      if (action.payload === null || action.payload === undefined) {
        state.isControlBarActive = !state.isControlBarActive;
      } else {
        state.isControlBarActive = action.payload;
      }
    },
    /**
     * Sets visibility of volume slider
     *
     * @param {boolean} payload Visibility of volume slider
     */
    setVolumeSlider: (state, action: PayloadAction<boolean>) => {
      state.isVolumeSliderVisible = action.payload;
    },
    /**
     * Toggles volume mute
     */
    toggleVolumeMute: (state) => {
      if (!state.isVolumeMuted) {
        state.prevVolume = state.volume;
        state.volume = 0;
      } else {
        state.volume = state.prevVolume;
      }
      state.isVolumeMuted = !state.isVolumeMuted;
    },
    /**
     * Set the volume level
     *
     * @param {number} payload Volume level
     */
    setVolumeLevel: (state, action: PayloadAction<number>) => {
      let volInput = action.payload;
      if (action.payload < 0.05) {
        volInput = 0;
        state.isVolumeMuted = true;
      } else {
        state.isVolumeMuted = false;
      }
      state.prevVolume = state.volume;
      state.volume = volInput;
    },
    /**
     * Set the flag whether volume slider is being changed
     *
     * @param {boolean} payload Flag whether volume slider is being changed
     */
    setIsVolumeChanging: (state, action: PayloadAction<boolean>) => {
      state.isVolumeChanging = action.payload;
    },
    /**
     * Toggles full screen mode
     *
     * @param {boolean} payload Fullscreen status (optional)
     *
     */
    toggleFullScreen: (
      state,
      action: PayloadAction<boolean | null | undefined>
    ) => {
      if (action.payload === null || action.payload === undefined) {
        state.isFullScreen = !state.isFullScreen;
      } else {
        state.isFullScreen = action.payload;
      }
    },
    /**
     * Sets flag whether user clicked on fullscreen control button
     *
     * @param {boolean} payload Flag
     */
    setIsButtonFullScreen: (state, action: PayloadAction<boolean>) => {
      state.isBtnFullScreen = action.payload;
    },
    /**
     * Sets the URL of the video
     * @param {string} payload URL of the video
     */
    setVideoUrl: (state, action: PayloadAction<string>) => {
      state.videoUrl = action.payload;
    },
    /**
     * Sets the flag if video position is changing
     * @param {boolean} payload Video positon changing flag
     */
    setIsVideoPositionChanging: (state, action: PayloadAction<boolean>) => {
      state.isVideoPositionChanging = action.payload;
    },
    /**
     * Set the X coordinate of the mouse
     * on the screen for volume change
     *
     * @param {number} payload X-coordinate of mouse event
     */
    setVolumeMousePositionX: (state, action: PayloadAction<number | null>) => {
      state.volumeMousePositionX = action.payload;
    },
    /**
     * Set the X coordinate of the mouse
     * on the screen for progress change
     *
     * @param {number} payload X-coordinate of mouse event
     */
    setProgressMousePositionX: (
      state,
      action: PayloadAction<number | null>
    ) => {
      state.progressMousePositionX = action.payload;
    },
    /**
     * Set the url of the background image
     * @param {string} payload Url of background image
     */
    setBackgroundImageUrl: (state, action: PayloadAction<string>) => {
      state.backgroundImageUrl = action.payload;
    },
    /**
     * Sets the video data from config file
     * @param {object} payload Contents of config.csv file
     */
    setVideoData: (state, action: PayloadAction<any>) => {
      state.videoData = action.payload;
      if (
        action.payload['videoOptions'] !== null &&
        action.payload['videoOptions'] !== undefined
      ) {
        state.userSelection = Array(action.payload['videoOptions'].length).fill(
          null
        );
      }
    },
    /**
     * Set the label of the current video being played
     * @param {string} payload Label of current video
     */
    setCurrentVideoLabel: (state, action: PayloadAction<string>) => {
      state.currentVideoLabel = action.payload;
    },
    /**
     * Sets the name of the current video
     * @param {string} payload Name of current video
     */
    setCurrentVideoName: (state, action: PayloadAction<string>) => {
      state.currentVideoName = action.payload;
    },
    /**
     * Sets the visibility of the user select panel
     *
     * @param {boolean} action
     */
    setSelectPanelVisible: (
      state,
      action: PayloadAction<boolean | null | undefined>
    ) => {
      if (action.payload === null || action.payload === undefined) {
        state.isSelectPanelVisible = !state.isSelectPanelVisible;
      } else {
        state.isSelectPanelVisible = action.payload;
      }
    },
    /**
     * Sets the user video selection array
     *
     * @param {Array} action User choice on video option
     */
    setUserSelection: (state, action: PayloadAction<any>) => {
      state.userSelection = action.payload;
    },
    /**
     * Sets the ending state of the video collection
     *
     * @param {boolean} payload
     */
    setReadyForEnding: (state, action: PayloadAction<boolean>) => {
      state.readyForEnding = action.payload;
    },
    /**
     * Sets the initialization flag that is null/false at time of app load
     *
     * @param {boolean} payload
     */
    setIsLoaded: (state, action: PayloadAction<boolean>) => {
      state.isLoaded = action.payload;
    },
    /**
     * Sets the flag that device used is a mobile
     *
     * @param {boolean} payload
     */
    setIsMobile: (state, action: PayloadAction<boolean>) => {
      state.isMobile = action.payload;
    },
  },
});

export const {
  setDimensions,
  playPauseVideo,
  setRestartVideo,
  setCurrentTime,
  setDuration,
  setControlBarVisible,
  setControlBarActive,
  setVolumeSlider,
  toggleVolumeMute,
  setVolumeLevel,
  setIsVolumeChanging,
  toggleFullScreen,
  setIsButtonFullScreen,
  setVideoUrl,
  setIsVideoPositionChanging,
  setVolumeMousePositionX,
  setProgressMousePositionX,
  setBackgroundImageUrl,
  setVideoData,
  setCurrentVideoLabel,
  setCurrentVideoName,
  setSelectPanelVisible,
  setUserSelection,
  setReadyForEnding,
  setIsLoaded,
  setIsMobile,
} = videoSlice.actions;

export const selectVideoWidth = (state: RootState) => state.video.width;
export const selectVideoHeight = (state: RootState) => state.video.height;
export const selectIsPlaying = (state: RootState) => state.video.isPlaying;
export const selectRestartVideo = (state: RootState) =>
  state.video.restartVideo;
export const selectPrevIsPlaying = (state: RootState) =>
  state.video.prevIsPlaying;
export const selectCurrentTime = (state: RootState) => state.video.currentTime;
export const selectDuration = (state: RootState) => state.video.duration;
export const selectIsControlBarVisible = (state: RootState) =>
  state.video.isControlBarVisible;
export const selectIsControlBarActive = (state: RootState) =>
  state.video.isControlBarActive;
export const selectIsVolumeSliderVisible = (state: RootState) =>
  state.video.isVolumeSliderVisible;
export const selectIsVolumeMuted = (state: RootState) =>
  state.video.isVolumeMuted;
export const selectVolume = (state: RootState) => state.video.volume;
export const selectIsVolumeChanging = (state: RootState) =>
  state.video.isVolumeChanging;
export const selectIsFullScreen = (state: RootState) =>
  state.video.isFullScreen;
export const selectIsBtnFullScreen = (state: RootState) =>
  state.video.isBtnFullScreen;
export const selectVideoUrl = (state: RootState) => state.video.videoUrl;
export const selectIsVideoPositionChanging = (state: RootState) =>
  state.video.isVideoPositionChanging;
export const selectVolumeMousePositionX = (state: RootState) =>
  state.video.volumeMousePositionX;
export const selectProgressMousePositionX = (state: RootState) =>
  state.video.progressMousePositionX;
export const selectBackgroundImageUrl = (state: RootState) =>
  state.video.backgroundImageUrl;
export const selectVideoData = (state: RootState) => state.video.videoData;
export const selectCurrentVideoLabel = (state: RootState) =>
  state.video.currentVideoLabel;
export const selectCurrentVideoName = (state: RootState) =>
  state.video.currentVideoName;
export const selectIsSelectPanelVisible = (state: RootState) =>
  state.video.isSelectPanelVisible;
export const selectUserSelection = (state: RootState) =>
  state.video.userSelection;
export const selectReadyForEnding = (state: RootState) =>
  state.video.readyForEnding;
export const selectIsLoaded = (state: RootState) => state.video.isLoaded;
export const selectIsMobile = (state: RootState) => state.video.isMobile;

export default videoSlice.reducer;
