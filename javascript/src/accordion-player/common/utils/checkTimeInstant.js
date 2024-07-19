/**
 * Checks the time instant in a configuration
 *
 * @param {string} timeSpec In the format HH:MM:SS:FF
 * @param {number} framesPerSecond
 * @returns
 */
export default function checkTimeInstant(timeSpec, framesPerSecond) {
  const timeEls = timeSpec.trim().split(':');
  if (timeEls.length < 4) {
    throw Object.assign(new Error(), {
      data: null,
      errMsg:
        'Invalid time format - use the HH:MM:SS:FF (Hour:Minute:Second:Frame) format.',
    });
  }
  const hours = parseInt(timeEls[0]);
  const minutes = parseInt(timeEls[1]);
  const seconds = parseInt(timeEls[2]);
  const frames = parseInt(timeEls[3]);
  if (
    Number.isNaN(hours) ||
    Number.isNaN(minutes) ||
    Number.isNaN(seconds) ||
    Number.isNaN(frames)
  ) {
    throw Object.assign(new Error(), {
      data: null,
      errMsg:
        'Invalid time format - parts of time instant HH:MM:SS:FF have to be integers.',
    });
  }

  if (hours < 0 || minutes < 0 || seconds < 0 || frames < 0) {
    throw Object.assign(new Error(), {
      data: null,
      errMsg:
        'Invalid time format - parts of time instant HH:MM:SS:FF cannot be negative.',
    });
  }

  if (minutes >= 60 || seconds >= 60) {
    throw Object.assign(new Error(), {
      data: null,
      errMsg:
        'Invalid time format - minutes and seconds in HH:MM:SS:FF cannot exceed 60.',
    });
  }

  if (frames >= framesPerSecond) {
    throw Object.assign(new Error(), {
      data: null,
      errMsg: `Invalid time format - frame in HH:MM:SS:FF must be less than ${framesPerSecond}.`,
    });
  }

  return timeSpec;
}
