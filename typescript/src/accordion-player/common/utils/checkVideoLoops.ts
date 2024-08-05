import VideoDataType from '../../models/video-data';

/**
 * Check if a video should loop
 *
 * @param {number} currentTime Current position of video
 * @param {string} videoLabel The type of video being played
 * @param {object} videoData Video data from config file
 * @returns {number} Time in seconds to which video position should jump
 */
export default function checkVideoLoops(
  currentTime: number,
  videoLabel: string | null,
  videoData: VideoDataType | null
): number | null {
  if (videoLabel === 'selectInfo' || videoLabel === 'endscreenInfo') {
    if (videoData !== null) {
      const clipData = videoData[videoLabel];
      const startLoopBackTime: number = clipData?.startLoopback || -1;
      let jumpToTime: number | null = null;
      if (clipData?.jumpToTimestamp !== undefined) {
        jumpToTime = clipData?.jumpToTimestamp / 1000;
      }
      if (startLoopBackTime > 0 && currentTime >= startLoopBackTime / 1000) {
        return jumpToTime;
      }
    }
  }
  return null;
}
