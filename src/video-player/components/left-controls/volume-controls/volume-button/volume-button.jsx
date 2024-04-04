import volumeBtn from './../../../../assets/images/volume_icon.svg';
import {
  VOLUME_BTN_HEIGHT_LARGE,
  VOLUME_BTN_HEIGHT_SMALL,
  VOLUME_BTN_WIDTH_LARGE,
  VOLUME_BTN_WIDTH_SMALL,
} from './../../../../common/constants';
import ControlButton from './../../control-button/control-button';

export default function VolumeButton() {
  return (
    <ControlButton
      btnHeightSmall={VOLUME_BTN_HEIGHT_SMALL}
      btnHeightLarge={VOLUME_BTN_HEIGHT_LARGE}
      btnWidthSmall={VOLUME_BTN_WIDTH_SMALL}
      btnWidthLarge={VOLUME_BTN_WIDTH_LARGE}
      btnImage={volumeBtn}
      btnAltText='volume'
    />
  );
}
