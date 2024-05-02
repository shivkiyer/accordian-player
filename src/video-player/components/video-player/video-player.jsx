import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useWindowDimensions from '../../hooks/useWindowDimensions';
import getVideoDimensions from '../../common/utils/getVideoDimensions';
import getScaledDimension from '../../common/utils/getScaledDimension';
import checkVideoUrl from '../../common/utils/checkVideoUrl';
import styles from './video-player.module.scss';
import ControlBar from '../control-bar/control-bar';
import PlayerConfig from '../player-config/player-config';
import Video from './video/video';
import {
  setDimensions,
  setIsVolumeChanging,
  setVideoUrl,
  setIsVideoPositionChanging,
  setVolumeMousePositionX,
  setProgressMousePositionX,
  playPauseVideo,
  selectVideoUrl,
  selectIsVolumeChanging,
  selectIsVideoPositionChanging,
  selectPrevIsPlaying,
} from '../../app/videoReducer';
import { CONFIG_TEXT_SMALL, CONFIG_TEXT_LARGE } from '../../common/constants';

/**
 * Container for the video and user controls that has either
 * a specified width or height, or scales according to the
 * browser window size. Will either take the video URL as an
 * input or will display a text input to the user to enter a URL.
 *
 * @param {number} width The width of the container (optional)
 * @param {number} height The height of the container (optional)
 * @param {string} url The URL of the video (optional)
 *
 * @returns {ReactNode} A react element with fixed height and width
 *
 * @component
 * @example
 * Use with only width to produce container of fixed width
 * <Video Player width="300" />
 *
 * @component
 * @example
 * Use with only height to produce container of fixed height
 * <Video Player height="300" />
 *
 * @component
 * @example
 * Use without any inputs to scale to browser window
 * <Video Player />
 *
 */
export default function VideoPlayer({ width, height, url }) {
  const dispatch = useDispatch();
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const videoUrl = useSelector(selectVideoUrl);
  const isVolumeChanging = useSelector(selectIsVolumeChanging);
  const isVideoPositionChanging = useSelector(selectIsVideoPositionChanging);
  const prevIsPlaying = useSelector(selectPrevIsPlaying);
  const [baseUrl, setBaseUrl] = useState(null);
  const [errMsg, setErrMsg] = useState(null);

  /**
   * If video player has an input URL,
   * this will be the only one used.
   * Otherwise, the user will be asked for the
   * URL in PlayerConfig and the input field
   * will disappear after user enters the URL.
   */
  useEffect(() => {
    const fetchUrl = async (urlSetting, urlInput) => {
      if (!urlSetting) {
        if (urlInput) {
          setBaseUrl(urlInput);
        } else {
          setBaseUrl(null);
        }
      } else {
        const urlResult = await checkVideoUrl(urlSetting);
        if (!urlResult) {
          setBaseUrl(urlSetting);
          dispatch(setVideoUrl(urlSetting));
        } else {
          setBaseUrl(null);
          setErrMsg(urlResult);
        }
      }
    };

    fetchUrl(url, videoUrl);
  }, [url, videoUrl, dispatch]);

  const { playerWidth, playerHeight, marginTop } = getVideoDimensions({
    width,
    height,
    maxWidth: windowWidth,
    maxHeight: windowHeight,
  });

  /**
   * Set dimensions of video
   */
  useEffect(() => {
    dispatch(setDimensions({ width: playerWidth, height: playerHeight }));
  }, [playerHeight, playerWidth, dispatch]);

  const playerStyle = {
    paddingTop: `${marginTop}px`,
    paddingLeft: `${(windowWidth - playerWidth) / 2}px`,
    paddingRight: `${(windowWidth - playerWidth) / 2}px`,
  };

  const textFont = getScaledDimension({
    smallDim: CONFIG_TEXT_SMALL,
    largeDim: CONFIG_TEXT_LARGE,
    videoWidth: playerWidth,
  });
  const textStyle = {
    paddingTop: `${playerHeight / 2 - textFont}px`,
    fontSize: `${textFont}px`,
  };

  /**
   * Release handler for when volume slider is being dragged
   * but mouse is outside volume slider element.
   */
  const mouseUpHandler = () => {
    if (isVolumeChanging) {
      dispatch(setIsVolumeChanging(false));
      dispatch(setVolumeMousePositionX(null));
    }
    if (isVideoPositionChanging) {
      dispatch(setIsVideoPositionChanging(false));
      dispatch(setProgressMousePositionX(null));
      if (prevIsPlaying) {
        dispatch(playPauseVideo('playing'));
      }
    }
  };

  const mouseMoveHandler = (event) => {
    if (isVideoPositionChanging) {
      dispatch(setProgressMousePositionX(event.clientX));
    }
    if (isVolumeChanging) {
      dispatch(setVolumeMousePositionX(event.clientX));
    }
  };

  return (
    <div
      className={styles.videoPlayer}
      style={playerStyle}
      onMouseUp={mouseUpHandler}
      onMouseMove={mouseMoveHandler}
    >
      {!(url || baseUrl) && !errMsg && <PlayerConfig />}
      {errMsg && (
        <p className='error' style={textStyle}>
          {errMsg}
        </p>
      )}
      {baseUrl && <Video />}
      {baseUrl && <ControlBar />}
    </div>
  );
}
