import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import wait from '../../common/test-utils/wait';
import videoReducer from '../../app/videoReducer';
import videoStore from '../../app/store';
import getConfigData from '../../common/test-utils/getConfigData';

describe('Right controls (buttons)', () => {
  let VideoPlayer: any;
  let updatedStore: any;

  beforeEach(async () => {
    jest.mock('./../../common/utils/checkVideoPlayable', () => {
      return (url: string) => Promise.resolve({ data: url });
    });

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

    const readCsv = require('./../../common/utils/readCsvFile').default;
    const configData = await readCsv(getConfigData());

    const updatedState = JSON.parse(JSON.stringify(videoStore.getState()));
    updatedState.video.isControlBarVisible = true;
    updatedState.video.videoData = configData;
    updatedStore = configureStore<any>({
      reducer: { video: videoReducer },
      preloadedState: updatedState,
    });

    VideoPlayer = require('./../video-player/video-player').default;
  });

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
    const RightControls = require('./right-controls').default;
    render(
      <Provider store={updatedStore}>
        <RightControls />
      </Provider>
    );

    await waitFor(() => {});

    const fullScreenBtn1 = await screen.findByAltText('fullscreen');
    act(() => {
      userEvent.click(fullScreenBtn1);
    });

    await waitFor(() => {});
    await wait();

    const smallScreenBtn1 = screen.getByAltText('fullscreen');
    expect(smallScreenBtn1).toHaveAttribute('src', 'small_screen_icon.svg');

    act(() => {
      userEvent.click(smallScreenBtn1);
    });

    await waitFor(() => {});
    await wait();

    const fullScreenBtn2 = screen.getByAltText('fullscreen');
    expect(fullScreenBtn2).toHaveAttribute('src', 'full_screen_icon.svg');
  });

  describe('Video Selector buttons', () => {
    let newStore: any;

    beforeEach(() => {
      const newState = JSON.parse(JSON.stringify(updatedStore.getState()));
      newState.video.userSelection = ['short', 'no', 'long', 'short'];
      newState.video.currentVideoLabel = 'videoOptions_0';
      newStore = configureStore<any>({
        reducer: { video: videoReducer },
        preloadedState: newState,
      });

      const ControlBar = require('./../control-bar/control-bar').default;

      render(
        <Provider store={newStore}>
          <ControlBar />
        </Provider>
      );
    });

    it('should display the correct number of film icons per user selection', async () => {
      await waitFor(() => {});

      const halfFilmIcons = await screen.findAllByAltText('short-icon');
      const fullFilmIcons = await screen.findAllByAltText('long-icon');
      expect(halfFilmIcons.length).toBe(2);
      expect(fullFilmIcons.length).toBe(1);
    });

    it('should display the current video icon as bright and others as light', async () => {
      await waitFor(() => {});

      const halfFilmIcons = await screen.findAllByAltText('short-icon');
      const fullFilmIcons = await screen.findAllByAltText('long-icon');
      expect(fullFilmIcons[0]).toHaveStyle('opacity: 0.5');
      expect(halfFilmIcons[0]).not.toHaveStyle('opacity: 0.5');
      expect(halfFilmIcons[1]).toHaveStyle('opacity: 0.5');
    });

    it('should update film icons and redux state on user choice click', async () => {
      await waitFor(() => {});

      const halfFilmIcons = await screen.findAllByAltText('short-icon');
      const fullFilmIcons = await screen.findAllByAltText('long-icon');

      act(() => {
        userEvent.click(fullFilmIcons[0]);
      });

      await waitFor(() => {
        expect(fullFilmIcons[0]).not.toHaveStyle('opacity: 0.5');
        expect(halfFilmIcons[0]).toHaveStyle('opacity: 0.5');
        expect(halfFilmIcons[1]).toHaveStyle('opacity: 0.5');
      });

      const userChosenState = newStore.getState();
      const videoLabel = userChosenState.video.currentVideoLabel;

      expect(videoLabel).toBe('videoOptions_2');
    });
  });
});
