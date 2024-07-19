import { useRef, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from './progress-bar.module.scss';
import {
  PROGRESS_BAR_HEIGHT_LARGE,
  PROGRESS_BAR_HEIGHT_SMALL,
  PROGRESS_BAR_MARGIN_SIDE_LARGE,
  PROGRESS_BAR_MARGIN_SIDE_SMALL,
  PROGRESS_BAR_CONTAINER_HEIGHT_LARGE,
  PROGRESS_BAR_CONTAINER_HEIGHT_SMALL,
} from '../../common/constants';
import getScaledDimension from '../../common/utils/getScaledDimension';
import getFullscreenWidth from '../../common/utils/getFullscreenWidth';
import {
  selectVideoWidth,
  selectDuration,
  selectCurrentTime,
  selectIsVideoPositionChanging,
  selectProgressMousePositionX,
  selectIsVolumeChanging,
  selectPrevIsPlaying,
  selectCurrentVideoLabel,
  selectIsFullScreen,
  selectIsMobile,
  playPauseVideo,
  setIsVideoPositionChanging,
  setCurrentTime,
} from '../../app/videoReducer';

/**
 * Progress slider bar
 *
 * @returns {ReactNode} A slider control bar for video play position
 *
 * <ProgressBar />
 *
 */
export default function ProgressBar() {
  const progressRef = useRef();
  const dispatch = useDispatch();
  const videoWidth = useSelector(selectVideoWidth);
  const currentTime = useSelector(selectCurrentTime);
  const duration = useSelector(selectDuration);
  const isVideoPositionChanging = useSelector(selectIsVideoPositionChanging);
  const isVolumeChanging = useSelector(selectIsVolumeChanging);
  const progressMousePositionX = useSelector(selectProgressMousePositionX);
  const prevIsPlaying = useSelector(selectPrevIsPlaying);
  const currentVideoLabel = useSelector(selectCurrentVideoLabel);
  const isFullscreen = useSelector(selectIsFullScreen);
  const isMobile = useSelector(selectIsMobile);

  const outerHeight = getScaledDimension({
    smallDim: PROGRESS_BAR_CONTAINER_HEIGHT_SMALL,
    largeDim: PROGRESS_BAR_CONTAINER_HEIGHT_LARGE,
    videoWidth,
  });

  const height = getScaledDimension({
    smallDim: PROGRESS_BAR_HEIGHT_SMALL,
    largeDim: PROGRESS_BAR_HEIGHT_LARGE,
    videoWidth,
  });

  const margin = getScaledDimension({
    smallDim: PROGRESS_BAR_MARGIN_SIDE_SMALL,
    largeDim: PROGRESS_BAR_MARGIN_SIDE_LARGE,
    videoWidth,
  });

  /**
   * Calculating the width of the progress bar
   *
   * @param {number} currentVideoTime currentTime of video
   * @param {number} videoDuration duration of video
   * @returns {number} Percentage width of progress bar between 0 and 100
   */
  const calcProgressWidth = (currentVideoTime, videoDuration) => {
    let videoProgress = 0;
    if (videoDuration > 0) {
      if (currentVideoTime > 0) {
        videoProgress = (100 * currentVideoTime) / videoDuration;
      }
    }
    return videoProgress;
  };

  /**
   * Calculate video position from mouse position on screen
   * @param {number} mousePosition X-coordinate of mouse position
   * @param {number} sideMargin Left and right margins of progress slider
   * @returns {number} Position in video between 0 and 1
   */
  const calculateVideoPosition = useCallback((mousePosition, sideMargin) => {
    const { x: xMin, width } = progressRef.current.getBoundingClientRect();
    let videoLocation = mousePosition - xMin - sideMargin;
    if (videoLocation < 0) {
      videoLocation = 0.01;
    }
    if (videoLocation > width - sideMargin) {
      videoLocation = width - sideMargin;
    }
    let videoPositon;
    if (width > 0) {
      videoPositon = videoLocation / (width - 2 * sideMargin);
    } else {
      videoPositon = null;
    }
    if (videoPositon > 1) {
      videoPositon = 1;
    }
    if (videoPositon < 0) {
      videoPositon = 0;
    }
    return videoPositon;
  }, []);

  /**
   * Convert mouse position on progress bar to video position
   *
   * @param {object} mouseEvent
   * @returns {number} Video position between 0 and 1
   */
  const detectPosition = (mouseEvent) => {
    const { clientX } = mouseEvent;
    return calculateVideoPosition(clientX, margin);
  };

  /**
   * Updates progress bar as video emits timeupdate events
   *
   * @param {object} event timeupdate event
   */
  const updateVideoTime = (event) => {
    const newPositon = detectPosition(event);
    const newTime = newPositon * duration;
    if (newPositon) {
      dispatch(setCurrentTime(newTime));
    }
  };

  /**
   * Update the current time from mouse movement on the screen
   */
  useEffect(() => {
    if (!isVolumeChanging) {
      if (progressMousePositionX) {
        const videoPosition = calculateVideoPosition(
          progressMousePositionX,
          margin
        );
        const newTime = videoPosition * duration;
        if (newTime) {
          dispatch(setCurrentTime(newTime));
        }
      }
    }
  }, [
    progressMousePositionX,
    margin,
    duration,
    isVolumeChanging,
    calculateVideoPosition,
    dispatch,
  ]);

  /**
   * Starts tracking video position when mouse is
   * pressed in progress bar element
   *
   * @param {object} event
   */
  const mouseDownHandler = (event) => {
    dispatch(playPauseVideo('paused'));
    dispatch(setIsVideoPositionChanging(true));
    updateVideoTime(event);
  };

  /**
   * Tracks video position change as mouse is moved
   * in progress bar element
   *
   * @param {object} event
   */
  const mouseMoveHandler = (event) => {
    if (isVideoPositionChanging) {
      updateVideoTime(event);
    }
  };

  /**
   * Ends video position change when mouse button
   * is released in progress bar.
   */
  const mouseUpHandler = () => {
    dispatch(setIsVideoPositionChanging(false));
    if (prevIsPlaying) {
      dispatch(playPauseVideo('playing'));
    }
  };

  const isSelectVideo = currentVideoLabel === 'selectInfo';

  /**
   * Adjust width of progress slider in mobile fullscreen mode
   *
   * @param {object} sliderStyle Calculated style of slider
   * @param {object} sliderMargin Side margins from control bar
   * @returns {object} Recalculated style of sidebar
   */
  const adjustedProgressBar = (sliderStyle, sliderMargin) => {
    const adjustedWidth = getFullscreenWidth(isFullscreen, isMobile);

    if (adjustedWidth !== null) {
      return {
        ...sliderStyle,
        width: `${adjustedWidth - 2 * sliderMargin}px`,
      };
    }
    return sliderStyle;
  };

  const progressSliderStyle = {
    height: `${height}px`,
    marginLeft: `${margin}px`,
    marginRight: `${margin}px`,
    width: `${videoWidth - 2 * margin}px`,
  };

  return (
    <div
      className={styles.ProgressBarContainer}
      ref={progressRef}
      onMouseDown={mouseDownHandler}
      onMouseMove={mouseMoveHandler}
      onMouseUp={mouseUpHandler}
      style={{
        height: `${height}px`,
        paddingTop: `${outerHeight - height}px`,
        visibility: isSelectVideo ? 'hidden' : 'visible',
      }}
    >
      <div
        className={styles.ProgressBar}
        style={adjustedProgressBar(progressSliderStyle, margin)}
        data-testid='test-progress-bar'
      >
        <div
          className={styles.ProgressBarComplete}
          style={{ width: `${calcProgressWidth(currentTime, duration)}%` }}
        ></div>
      </div>
    </div>
  );
}
