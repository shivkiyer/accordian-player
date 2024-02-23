import { render, screen } from '@testing-library/react';

import VideoPlayer from './video-player';

/**
 * Test for VideoPlayer container
 */
describe('VideoPlayer', () => {
  it('should be rendered according to specified width', () => {
    const {container} = render(<VideoPlayer width="300" />);

    const videoPlayer = container.querySelector('.videoPlayer');
    expect(videoPlayer).toBeDefined();
    expect(videoPlayer).toHaveStyle("width: 270px");
  });

  it('should be rendered according to browser width if no width specified', () => {
    const {container} = render(<VideoPlayer />);

    const videoPlayer = container.querySelector('.videoPlayer');
    expect(videoPlayer).toBeDefined();
    const expectedWidth = 0.9*1024;
    expect(videoPlayer).toHaveStyle(`width: ${expectedWidth}px`);
  });
});
