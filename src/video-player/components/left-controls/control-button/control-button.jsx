import { useSelector } from 'react-redux';

import {
  LEFT_BUTTONS_HEIGHT_LARGE,
  LEFT_BUTTONS_HEIGHT_SMALL,
  LEFT_BUTTONS_WIDTH_LARGE,
  LEFT_BUTTONS_WIDTH_SMALL,
  LEFT_BUTTON_LEFT_MARGIN_LARGE,
  LEFT_BUTTON_LEFT_MARGIN_SMALL,
} from '../../../common/constants';
import getScaledDimension from '../../../common/utils/getScaledDimension';
import { selectVideoWidth } from '../../../app/videoReducer';
import getButtonPlacement from '../../../common/utils/getButtonPlacement';

/**
 * A generic control button that is placed centrally
 * within the control bar below the progress slider
 * and horizontally within two unit squares
 *
 * @param {number} btnHeightSmall Height of button for 630px device width
 * @param {number} btnHeightLarge Height of button for 1920px device width
 * @param {number} btnWidthSmall Width of button for 630px device width
 * @param {number} btnWidthLarge Height of button for 1920px device width
 * @param {Object} btnImage SVG image of the button
 * @param {string} btnAltText Alt text for the button
 *
 * @returns {ReactNode} A control button
 *
 * @example
 * Play control button
 * <ControlButton
      btnHeightSmall={PLAY_BTN_HEIGHT_SMALL}
      btnHeightLarge={PLAY_BTN_HEIGHT_LARGE}
      btnWidthSmall={PLAY_BTN_WIDTH_SMALL}
      btnWidthLarge={PLAY_BTN_WIDTH_LARGE}
      btnImage={playBtn}
      btnAltText='play'
    />
 */
export default function ControlButton({
  btnHeightSmall,
  btnHeightLarge,
  btnWidthSmall,
  btnWidthLarge,
  btnImage,
  btnAltText,
}) {
  const videoWidth = useSelector(selectVideoWidth);

  const elHeight = getScaledDimension({
    smallDim: btnHeightSmall,
    largeDim: btnHeightLarge,
    videoWidth,
  });
  const elWidth = getScaledDimension({
    smallDim: btnWidthSmall,
    largeDim: btnWidthLarge,
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
    marginBottom: `${elMarginTop}px`,
    paddingLeft: `${elPaddingLeft}px`,
    paddingRight: `${elPaddingRight}px`,
  };

  return <img src={btnImage} alt={btnAltText} style={elStyle} />;
}
