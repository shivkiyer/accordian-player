import VolumeButton from './volume-button/volume-button';
import VolumeSlider from './volume-slider/volume-slider';
import styles from './volume-controls.module.scss';

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
  return (
    <>
      <VolumeButton />
      <div className={styles.VolumeControls}>
        <VolumeSlider />
      </div>
    </>
  );
}
