import { createSlice } from '@reduxjs/toolkit';

/**
 * Video Reducer
 *
 * States:
 * width {number} The width of the video player
 * height {number} The height of the video player
 * volume {number} Volume level between 0 and 1
 * isPlaying {boolean} Indicated whether the video is playing
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
 *
 * Reducers:
 * setDimensions : Setting the width and height of the video player
 * playPauseVideo: Toggling play/pause status of the video
 * setControlBarVisible: Change visibility of control bar
 * setVolumeSlider: Toggle visible status of volume slider
 * toggleVolumeMute: Mute/unmute volume
 * setVolumeLevel: Set the volume of the video
 * setIsVolumeChanging: Set the flag whether volume slider is being changed
 * toggleFullScreen: Toggle the full screen status flag
 * setIsBtnFullScreen: Is user clicking on fullscreen control button
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
 *
 */
export const videoSlice = createSlice({
  name: 'video',
  initialState: {
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
  },
  reducers: {
    /**
     * Sets the dimension of the video player
     *
     * @param {object} payload Contains the width and height of the video player
     */
    setDimensions: (state, action) => {
      state.width = action.payload.width;
      state.height = action.payload.height;
    },
    /**
     * Changes video state between pause and play
     *
     * @param {string} payload Play/pause status of video JS node
     *
     */
    playPauseVideo: (state, action) => {
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
     * Set the current play time of the video
     *
     * @param {number} payload currentTime from video
     */
    setCurrentTime: (state, action) => {
      state.currentTime = action.payload;
    },
    /**
     * Set the duration of the video
     *
     * @param {number} payload duration from video
     */
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
    /**
     * Change the visibility status of the control bar
     *
     * @param {boolean} payload
     */
    setControlBarVisible: (state, action) => {
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
    setControlBarActive: (state, action) => {
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
    setVolumeSlider: (state, action) => {
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
    setVolumeLevel: (state, action) => {
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
    setIsVolumeChanging: (state, action) => {
      state.isVolumeChanging = action.payload;
    },
    /**
     * Toggles full screen mode
     *
     * @param {boolean} payload Fullscreen status (optional)
     *
     */
    toggleFullScreen: (state, action) => {
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
    setIsButtonFullScreen: (state, action) => {
      state.isBtnFullScreen = action.payload;
    },
    /**
     * Sets the URL of the video
     * @param {string} payload URL of the video
     */
    setVideoUrl: (state, action) => {
      state.videoUrl = action.payload;
    },
    /**
     * Sets the flag if video position is changing
     * @param {boolean} payload Video positon changing flag
     */
    setIsVideoPositionChanging: (state, action) => {
      state.isVideoPositionChanging = action.payload;
    },
    /**
     * Set the X coordinate of the mouse
     * on the screen for volume change
     *
     * @param {number} payload X-coordinate of mouse event
     */
    setVolumeMousePositionX: (state, action) => {
      state.volumeMousePositionX = action.payload;
    },
    /**
     * Set the X coordinate of the mouse
     * on the screen for progress change
     *
     * @param {number} payload X-coordinate of mouse event
     */
    setProgressMousePositionX: (state, action) => {
      state.progressMousePositionX = action.payload;
    },
    /**
     * Set the url of the background image
     * @param {string} payload Url of background image
     */
    setBackgroundImageUrl: (state, action) => {
      state.backgroundImageUrl = action.payload;
    },
    /**
     * Sets the video data from config file
     * @param {object} payload Contents of config.csv file
     */
    setVideoData: (state, action) => {
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
    setCurrentVideoLabel: (state, action) => {
      state.currentVideoLabel = action.payload;
    },
    /**
     * Sets the name of the current video
     * @param {string} payload Name of current video
     */
    setCurrentVideoName: (state, action) => {
      state.currentVideoName = action.payload;
    },
    /**
     * Sets the visibility of the user select panel
     *
     * @param {boolean} action
     */
    setSelectPanelVisible: (state, action) => {
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
    setUserSelection: (state, action) => {
      state.userSelection = action.payload;
    },
    /**
     * Sets the ending state of the video collection
     *
     * @param {boolean} payload
     */
    setReadyForEnding: (state, action) => {
      state.readyForEnding = action.payload;
    },
  },
});

export const {
  setDimensions,
  playPauseVideo,
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
} = videoSlice.actions;

export const selectVideoWidth = (state) => state.video.width;
export const selectVideoHeight = (state) => state.video.height;
export const selectIsPlaying = (state) => state.video.isPlaying;
export const selectPrevIsPlaying = (state) => state.video.prevIsPlaying;
export const selectCurrentTime = (state) => state.video.currentTime;
export const selectDuration = (state) => state.video.duration;
export const selectIsControlBarVisible = (state) =>
  state.video.isControlBarVisible;
export const selectIsControlBarActive = (state) =>
  state.video.isControlBarActive;
export const selectIsVolumeSliderVisible = (state) =>
  state.video.isVolumeSliderVisible;
export const selectIsVolumeMuted = (state) => state.video.isVolumeMuted;
export const selectVolume = (state) => state.video.volume;
export const selectIsVolumeChanging = (state) => state.video.isVolumeChanging;
export const selectIsFullScreen = (state) => state.video.isFullScreen;
export const selectIsBtnFullScreen = (state) => state.video.isBtnFullScreen;
export const selectVideoUrl = (state) => state.video.videoUrl;
export const selectIsVideoPositionChanging = (state) =>
  state.video.isVideoPositionChanging;
export const selectVolumeMousePositionX = (state) =>
  state.video.volumeMousePositionX;
export const selectProgressMousePositionX = (state) =>
  state.video.progressMousePositionX;
export const selectBackgroundImageUrl = (state) =>
  state.video.backgroundImageUrl;
export const selectVideoData = (state) => state.video.videoData;
export const selectCurrentVideoLabel = (state) => state.video.currentVideoLabel;
export const selectCurrentVideoName = (state) => state.video.currentVideoName;
export const selectIsSelectPanelVisible = (state) =>
  state.video.isSelectPanelVisible;
export const selectUserSelection = (state) => state.video.userSelection;
export const selectReadyForEnding = (state) => state.video.readyForEnding;

export default videoSlice.reducer;
