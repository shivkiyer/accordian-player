import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectVideoUrl,
  selectIsPlaying,
  selectVolume,
  selectCurrentTime,
  selectIsVideoPositionChanging,
  selectBackgroundImageUrl,
  selectVideoData,
  selectCurrentVideoLabel,
  selectUserSelection,
  selectReadyForEnding,
  selectIsLoaded,
  selectRestartVideo,
  setCurrentTime,
  setDuration,
  playPauseVideo,
  setCurrentVideoLabel,
  setVideoUrl,
  setCurrentVideoName,
  setSelectPanelVisible,
  setReadyForEnding,
  setIsLoaded,
  setRestartVideo,
} from '../../../app/videoReducer';
import {
  loadVideo,
  playVideo,
  pauseVideo,
} from '../../../common/utils/videoActions';
import getNextVideoData from '../../../common/utils/getNextVideoData';
import getSelectPanelVisible from '../../../common/utils/getSelectPanelVisible';
import checkVideoLoops from '../../../common/utils/checkVideoLoops';
import checkForVideoAction from '../../../common/utils/checkForVideoAction';
import getActionUrl from '../../../common/utils/getActionUrl';
import styles from './video.module.css';

/**
 * The video element
 *
 * @returns {ReactNode} video element with controls
 *
 */
export default function Video({ mouseMoveHandler }) {
  const videoRef = useRef();
  const dispatch = useDispatch();
  const videoUrl = useSelector(selectVideoUrl);
  const isPlaying = useSelector(selectIsPlaying);
  const volumeLevel = useSelector(selectVolume);
  const currentTime = useSelector(selectCurrentTime);
  const backgroundImageUrl = useSelector(selectBackgroundImageUrl);
  const isVideoPositionChanging = useSelector(selectIsVideoPositionChanging);
  const videoData = useSelector(selectVideoData);
  const currentVideoLabel = useSelector(selectCurrentVideoLabel);
  const userSelection = useSelector(selectUserSelection);
  const isReadyForEnding = useSelector(selectReadyForEnding);
  const isLoaded = useSelector(selectIsLoaded);
  const restartVideo = useSelector(selectRestartVideo);

  /**
   * Handling pause/play from user control action
   */
  useEffect(() => {
    if (isPlaying && videoRef.current.paused) {
      playVideo(videoRef.current);
    } else if (!isPlaying && !videoRef.current.paused) {
      pauseVideo(videoRef.current);
    }
  }, [isPlaying]);

  /**
   * Handle the rewind button for single video playing
   */
  useEffect(() => {
    if (restartVideo && videoRef.current !== null) {
      videoRef.current.currentTime = 0;
      dispatch(setRestartVideo(false));
    }
  }, [restartVideo, dispatch]);

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
   * Displays user selection and action
   * items according to play time
   *
   * @param {object} event Time update event object
   */
  const timeUpdateHandler = (event) => {
    dispatch(setCurrentTime(event.target.currentTime));
    dispatch(setDuration(event.target.duration));
    const selectPanelVisibility = getSelectPanelVisible(
      event.target.currentTime,
      currentVideoLabel,
      videoData
    );
    dispatch(setSelectPanelVisible(selectPanelVisibility));
    const loopTime = checkVideoLoops(
      event.target.currentTime,
      currentVideoLabel,
      videoData
    );
    const isVideoEnding = checkForVideoAction(
      event.target.currentTime,
      currentVideoLabel,
      videoData
    );
    if (isVideoEnding) {
      dispatch(setReadyForEnding(true));
    }
    if (loopTime !== null) {
      videoRef.current.currentTime = loopTime;
    }
  };

  /**
   * Updates the video duration when video loads
   *
   * @param {object} event Video load event
   */
  const loadedDataHandler = (event) => {
    dispatch(setDuration(event.target.duration));
    if (isLoaded) {
      dispatch(playPauseVideo('playing'));
    }
  };

  /**
   * Play/pause video by clicking on the video
   */
  const clickHandler = () => {
    dispatch(setIsLoaded(true));
    const actionUrl = getActionUrl(isReadyForEnding, videoData);
    if (actionUrl !== null) {
      window.open(actionUrl);
    }
    dispatch(playPauseVideo());
  };

  /**
   * Video end handler
   * Plays next video in the sequence
   */
  const endHandler = () => {
    dispatch(playPauseVideo('paused'));
    pauseVideo(videoRef.current);
    if (currentVideoLabel !== null) {
      const nextVideoData = getNextVideoData(
        videoData,
        currentVideoLabel,
        userSelection
      );
      if (nextVideoData !== null) {
        dispatch(setCurrentVideoLabel(nextVideoData.label));
        dispatch(setVideoUrl(nextVideoData.url));
        dispatch(setCurrentVideoName(nextVideoData.name));
      }
    }
  };

  /**
   * Load new video when video Url changes
   */
  useEffect(() => {
    loadVideo(videoRef.current);
  }, [videoUrl]);

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
      onEnded={endHandler}
      onClick={clickHandler}
      onMouseMove={mouseMoveHandler}
      data-testid='test-video'
      poster={backgroundImageUrl}
    >
      <source src={videoUrl} type='video/mp4' />
      Your browser does not support the video tag.
    </video>
  );
}
