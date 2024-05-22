/**
 * Check if a video should loop
 *
 * @param {number} currentTime Current position of video
 * @param {string} videoLabel The type of video being played
 * @param {object} videoData Video data from config file
 * @returns {number} Time in seconds to which video position should jump
 */
export default function checkVideoLoops(currentTime, videoLabel, videoData) {
  if (videoLabel === 'selectInfo' || videoLabel === 'endscreenInfo') {
    if (currentTime >= videoData[videoLabel]['startLoopback'] / 1000) {
      return videoData[videoLabel]['jumpToTimestamp'] / 1000;
    }
  }
  return null;
}
