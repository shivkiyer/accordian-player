import { useRef, useState, useEffect, useCallback } from 'react';
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
import {
  selectVideoWidth,
  selectDuration,
  selectCurrentTime,
  selectIsVideoPositionChanging,
  selectMousePositionX,
  selectIsVolumeChanging,
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
  const mousePositionX = useSelector(selectMousePositionX);
  const [progress, setProgress] = useState(0);

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
   * Calculate and set new progress bar width when
   * currentTime or duration of video changes
   */
  useEffect(() => {
    setProgress(calcProgressWidth(currentTime, duration));
  }, [currentTime, duration]);

  /**
   * Calculate video position from mouse position on screen
   * @param {number} mousePosition X-coordinate of mouse position
   * @returns
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
      const videoPosition = calculateVideoPosition(mousePositionX, margin);
      const newTime = videoPosition * duration;
      if (newTime) {
        dispatch(setCurrentTime(newTime));
      }
    }
  }, [
    mousePositionX,
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
      }}
    >
      <div
        className={styles.ProgressBar}
        style={{
          height: `${height}px`,
          marginLeft: `${margin}px`,
          marginRight: `${margin}px`,
          width: `${videoWidth - 2 * margin}px`,
        }}
        data-testid='test-progress-bar'
      >
        <div
          className={styles.ProgressBarComplete}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}
