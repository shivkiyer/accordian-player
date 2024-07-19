describe('checkVideoUrl', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should throw an error if invalid URL is passed', async () => {
    const mockFetchUrl = jest.fn();
    jest.mock('./../fetchUrl', () => {
      return mockFetchUrl;
    });

    const mockCheckVideoPlayable = jest.fn();
    jest.mock('./../checkVideoPlayable', () => {
      return mockCheckVideoPlayable;
    });

    const checkVideoUrl = require('./../checkVideoUrl').default;

    let result;
    try {
      await checkVideoUrl('sometext');
    } catch (e) {
      result = e;
    }
    expect(result.errMsg).toBe('Please enter (copy/paste) a valid URL');
  });

  it('should throw link inaccessible error if url cannot be fetched', async () => {
    const mockFetchUrl = () => Promise.resolve({ ok: false });
    jest.mock('./../fetchUrl', () => {
      return mockFetchUrl;
    });

    const mockCheckVideoPlayable = jest.fn();
    jest.mock('./../checkVideoPlayable', () => {
      return mockCheckVideoPlayable;
    });

    const checkVideoUrl = require('./../checkVideoUrl').default;

    let result;
    try {
      const x = await checkVideoUrl('http://some-link.com');
    } catch (e) {
      result = e;
    }
    expect(result.errMsg).toBe(
      'Link entered was not accessible. Please ensure it opens in a browser window.'
    );
  });

  it('should read CSV config file if URL is CSV content', async () => {
    const mockFetchUrl = () =>
      Promise.resolve({
        ok: true,
        headers: { get: () => 'text/plain' },
        text: () => Promise.resolve('some-link'),
      });
    jest.mock('./../fetchUrl', () => {
      return mockFetchUrl;
    });

    const mockCheckVideoPlayable = jest.fn();
    jest.mock('./../checkVideoPlayable', () => {
      return mockCheckVideoPlayable;
    });

    const mockReadCsvFile = () => Promise.resolve('some data');
    jest.mock('./../readCsvFile', () => {
      return mockReadCsvFile;
    });

    const checkVideoUrl = require('./../checkVideoUrl').default;

    let result;
    try {
      result = await checkVideoUrl('http://some-url.com');
    } catch (e) {
      result = e;
    }
    expect(result.data).toBe('some data');
  });

  it('should return back the link if URL is of video/mp4 content', async () => {
    const mockFetchUrl = () =>
      Promise.resolve({
        ok: true,
        headers: { get: () => 'video/mp4' },
      });
    jest.mock('./../fetchUrl', () => {
      return mockFetchUrl;
    });

    const mockCheckVideoPlayable = jest.fn();
    jest.mock('./../checkVideoPlayable', () => {
      return mockCheckVideoPlayable;
    });

    const checkVideoUrl = require('./../checkVideoUrl').default;

    let result;
    try {
      result = await checkVideoUrl('http://some-url.com');
    } catch (e) {
      result = e;
    }
    expect(result.data).toBe('http://some-url.com');
  });

  it('should return back the url if it is a video url that could not be fetched but can be played', async () => {
    const mockFetchUrl = () => Promise.reject('url error');
    jest.mock('./../fetchUrl', () => {
      return mockFetchUrl;
    });

    const mockCheckVideoPlayable = (url) => Promise.resolve({ data: url });
    jest.mock('./../checkVideoPlayable', () => {
      return mockCheckVideoPlayable;
    });

    const checkVideoUrl = require('./../checkVideoUrl').default;

    let result;
    try {
      result = await checkVideoUrl('http://some-url.com');
    } catch (e) {
      result = e;
    }
    expect(result.data).toBe('http://some-url.com');
  });

  it('should throw and error if it is a video url cannot be fetched nor played', async () => {
    const mockFetchUrl = () => Promise.reject('url error');
    jest.mock('./../fetchUrl', () => {
      return mockFetchUrl;
    });

    const mockCheckVideoPlayable = (url) =>
      Promise.reject({ errMsg: 'not playable' });
    jest.mock('./../checkVideoPlayable', () => {
      return mockCheckVideoPlayable;
    });

    const checkVideoUrl = require('./../checkVideoUrl').default;

    let result;
    try {
      result = await checkVideoUrl('http://some-url.com');
    } catch (e) {
      result = e;
    }
    expect(result.errMsg).toBe(
      'Unexpected error occurred. Please ensure that the resource can accept AJAX requests.'
    );
  });
});
