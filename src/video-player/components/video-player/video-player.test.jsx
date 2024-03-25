import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import VideoPlayer from './video-player';
import videoStore from '../../app/store';

/**
 * Test for VideoPlayer container
 */
describe('VideoPlayer', () => {
  it('should be rendered according to specified width', () => {
    const { container } = render(
      <Provider store={videoStore}>
        <VideoPlayer width='300' />
      </Provider>
    );

    const videoPlayer = container.querySelector('.videoPlayer');
    expect(videoPlayer).toBeDefined();
    expect(videoPlayer).toHaveStyle('width: 300px');
  });

  it('should be rendered according to browser width if no width specified', () => {
    const { container } = render(
      <Provider store={videoStore}>
        <VideoPlayer />
      </Provider>
    );

    const videoPlayer = container.querySelector('.videoPlayer');
    expect(videoPlayer).toBeDefined();
    const expectedWidth = 0.9 * 1024;
    expect(videoPlayer).toHaveStyle(`width: ${expectedWidth}px`);
  });
});
