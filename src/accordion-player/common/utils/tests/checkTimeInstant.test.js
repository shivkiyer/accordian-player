import checkTimeInstant from '../checkTimeInstant';

/**
 * Tests for checkTimeInstant method
 */
describe('checkTimeInstant', () => {
  it('should return back time instant if valid', () => {
    const testTime = '0:00:00:00';
    const result = checkTimeInstant(testTime, 30);
    expect(result).toBe(testTime);
  });

  it('should throw error if a time segment is missing', () => {
    const testTime = '00:00:00';

    try {
      const result = checkTimeInstant(testTime, 30);
    } catch (e) {
      expect(e).toHaveProperty('errMsg');
      expect(e['errMsg']).toBe(
        'Invalid time format - use the HH:MM:SS:FF (Hour:Minute:Second:Frame) format.'
      );
    }
  });

  it('should throw an error if a time segment is not an integer', () => {
    const testTime = '0:xx:xx:f0';

    try {
      const result = checkTimeInstant(testTime, 30);
    } catch (e) {
      expect(e).toHaveProperty('errMsg');
      expect(e['errMsg']).toBe(
        'Invalid time format - parts of time instant HH:MM:SS:FF have to be integers.'
      );
    }
  });

  it('should throw an error if a time segment is negative', () => {
    const testTime = '0:-5:00:00';

    try {
      const result = checkTimeInstant(testTime, 30);
    } catch (e) {
      expect(e).toHaveProperty('errMsg');
      expect(e['errMsg']).toBe(
        'Invalid time format - parts of time instant HH:MM:SS:FF cannot be negative.'
      );
    }
  });

  it('should throw an error if frame is greater than frames per second', () => {
    const testTime = '0:05:00:40';

    try {
      const result = checkTimeInstant(testTime, 30);
    } catch (e) {
      expect(e).toHaveProperty('errMsg');
      expect(e['errMsg']).toBe(
        'Invalid time format - frame in HH:MM:SS:FF must be less than 30.'
      );
    }
  });

  it('should throw an error if minutes or seconds exceeds 60', () => {
    const testTime = '0:05:60:20';

    try {
      const result = checkTimeInstant(testTime, 30);
    } catch (e) {
      expect(e).toHaveProperty('errMsg');
      expect(e['errMsg']).toBe(
        'Invalid time format - minutes and seconds in HH:MM:SS:FF cannot exceed 60.'
      );
    }
  });
});
