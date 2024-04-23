import { render, screen, act, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';

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

  it('should prompt user for video URL and then start with video', async () => {
    render(
      <Provider store={videoStore}>
        <VideoPlayer />
      </Provider>
    );

    const videoUrlEl = await screen.findByPlaceholderText('Enter URL here');
    expect(videoUrlEl).toBeInTheDocument();

    act(() => {
      userEvent.type(videoUrlEl, 'some-url');
    });

    function wait(milliseconds) {
      return new Promise((resolve) => {
        setTimeout(resolve, milliseconds);
      });
    }

    await act(async () => {
      await wait(1500);
    });

    const fullScreenBtn = await screen.findByAltText('fullscreen');
    expect(fullScreenBtn).toBeInTheDocument();
  });
});
