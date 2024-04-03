import { useSelector } from 'react-redux';

import playBtn from './../../../assets/images/play.svg';
import {
  LEFT_BUTTONS_HEIGHT_LARGE,
  LEFT_BUTTONS_HEIGHT_SMALL,
  LEFT_BUTTONS_WIDTH_LARGE,
  LEFT_BUTTONS_WIDTH_SMALL,
  LEFT_BUTTON_LEFT_MARGIN_LARGE,
  LEFT_BUTTON_LEFT_MARGIN_SMALL,
  PLAY_BTN_HEIGHT_LARGE,
  PLAY_BTN_HEIGHT_SMALL,
  PLAY_BTN_WIDTH_LARGE,
  PLAY_BTN_WIDTH_SMALL,
} from '../../../common/constants';
import getScaledDimension from '../../../common/utils/getScaledDimension';
import { selectVideoWidth } from '../../../app/videoReducer';
import getButtonPlacement from '../../../common/utils/getButtonPlacement';

export default function PlayButton() {
  const videoWidth = useSelector(selectVideoWidth);

  const elHeight = getScaledDimension({
    smallDim: PLAY_BTN_HEIGHT_SMALL,
    largeDim: PLAY_BTN_HEIGHT_LARGE,
    videoWidth,
  });
  const elWidth = getScaledDimension({
    smallDim: PLAY_BTN_WIDTH_SMALL,
    largeDim: PLAY_BTN_WIDTH_LARGE,
    videoWidth,
  });
  const elMarginLeft = getScaledDimension({
    smallDim: LEFT_BUTTON_LEFT_MARGIN_SMALL,
    largeDim: LEFT_BUTTON_LEFT_MARGIN_LARGE,
    videoWidth,
  });
  const elVerticalSpace = getScaledDimension({
    smallDim: LEFT_BUTTONS_HEIGHT_SMALL,
    largeDim: LEFT_BUTTONS_HEIGHT_LARGE,
    videoWidth,
  });
  const elHorizontalSpace = getScaledDimension({
    smallDim: LEFT_BUTTONS_WIDTH_SMALL,
    largeDim: LEFT_BUTTONS_WIDTH_LARGE,
    videoWidth,
  });
  const {
    marginTop: elMarginTop,
    paddingLeft: elPaddingLeft,
    paddingRight: elPaddingRight,
  } = getButtonPlacement({
    height: elHeight,
    width: elWidth,
    verticalSpace: elVerticalSpace,
    horizontalSpace: elHorizontalSpace,
  });

  const elStyle = {
    height: `${elHeight}px`,
    width: `${elWidth}px`,
    marginLeft: `${elMarginLeft}px`,
    marginTop: `${elMarginTop}px`,
    paddingLeft: `${elPaddingLeft}px`,
    paddingRight: `${elPaddingRight}px`,
  };

  return <img src={playBtn} alt='play' style={elStyle} />;
}
