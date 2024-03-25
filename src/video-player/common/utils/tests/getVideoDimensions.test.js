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
    expect(dimensions1.playerWidth).toBe(100);
    expect(dimensions1.playerHeight).toBe((100 * 9.0) / 16.0);

    const dimensions2 = getVideoDimensions({
      width: 100,
      maxWidth: 1400,
      maxHeight: 1000,
    });

    expect(dimensions2).toHaveProperty('playerWidth');
    expect(dimensions2.playerWidth).toBe(100);
    expect(dimensions2.playerHeight).toBe((100 * 9.0) / 16.0);
  });

  it('should return a container of fixed dimensions if height is input', () => {
    const dimensions1 = getVideoDimensions({
      height: 100,
      maxWidth: 1400,
      maxHeight: 1000,
    });

    expect(dimensions1).toHaveProperty('playerWidth');
    expect(dimensions1.playerHeight).toBe(100);

    const dimensions2 = getVideoDimensions({
      height: 100,
      maxWidth: 1400,
      maxHeight: 1000,
    });

    expect(dimensions2).toHaveProperty('playerWidth');
    expect(dimensions2.playerHeight).toBe(100);
  });

  it('should adjust to max width if input width is greater than max width', () => {
    const dimensions = getVideoDimensions({
      width: 900,
      maxWidth: 800,
      maxHeight: 1000,
    });

    expect(dimensions.playerWidth).toBe(720);
  });

  it('should adjust to max height if input height is greater than max height', () => {
    const dimensions = getVideoDimensions({
      height: 900,
      maxWidth: 1000,
      maxHeight: 500,
    });

    expect(dimensions.playerHeight).toBe(450);
  });

  it('should limit container width to 1080px', () => {
    const dimensions = getVideoDimensions({ maxWidth: 1400, maxHeight: 1000 });

    expect(dimensions).toHaveProperty('playerWidth');
    expect(dimensions.playerWidth).toBe(1080);
    expect(dimensions.playerHeight).toBe((1080 * 9.0) / 16.0);
  });

  it('should adjust container width to maxWidth if maxHeight is not a constraint', () => {
    const dimensions = getVideoDimensions({ maxWidth: 1000, maxHeight: 1000 });

    expect(dimensions).toHaveProperty('playerWidth');
    expect(dimensions.playerWidth).toBe(900);
    expect(dimensions.playerHeight).toBe((900 * 9.0) / 16.0);
  });

  it('should adjust container width to maxHeight if maxHeight is a constraint', () => {
    const dimensions = getVideoDimensions({ maxWidth: 1000, maxHeight: 500 });

    expect(dimensions).toHaveProperty('playerHeight');
    expect(dimensions.playerHeight).toBe(450);
  });
});
