import { useSelector } from 'react-redux';

import {
  selectVideoWidth,
  selectUserSelection,
} from '../../../app/videoReducer';
import {
  VIDEO_BTN_HEIGHT_LARGE,
  VIDEO_BTN_HEIGHT_SMALL,
  LONG_VIDEO_WIDTH_LARGE,
  LONG_VIDEO_WIDTH_SMALL,
  SHORT_VIDEO_WIDTH_LARGE,
  SHORT_VIDEO_WIDTH_SMALL,
  LEFT_BUTTONS_HEIGHT_LARGE,
  LEFT_BUTTONS_HEIGHT_SMALL,
  VIDEO_BTN_MARGIN_LARGE,
  VIDEO_BTN_MARGIN_SMALL,
} from '../../../common/constants';
import getScaledDimension from '../../../common/utils/getScaledDimension';
import longClipBtn from './../../../assets/images/full_film_icon.svg';
import shortClipBtn from './../../../assets/images/half_film_icon.svg';
import styles from './video-selector-bar.module.scss';

/**
 * Selector with film icons for choosing video options
 *
 * @returns {ReactNode} Container with icons
 */
export default function VideoSelectorBar() {
  const videoWidth = useSelector(selectVideoWidth);
  const userSelection = useSelector(selectUserSelection);

  const btnHeight = getScaledDimension({
    smallDim: VIDEO_BTN_HEIGHT_SMALL,
    largeDim: VIDEO_BTN_HEIGHT_LARGE,
    videoWidth,
  });

  const btnMargin = getScaledDimension({
    smallDim: VIDEO_BTN_MARGIN_SMALL,
    largeDim: VIDEO_BTN_MARGIN_LARGE,
    videoWidth,
  });

  const longBtnWidth = getScaledDimension({
    smallDim: LONG_VIDEO_WIDTH_SMALL,
    largeDim: LONG_VIDEO_WIDTH_LARGE,
    videoWidth,
  });

  const shortBtnWidth = getScaledDimension({
    smallDim: SHORT_VIDEO_WIDTH_SMALL,
    largeDim: SHORT_VIDEO_WIDTH_LARGE,
    videoWidth,
  });

  const btnContainerHeight = getScaledDimension({
    smallDim: LEFT_BUTTONS_HEIGHT_SMALL,
    largeDim: LEFT_BUTTONS_HEIGHT_LARGE,
    videoWidth,
  });

  const videoSelectorStyle = {
    paddingLeft: `${btnMargin}px`,
  };

  const btnStyle = {
    height: `${btnHeight}px`,
    paddingTop: `${(btnContainerHeight - btnHeight) / 2}px`,
    paddingBottom: `${(btnContainerHeight - btnHeight) / 2}px`,
    paddingRight: `${btnMargin}px`,
  };

  const longBtnStyle = {
    ...btnStyle,
    width: `${longBtnWidth}px`,
  };

  const shortBtnStyle = {
    ...btnStyle,
    width: `${shortBtnWidth}px`,
  };

  const buttonList = userSelection.map((item, index) => {
    switch (item) {
      case 'long':
        return (
          <img
            src={longClipBtn}
            alt='long-icon'
            key={index}
            style={longBtnStyle}
          />
        );
      case 'short':
        return (
          <img
            src={shortClipBtn}
            alt='short-icon'
            key={index}
            style={shortBtnStyle}
          />
        );
      default:
        return null;
    }
  });

  return (
    <div className={styles.VideoSelectorBar} style={videoSelectorStyle}>
      {buttonList}
    </div>
  );
}
