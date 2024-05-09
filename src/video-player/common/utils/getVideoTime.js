/**
 * Convert time in seconds to MM:SS format
 *
 * @param {number} rawTimeSeconds Time in seconds
 *
 * @returns string Time in MM:SS format
 *
 */
export default function getVideoTime(rawTimeSeconds) {
  if (rawTimeSeconds) {
    const date = new Date();
    date.setSeconds(rawTimeSeconds);
    date.setMinutes(0);
    date.setHours(0);

    return date.toISOString().substring(15, 19);
  } else {
    return 0;
  }
}
