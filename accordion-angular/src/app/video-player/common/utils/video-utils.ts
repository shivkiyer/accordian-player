import { VIDEO_ASPECT_RATIO, MAX_VIDEO_WIDTH } from '../constants';

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
