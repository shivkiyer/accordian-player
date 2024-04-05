import { createSlice } from '@reduxjs/toolkit';

/**
 * Video Reducer
 *
 * States:
 * width {number} The width of the video player
 * height {number} The height of the video player
 * isPlaying {boolean} Indicated whether the video is playing
 * isVolumeSliderVisible {boolean} Indicates whether volume is being controlled
 *
 * Reducers:
 * setDimensions : Setting the width and height of the video player
 * playPauseVideo: Toggling play/pause status of the video
 *
 */
export const videoSlice = createSlice({
  name: 'video',
  initialState: {
    width: 1980,
    height: 1020,
    isPlaying: false,
    isVolumeSliderVisible: false,
  },
  reducers: {
    /**
     * Sets the dimension of the video player
     *
     * @param {object} payload Contains the width and height of the video player
     *
     */
    setDimensions: (state, action) => {
      state.width = action.payload.width;
      state.height = action.payload.height;
    },
    playPauseVideo: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    setVolumeSlider: (state, action) => {
      state.isVolumeSliderVisible = action.payload;
    },
  },
});

export const { setDimensions, playPauseVideo, setVolumeSlider } =
  videoSlice.actions;

export const selectVideoWidth = (state) => state.video.width;
export const selectVideoHeight = (state) => state.video.height;
export const selectIsPlaying = (state) => state.video.isPlaying;
export const selectIsVolumeSliderVisible = (state) =>
  state.video.isVolumeSliderVisible;

export default videoSlice.reducer;
