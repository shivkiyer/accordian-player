import {
  VIDEO_PLAYER_ASPECT_RATIO,
  MAX_VIDEO_PLAYER_WIDTH,
} from '../constants';

/**
 * Calculate video dimensions from input dimensions if provided
 * or max constraints otherwise.
 *
 * @param {number} width The width of the video (optional)
 * @param {number} height The height of the video (optional)
 * @param {number} maxWidth The maximum possible width of the video
 * @param {number} maxHeight The maximum possible height of the video
 *
 * @returns {object} With properties playerWidth, playerHeight and marginTop
 *
 * @example
 * Use with width and maximum dimensions
 * getVideoDimensions({width: 300, maxWidth: 1000, maxHeight: 1000})
 *
 * @example
 * Use with height and maximum dimensions
 * getVideoDimensions({height: 300, maxWidth: 1000, maxHeight: 1000})
 *
 * @example
 * Use with only maximum dimensions
 * getVideoDimensions({maxWidth: 1000, maxHeight: 1000})
 *
 */
export default function getVideoDimensions({
  width,
  height,
  maxWidth,
  maxHeight,
}) {
  const areaCoverage = 0.9;

  if (width && width <= maxWidth) {
    height = width * VIDEO_PLAYER_ASPECT_RATIO;
  } else if (height && height <= maxHeight) {
    width = height / VIDEO_PLAYER_ASPECT_RATIO;
  } else {
    width = areaCoverage * maxWidth;
    height = areaCoverage * maxHeight;
  }

  let playerWidth = width;
  let playerHeight = playerWidth * VIDEO_PLAYER_ASPECT_RATIO;
  // If player is too tall or wide, resize the player box
  if (playerHeight > height) {
    playerHeight = height;
    playerWidth = playerHeight / VIDEO_PLAYER_ASPECT_RATIO;
  }
  if (playerWidth > MAX_VIDEO_PLAYER_WIDTH) {
    playerWidth = MAX_VIDEO_PLAYER_WIDTH;
    playerHeight = playerWidth * VIDEO_PLAYER_ASPECT_RATIO;
  }

  const marginTop = (height / areaCoverage - playerHeight) / 2.0;

  return {
    playerWidth,
    playerHeight,
    marginTop,
  };
}
