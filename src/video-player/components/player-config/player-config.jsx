import { useSelector, useDispatch } from 'react-redux';

import styles from './player-config.module.scss';
import {
  selectVideoWidth,
  selectVideoHeight,
  setVideoUrl,
} from '../../app/videoReducer';

/**
 * Configuring the video player with a base URL
 *
 * @returns {ReactNode} A component with an input field that accepts a URL
 *
 */
export default function PlayerConfig() {
  const dispatch = useDispatch();
  const videoWidth = useSelector(selectVideoWidth);
  const videoHeight = useSelector(selectVideoHeight);

  const inputWidth = 0.8 * videoWidth;
  const inputHeight = videoWidth / 3;
  const inputTop = (videoHeight - inputHeight) / 2;
  const inputLeft = 0.1 * videoWidth;

  const style = {
    width: `${inputWidth}px`,
    top: `${inputTop}px`,
    left: `${inputLeft}px`,
    height: `${inputHeight}px`,
  };

  const changeHandler = (event) => {
    dispatch(setVideoUrl(event.target.value));
  };

  return (
    <div className={styles.PlayerConfig} style={style}>
      <p>
        To get started using the Accordion Player, copy/paste a URL in the field
        below. The URL can be that of a single video or of a folder with
        multiple videos. In the case of multiple videos, the folder must contain
        a configuration file named config.csv. To know more about how to create
        this configuration file, check out the documentation at the project
        homepage.
      </p>
      <input type='text' onChange={changeHandler} />
    </div>
  );
}
