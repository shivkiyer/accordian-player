import VideoDataType from '../../models/video-data';

/**
 * Check if the video is ready for the ending action
 *
 * @param {number} currentTime
 * @param {string} videoLabel
 * @param {object} videoData
 * @returns {boolean}
 */
export default function checkForVideoEnding(
  currentTime: number,
  videoLabel: string | null,
  videoData: VideoDataType | null
): boolean {
  if (videoLabel !== 'endscreenInfo') {
    return false;
  }
  const hotSpotInstance: number = videoData?.endscreenInfo?.startHotSpot || -1;
  if (hotSpotInstance > 0 && currentTime >= hotSpotInstance / 1000) {
    return true;
  }
  return false;
}
