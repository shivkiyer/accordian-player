import getConfigData from './../../test-utils/getConfigData';

describe('getNextVideoData', () => {
  let videoData: any;

  beforeEach(async () => {
    jest.mock('./../checkVideoPlayable', () => {
      return (url: string) => Promise.resolve({ data: url });
    });

    const readCsvFile = require('./../readCsvFile').default;
    videoData = await readCsvFile(getConfigData());
  });

  it('should return next video as selection video if current video is intro video', () => {
    const getNextVideoData = require('./../getNextVideoData').default;

    const result = getNextVideoData(videoData, 'introVideo', null);
    expect(result.label).toBe('selectInfo');
  });

  describe('moving to video options from selection video', () => {
    it('should start with first long video if that is first selection', () => {
      const getNextVideoData = require('./../getNextVideoData').default;

      const mockUserChoice = ['long', 'no', 'no', 'no'];

      const result = getNextVideoData(videoData, 'selectInfo', mockUserChoice);
      expect(result.label).toBe('videoOptions_0');
      expect(result.url).toBe(videoData['videoOptions'][0]['longVideoUrl']);
    });

    it('should start with first short video if that is first selection', () => {
      const getNextVideoData = require('./../getNextVideoData').default;

      const mockUserChoice = ['short', 'no', 'no', 'no'];

      const result = getNextVideoData(videoData, 'selectInfo', mockUserChoice);
      expect(result.label).toBe('videoOptions_0');
      expect(result.url).toBe(videoData['videoOptions'][0]['shortVideoUrl']);
    });

    it('should start with third long video if that is first selection', () => {
      const getNextVideoData = require('./../getNextVideoData').default;

      const mockUserChoice = ['no', 'no', 'long', 'no'];

      const result = getNextVideoData(videoData, 'selectInfo', mockUserChoice);
      expect(result.label).toBe('videoOptions_2');
      expect(result.url).toBe(videoData['videoOptions'][2]['longVideoUrl']);
    });

    it('should start with third short video if that is first selection', () => {
      const getNextVideoData = require('./../getNextVideoData').default;

      const mockUserChoice = ['no', 'no', 'short', 'no'];

      const result = getNextVideoData(videoData, 'selectInfo', mockUserChoice);
      expect(result.label).toBe('videoOptions_2');
      expect(result.url).toBe(videoData['videoOptions'][2]['shortVideoUrl']);
    });

    it('should start with ending video if no selection is made', () => {
      const getNextVideoData = require('./../getNextVideoData').default;

      const mockUserChoice = ['no', 'no', 'no', 'no'];

      const result = getNextVideoData(videoData, 'selectInfo', mockUserChoice);
      expect(result.label).toBe('endscreenInfo');
      expect(result.url).toBe(videoData['endscreenInfo']['url']);
    });
  });

  describe('moving between video options', () => {
    it('should start with second long video if first is current video', () => {
      const getNextVideoData = require('./../getNextVideoData').default;

      const mockUserChoice = ['long', 'long', 'no', 'no'];

      const result = getNextVideoData(
        videoData,
        'videoOptions_0',
        mockUserChoice
      );
      expect(result.label).toBe('videoOptions_1');
      expect(result.url).toBe(videoData['videoOptions'][1]['longVideoUrl']);
    });

    it('should start with fourth short video if second is current video', () => {
      const getNextVideoData = require('./../getNextVideoData').default;

      const mockUserChoice = ['long', 'long', 'no', 'short'];

      const result = getNextVideoData(
        videoData,
        'videoOptions_1',
        mockUserChoice
      );
      expect(result.label).toBe('videoOptions_3');
      expect(result.url).toBe(videoData['videoOptions'][3]['shortVideoUrl']);
    });

    it('should jump to ending video if current video is last option', () => {
      const getNextVideoData = require('./../getNextVideoData').default;

      const mockUserChoice = ['long', 'long', 'no', 'short'];

      const result = getNextVideoData(
        videoData,
        'videoOptions_3',
        mockUserChoice
      );
      expect(result.label).toBe('endscreenInfo');
      expect(result.url).toBe(videoData['endscreenInfo']['url']);
    });

    it('should jump to ending video if other options are not selected', () => {
      const getNextVideoData = require('./../getNextVideoData').default;

      const mockUserChoice = ['long', 'long', 'no', 'no'];

      const result = getNextVideoData(
        videoData,
        'videoOptions_1',
        mockUserChoice
      );
      expect(result.label).toBe('endscreenInfo');
      expect(result.url).toBe(videoData['endscreenInfo']['url']);
    });
  });

  it('should end after ending video', () => {
    const getNextVideoData = require('./../getNextVideoData').default;

    const result = getNextVideoData(videoData, 'endscreenInfo', null);
    expect(result).toBe(null);
  });
});
