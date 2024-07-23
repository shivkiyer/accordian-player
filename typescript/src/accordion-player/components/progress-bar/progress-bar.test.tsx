import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { render, waitFor, screen } from '@testing-library/react';

import videoStore from '../../app/store';
import videoReducer from '../../app/videoReducer';

/**
 * Test for the Progress Bar to be
 * - one unit square from the top of the control bar
 * - and have one unit square space on either side
 */
describe('ProgressBar', () => {
  jest.mock('./../../common/utils/checkVideoUrl', () => {
    return () =>
      Promise.resolve({
        errMsg: null,
        data: 'some-url',
      });
  });

  jest.mock('./../../common/utils/videoActions', () => {
    return {
      loadVideo: jest.fn(),
    };
  });

  const updatedState = JSON.parse(JSON.stringify(videoStore.getState()));
  updatedState.video.isControlBarVisible = true;
  const updatedStore = configureStore<any>({
    reducer: { video: videoReducer },
    preloadedState: updatedState,
  });

  const VideoPlayer = require('./../video-player/video-player').default;

  it('should be placed at the top of the control bar', async () => {
    render(
      <Provider store={updatedStore}>
        <VideoPlayer width='630' url='some-url' />
      </Provider>
    );

    await waitFor(() => {});

    const progressBarEl = await screen.findByTestId('test-progress-bar');
    expect(progressBarEl).toBeInTheDocument();
    expect(progressBarEl).toHaveStyle('margin-left: 15.75px');
    expect(progressBarEl).toHaveStyle('margin-right: 15.75px');
  });
});
