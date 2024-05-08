import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen, waitFor } from '@testing-library/react';

import videoStore from './../../app/store';
import videoReducer from '../../app/videoReducer';

describe('VideoTitleBar', () => {
  const checkVideoUrlObj = require('./../../common/utils/checkVideoUrl');
  const mockCheckVideoUrl = jest.spyOn(checkVideoUrlObj, 'default');

  const VideoPlayer = require('./../video-player/video-player').default;

  let updatedState = JSON.parse(JSON.stringify(videoStore.getState()));
  updatedState.video.isControlBarVisible = true;
  const updatedStore = configureStore({
    reducer: { video: videoReducer },
    preloadedState: updatedState,
  });

  it('should display the video title and video progress', async () => {
    mockCheckVideoUrl.mockReturnValue(
      Promise.resolve({ errMsg: null, data: 'some-url' })
    );

    render(
      <Provider store={updatedStore}>
        <VideoPlayer width='630' url='some-url' />
      </Provider>
    );

    await waitFor(() => {});

    const videoTitleEl = await screen.findByTestId('test-video-title');
    expect(videoTitleEl).toBeInTheDocument();
    const videoProgressEl = screen.getByTestId('test-video-progress');
    expect(videoProgressEl).toBeInTheDocument();
  });
});
