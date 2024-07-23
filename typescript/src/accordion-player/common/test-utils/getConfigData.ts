/**
 * Function to generate config test data
 * @param {object} param Parameters that are checked
 * @returns {string}
 */
function generateConfigData({
  backgroundColor = 'ff7a7c',
  framesPerSecond = 30,
  selectionStartInteraction = '0:00:05:05',
  selectionLoopTime = '0:00:17:29',
  selectionJumpTime = '0:00:06:01',
  endingLoopTime = '0:00:08:29',
  endingJumpTime = '0:00:06:00',
  endingHotSpotTime = '0:00:08:06',
} = {}) {
  const configData = `INTRO_INFO,INTRO_TITLE,Introduction Video,INTRO_VIDEO_URL,http://intro.mp4,FRAMES_PER_SECOND,${framesPerSecond},INTRO_POSTER_IMAGE,http://intro.png,VIDEOPLAYER_BACKGROUND_COLOR,${backgroundColor},,
      SELECT_INFO,SELECT_TITLE,Select Videos,SELECT_VIDEO_URL,http://select.mp4,START_INTERACTIVE_TIMESTAMP,${selectionStartInteraction},START_LOOP_TIMESTAMP,${selectionLoopTime},JUMPTO_LOOP_TIMESTAMP,${selectionJumpTime},SELECT_DIRECTION_TEXT,CHOOSE VIDEOS
      ENDSCREEN_INFO,ENDSCREEN_TITLE,Contact Us To Schedule a Meeting With One Of Our Sales Professionals,ENDSCREEN_VIDEO_URL,http://ending.mp4,START_LOOP_TIMESTAMP,${endingLoopTime},JUMPTO_LOOP_TIMESTAMP,${endingJumpTime},START_HOTSPOT_TIMESTAMP,${endingHotSpotTime},JUMPTO_URL,http://www.some-link.com
      SEGMENT_TITLES,Topic 1,Topic 2,Topic 3,Topic 4,,,,,,,,
      SEGMENT_VIDEO_URL_LONG,http://long-topic-1.mp4,http://long-topic-2.mp4,http://long-topic-3.mp4,http://long-topic-4.mp4,,,,,,,,
      SEGMENT_VIDEO_URL_SHORT,http://short-topic-1.mp4,http://short-topic-2.mp4,http://short-topic-3.mp4,http://short-topic-4.mp4,,,,,,,,`;

  return configData;
}

export default generateConfigData;
