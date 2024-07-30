import readCsv from './readCsvFile';
import checkVideoPlayable from './checkVideoPlayable';
import fetchUrl from './fetchUrl';
import VideoDataType from '../../models/video-data';
import HttpResponseType from '../../models/http-response';

/**
 * Checks if a URL can be fetched by making a HEAD request
 *
 * @param {string} urlInput URL
 *
 * @returns {Promise} Video data or video URL is returned, or error message
 *
 */
const checkVideoUrl = (urlInput: string): Promise<HttpResponseType> => {
  const result: Promise<HttpResponseType> = new Promise(
    async (resolve, reject) => {
      let url;
      try {
        url = new URL(urlInput);
      } catch (e) {
        reject({
          errMsg: 'Please enter (copy/paste) a valid URL',
          data: null,
        });
      }
      if (url) {
        try {
          const result = await fetchUrl(url);
          if (result && result.headers) {
            if (result.headers.get('content-type') === 'text/plain') {
              if (result.ok) {
                const csvText = await result.text();
                try {
                  const videoSpecs = await readCsv(csvText);
                  resolve({
                    errMsg: null,
                    data: videoSpecs,
                  });
                } catch (e) {
                  reject(e);
                }
              }
            } else if (result.headers.get('content-type') === 'video/mp4') {
              resolve({
                errMsg: null,
                data: urlInput,
              });
            }
          }
          if (!result.ok) {
            reject({
              errMsg:
                'Link entered was not accessible. Please ensure it opens in a browser window.',
              data: null,
            });
          }
        } catch (e) {
          try {
            const playStatus = await checkVideoPlayable(urlInput);
            resolve(playStatus);
          } catch (urlErr) {
            reject({
              errMsg:
                'Unexpected error occurred. Please ensure that the resource can accept AJAX requests.',
              data: null,
            });
          }
        }
      }
    }
  );

  return result;
};

export default checkVideoUrl;
