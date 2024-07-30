import VideoDataType from '../../models/video-data';

/**
 * Return the URL for the user to continue after video
 *
 * @param {boolean} isReady
 * @param {object} videoData Video data from config file
 * @returns {string} URL
 */
export default function getActionUrl(
  isReady: boolean,
  videoData: VideoDataType | null
): string | null {
  let actionUrl: string | null;
  if (isReady) {
    actionUrl = videoData?.endscreenInfo?.jumpToUrl || null;
    return actionUrl;
  }
  return null;
}
