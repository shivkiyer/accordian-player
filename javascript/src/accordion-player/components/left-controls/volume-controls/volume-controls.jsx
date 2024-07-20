import { useSelector, useDispatch } from 'react-redux';

import VolumeButton from './volume-button/volume-button';
import VolumeSlider from './volume-slider/volume-slider';
import styles from './volume-controls.module.css';
import {
  selectIsVolumeChanging,
  selectIsVolumeMuted,
  selectIsVolumeSliderVisible,
  selectIsVideoPositionChanging,
} from '../../../app/videoReducer';
import { setVolumeSlider, toggleVolumeMute } from '../../../app/videoReducer';

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
  const isVolumeMuted = useSelector(selectIsVolumeMuted);
  const isVolumeChanging = useSelector(selectIsVolumeChanging);
  const isVideoPositionChanging = useSelector(selectIsVideoPositionChanging);
  const dispatch = useDispatch();

  /**
   * Displays volume slider when mouse hovers
   * over volume button.
   */
  const showVolumeSlider = () => {
    if (!isVideoPositionChanging) {
      dispatch(setVolumeSlider(true));
    }
  };

  /**
   * Hides volume slider when mouse leaves
   * the volume button.
   */
  const hideVolumeSlider = () => {
    if (!isVolumeChanging) {
      dispatch(setVolumeSlider(false));
    }
  };

  /**
   * Mutes volume when volume button is clicked.
   */
  const toggleMute = () => {
    dispatch(toggleVolumeMute());
  };

  return (
    <div
      style={{ display: 'inline-block' }}
      onMouseEnter={showVolumeSlider}
      onMouseLeave={hideVolumeSlider}
    >
      <VolumeButton isMute={isVolumeMuted} clickHandler={toggleMute} />
      <div className={styles.VolumeControls}>
        {isVolumeSliderVisible && <VolumeSlider />}
      </div>
    </div>
  );
}
