import {
  MAX_VIDEO_PLAYER_WIDTH,
  VIDEO_PLAYER_ASPECT_RATIO,
} from '../../common/constants';
import styles from './video-player.module.scss';

function VideoPlayer({ width, height }) {
  /** Container for the video and user controls */

  let playerWidth = 0.9 * width;
  let playerHeight = playerWidth * VIDEO_PLAYER_ASPECT_RATIO;
  if (playerHeight > height) {
    playerHeight = 0.9 * height;
    playerWidth = playerHeight / VIDEO_PLAYER_ASPECT_RATIO;
  } else if (playerWidth > MAX_VIDEO_PLAYER_WIDTH) {
    playerWidth = MAX_VIDEO_PLAYER_WIDTH;
    playerHeight = playerWidth * VIDEO_PLAYER_ASPECT_RATIO;
  }

  const spaceAbove = (height - playerHeight) / 2.0;

  const playerStyle = {
    width: playerWidth + 'px',
    height: playerHeight + 'px',
    marginTop: spaceAbove + 'px',
  };
  return (
    <div className={styles.videoPlayer} style={{ ...playerStyle }}>
      This is video player box
    </div>
  );
}

export default VideoPlayer;
