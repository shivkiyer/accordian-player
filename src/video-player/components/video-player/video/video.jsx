import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectVideoUrl,
  selectIsPlaying,
  selectVolume,
  setCurrentTime,
  setDuration,
  playPauseVideo,
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
   * Updates progress bar on video
   *
   * @param {object} event Time update event object
   */
  const timeUpdateHandler = (event) => {
    dispatch(setCurrentTime(event.target.currentTime));
    dispatch(setDuration(event.target.duration));
  };

  /**
   * Play/pause video by clicking on the video
   */
  const clickHandler = () => {
    dispatch(playPauseVideo());
  };

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
      onClick={clickHandler}
    >
      <source src={videoUrl} type='video/mp4' />
      Your browser does not support the video tag.
    </video>
  );
}
