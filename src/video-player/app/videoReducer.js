import { createSlice } from '@reduxjs/toolkit';

/**
 * Video Reducer
 *
 * States:
 * width {number} The width of the video player
 * height {number} The height of the video player
 * volume {number} Volume level between 0 and 1
 * isPlaying {boolean} Indicated whether the video is playing
 * currentTime {number} Current time position in seconds of the video
 * duration {number} Duration in seconds of the video
 * isVolumeSliderVisible {boolean} Indicates whether volume is being controlled
 * isVolumeMuted {boolean} Indicates whether volume is muted
 * isVolumeChanging {boolean} Indicates whether volume slider is being changed
 * isFullScreen {boolean} Indicates whether video playing in full screen mode
 * videoUrl {string} The URL of the video
 * isVideoPositionChanging {boolean} Indicates whether user is moving through video
 * mousePositonX {number} X-positon of the mouse
 *
 * Reducers:
 * setDimensions : Setting the width and height of the video player
 * playPauseVideo: Toggling play/pause status of the video
 * setVolumeSlider: Toggle visible status of volume slider
 * toggleVolumeMute: Mute/unmute volume
 * setVolumeLevel: Set the volume of the video
 * setIsVolumeChanging: Set the flag whether volume slider is being changed
 * setIsVideoPositionChanging: Set the flag if video position is changing
 * setMousePositionX: Set the X-position of the mouse
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
    currentTime: 0,
    duration: 0,
    isVolumeSliderVisible: false,
    isVolumeMuted: false,
    isVolumeChanging: false,
    isFullScreen: false,
    videoUrl: null,
    isVideoPositionChanging: false,
    mousePositonX: 0,
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
     */
    toggleFullScreen: (state) => {
      state.isFullScreen = !state.isFullScreen;
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
     * Set the X coordinate of the mouse on the screen
     * @param {number} payload X-coordinate of mouse event
     */
    setMousePositionX: (state, action) => {
      state.mousePositonX = action.payload;
    },
  },
});

export const {
  setDimensions,
  playPauseVideo,
  setCurrentTime,
  setDuration,
  setVolumeSlider,
  toggleVolumeMute,
  setVolumeLevel,
  setIsVolumeChanging,
  toggleFullScreen,
  setVideoUrl,
  setIsVideoPositionChanging,
  setMousePositionX,
} = videoSlice.actions;

export const selectVideoWidth = (state) => state.video.width;
export const selectVideoHeight = (state) => state.video.height;
export const selectIsPlaying = (state) => state.video.isPlaying;
export const selectCurrentTime = (state) => state.video.currentTime;
export const selectDuration = (state) => state.video.duration;
export const selectIsVolumeSliderVisible = (state) =>
  state.video.isVolumeSliderVisible;
export const selectIsVolumeMuted = (state) => state.video.isVolumeMuted;
export const selectVolume = (state) => state.video.volume;
export const selectIsVolumeChanging = (state) => state.video.isVolumeChanging;
export const selectIsFullScreen = (state) => state.video.isFullScreen;
export const selectVideoUrl = (state) => state.video.videoUrl;
export const selectIsVideoPositionChanging = (state) =>
  state.video.isVideoPositionChanging;
export const selectMousePositionX = (state) => state.video.mousePositonX;

export default videoSlice.reducer;
