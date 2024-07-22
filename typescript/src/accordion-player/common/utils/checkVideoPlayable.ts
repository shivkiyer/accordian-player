import VideoLinkType from '../../models/videoLink';

/**
 * Check if a url is of a playable video
 * @param {string} url
 *
 * @returns {Promise} Returns back the url if it can be played
 * or returns an error message
 */
export default function checkVideoPlayable(
  url: string
): Promise<VideoLinkType> {
  const urlChecker = new Promise<VideoLinkType>((resolve, reject) => {
    const checkForVideo = document.createElement('video');
    checkForVideo.setAttribute('src', url);
    checkForVideo.addEventListener('canplay', function () {
      resolve({
        errMsg: null,
        data: url,
      });
    });
    checkForVideo.addEventListener('error', function () {
      reject({
        errMsg: 'Video cannot be played',
        data: null,
      });
    });
  });

  return urlChecker;
}
