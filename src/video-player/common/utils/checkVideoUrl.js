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
    return 'Please enter (copy/paste) a valid URL';
  }
  if (url) {
    try {
      const result = await fetch(url, { method: 'GET' });
      if (result.ok) {
        return null;
      } else {
        return 'Link entered was not accessible. Please ensure it opens in a browser window.';
      }
    } catch (e) {
      return 'Unexpected error occurred. Please ensure that the resource can accept AJAX requests.';
    }
  }
};

export default checkVideoUrl;
