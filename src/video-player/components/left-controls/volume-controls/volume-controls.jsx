import { useSelector, useDispatch } from 'react-redux';

import VolumeButton from './volume-button/volume-button';
import VolumeSlider from './volume-slider/volume-slider';
import styles from './volume-controls.module.scss';
import { selectIsVolumeSliderVisible } from '../../../app/videoReducer';
import { setVolumeSlider } from '../../../app/videoReducer';

/**
 * Volume controls containing the volume icon
 * and the volume adjustment slider
 *
 * @returns {ReactNode} Parent element with volume icon and volume slider
 *
 * @example
 * <VolumeControls />
 *
 */
export default function VolumeControls() {
  const isVolumeSliderVisible = useSelector(selectIsVolumeSliderVisible);
  const dispatch = useDispatch();

  const showVolumeSlider = () => {
    dispatch(setVolumeSlider(true));
  };

  const hideVolumeSlider = () => {
    dispatch(setVolumeSlider(false));
  };

  return (
    <div
      style={{ display: 'inline-block' }}
      onMouseEnter={showVolumeSlider}
      onMouseLeave={hideVolumeSlider}
    >
      <VolumeButton />
      <div className={styles.VolumeControls}>
        {isVolumeSliderVisible && <VolumeSlider />}
      </div>
    </div>
  );
}
