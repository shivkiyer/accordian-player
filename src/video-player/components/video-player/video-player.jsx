import { useDispatch } from 'react-redux';

import useWindowDimensions from '../../hooks/useWindowDimensions';
import getVideoDimensions from '../../common/utils/getVideoDimensions';
import styles from './video-player.module.scss';
import ControlBar from '../control-bar/control-bar';
import { setDimensions } from '../../app/videoReducer';

/**
 * Container for the video and user controls that has either
 * a specified width or height, or scales according to the
 * browser window size.
 *
 * @param {number} width The width of the container (optional)
 * @param {number} height The height of the container (optional)
 * @returns {ReactNode} A react element with fixed height and width
 *
 * @component
 * @example
 * Use with only width to produce container of fixed width
 * <Video Player width="300" />
 *
 * @component
 * @example
 * Use with only height to produce container of fixed height
 * <Video Player height="300" />
 *
 * @component
 * @example
 * Use without any inputs to scale to browser window
 * <Video Player />
 *
 */
export default function VideoPlayer({ width, height }) {
  const dispatch = useDispatch();
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  const { playerWidth, playerHeight, marginTop } = getVideoDimensions({
    width,
    height,
    maxWidth: windowWidth,
    maxHeight: windowHeight,
  });

  dispatch(setDimensions({ width: playerWidth, height: playerHeight }));

  const playerStyle = {
    width: `${playerWidth}px`,
    height: `${playerHeight}px`,
    marginTop: `${marginTop}px`,
  };
  return (
    <div className={styles.videoPlayer} style={playerStyle}>
      This is video player box
      <ControlBar />
    </div>
  );
}
