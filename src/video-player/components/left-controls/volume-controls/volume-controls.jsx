import VolumeButton from './volume-button/volume-button';
import VolumeSlider from './volume-slider/volume-slider';
import styles from './volume-controls.module.scss';

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
