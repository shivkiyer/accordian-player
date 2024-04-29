import { useSelector } from 'react-redux';

import { selectVideoUrl } from '../../../app/videoReducer';
import styles from './video.module.scss';

export default function Video() {
  const videoUrl = useSelector(selectVideoUrl);

  return (
    <video
      nocontrols='true'
      muted={false}
      controlsList='nodownload'
      disablePictureInPicture={true}
      autoPlay={true}
      className={styles.Video}
    >
      <source src={videoUrl} type='video/mp4' />
      Your browser does not support the video tag.
    </video>
  );
}
