import { useSelector } from 'react-redux';

import FullScreenButton from './fullscreen-button/fullscreen-button';
import VideoSelectorBar from './video-selector-bar/video-selector-bar';
import styles from './right-controls.module.scss';
import {
  RIGHT_CONTROL_BTNS_RIGHT_MARGIN_LARGE,
  RIGHT_CONTROL_BTNS_RIGHT_MARGIN_SMALL,
} from '../../common/constants';
import getScaledDimension from '../../common/utils/getScaledDimension';
import {
  selectVideoWidth,
  selectCurrentVideoLabel,
} from '../../app/videoReducer';

/**
 * Container for right aligned control buttons
 * Along with full screen toggle, there will also be
 * video selector buttons
 *
 * @returns {ReactNode} A container with control buttons
 */
export default function RightControls() {
  const videoWidth = useSelector(selectVideoWidth);
  const currentVideoLabel = useSelector(selectCurrentVideoLabel);

  const rightMargin = getScaledDimension({
    smallDim: RIGHT_CONTROL_BTNS_RIGHT_MARGIN_SMALL,
    largeDim: RIGHT_CONTROL_BTNS_RIGHT_MARGIN_LARGE,
    videoWidth,
  });

  const style = {
    marginRight: `${rightMargin}px`,
  };

  const isVideoSelectorVisible = currentVideoLabel.includes('videoOptions');

  return (
    <div className={styles.RightControls} style={style}>
      {isVideoSelectorVisible && <VideoSelectorBar />}
      <FullScreenButton />
    </div>
  );
}
