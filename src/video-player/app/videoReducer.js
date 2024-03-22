import { createSlice } from '@reduxjs/toolkit';

/**
 * Video Reducer
 *
 * States:
 * width {number} The width of the video player
 * height {number} The height of the video player
 *
 * Reducers:
 * setDimensions : Setting the width and height of the video player
 *
 */
export const videoSlice = createSlice({
  name: 'video',
  initialState: {
    width: 1980,
    height: 1020,
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
  },
});

export const { setDimensions } = videoSlice.actions;

export const selectVideoWidth = (state) => state.video.width;
export const selectVideoHeight = (state) => state.video.height;

export default videoSlice.reducer;
