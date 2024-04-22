import { useSelector, useDispatch } from 'react-redux';

import styles from './player-config.module.scss';
import {
  selectVideoWidth,
  selectVideoHeight,
  setVideoUrl,
} from '../../app/videoReducer';
import getScaledDimension from '../../common/utils/getScaledDimension';
import {
  CONFIG_HEADING_LARGE,
  CONFIG_HEADING_SMALL,
  CONFIG_TEXT_LARGE,
  CONFIG_TEXT_SMALL,
} from '../../common/constants';

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

  const headingFont = getScaledDimension({
    smallDim: CONFIG_HEADING_SMALL,
    largeDim: CONFIG_HEADING_LARGE,
    videoWidth,
  });
  const headingStyle = {
    fontSize: `${headingFont}px`,
  };

  const textFont = getScaledDimension({
    smallDim: CONFIG_TEXT_SMALL,
    largeDim: CONFIG_TEXT_LARGE,
    videoWidth,
  });
  const textStyle = {
    fontSize: `${textFont}px`,
  };

  const inputWidth = 0.8 * videoWidth;
  const inputHeight = 0.4 * videoWidth;
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
      <h1 style={headingStyle}>Welcome to the Accordion Player</h1>
      <p style={textStyle}>
        To get started using the Accordion Player, copy/paste a URL in the field
        below. The URL can be that of a single video or of a folder with
        multiple videos. In the case of multiple videos, the folder must contain
        a configuration file named config.csv. To know more about how to create
        this configuration file, check out the documentation at the project
        homepage.
      </p>
      <input type='text' onChange={changeHandler} style={textStyle} />
    </div>
  );
}
