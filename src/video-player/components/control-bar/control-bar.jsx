import styles from './control-bar.module.scss';
import getScaledDimension from '../../common/utils/getScaledDimension';
import {
  CONTROL_BAR_HEIGHT_LARGE,
  CONTROL_BAR_HEIGHT_SMALL,
} from '../../common/constants';

/**
 * Produces a control bar at the bottom of the video player
 * This will contain video and audio controls, track info
 * and also video clip selection.
 *
 * @param {number} width The width of the video player
 * @param {number} height The height of the video player
 *
 * @returns {ReactNode} A react element with dynamic height and full width
 *
 * @component
 * @example
 * Use with width and height
 * <ControlBar width="300" height="250" />
 */
export default function ControlBar({ width: videoWidth, height: videoHeight }) {
  const barHeight = getScaledDimension({
    smallDim: CONTROL_BAR_HEIGHT_SMALL,
    largeDim: CONTROL_BAR_HEIGHT_LARGE,
    videoWidth,
  });

  const controlBarStyle = {
    height: `${barHeight}px`,
  };

  return <div className={styles.ControlBar} style={controlBarStyle}></div>;
}
