/**
 * Return the URL for the user to continue after video
 *
 * @param {boolean} isReady
 * @param {object} videoData Video data from config file
 * @returns {string} URL
 */
export default function getActionUrl(isReady, videoData) {
  if (isReady) {
    return videoData['endscreenInfo']['jumpToUrl'];
  }
  return null;
}
