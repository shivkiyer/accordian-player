import readCsv from './readCsvFile';
import checkVideoPlayable from './checkVideoPlayable';

/**
 * Checks if a URL can be fetched by making a HEAD request
 *
 * @param {string} urlInput URL
 *
 * @returns {string or null} If URL is valid, null is returned or error string is returned
 *
 */
const checkVideoUrl = async (urlInput) => {
  let url;
  try {
    url = new URL(urlInput);
  } catch (e) {
    return {
      errMsg: 'Please enter (copy/paste) a valid URL',
      data: null,
    };
  }
  if (url) {
    try {
      const result = await fetch(url, { method: 'GET' });
      if (result && result.headers) {
        if (result.headers.get('content-type') === 'text/plain') {
          if (result.ok) {
            const csvText = await result.text();
            const videoSpecs = readCsv(csvText);
            return {
              errMsg: null,
              data: videoSpecs,
            };
          }
        } else if (result.headers.get('content-type') === 'video/mp4') {
          return {
            errMsg: null,
            data: urlInput,
          };
        }
      }
      if (!result.ok) {
        return {
          errMsg:
            'Link entered was not accessible. Please ensure it opens in a browser window.',
          data: null,
        };
      }
    } catch (e) {
      const playStatus = await checkVideoPlayable(urlInput);
      return playStatus;
    }
  }
};

export default checkVideoUrl;
