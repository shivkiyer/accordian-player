import rewindBtn from './../../../assets/images/rewind.svg';
import {
  REWIND_BTN_HEIGHT_LARGE,
  REWIND_BTN_HEIGHT_SMALL,
  REWIND_BTN_WIDTH_LARGE,
  REWIND_BTN_WIDTH_SMALL,
} from '../../../common/constants';
import ControlButton from '../control-button/control-button';

export default function RewindButton() {
  return (
    <ControlButton
      btnHeightSmall={REWIND_BTN_HEIGHT_SMALL}
      btnHeightLarge={REWIND_BTN_HEIGHT_LARGE}
      btnWidthSmall={REWIND_BTN_WIDTH_SMALL}
      btnWidthLarge={REWIND_BTN_WIDTH_LARGE}
      btnImage={rewindBtn}
      btnAltText='rewind'
    />
  );
}
