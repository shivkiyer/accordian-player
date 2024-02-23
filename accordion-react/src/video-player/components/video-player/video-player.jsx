import useWindowDimensions from '../../hooks/useWindowDimensions';
import getVideoDimensions from '../../common/utils/getVideoDimensions';
import styles from './video-player.module.scss';

/** Container for the video and user controls */
export default function VideoPlayer({ width, height }) {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  const { playerWidth, playerHeight, marginTop } = getVideoDimensions(
    width,
    height,
    windowWidth,
    windowHeight
  );

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
