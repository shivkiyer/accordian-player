/**
 * Determines if the panel for selecting videos
 * should be displayed.
 *
 * @param {number} currentTime Current position of video
 * @param {string} videoLabel The type of video being played
 * @param {object} videoData Video data from config file
 * @returns {boolean}
 */
export default function getSelectPanelVisible(
    currentTime: number,
    videoLabel: string | null,
    videoData: any
  ): boolean {
    if (videoLabel === 'selectInfo') {
      if (currentTime > videoData['selectInfo']['startInteraction'] / 1000) {
        return true;
      }
    }
    return false;
  }
  