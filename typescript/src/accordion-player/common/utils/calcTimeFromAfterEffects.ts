/**
 * Convert time from after effects in hh:mm:ss:ff format to ms
 *
 * @param {string} timeSpec time in hh:mm:ss:ff
 * @param {number} framesPerSecond number of frames per second of video
 *
 * @returns {number} time in ms
 */
export default function calcTimeFromAfterEffects(
  timeSpec: string,
  framesPerSecond: number
) {
  var timeEls: string[] = timeSpec.trim().split(':');
  var playTime = 0;
  if (timeEls.length > 0) {
    playTime += (Number(timeEls[timeEls.length - 1]) * 1000) / framesPerSecond;
    for (var tIndex = 1; tIndex < timeEls.length; tIndex++) {
      playTime +=
        Number(timeEls[timeEls.length - tIndex - 1]) *
        Math.pow(60, tIndex - 1) *
        1000;
    }
  }
  return playTime;
}
