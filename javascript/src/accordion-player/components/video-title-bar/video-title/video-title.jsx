import styles from './video-title.module.css';

/**
 * Title of the video
 *
 * @param {string} title Video title
 * @param {number} width Width of video title container
 *
 * @returns {ReactNode} Container with the video title
 */
export default function VideoTitle({ title, width }) {
  const style = {
    maxWidth: `${width}px`,
  };

  return (
    <div
      data-testid='test-video-title'
      className={styles.VideoTitle}
      style={style}
    >
      {title}
    </div>
  );
}
