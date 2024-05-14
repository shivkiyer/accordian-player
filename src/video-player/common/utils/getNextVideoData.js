/**
 * Determine next video in sequence
 *
 * @param {object} videoData Video data from CSV file
 * @param {string} currentLabel Label of current playing video
 * @returns {object} Name, label and URL of next video
 */
export default function getNextVideoData(videoData, currentLabel) {
  let nextVideo = null;
  if (videoData !== null) {
    const videoIndex = videoData['videoSequence'].indexOf(currentLabel);
    if (videoIndex > -1 && videoIndex < videoData['videoSequence'].length - 1) {
      const nextVideoIndex = videoIndex + 1;
      const nextVideoLabel = videoData['videoSequence'][nextVideoIndex];
      nextVideo = {};
      nextVideo.label = nextVideoLabel;
      let nextVideoUrl = null;
      let nextVideoName = null;
      if (nextVideoLabel.includes('_')) {
        const videoLabelParts = nextVideoLabel.split('_');
        if (videoLabelParts.length === 2) {
          nextVideoUrl =
            videoData[videoLabelParts[0]][parseInt(videoLabelParts[1])][
              'longVideoUrl'
            ];
          nextVideoName =
            videoData[videoLabelParts[0]][parseInt(videoLabelParts[1])]['name'];
        }
      } else {
        nextVideoUrl = videoData[nextVideoLabel]['url'];
        nextVideoName = videoData[nextVideoLabel]['title'];
      }
      nextVideo.name = nextVideoName;
      nextVideo.url = nextVideoUrl;
    }
  }
  return nextVideo;
}
