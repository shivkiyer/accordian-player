import { forwardRef } from 'react';
import { useSelector } from 'react-redux';

import getScaledDimension from '../../../common/utils/getScaledDimension';
import getVideoTime from '../../../common/utils/getVideoTime';
import {
  selectVideoWidth,
  selectCurrentTime,
  selectDuration,
} from '../../../app/videoReducer';
import {
  TIME_LEFT_MARGIN_LARGE,
  TIME_LEFT_MARGIN_SMALL,
} from '../../../common/constants';
import styles from './video-progress.module.scss';

/**
 * Time completed of video
 *
 * @param {object} ref Reference of this progress container
 *
 * @returns {ReactNode} Container with time of video
 *
 */
const VideoProgress = forwardRef((props, ref) => {
  const videoWidth = useSelector(selectVideoWidth);
  const currentTime = useSelector(selectCurrentTime);
  const duration = useSelector(selectDuration);
  const currentTimeText = getVideoTime(currentTime);
  const durationText = getVideoTime(duration);

  const leftMargin = getScaledDimension({
    smallDim: TIME_LEFT_MARGIN_SMALL,
    largeDim: TIME_LEFT_MARGIN_LARGE,
    videoWidth,
  });

  const style = {
    marginLeft: `${leftMargin}px`,
  };

  return (
    <div
      data-testid='test-video-progress'
      ref={ref}
      className={styles.TimeComplete}
      style={style}
    >
      {currentTimeText} / {durationText}
    </div>
  );
});

export default VideoProgress;
