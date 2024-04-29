import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { selectVideoUrl, selectIsPlaying } from '../../../app/videoReducer';
import styles from './video.module.scss';

/**
 * The video element
 *
 * @returns {ReactNode} video element with controls
 *
 */
export default function Video() {
  const videoRef = useRef();
  const videoUrl = useSelector(selectVideoUrl);
  const isPlaying = useSelector(selectIsPlaying);

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

  return (
    <video
      nocontrols='true'
      muted={false}
      controlsList='nodownload'
      disablePictureInPicture={true}
      autoPlay={false}
      className={styles.Video}
      ref={videoRef}
    >
      <source src={videoUrl} type='video/mp4' />
      Your browser does not support the video tag.
    </video>
  );
}
