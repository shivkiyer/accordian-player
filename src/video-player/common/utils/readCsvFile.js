import calcTimeFromAfterEffects from './calcTimeFromAfterEffects';

/**
 * Reads a config.csv file and produces the video specs
 *
 * @param {string} data - text content of csv file
 *
 * @return {object} Details of videos to be played in app
 */
export default function readCsv(data) {
  const videoSpecs = {
    videoOptions: [],
  };
  const segmentTitles = [];
  const longVideos = [];
  const shortVideos = [];

  let startLoopback = 0;
  let startInteraction;
  let jumpToTimestamp = 0;
  let startHotSpot = 0;
  let jumpToUrl;

  const allTextLines = data.split(/\r\n|\n/);
  for (let i = 0; i < allTextLines.length; i++) {
    const lineContents = allTextLines[i].split(',');
    switch (lineContents[0].trim()) {
      case 'INTRO_INFO':
        videoSpecs['introVideo'] = {
          title: lineContents[2].trim(),
          url: lineContents[4].trim(),
          image: lineContents[8].trim(),
        };
        if (lineContents[6].trim().length > 0) {
          videoSpecs['framesPerSecond'] = +lineContents[6].trim();
        } else {
          videoSpecs['framesPerSecond'] = 30;
        }
        if (lineContents[10].trim().length > 0) {
          let backGroundColor = lineContents[10].trim();
          if (backGroundColor[0] !== '#') {
            backGroundColor = '#' + backGroundColor;
          }
          videoSpecs['backgroundColor'] = backGroundColor;
        }
        break;

      case 'SELECT_INFO':
        if (lineContents[6].trim().length > 0) {
          startInteraction = calcTimeFromAfterEffects(
            lineContents[6].trim(),
            videoSpecs['framesPerSecond']
          );
        }
        if (lineContents[8].trim().length > 0) {
          startLoopback = calcTimeFromAfterEffects(
            lineContents[8].trim(),
            videoSpecs['framesPerSecond']
          );
        }
        if (lineContents[10].trim().length > 0) {
          jumpToTimestamp = calcTimeFromAfterEffects(
            lineContents[10].trim(),
            videoSpecs['framesPerSecond']
          );
        }
        videoSpecs['selectInfo'] = {
          title: lineContents[2].trim(),
          url: lineContents[4].trim(),
          startInteraction: startInteraction,
          startLoopback: startLoopback,
          jumpToTimestamp: jumpToTimestamp,
          selectText: lineContents[12].trim(),
        };
        break;

      case 'ENDSCREEN_INFO':
        if (lineContents[6].trim().length > 0) {
          startLoopback = calcTimeFromAfterEffects(
            lineContents[6].trim(),
            videoSpecs['framesPerSecond']
          );
        }
        if (lineContents[8].trim().length > 0) {
          jumpToTimestamp = calcTimeFromAfterEffects(
            lineContents[8].trim(),
            videoSpecs['framesPerSecond']
          );
        }
        if (lineContents[10].trim().length > 0) {
          startHotSpot = calcTimeFromAfterEffects(
            lineContents[10].trim(),
            videoSpecs['framesPerSecond']
          );
        }
        if (lineContents[12].trim().length > 0) {
          if (lineContents[12].trim().substring(0, 4) !== 'http') {
            jumpToUrl = 'http://' + lineContents[12].trim();
          } else {
            jumpToUrl = lineContents[12].trim();
          }
        }
        videoSpecs['endscreenInfo'] = {
          title: lineContents[2].trim(),
          url: lineContents[4].trim(),
          startLoopback: startLoopback,
          jumpToTimestamp: jumpToTimestamp,
          startHotSpot: startHotSpot,
          jumpToUrl: jumpToUrl,
        };
        break;

      case 'SEGMENT_TITLES':
        for (let j = 1; j < lineContents.length; j++) {
          if (lineContents[j].trim().length === 0) {
            break;
          }
          segmentTitles.push(lineContents[j].trim());
        }
        break;

      case 'SEGMENT_VIDEO_URL_LONG':
        for (let j = 1; j < lineContents.length; j++) {
          if (lineContents[j].trim().length === 0) {
            break;
          }
          longVideos.push(lineContents[j].trim());
        }
        break;

      case 'SEGMENT_VIDEO_URL_SHORT':
        for (let j = 1; j < lineContents.length; j++) {
          if (lineContents[j].trim().length === 0) {
            break;
          }
          shortVideos.push(lineContents[j].trim());
        }
        break;
    }
  }
  for (let i = 0; i < segmentTitles.length; i++) {
    videoSpecs['videoOptions'].push({
      name: segmentTitles[i],
      longVideoUrl: longVideos[i],
      shortVideoUrl: shortVideos[i],
    });
  }
  return videoSpecs;
}
