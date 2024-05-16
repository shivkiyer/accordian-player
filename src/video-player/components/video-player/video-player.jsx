import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useWindowDimensions from '../../hooks/useWindowDimensions';
import getVideoDimensions from '../../common/utils/getVideoDimensions';
import getScaledDimension from '../../common/utils/getScaledDimension';
import checkVideoUrl from '../../common/utils/checkVideoUrl';
import styles from './video-player.module.scss';
import ControlBar from '../control-bar/control-bar';
import PlayerConfig from '../player-config/player-config';
import Video from './video/video';
import SelectionPanel from '../selection-panel/selection-panel';
import {
  setDimensions,
  setIsVolumeChanging,
  setVideoUrl,
  setIsVideoPositionChanging,
  setVolumeMousePositionX,
  setProgressMousePositionX,
  setControlBarVisible,
  toggleFullScreen,
  setIsButtonFullScreen,
  playPauseVideo,
  setCurrentVideoLabel,
  setBackgroundImageUrl,
  setCurrentVideoName,
  setVideoData,
  selectVideoUrl,
  selectIsControlBarVisible,
  selectIsControlBarActive,
  selectIsVolumeChanging,
  selectIsVideoPositionChanging,
  selectPrevIsPlaying,
  selectIsFullScreen,
  selectIsBtnFullScreen,
  selectIsSelectPanelVisible,
} from '../../app/videoReducer';
import { goFullscreen, exitFullscreen } from '../../common/utils/videoActions';
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
  const playerRef = useRef();
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const videoUrl = useSelector(selectVideoUrl);
  const isControlBarVisible = useSelector(selectIsControlBarVisible);
  const isControlBarActive = useSelector(selectIsControlBarActive);
  const isVolumeChanging = useSelector(selectIsVolumeChanging);
  const isVideoPositionChanging = useSelector(selectIsVideoPositionChanging);
  const prevIsPlaying = useSelector(selectPrevIsPlaying);
  const isFullscreen = useSelector(selectIsFullScreen);
  const isBtnFullScreen = useSelector(selectIsBtnFullScreen);
  const isSelectPanelVisible = useSelector(selectIsSelectPanelVisible);
  const [baseUrl, setBaseUrl] = useState(null);
  const [errMsg, setErrMsg] = useState(null);
  const [mouseMoveTimerEnd1, setMouseMoveTimerEnd1] = useState(false);
  const [mouseMoveTimerEnd2, setMouseMoveTimerEnd2] = useState(true);

  /**
   * Video player will play the dynamic videoUrl
   * if it is updated, or will try to fetch data
   * from the input URL.
   */
  useEffect(() => {
    const fetchUrl = async (urlSetting, urlInput) => {
      if (urlInput) {
        setBaseUrl(urlInput);
      } else if (urlSetting) {
        try {
          const urlResult = await checkVideoUrl(urlSetting);
          if (urlResult.errMsg === null) {
            if (typeof urlResult.data === 'string') {
              dispatch(setVideoUrl(urlResult.data));
              setBaseUrl(urlResult.data);
            } else {
              const videoData = urlResult.data;
              dispatch(setCurrentVideoLabel(videoData['videoSequence'][0]));
              dispatch(
                setVideoUrl(videoData[videoData['videoSequence'][0]]['url'])
              );
              setBaseUrl(videoData[videoData['videoSequence'][0]]['url']);
              dispatch(
                setBackgroundImageUrl(
                  videoData[videoData['videoSequence'][0]]['image']
                )
              );
              dispatch(
                setCurrentVideoName(
                  videoData[videoData['videoSequence'][0]]['title']
                )
              );
              dispatch(setVideoData(videoData));
            }
          }
        } catch (e) {
          setErrMsg(e.errMsg);
        }
      } else {
        setBaseUrl(null);
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

  const fullScreenStyle = {
    width: window.screen.width,
    height: window.screen.height,
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
   * Setting display of control bar when user moves mouse
   * Sets timers that roll over when mouse is moving
   */
  const controlBarVisibilityHandler = () => {
    if (!mouseMoveTimerEnd1) {
      dispatch(setControlBarVisible(true));
      setTimeout(() => {
        setMouseMoveTimerEnd1(true);
      }, 4000);
    } else if (!mouseMoveTimerEnd2) {
      dispatch(setControlBarVisible(true));
      setTimeout(() => {
        setMouseMoveTimerEnd2(true);
      }, 4000);
    }
  };

  /**
   * Hides control bar when both timers end
   */
  useEffect(() => {
    if (mouseMoveTimerEnd1 && mouseMoveTimerEnd2) {
      dispatch(setControlBarVisible(false));
      setMouseMoveTimerEnd1(false);
      setMouseMoveTimerEnd2(false);
    }
  }, [mouseMoveTimerEnd1, mouseMoveTimerEnd2, dispatch]);

  /**
   * Release handler for when volume slider
   * or progress bar is being dragged
   * but mouse is outside the elements.
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

  /**
   * When mouse is moving, if volume or video
   * position is changing, mouse position is recorded.
   *
   * @param {object} event Mouse move event
   */
  const mouseMoveHandler = (event) => {
    if (isVideoPositionChanging) {
      dispatch(setProgressMousePositionX(event.clientX));
    }
    if (isVolumeChanging) {
      dispatch(setVolumeMousePositionX(event.clientX));
    }
  };

  /**
   * Fullscreen toggler - user click on fullscreen button
   */
  useEffect(() => {
    if (isFullscreen) {
      goFullscreen(playerRef.current)
        .then(() => {
          dispatch(
            setDimensions({
              width: window.screen.width,
              height: window.screen.height,
            })
          );
        })
        .catch((e) => {
          console.log(e);
        });
    } else if (isBtnFullScreen) {
      exitFullscreen(document)
        .then(() => {
          dispatch(setDimensions({ width: playerWidth, height: playerHeight }));
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [isFullscreen, isBtnFullScreen, playerWidth, playerHeight, dispatch]);

  /**
   * Fullscreen toggler when user presses Escape
   *
   * @param {object} event fullscreenchange event object
   */
  const exitFullscreenHandler = (event) => {
    if (document.fullscreenElement === null) {
      dispatch(setIsButtonFullScreen(false));
      dispatch(toggleFullScreen(false));
      dispatch(setDimensions({ width: playerWidth, height: playerHeight }));
    }
  };
  document.addEventListener('fullscreenchange', exitFullscreenHandler, false);
  document.addEventListener(
    'mozfullscreenchange',
    exitFullscreenHandler,
    false
  );
  document.addEventListener('MSFullscreenChange', exitFullscreenHandler, false);
  document.addEventListener(
    'webkitfullscreenchange',
    exitFullscreenHandler,
    false
  );

  return (
    <div
      className={styles.videoPlayer}
      style={isFullscreen ? fullScreenStyle : playerStyle}
      onMouseUp={mouseUpHandler}
      onMouseMove={mouseMoveHandler}
      ref={playerRef}
    >
      {!(url || baseUrl) && !errMsg && <PlayerConfig />}
      {errMsg && (
        <p className='error' style={textStyle}>
          {errMsg}
        </p>
      )}
      {isSelectPanelVisible && <SelectionPanel />}
      {baseUrl && <Video mouseMoveHandler={controlBarVisibilityHandler} />}
      {baseUrl && (isControlBarVisible || isControlBarActive) && <ControlBar />}
    </div>
  );
}
