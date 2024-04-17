import { forwardRef } from 'react';
import { useSelector } from 'react-redux';

import getScaledDimension from '../../../common/utils/getScaledDimension';
import { selectVideoWidth } from '../../../app/videoReducer';
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

  const leftMargin = getScaledDimension({
    smallDim: TIME_LEFT_MARGIN_SMALL,
    largeDim: TIME_LEFT_MARGIN_LARGE,
    videoWidth,
  });

  const style = {
    marginLeft: `${leftMargin}px`,
  };

  return (
    <div ref={ref} className={styles.TimeComplete} style={style}>
      0:07 / 2:32
    </div>
  );
});

export default VideoProgress;
