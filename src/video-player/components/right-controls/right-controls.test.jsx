import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import wait from '../../common/test-utils/wait';
import videoReducer from '../../app/videoReducer';
import videoStore from './../../app/store';

describe('Right controls (buttons)', () => {
  jest.mock('./../../common/utils/checkVideoUrl', () => {
    return () =>
      Promise.resolve({
        errMsg: null,
        data: 'some-url',
      });
  });

  const mockPromise = () => Promise.resolve();
  jest.mock('./../../common/utils/videoActions', () => {
    return {
      loadVideo: jest.fn(),
      goFullscreen: mockPromise,
      exitFullscreen: mockPromise,
    };
  });

  const updatedState = JSON.parse(JSON.stringify(videoStore.getState()));
  updatedState.video.isControlBarVisible = true;
  const updatedStore = configureStore({
    reducer: { video: videoReducer },
    preloadedState: updatedState,
  });

  const VideoPlayer = require('./../video-player/video-player').default;

  it('should have the fullscreen button', async () => {
    render(
      <Provider store={updatedStore}>
        <VideoPlayer width='630' url='some-url' />
      </Provider>
    );

    await waitFor(() => {});
    await wait();

    const fullScreenBtn = await screen.findByAltText('fullscreen');
    expect(fullScreenBtn).toBeInTheDocument();
  });

  it('should toggle between full screen and small screen icon when clicked', async () => {
    render(
      <Provider store={updatedStore}>
        <VideoPlayer width='630' url='some-url' />
      </Provider>
    );

    await waitFor(() => {});

    const fullScreenBtn1 = await screen.findByAltText('fullscreen');
    await act(async () => {
      await userEvent.click(fullScreenBtn1);
    });

    await waitFor(() => {});
    await wait();

    const smallScreenBtn1 = screen.getByAltText('fullscreen');
    expect(smallScreenBtn1).toHaveAttribute('src', 'small_screen_icon.svg');

    await act(async () => {
      await userEvent.click(smallScreenBtn1);
    });

    await waitFor(() => {});
    await wait();

    const fullScreenBtn2 = screen.getByAltText('fullscreen');
    expect(fullScreenBtn2).toHaveAttribute('src', 'full_screen_icon.svg');
  });
});
