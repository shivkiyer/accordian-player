import { render } from '@testing-library/react';

import VideoPlayer from '../video-player/video-player';

/**
 * Test for creation of control bar
 * within the video player container
 */
describe('ControlBar', () => {
  it('should produce a control bar of 64px height if video is 630px wide (design)', () => {
    const { container } = render(<VideoPlayer width='700' />);
    const controlBar = container.querySelector('.ControlBar');
    expect(controlBar).toBeDefined();
    expect(controlBar).toHaveStyle('height: 64px');
  });
});
