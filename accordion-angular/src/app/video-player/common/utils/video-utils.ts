import { VIDEO_ASPECT_RATIO, MAX_VIDEO_WIDTH } from '../constants';

/**
 * Returns video container dimensions from inputs and
 * maximum possible dimensions (browser limits)
 *
 * @param {number} inpWidth The specified width
 * @param {number} inpHeight The specified height
 * @param {number} maxWidth Maximum possible width
 * @param {number} maxHeight Maximum possible height
 * @returns {object} Contains width, height and top margin
 *
 * @example
 * To adjust to specific width less than maximum width
 * getVideoPlayerStyle(300, 0, 1000, 1000)
 *
 * @example
 * To adjust to specific height less than maximum height
 * getVideoPlayerStyle(0, 300, 1000, 1000)
 *
 * @example
 * To adjust to maximum width or height
 * getVideoPlayerStyle(0, 0, 1000, 1000)
 *
 */
export function getVideoPlayerStyle(
  inpWidth: number,
  inpHeight: number,
  maxWidth: number,
  maxHeight: number
): any {
  let width, height;
  let playerWidth, playerHeight, playerMarginTop: number;
  const coverageArea = 0.9;

  if (inpWidth > 0 && inpWidth <= maxWidth) {
    width = inpWidth;
    height = width * VIDEO_ASPECT_RATIO;
  } else if (inpHeight > 0 && inpHeight <= maxHeight) {
    height = inpHeight;
    width = height / VIDEO_ASPECT_RATIO;
  } else {
    width = maxWidth;
    height = maxHeight;
  }

  playerWidth = coverageArea * width;
  if (playerWidth > MAX_VIDEO_WIDTH) {
    playerWidth = MAX_VIDEO_WIDTH;
  }
  playerHeight = playerWidth * VIDEO_ASPECT_RATIO;
  if (playerHeight > height) {
    playerHeight = coverageArea * height;
    playerWidth = playerHeight / VIDEO_ASPECT_RATIO;
  }
  playerMarginTop = (height - playerHeight) / 2.0;

  return {
    playerHeight,
    playerWidth,
    playerMarginTop,
  };
}
