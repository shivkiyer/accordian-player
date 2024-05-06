import { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectVideoUrl,
  selectIsPlaying,
  selectVolume,
  selectCurrentTime,
  selectIsVideoPositionChanging,
  setCurrentTime,
  setDuration,
  playPauseVideo,
  setControlBarVisible,
} from '../../../app/videoReducer';
import styles from './video.module.scss';

/**
 * The video element
 *
 * @returns {ReactNode} video element with controls
 *
 */
export default function Video() {
  const videoRef = useRef();
  const dispatch = useDispatch();
  const videoUrl = useSelector(selectVideoUrl);
  const isPlaying = useSelector(selectIsPlaying);
  const volumeLevel = useSelector(selectVolume);
  const currentTime = useSelector(selectCurrentTime);
  const isVideoPositionChanging = useSelector(selectIsVideoPositionChanging);
  const [isMouseMoving, setMouseMoving] = useState(false);
  const [mouseMoveTimer, setMouseMoveTimer] = useState(null);

  /**
   * Handling pause/play from user control action
   */
  useEffect(() => {
    if (isPlaying && videoRef.current.paused) {
      videoRef.current.play();
    } else if (!isPlaying && !videoRef.current.paused) {
      videoRef.current.pause();
    }
  }, [isPlaying]);

  /**
   * Changing volume of video from user control action
   */
  useEffect(() => {
    videoRef.current.volume = volumeLevel;
  }, [volumeLevel]);

  /**
   * Changing video position from user action on progress bar
   */
  useEffect(() => {
    if (isVideoPositionChanging) {
      videoRef.current.currentTime = currentTime;
    }
  }, [isVideoPositionChanging, dispatch, currentTime]);

  /**
   * Updates progress bar on video
   *
   * @param {object} event Time update event object
   */
  const timeUpdateHandler = (event) => {
    dispatch(setCurrentTime(event.target.currentTime));
    dispatch(setDuration(event.target.duration));
  };

  /**
   * Updates the video duration when video loads
   *
   * @param {object} event Video load event
   */
  const loadedDataHandler = (event) => {
    dispatch(setDuration(event.target.duration));
  };

  /**
   * Play/pause video by clicking on the video
   */
  const clickHandler = () => {
    dispatch(playPauseVideo());
  };

  /**
   * Sets isMouseMoving flag when mouse moves inside video
   */
  const mouseMoveHandler = () => {
    setMouseMoving(true);
    dispatch(setControlBarVisible(true));
    clearTimeout(mouseMoveTimer);
    setMouseMoveTimer(
      setTimeout(() => {
        setMouseMoving(false);
      }, 3000)
    );
  };

  /**
   * Starts 3s timer after displaying control bar after
   * which all mouse event flags are reset to false
   */
  useEffect(() => {
    if (!isMouseMoving) {
      clearTimeout(mouseMoveTimer);
      dispatch(setControlBarVisible(false));
    }
  }, [isMouseMoving, mouseMoveTimer, dispatch]);

  return (
    <video
      nocontrols='true'
      muted={false}
      controlsList='nodownload'
      disablePictureInPicture={true}
      autoPlay={false}
      className={styles.Video}
      ref={videoRef}
      onTimeUpdate={timeUpdateHandler}
      onLoadedData={loadedDataHandler}
      onClick={clickHandler}
      onMouseMove={mouseMoveHandler}
    >
      <source src={videoUrl} type='video/mp4' />
      Your browser does not support the video tag.
    </video>
  );
}
