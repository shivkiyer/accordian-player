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
import {
  selectVideoWidth,
  selectDuration,
  selectCurrentTime,
} from '../../app/videoReducer';

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
  const currentTime = useSelector(selectCurrentTime);
  const duration = useSelector(selectDuration);
  let progress = 0;

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

  if (duration > 0) {
    if (currentTime > 0) {
      progress = (100 * currentTime) / duration;
    }
  }

  return (
    <div
      className={styles.ProgressBar}
      style={{
        height: `${height}px`,
        marginLeft: `${margin}px`,
        marginRight: `${margin}px`,
        marginTop: `${positionFromTop - height}px`,
      }}
      data-testid='test-progress-bar'
    >
      <div
        className={styles.ProgressBarComplete}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
