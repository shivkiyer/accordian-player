import testConfigData from './../../test-utils/getConfigData';

/**
 * Test for readCsv method
 */
describe('readCsv', () => {
  it('should return a data object with configuration properties', async () => {
    const mockCheckVideoPlayable = (url: string) =>
      Promise.resolve({ data: url, errMsg: null });
    jest.mock('./../checkVideoPlayable', () => {
      return mockCheckVideoPlayable;
    });
    const readCsv = require('./../readCsvFile').default;

    const data = await readCsv(testConfigData());
    expect(data).toHaveProperty('introVideo');
    expect(data).toHaveProperty('framesPerSecond');
    expect(data).toHaveProperty('backgroundColor');
    expect(data).toHaveProperty('videoOptions');
    expect(data).toHaveProperty('endscreenInfo');
    expect(data).toHaveProperty('videoSequence');
  });

  it('should throw an error if videos cannot be played', async () => {
    const mockCheckVideoPlayable = (url: string) => {
      const result = new Promise((resolve, reject) => {
        reject({ data: null, errMsg: 'Video cannot be played' });
      });
      return result;
    };

    jest.mock('./../checkVideoPlayable', () => {
      return mockCheckVideoPlayable;
    });

    const readCsv = require('./../readCsvFile').default;

    try {
      const data = await readCsv(testConfigData());
    } catch (e: any) {
      expect(e).toHaveProperty('errMsg');
      expect(e['errMsg']).toBe('Introduction video cannot be played.');
    }
  });

  it('should throw and error if framesPerSecond is not an integer', async () => {
    const mockCheckVideoPlayable = (url: string) =>
      Promise.resolve({ data: url, errMsg: null });
    jest.mock('./../checkVideoPlayable', () => {
      return mockCheckVideoPlayable;
    });
    const readCsv = require('./../readCsvFile').default;

    const data = await readCsv(testConfigData({ framesPerSecond: 35.55 }));
    expect(data).toHaveProperty('framesPerSecond');
    expect(data['framesPerSecond']).toBe(35);
  });

  it('should throw an error if time instants are incorrect', async () => {
    const mockCheckVideoPlayable = (url: string) =>
      Promise.resolve({ data: url, errMsg: null });
    jest.mock('./../checkVideoPlayable', () => {
      return mockCheckVideoPlayable;
    });
    const readCsv = require('./../readCsvFile').default;

    try {
      const data = await readCsv(
        testConfigData({ selectionStartInteraction: '00:05:05' })
      );
    } catch (e: any) {
      expect(e).toHaveProperty('errMsg');
      expect(e['errMsg']).toBe(
        'START_INTERACTIVE_TIMESTAMP of selection video incorrect. Invalid time format - use the HH:MM:SS:FF (Hour:Minute:Second:Frame) format.'
      );
    }

    try {
      const data = await readCsv(
        testConfigData({ selectionLoopTime: '0:x0:05:05' })
      );
    } catch (e: any) {
      expect(e).toHaveProperty('errMsg');
      expect(e['errMsg']).toBe(
        'START_LOOP_TIMESTAMP of selection video incorrect. Invalid time format - parts of time instant HH:MM:SS:FF have to be integers.'
      );
    }

    try {
      const data = await readCsv(
        testConfigData({ endingJumpTime: '0:00:05:35' })
      );
    } catch (e: any) {
      expect(e).toHaveProperty('errMsg');
      expect(e['errMsg']).toBe(
        'JUMPTO_LOOP_TIMESTAMP of ending video incorrect. Invalid time format - frame in HH:MM:SS:FF must be less than 30.'
      );
    }
  });

  it('should throw and error if background color is invalid', async () => {
    const mockCheckVideoPlayable = (url: string) =>
      Promise.resolve({ data: url, errMsg: null });
    jest.mock('./../checkVideoPlayable', () => {
      return mockCheckVideoPlayable;
    });
    const readCsv = require('./../readCsvFile').default;

    try {
      const data = await readCsv(
        testConfigData({ backgroundColor: 'fffffff' })
      );
    } catch (e: any) {
      expect(e).toHaveProperty('errMsg');
      expect(e['errMsg']).toBe('Background color is invalid');
    }

    try {
      const data = await readCsv(testConfigData({ backgroundColor: 'ffffg' }));
    } catch (e: any) {
      expect(e).toHaveProperty('errMsg');
      expect(e['errMsg']).toBe('Background color is invalid');
    }
  });
});
