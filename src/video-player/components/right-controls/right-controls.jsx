import { useSelector } from 'react-redux';

import FullScreenButton from './fullscreen-button/fullscreen-button';
import styles from './right-controls.module.scss';
import {
  RIGHT_CONTROL_BTNS_LEFT_MARGIN_LARGE,
  RIGHT_CONTROL_BTNS_LEFT_MARGIN_SMALL,
  RIGHT_CONTROL_BTNS_RIGHT_MARGIN_LARGE,
  RIGHT_CONTROL_BTNS_RIGHT_MARGIN_SMALL,
} from '../../common/constants';
import getScaledDimension from '../../common/utils/getScaledDimension';
import { selectVideoWidth } from '../../app/videoReducer';

/**
 * Container for right aligned control buttons
 * Along with full screen toggle, there will also be
 * video selector buttons
 *
 * @returns {ReactNode} A container with control buttons
 */
export default function RightControls() {
  const videoWidth = useSelector(selectVideoWidth);

  const leftMargin = getScaledDimension({
    smallDim: RIGHT_CONTROL_BTNS_LEFT_MARGIN_SMALL,
    largeDim: RIGHT_CONTROL_BTNS_LEFT_MARGIN_LARGE,
    videoWidth,
  });
  const rightMargin = getScaledDimension({
    smallDim: RIGHT_CONTROL_BTNS_RIGHT_MARGIN_SMALL,
    largeDim: RIGHT_CONTROL_BTNS_RIGHT_MARGIN_LARGE,
    videoWidth,
  });

  const style = {
    marginLeft: `${leftMargin}px`,
    marginRight: `${rightMargin}px`,
  };

  return (
    <div className={styles.RightControls} style={style}>
      <FullScreenButton />
    </div>
  );
}
