import useWindowDimensions from '../../hooks/useWindowDimensions';
import getVideoDimensions from '../../common/utils/getVideoDimensions';
import styles from './video-player.module.scss';

/**
 * Container for the video and user controls that has either
 * a specified width or height, or scales according to the
 * browser window size.
 *
 * @param {number} width The width of the container (optional)
 * @param {number} height The height of the container (optional)
 * @returns {ReactNode} A react element with fixed height and width
 *
 */
export default function VideoPlayer({ width, height }) {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  const { playerWidth, playerHeight, marginTop } = getVideoDimensions({
    width,
    height,
    maxWidth: windowWidth,
    maxHeight: windowHeight,
  });

  const playerStyle = {
    width: `${playerWidth}px`,
    height: `${playerHeight}px`,
    marginTop: `${marginTop}px`,
  };
  return (
    <div className={styles.videoPlayer} style={{ ...playerStyle }}>
      This is video player box
    </div>
  );
}
