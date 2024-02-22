import useWindowDimensions from '../../hooks/useWindowDimensions';
import {
  MAX_VIDEO_PLAYER_WIDTH,
  VIDEO_PLAYER_ASPECT_RATIO,
} from '../../common/constants';
import styles from './video-player.module.scss';

export default function VideoPlayer({ width, height }) {
  /** Container for the video and user controls */

  const areaCoverage = 0.9;

  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  // If dimensions are not provided as props,
  // dimensions are equal to the browser dimensions
  if (!width && !height) {
    width = windowWidth;
    height = windowHeight;
  }
  // If only width or only height is provided,
  // calculate the other from 9:16 aspect ratio
  if (width && !height) {
    height = width * VIDEO_PLAYER_ASPECT_RATIO;
  }
  if (!width && height) {
    width = height / VIDEO_PLAYER_ASPECT_RATIO;
  }
  // Width and height cannot exceed browser dimensions
  if (width > windowWidth) {
    width = windowWidth;
  }
  if (height > windowHeight) {
    height = windowHeight;
  }

  let playerWidth = areaCoverage * width;
  let playerHeight = playerWidth * VIDEO_PLAYER_ASPECT_RATIO;
  // If player is too tall or wide, resize the player box
  if (playerHeight > height) {
    playerHeight = areaCoverage * height;
    playerWidth = playerHeight / VIDEO_PLAYER_ASPECT_RATIO;
  } else if (playerWidth > MAX_VIDEO_PLAYER_WIDTH) {
    playerWidth = MAX_VIDEO_PLAYER_WIDTH;
    playerHeight = playerWidth * VIDEO_PLAYER_ASPECT_RATIO;
  }

  const spaceAbove = (height - playerHeight) / 2.0;

  const playerStyle = {
    width: `${playerWidth}px`,
    height: `${playerHeight}px`,
    marginTop: `${spaceAbove}px`,
  };
  return (
    <div className={styles.videoPlayer} style={{ ...playerStyle }}>
      This is video player box
    </div>
  );
}
