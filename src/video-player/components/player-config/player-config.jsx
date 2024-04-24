import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from './player-config.module.scss';
import {
  selectVideoWidth,
  selectVideoHeight,
  setVideoUrl,
} from '../../app/videoReducer';
import getScaledDimension from '../../common/utils/getScaledDimension';
import checkVideoUrl from '../../common/utils/checkVideoUrl';
import {
  CONFIG_HEADING_LARGE,
  CONFIG_HEADING_SMALL,
  CONFIG_TEXT_LARGE,
  CONFIG_TEXT_SMALL,
} from '../../common/constants';
import LoaderSpinner from '../../common/components/loader-spinner/loader-spinner';

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
  const [isCheckingUrl, setIsCheckingUrl] = useState(false);
  const [errMsg, setErrMsg] = useState(null);

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
  const inputHeight = 0.9 * videoHeight;
  const inputTop = (videoHeight - inputHeight) / 2;
  const inputLeft = 0.1 * videoWidth;

  const style = {
    width: `${inputWidth}px`,
    top: `${inputTop}px`,
    left: `${inputLeft}px`,
    height: `${inputHeight}px`,
  };

  const changeHandler = async (event) => {
    setIsCheckingUrl(true);
    const url = event.target.value;

    const urlResult = await checkVideoUrl(url);
    if (!urlResult) {
      dispatch(setVideoUrl(url));
    } else {
      setErrMsg(urlResult);
    }
    setIsCheckingUrl(false);
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
      <input
        type='text'
        onChange={changeHandler}
        style={textStyle}
        placeholder='Enter URL here'
      />

      {errMsg && (
        <p className='error' style={textStyle}>
          {errMsg}
        </p>
      )}
      {isCheckingUrl && <LoaderSpinner />}
    </div>
  );
}
