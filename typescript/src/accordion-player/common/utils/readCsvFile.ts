import checkVideoPlayable from './checkVideoPlayable';
import calcTimeFromAfterEffects from './calcTimeFromAfterEffects';
import checkTimeInstant from './checkTimeInstant';
import VideoLinkType from '../../models/videoLink';
import { DEFAULT_FRAMES_PER_SECOND } from '../constants';

/**
 * Reads a config.csv file and produces the video specs
 *
 * @param {string} data - text content of csv file
 *
 * @return {object} Details of videos to be played in app
 */
export default async function readCsv(data: string): Promise<any> {
  const videoSpecs: any = {
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
        try {
          const verifyUrl: VideoLinkType = await checkVideoPlayable(lineContents[4].trim());
          videoSpecs['introVideo'] = {
            title: lineContents[2].trim(),
            url: verifyUrl.data,
            image: lineContents[8].trim(),
          };
          if (lineContents[6].trim().length > 0) {
            videoSpecs['framesPerSecond'] = parseInt(lineContents[6].trim());
            if (Number.isNaN(videoSpecs['framesPerSecond'])) {
              throw Object.assign(new Error(), {
                data: null,
                errMsg: 'Frames per second must be integer',
              });
            }
          } else {
            videoSpecs['framesPerSecond'] = DEFAULT_FRAMES_PER_SECOND;
          }
          if (lineContents[10].trim().length > 0) {
            let backGroundColor = lineContents[10].trim();
            if (backGroundColor[0] !== '#') {
              backGroundColor = '#' + backGroundColor;
            }
            if (!/^#[0-9A-F]{6}$/i.test(backGroundColor)) {
              throw Object.assign(new Error(), {
                data: null,
                errMsg: 'Background color is invalid',
              });
            }
            videoSpecs['backgroundColor'] = backGroundColor;
          }
        } catch (e: any) {
          if (e.errMsg === 'Video cannot be played') {
            throw Object.assign(new Error(), {
              data: null,
              errMsg: 'Introduction video cannot be played.',
            });
          }
          throw Object.assign(new Error(), e);
        }
        break;

      case 'SELECT_INFO':
        try {
          const verifyUrl = await checkVideoPlayable(lineContents[4].trim());
          if (lineContents[6].trim().length > 0) {
            try {
              startInteraction = calcTimeFromAfterEffects(
                checkTimeInstant(
                  lineContents[6].trim(),
                  videoSpecs['framesPerSecond']
                ),
                videoSpecs['framesPerSecond']
              );
            } catch (e: any) {
              throw Object.assign(new Error(), {
                data: null,
                errMsg: `START_INTERACTIVE_TIMESTAMP of selection video incorrect. ${e.errMsg}`,
              });
            }
          }
          if (lineContents[8].trim().length > 0) {
            try {
              startLoopback = calcTimeFromAfterEffects(
                checkTimeInstant(
                  lineContents[8].trim(),
                  videoSpecs['framesPerSecond']
                ),
                videoSpecs['framesPerSecond']
              );
            } catch (e: any) {
              throw Object.assign(new Error(), {
                data: null,
                errMsg: `START_LOOP_TIMESTAMP of selection video incorrect. ${e.errMsg}`,
              });
            }
          }
          if (lineContents[10].trim().length > 0) {
            try {
              jumpToTimestamp = calcTimeFromAfterEffects(
                checkTimeInstant(
                  lineContents[10].trim(),
                  videoSpecs['framesPerSecond']
                ),
                videoSpecs['framesPerSecond']
              );
            } catch (e: any) {
              throw Object.assign(new Error(), {
                data: null,
                errMsg: `JUMPTO_LOOP_TIMESTAMP of selection video incorrect. ${e.errMsg}`,
              });
            }
          }
          videoSpecs['selectInfo'] = {
            title: lineContents[2].trim(),
            url: verifyUrl.data,
            startInteraction: startInteraction,
            startLoopback: startLoopback,
            jumpToTimestamp: jumpToTimestamp,
            selectText: lineContents[12].trim(),
          };
        } catch (e: any) {
          if (e.errMsg === 'Video cannot be played') {
            throw Object.assign(new Error(), {
              data: null,
              errMsg: 'Selection video cannot be played.',
            });
          }
          throw Object.assign(new Error(), e);
        }
        break;

      case 'ENDSCREEN_INFO':
        try {
          const verifyUrl = await checkVideoPlayable(lineContents[4].trim());
          if (lineContents[6].trim().length > 0) {
            try {
              startLoopback = calcTimeFromAfterEffects(
                checkTimeInstant(
                  lineContents[6].trim(),
                  videoSpecs['framesPerSecond']
                ),
                videoSpecs['framesPerSecond']
              );
            } catch (e: any) {
              throw Object.assign(new Error(), {
                data: null,
                errMsg: `START_LOOP_TIMESTAMP of ending video incorrect. ${e.errMsg}`,
              });
            }
          }
          if (lineContents[8].trim().length > 0) {
            try {
              startLoopback = calcTimeFromAfterEffects(
                checkTimeInstant(
                  lineContents[8].trim(),
                  videoSpecs['framesPerSecond']
                ),
                videoSpecs['framesPerSecond']
              );
            } catch (e: any) {
              throw Object.assign(new Error(), {
                data: null,
                errMsg: `JUMPTO_LOOP_TIMESTAMP of ending video incorrect. ${e.errMsg}`,
              });
            }
          }
          if (lineContents[10].trim().length > 0) {
            try {
              startLoopback = calcTimeFromAfterEffects(
                checkTimeInstant(
                  lineContents[10].trim(),
                  videoSpecs['framesPerSecond']
                ),
                videoSpecs['framesPerSecond']
              );
            } catch (e: any) {
              throw Object.assign(new Error(), {
                data: null,
                errMsg: `START_HOTSPOT_TIMESTAMP of ending video incorrect. ${e.errMsg}`,
              });
            }
          }
          if (lineContents[12].trim().length > 0) {
            if (lineContents[12].trim().substring(0, 4) !== 'http') {
              jumpToUrl = 'http://' + lineContents[12].trim();
            } else {
              jumpToUrl = lineContents[12].trim();
            }
            try {
              new URL(jumpToUrl);
            } catch (e: any) {
              throw Object.assign(new Error(), {
                data: null,
                errMsg: 'Call to action URL in ending video not valid.',
              });
            }
          }
          videoSpecs['endscreenInfo'] = {
            title: lineContents[2].trim(),
            url: verifyUrl.data,
            startLoopback: startLoopback,
            jumpToTimestamp: jumpToTimestamp,
            startHotSpot: startHotSpot,
            jumpToUrl: jumpToUrl,
          };
        } catch (e: any) {
          if (e.errMsg === 'Video cannot be played') {
            throw Object.assign(new Error(), {
              data: null,
              errMsg: 'Ending video cannot be played.',
            });
          }
          throw Object.assign(new Error(), e);
        }
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
          try {
            const verifyUrl = await checkVideoPlayable(lineContents[j].trim());
            longVideos.push(verifyUrl.data);
          } catch (e: any) {
            throw Object.assign(new Error(), {
              data: null,
              errMsg: `Long video number ${j} not playable.`,
            });
          }
        }
        break;

      case 'SEGMENT_VIDEO_URL_SHORT':
        for (let j = 1; j < lineContents.length; j++) {
          if (lineContents[j].trim().length === 0) {
            break;
          }
          try {
            const verifyUrl = await checkVideoPlayable(lineContents[j].trim());
            shortVideos.push(verifyUrl.data);
          } catch (e: any) {
            throw Object.assign(new Error(), {
              data: null,
              errMsg: `Short video number ${j} not playable.`,
            });
          }
        }
        break;
      default:
    }
  }
  for (let i = 0; i < segmentTitles.length; i++) {
    videoSpecs['videoOptions'].push({
      name: segmentTitles[i],
      longVideoUrl: longVideos[i],
      shortVideoUrl: shortVideos[i],
    });
  }
  let videoSequence = [];
  if ('introVideo' in videoSpecs) {
    videoSequence.push('introVideo');
  }
  if ('selectInfo' in videoSpecs) {
    videoSequence.push('selectInfo');
  }
  if ('videoOptions' in videoSpecs) {
    for (let i = 0; i < videoSpecs['videoOptions'].length; i++) {
      videoSequence.push(`videoOptions_${i}`);
    }
  }
  if ('endscreenInfo' in videoSpecs) {
    videoSequence.push('endscreenInfo');
  }
  if (videoSequence.length > 1) {
    videoSpecs['videoSequence'] = videoSequence;
  }
  return videoSpecs;
}
