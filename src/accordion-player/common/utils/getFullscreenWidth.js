import { VIDEO_PLAYER_ASPECT_RATIO } from '../constants';

/**
 * Calculates the width of the video in fullscreen mode in
 * a mobile device. This ensures that for a video that has side
 * borders and is centered, all other UI elements are adjusted
 * for the same video width.
 *
 * @param {boolean} isFullscreen
 * @param {boolean} isMobile
 * @returns {number} Adjusted width according to screen dimensions
 */
export default function getFullscreenWidth(isFullscreen, isMobile) {
  if (isFullscreen && isMobile) {
    const width = window.screen.width;
    const height = window.screen.height;

    if (width > height / VIDEO_PLAYER_ASPECT_RATIO) {
      return height / VIDEO_PLAYER_ASPECT_RATIO;
    }
  }

  return null;
}
