import getVideoDimensions from '../getVideoDimensions';

/**
 * Test for function calculating dimensions of video container
 */
describe('getVideoDimensions', () => {
  it('should return a container with fixed dimensions if width is input', () => {
    const dimensions1 = getVideoDimensions({
      width: 100,
      maxWidth: 1400,
      maxHeight: 1000,
    });

    expect(dimensions1).toHaveProperty('playerWidth');
    expect(dimensions1.playerWidth).toEqual(0.9 * 100);
    expect(dimensions1.playerHeight).toEqual((0.9 * 100 * 9.0) / 16.0);

    const dimensions2 = getVideoDimensions({
      width: 100,
    });

    expect(dimensions2).toHaveProperty('playerWidth');
    expect(dimensions2.playerWidth).toEqual(0.9 * 100);
    expect(dimensions2.playerHeight).toEqual((0.9 * 100 * 9.0) / 16.0);
  });

  it('should return a container of fixed dimensions if height is input', () => {
    const dimensions1 = getVideoDimensions({
      height: 100,
    });

    expect(dimensions1).toHaveProperty('playerWidth');
    expect(dimensions1.playerHeight).toEqual(0.9 * 100);

    const dimensions2 = getVideoDimensions({
      height: 100,
      maxWidth: 1400,
      maxHeight: 1000,
    });

    expect(dimensions2).toHaveProperty('playerWidth');
    expect(dimensions2.playerHeight).toEqual(0.9 * 100);
  });

  it('should limit container width to 1080px', () => {
    const dimensions = getVideoDimensions({ maxWidth: 1400, maxHeight: 1000 });

    expect(dimensions).toHaveProperty('playerWidth');
    expect(dimensions.playerWidth).toEqual(1080);
    expect(dimensions.playerHeight).toEqual((1080 * 9.0) / 16.0);
  });

  it('should adjust container width to maxWidth if maxHeight is not a constraint', () => {
    const dimensions = getVideoDimensions({ maxWidth: 1000, maxHeight: 1000 });

    expect(dimensions).toHaveProperty('playerWidth');
    expect(dimensions.playerWidth).toEqual(900);
    expect(dimensions.playerHeight).toEqual((900 * 9.0) / 16.0);
  });

  it('should adjust container width to maxHeight if maxHeight is a constraint', () => {
    const dimensions = getVideoDimensions({ maxWidth: 1000, maxHeight: 500 });

    expect(dimensions).toHaveProperty('playerHeight');
    expect(dimensions.playerHeight).toEqual(450);
  });
});
