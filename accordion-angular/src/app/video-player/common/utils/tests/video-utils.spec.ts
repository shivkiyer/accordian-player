import { getVideoPlayerStyle } from '../video-utils';
import { MAX_VIDEO_WIDTH } from '../../constants';

describe('getVideoPlayerStyle', () => {
  it('should use input width if provided', () => {
    const videoStyle = getVideoPlayerStyle(300, 0, 1980, 1020);
    expect(videoStyle.playerWidth).toBe(270);
  });

  it('should use input width if both width and height are provided', () => {
    const videoStyle = getVideoPlayerStyle(300, 300, 1980, 1020);
    expect(videoStyle.playerWidth).toBe(270);
  });

  it('should use input height if only height is provided', () => {
    const videoStyle = getVideoPlayerStyle(0, 300, 1980, 1020);
    expect(Math.trunc(videoStyle.playerHeight)).toBe(270);
  });

  it('should use max width if width is greater than max width', () => {
    const videoStyle = getVideoPlayerStyle(900, 0, 600, 1000);
    expect(videoStyle.playerWidth).toBe(540);
  });

  it('should use max height if height is greater than max height', () => {
    const videoStyle = getVideoPlayerStyle(0, 900, 1000, 500);
    expect(videoStyle.playerHeight).toBe(450);
  });

  it('should use max width if width and height are not provided', () => {
    const videoStyle = getVideoPlayerStyle(0, 0, 1000, 1000);
    expect(videoStyle.playerWidth).toBe(900);
  });

  it('should use max height if window is limited by max height', () => {
    const videoStyle = getVideoPlayerStyle(0, 0, 1000, 500);
    expect(videoStyle.playerHeight).toBe(450);
  });

  it('should limit the width for large max widths', () => {
    const videoStyle = getVideoPlayerStyle(0, 0, 2000, 2000);
    expect(videoStyle.playerWidth).toBe(MAX_VIDEO_WIDTH);
  });
});
