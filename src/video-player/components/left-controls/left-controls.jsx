import { useSelector } from 'react-redux';

import { selectVideoWidth } from '../../app/videoReducer';
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

export default function LeftControls() {
  const videoWidth = useSelector(selectVideoWidth);

  const isVideoPlaying = Math.random() > 0.5 ? true : false;

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
      {isVideoPlaying ? <PlayButton /> : <PauseButton />}
      <RewindButton />
      <VolumeControls />
    </div>
  );
}
