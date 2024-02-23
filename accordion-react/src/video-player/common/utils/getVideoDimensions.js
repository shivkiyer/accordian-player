import {
  VIDEO_PLAYER_ASPECT_RATIO,
  MAX_VIDEO_PLAYER_WIDTH,
} from '../constants';

/** Calculate video dimensions from inputs or max constraints */
export default function getVideoDimensions({
  width,
  height,
  maxWidth,
  maxHeight,
}) {
  const areaCoverage = 0.9;

  if (!width && !height) {
    width = maxWidth;
    height = maxHeight;
  }
  // If only width or only height is provided,
  // calculate the other from 9:16 aspect ratio
  if (width && !height) {
    height = width * VIDEO_PLAYER_ASPECT_RATIO;
  }
  if (!width && height) {
    width = height / VIDEO_PLAYER_ASPECT_RATIO;
  }
  // Width and height cannot exceed max dimensions
  if (maxWidth && width > maxWidth) {
    width = maxWidth;
  }
  if (maxHeight && height > maxHeight) {
    height = maxHeight;
  }

  let playerWidth = areaCoverage * width;
  let playerHeight = playerWidth * VIDEO_PLAYER_ASPECT_RATIO;
  // If player is too tall or wide, resize the player box
  if (playerHeight > height) {
    playerHeight = areaCoverage * height;
    playerWidth = playerHeight / VIDEO_PLAYER_ASPECT_RATIO;
  }
  if (playerWidth > MAX_VIDEO_PLAYER_WIDTH) {
    playerWidth = MAX_VIDEO_PLAYER_WIDTH;
    playerHeight = playerWidth * VIDEO_PLAYER_ASPECT_RATIO;
  }

  const marginTop = (height - playerHeight) / 2.0;

  return {
    playerWidth,
    playerHeight,
    marginTop,
  };
}
