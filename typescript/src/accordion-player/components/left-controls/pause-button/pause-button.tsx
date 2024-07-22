import { useAppDispatch } from '../../../app/hooks';
import pauseBtn from './../../../assets/images/pause.svg';
import {
  PAUSE_BTN_HEIGHT_LARGE,
  PAUSE_BTN_HEIGHT_SMALL,
  PAUSE_BTN_WIDTH_LARGE,
  PAUSE_BTN_WIDTH_SMALL,
} from '../../../common/constants';
import ControlButton from '../control-button/control-button';
import { playPauseVideo } from '../../../app/videoReducer';

/**
 * Pause control button
 *
 * @returns {ReactNode} Control button of type Pause
 *
 * @example
 * <PauseButton />
 *
 */
export default function PauseButton() {
  const dispatch = useAppDispatch();
  const pauseHandler = () => {
    dispatch(playPauseVideo());
  };

  return (
    <ControlButton
      btnHeightSmall={PAUSE_BTN_HEIGHT_SMALL}
      btnHeightLarge={PAUSE_BTN_HEIGHT_LARGE}
      btnWidthSmall={PAUSE_BTN_WIDTH_SMALL}
      btnWidthLarge={PAUSE_BTN_WIDTH_LARGE}
      btnImage={pauseBtn}
      btnAltText='pause'
      btnClickHandler={pauseHandler}
    />
  );
}
