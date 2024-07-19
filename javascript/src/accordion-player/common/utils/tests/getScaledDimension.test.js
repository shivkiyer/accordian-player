import getScaledDimension from '../getScaledDimension';

/**
 * Testing the getScaledDimension method.
 * Should produce a gradient between 630px and 1920px widths
 * and should scale linearly outside this range.
 */
describe('getScaledDimension', () => {
  it('should return the small dimension for 630px video width', () => {
    const scaledDimension = getScaledDimension({
      smallDim: 64,
      largeDim: 96,
      videoWidth: 630,
    });
    expect(scaledDimension).toBe(64);
  });

  it('should return the large dimension for 1920px video width', () => {
    const scaledDimension = getScaledDimension({
      smallDim: 64,
      largeDim: 96,
      videoWidth: 1920,
    });
    expect(scaledDimension).toBe(96);
  });

  it('should return the large dimension for 1275px video width', () => {
    const scaledDimension = getScaledDimension({
      smallDim: 64,
      largeDim: 96,
      videoWidth: 1275,
    });
    expect(scaledDimension).toBe(80);
  });

  it('should should decrease linearly below 630px video width', () => {
    const scaledDimension = getScaledDimension({
      smallDim: 64,
      largeDim: 96,
      videoWidth: 315,
    });
    expect(scaledDimension).toBe(32);
  });

  it('should should increase linearly above 1920px video width', () => {
    const scaledDimension = getScaledDimension({
      smallDim: 64,
      largeDim: 96,
      videoWidth: 3840,
    });
    expect(scaledDimension).toBe(192);
  });
});
