import { createSlice } from '@reduxjs/toolkit';

/**
 * Video Reducer
 *
 * States:
 * width {number} The width of the video player
 * height {number} The height of the video player
 * volume {number} Volume level between 0 and 1
 * isPlaying {boolean} Indicated whether the video is playing
 * isVolumeSliderVisible {boolean} Indicates whether volume is being controlled
 * isVolumeMuted {boolean} Indicates whether volume is muted
 * isVolumeChanging {boolean} Indicates whether volume slider is being changed
 * isFullScreen {boolean} Indicates whether video playing in full screen mode
 * videoUrl {string} The URL of the video
 *
 * Reducers:
 * setDimensions : Setting the width and height of the video player
 * playPauseVideo: Toggling play/pause status of the video
 * setVolumeSlider: Toggle visible status of volume slider
 * toggleVolumeMute: Mute/unmute volume
 * setVolumeLevel: Set the volume of the video
 * setIsVolumeChanging: Set the flag whether volume slider is being changed
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
    isVolumeSliderVisible: false,
    isVolumeMuted: false,
    isVolumeChanging: false,
    isFullScreen: false,
    videoUrl: null,
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
     * Toggles video state between pause and play
     */
    playPauseVideo: (state) => {
      state.isPlaying = !state.isPlaying;
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
  },
});

export const {
  setDimensions,
  playPauseVideo,
  setVolumeSlider,
  toggleVolumeMute,
  setVolumeLevel,
  setIsVolumeChanging,
  toggleFullScreen,
  setVideoUrl,
} = videoSlice.actions;

export const selectVideoWidth = (state) => state.video.width;
export const selectVideoHeight = (state) => state.video.height;
export const selectIsPlaying = (state) => state.video.isPlaying;
export const selectIsVolumeSliderVisible = (state) =>
  state.video.isVolumeSliderVisible;
export const selectIsVolumeMuted = (state) => state.video.isVolumeMuted;
export const selectVolume = (state) => state.video.volume;
export const selectIsVolumeChanging = (state) => state.video.isVolumeChanging;
export const selectIsFullScreen = (state) => state.video.isFullScreen;
export const selectVideoUrl = (state) => state.video.videoUrl;

export default videoSlice.reducer;
