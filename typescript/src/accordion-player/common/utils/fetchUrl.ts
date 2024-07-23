/**
 * Wrapper function that returns the GET response on a URL
 *
 * @param {string} url
 * @returns HTTP Response
 */
const fetchUrl = async (url: URL): Promise<Response> => {
  const result = await fetch(url, { method: 'GET' });
  return result;
};

export default fetchUrl;
