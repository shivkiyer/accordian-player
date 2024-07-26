import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import videoReducer from '../../app/videoReducer';
import getInitStore from '../../common/test-utils/getInitStore';

/**
 * Test for VideoPlayer container
 */
describe('VideoPlayer', () => {
  const checkVideoUrlObj = require('./../../common/utils/checkVideoUrl');
  const mockCheckVideoUrl = jest.spyOn(checkVideoUrlObj, 'default');

  jest.mock('./../../common/utils/videoActions', () => {
    return {
      loadVideo: jest.fn(),
    };
  });
  let mockStore: any;

  const VideoPlayer = require('./video-player').default;

  beforeEach(() => {
    const initStore = getInitStore();

    mockStore = configureStore<any>({
      reducer: { video: videoReducer },
      preloadedState: initStore,
    });
  });

  it('should be rendered', async () => {
    mockCheckVideoUrl.mockReturnValue(null);

    const { container } = render(
      <Provider store={mockStore}>
        <VideoPlayer width='300' />
      </Provider>
    );

    await waitFor(() => {
      const videoPlayer = container.querySelector('.videoPlayer');
      expect(videoPlayer).toBeDefined();
    });
  });

  it('should load the video if video URL is input', async () => {
    mockCheckVideoUrl.mockReturnValue(
      Promise.resolve({ errMsg: null, data: 'some-url' })
    );

    render(
      <Provider store={mockStore}>
        <VideoPlayer url='some-url' />
      </Provider>
    );

    const videoEl = await screen.findByTestId('test-video');
    expect(videoEl).toBeInTheDocument();
  });

  it('should prompt user for video URL and then start with video', async () => {
    mockCheckVideoUrl.mockReturnValue(
      Promise.resolve({ errMsg: null, data: 'some-url' })
    );

    render(
      <Provider store={mockStore}>
        <VideoPlayer />
      </Provider>
    );

    const videoUrlEl = await screen.findByPlaceholderText('Enter URL here');
    expect(videoUrlEl).toBeInTheDocument();

    act(() => {
      userEvent.type(videoUrlEl, 'some-url');
    });

    // Control bar will show only when mouse enters video
    const videoEl = await screen.findByTestId('test-video');
    act(() => {
      userEvent.hover(videoEl);
    });

    const fullScreenBtn = await screen.findByAltText('fullscreen');
    expect(fullScreenBtn).toBeInTheDocument();
  });
});
