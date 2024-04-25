import { render, screen, act, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';

import videoStore from '../../app/store';
import wait from '../../common/test-utils/wait';

/**
 * Test for VideoPlayer container
 */
describe('VideoPlayer', () => {
  const checkVideoUrlObj = require('./../../common/utils/checkVideoUrl');
  const mockCheckVideoUrl = jest.spyOn(checkVideoUrlObj, 'default');

  const VideoPlayer = require('./video-player').default;

  it('should be rendered according to specified width', async () => {
    mockCheckVideoUrl.mockReturnValue(null);

    const { container } = render(
      <Provider store={videoStore}>
        <VideoPlayer width='300' />
      </Provider>
    );

    await waitFor(() => {});
    await wait();

    const videoPlayer = container.querySelector('.videoPlayer');
    expect(videoPlayer).toBeDefined();
    expect(videoPlayer).toHaveStyle('width: 300px');
  });

  it('should be rendered according to browser width if no width specified', async () => {
    mockCheckVideoUrl.mockReturnValue(null);

    const { container } = render(
      <Provider store={videoStore}>
        <VideoPlayer />
      </Provider>
    );

    await waitFor(() => {});
    await wait();

    const videoPlayer = container.querySelector('.videoPlayer');
    expect(videoPlayer).toBeDefined();
    const expectedWidth = 0.9 * 1024;
    expect(videoPlayer).toHaveStyle(`width: ${expectedWidth}px`);
  });

  it('should prompt user for video URL and then start with video', async () => {
    mockCheckVideoUrl.mockReturnValue(null);

    render(
      <Provider store={videoStore}>
        <VideoPlayer />
      </Provider>
    );

    await waitFor(() => {});
    await wait();

    const videoUrlEl = await screen.findByPlaceholderText('Enter URL here');
    expect(videoUrlEl).toBeInTheDocument();

    await act(async () => {
      await userEvent.type(videoUrlEl, 'some-url');
    });

    await waitFor(() => {});
    await wait();

    const fullScreenBtn = await screen.findByAltText('fullscreen');
    expect(fullScreenBtn).toBeInTheDocument();
  });
});
