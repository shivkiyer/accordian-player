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
 *
 * Reducers:
 * setDimensions : Setting the width and height of the video player
 * playPauseVideo: Toggling play/pause status of the video
 * setVolumeSlider: Toggle visible status of volume slider
 * toggleVolumeMute: Mute/unmute volume
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
  },
});

export const {
  setDimensions,
  playPauseVideo,
  setVolumeSlider,
  toggleVolumeMute,
} = videoSlice.actions;

export const selectVideoWidth = (state) => state.video.width;
export const selectVideoHeight = (state) => state.video.height;
export const selectIsPlaying = (state) => state.video.isPlaying;
export const selectIsVolumeSliderVisible = (state) =>
  state.video.isVolumeSliderVisible;
export const selectIsVolumeMuted = (state) => state.video.isVolumeMuted;
export const selectVolume = (state) => state.video.volume;

export default videoSlice.reducer;
