import { useAppSelector, useAppDispatch } from '../../app/hooks';
import getScaledDimension from '../../common/utils/getScaledDimension';
import getFullscreenWidth from '../../common/utils/getFullscreenWidth';
import {
  CONTROL_BAR_HEIGHT_LARGE,
  CONTROL_BAR_HEIGHT_SMALL,
} from '../../common/constants';
import ProgressBar from '../progress-bar/progress-bar';
import {
  selectVideoWidth,
  selectIsMobile,
  selectIsFullScreen,
  setControlBarActive,
} from '../../app/videoReducer';
import LeftControls from '../left-controls/left-controls';
import RightControls from '../right-controls/right-controls';
import VideoTitleBar from '../video-title-bar/video-title-bar';
import styles from './control-bar.module.css';

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
  const dispatch = useAppDispatch();
  const videoWidth = useAppSelector(selectVideoWidth);
  const isFullscreen = useAppSelector(selectIsFullScreen);
  const isMobile = useAppSelector(selectIsMobile);

  const barHeight = getScaledDimension({
    smallDim: CONTROL_BAR_HEIGHT_SMALL,
    largeDim: CONTROL_BAR_HEIGHT_LARGE,
    videoWidth,
  });

  /**
   * Adjust the width of the control bar in fullscreen mode
   *
   * @param {object} barStyle Calculated height and width of control bar
   *
   * @returns {object} Modified height and width of control bar
   */
  const adjustControlBar = (barStyle) => {
    const adjustedWidth = getFullscreenWidth(isFullscreen, isMobile);
    if (adjustedWidth !== null) {
      return {
        ...barStyle,
        width: `${adjustedWidth}px`,
      }
    }
    return barStyle;
  };

  const controlBarStyle = {
    height: `${barHeight}px`,
    width: `${videoWidth}px`,
  };

  /**
   * Sets the control bar to be visible
   * when mouse is in or moving in it
   */
  const controlBarVisibilityHandler = () => {
    dispatch(setControlBarActive(true));
  };

  /**
   * Resets the active flag of the control bar
   */
  const mouseLeaveHander = () => {
    dispatch(setControlBarActive(false));
  };

  const newControlBarStyle = adjustControlBar(controlBarStyle);

  return (
    <div
      className={styles.ControlBar}
      style={newControlBarStyle}
      onMouseEnter={controlBarVisibilityHandler}
      onMouseMove={controlBarVisibilityHandler}
      onMouseLeave={mouseLeaveHander}
      data-testid='test-control-bar'
    >
      <ProgressBar />
      <LeftControls />
      <VideoTitleBar />
      <RightControls />
    </div>
  );
}
