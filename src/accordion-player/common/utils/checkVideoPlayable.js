/**
 * Check if a url is of a playable video
 * @param {string} url
 *
 * @returns {Promise} Returns back the url if it can be played
 * or returns an error message
 */
export default function checkVideoPlayable(url) {
  const urlChecker = new Promise((resolve, reject) => {
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
        errMsg:
          'Unexpected error occurred. Please ensure that the resource can accept AJAX requests.',
        data: null,
      });
    });
  });

  return urlChecker;
}
