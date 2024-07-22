import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import ControlButton from '../../left-controls/control-button/control-button';
import fullScreenBtn from '../../../assets/images/full_screen_icon.svg';
import smallScreenBtn from '../../../assets/images/small_screen_icon.svg';
import {
  selectIsFullScreen,
  toggleFullScreen,
  setIsButtonFullScreen,
} from '../../../app/videoReducer';

import {
  FULLSCREEN_BTN_WIDTH_LARGE,
  FULLSCREEN_BTN_WIDTH_SMALL,
  FULLSCREEN_BTN_HEIGHT_LARGE,
  FULLSCREEN_BTN_HEIGHT_SMALL,
} from '../../../common/constants';

/**
 * Button to enter and exit fullscreen mode
 *
 * @returns {ReactNode} Control button to toggle video full screen mode
 */
export default function FullScreenButton() {
  const isFullScreen = useAppSelector(selectIsFullScreen);
  const dispatch = useAppDispatch();

  /**
   * Switch between fullscreen and normal mode
   * when full screen button is clicked.
   */
  const clickHandler = () => {
    dispatch(setIsButtonFullScreen(true));
    dispatch(toggleFullScreen());
  };

  return (
    <ControlButton
      btnHeightSmall={FULLSCREEN_BTN_HEIGHT_SMALL}
      btnHeightLarge={FULLSCREEN_BTN_HEIGHT_LARGE}
      btnWidthSmall={FULLSCREEN_BTN_WIDTH_SMALL}
      btnWidthLarge={FULLSCREEN_BTN_WIDTH_LARGE}
      btnImage={isFullScreen ? smallScreenBtn : fullScreenBtn}
      btnAltText='fullscreen'
      btnClickHandler={clickHandler}
    />
  );
}
