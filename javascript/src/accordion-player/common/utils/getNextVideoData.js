/**
 * Determine next video in sequence
 *
 * @param {object} videoData Video data from CSV file
 * @param {string} currentLabel Label of current playing video
 * @param {array} userChoice User choice of videos
 * @returns {object} Name, label and URL of next video
 */
export default function getNextVideoData(videoData, currentLabel, userChoice) {
  let nextVideo = null;
  if (videoData !== null) {
    const videoIndex = videoData['videoSequence'].indexOf(currentLabel);
    if (videoIndex > -1 && videoIndex < videoData['videoSequence'].length - 1) {
      for (let i = videoIndex + 1; i < videoData['videoSequence'].length; i++) {
        const nextVideoLabel = videoData['videoSequence'][i];
        nextVideo = {};
        if (nextVideoLabel.includes('_')) {
          const videoLabelParts = nextVideoLabel.split('_');
          const choiceIndex = parseInt(videoLabelParts[1]);
          if (userChoice[choiceIndex] !== 'no') {
            if (videoLabelParts.length === 2) {
              const nextVideoUrl =
                userChoice[choiceIndex] === 'long'
                  ? videoData[videoLabelParts[0]][choiceIndex]['longVideoUrl']
                  : videoData[videoLabelParts[0]][choiceIndex]['shortVideoUrl'];
              const nextVideoName =
                videoData[videoLabelParts[0]][choiceIndex]['name'];
              nextVideo.label = nextVideoLabel;
              nextVideo.name = nextVideoName;
              nextVideo.url = nextVideoUrl;
            }
            break;
          }
        } else {
          nextVideo.label = nextVideoLabel;
          nextVideo.url = videoData[nextVideoLabel]['url'];
          nextVideo.name = videoData[nextVideoLabel]['title'];
          break;
        }
      }
    }
  }
  return nextVideo;
}
