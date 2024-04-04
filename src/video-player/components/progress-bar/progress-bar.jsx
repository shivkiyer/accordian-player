import { useSelector } from 'react-redux';

import styles from './progress-bar.module.scss';
import {
  PROGRESS_BAR_HEIGHT_LARGE,
  PROGRESS_BAR_HEIGHT_SMALL,
  PROGRESS_BAR_POSITION_LARGE,
  PROGRESS_BAR_POSITION_SMALL,
  PROGRESS_BAR_MARGIN_SIDE_LARGE,
  PROGRESS_BAR_MARGIN_SIDE_SMALL,
} from '../../common/constants';
import getScaledDimension from '../../common/utils/getScaledDimension';
import { selectVideoWidth } from '../../app/videoReducer';

/**
 * Progress slider bar
 *
 * @returns {ReactNode} A slider control bar for video play position
 *
 * <ProgressBar />
 *
 */
export default function ProgressBar() {
  const videoWidth = useSelector(selectVideoWidth);

  const height = getScaledDimension({
    smallDim: PROGRESS_BAR_HEIGHT_SMALL,
    largeDim: PROGRESS_BAR_HEIGHT_LARGE,
    videoWidth,
  });
  const positionFromTop = getScaledDimension({
    smallDim: PROGRESS_BAR_POSITION_SMALL,
    largeDim: PROGRESS_BAR_POSITION_LARGE,
    videoWidth,
  });
  const margin = getScaledDimension({
    smallDim: PROGRESS_BAR_MARGIN_SIDE_SMALL,
    largeDim: PROGRESS_BAR_MARGIN_SIDE_LARGE,
    videoWidth,
  });

  return (
    <div
      className={styles.ProgressBar}
      style={{
        height: `${height}px`,
        marginLeft: `${margin}px`,
        marginRight: `${margin}px`,
        marginTop: `${positionFromTop - height}px`,
      }}
    >
      <div
        className={styles.ProgressBarComplete}
        style={{ width: '50%' }}
      ></div>
    </div>
  );
}
