import { useSelector } from 'react-redux';

import { selectIsPlaying, selectVideoWidth } from '../../app/videoReducer';
import getScaledDimension from '../../common/utils/getScaledDimension';
import {
  LEFT_BUTTONS_HEIGHT_LARGE,
  LEFT_BUTTONS_HEIGHT_SMALL,
  LEFT_BUTTONS_LEFT_MARGIN_LARGE,
  LEFT_BUTTONS_LEFT_MARGIN_SMALL,
} from '../../common/constants';
import styles from './left-controls.module.scss';
import PlayButton from './play-button/play-button';
import PauseButton from './pause-button/pause-button';
import RewindButton from './rewind-button/rewind-button';
import VolumeControls from './volume-controls/volume-controls';

/**
 * A container for the left control buttons -
 * Play/pause button, rewind button and volume controls
 *
 * @returns {ReactNode} A parent element for the three control buttons
 *
 * @example
 * <LeftControls />
 *
 */
export default function LeftControls() {
  const videoWidth = useSelector(selectVideoWidth);
  const isVideoPlaying = useSelector(selectIsPlaying);

  const elHeight = getScaledDimension({
    smallDim: LEFT_BUTTONS_HEIGHT_SMALL,
    largeDim: LEFT_BUTTONS_HEIGHT_LARGE,
    videoWidth,
  });
  const elLeftMargin = getScaledDimension({
    smallDim: LEFT_BUTTONS_LEFT_MARGIN_SMALL,
    largeDim: LEFT_BUTTONS_LEFT_MARGIN_LARGE,
    videoWidth,
  });

  const elStyle = {
    height: `${elHeight}px`,
    marginLeft: `${elLeftMargin}px`,
  };

  return (
    <div className={styles.LeftButtons} style={elStyle}>
      {isVideoPlaying ? <PauseButton /> : <PlayButton />}
      <RewindButton />
      <VolumeControls />
    </div>
  );
}
