import { useSelector, useDispatch } from 'react-redux';

import ControlButton from '../../left-controls/control-button/control-button';
import fullScreenBtn from '../../../assets/images/full_screen_icon.svg';
import smallScreenBtn from '../../../assets/images/small_screen_icon.svg';
import { selectIsFullScreen, toggleFullScreen } from '../../../app/videoReducer';

import {
  FULLSCREEN_BTN_WIDTH_LARGE,
  FULLSCREEN_BTN_WIDTH_SMALL,
  FULLSCREEN_BTN_HEIGHT_LARGE,
  FULLSCREEN_BTN_HEIGHT_SMALL,
} from '../../../common/constants';

export default function FullScreenButton() {
  const isFullScreen = useSelector(selectIsFullScreen);
  const dispatch = useDispatch();

  const clickHandler = () => {
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
