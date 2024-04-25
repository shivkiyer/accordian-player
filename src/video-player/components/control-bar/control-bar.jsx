import { useSelector } from 'react-redux';

import styles from './control-bar.module.scss';
import getScaledDimension from '../../common/utils/getScaledDimension';
import {
  CONTROL_BAR_HEIGHT_LARGE,
  CONTROL_BAR_HEIGHT_SMALL,
} from '../../common/constants';
import ProgressBar from '../progress-bar/progress-bar';
import { selectVideoWidth } from '../../app/videoReducer';
import LeftControls from '../left-controls/left-controls';
import RightControls from '../right-controls/right-controls';
import VideoTitleBar from '../video-title-bar/video-title-bar';

/**
 * Produces a control bar at the bottom of the video player
 * This will contain video and audio controls, track info
 * and also video clip selection.
 *
 * @returns {ReactNode} A react element with dynamic height and full width
 *
 * @component
 * @example
 * <ControlBar />
 */
export default function ControlBar() {
  const videoWidth = useSelector(selectVideoWidth);

  const barHeight = getScaledDimension({
    smallDim: CONTROL_BAR_HEIGHT_SMALL,
    largeDim: CONTROL_BAR_HEIGHT_LARGE,
    videoWidth,
  });

  const controlBarStyle = {
    height: `${barHeight}px`,
  };

  return (
    <div
      className={styles.ControlBar}
      style={controlBarStyle}
      data-testid='test-control-bar'
    >
      <ProgressBar />
      <LeftControls />
      <VideoTitleBar />
      <RightControls />
    </div>
  );
}
