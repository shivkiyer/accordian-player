import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import videoStore from '../../app/store';
import videoReducer from '../../app/videoReducer';
import getConfigData from '../../common/test-utils/getConfigData';

describe('VideoTitleBar', () => {
  let VideoPlayer: any;
  let updatedStore: any;

  beforeEach(async () => {
    jest.mock('./../../common/utils/checkVideoPlayable', () => {
      return (url: string) => Promise.resolve({ data: url, errMsg: null });
    });

    jest.mock('./../../common/utils/checkVideoUrl', () => {
      return () => Promise.resolve({ data: 'some-url', errMsg: null });
    });

    jest.mock('./../../common/utils/videoActions', () => {
      return {
        loadVideo: jest.fn(),
      };
    });

    const updatedState = JSON.parse(JSON.stringify(videoStore.getState()));
    updatedState.video.isControlBarVisible = true;
    updatedStore = configureStore<any>({
      reducer: { video: videoReducer },
      preloadedState: updatedState,
    });

    VideoPlayer = require('./../video-player/video-player').default;
  });

  it('should display the video title and video progress', async () => {
    render(
      <Provider store={updatedStore}>
        <VideoPlayer name='Test video' url='some-url' />
      </Provider>
    );

    await waitFor(() => {});

    const videoTitleEl = await screen.findByText('Test video');
    expect(videoTitleEl).toBeInTheDocument();
    const videoProgressEl = screen.getByTestId('test-video-progress');
    expect(videoProgressEl).toBeInTheDocument();
  });

  describe('Config data', () => {
    let newStore: any;
    let ControlBar: any;
    let configData: any;

    beforeEach(async () => {
      jest.mock('./../../common/utils/checkVideoPlayable', () => {
        return (url: string) => Promise.resolve({ data: url, errMsg: null });
      });

      const readCsv = require('./../../common/utils/readCsvFile').default;
      configData = await readCsv(getConfigData());

      jest.mock('./../../common/utils/videoActions', () => {
        return {
          loadVideo: jest.fn(),
        };
      });

      const newState = updatedStore.getState();
      newState.video.videoData = configData;
      newState.video.currentVideoLabel = 'introVideo';
      newState.video.currentVideoName = configData['introVideo']['title'];
      newStore = configureStore<any>({
        reducer: { video: videoReducer },
        preloadedState: newState,
      });

      ControlBar = require('./../control-bar/control-bar').default;
    });

    it('should display the title of the introduction video', async () => {
      render(
        <Provider store={newStore}>
          <ControlBar />
        </Provider>
      );

      await waitFor(() => {});

      const videoTitle = await screen.findByText(
        configData['introVideo']['title']
      );
      expect(videoTitle).toBeInTheDocument();
    });

    it('should update title with user choice on videos', async () => {
      const anotherState = newStore.getState();
      anotherState.video.userSelection = ['short', 'no', 'long', 'short'];
      anotherState.video.currentVideoLabel = 'videoOptions_0';
      anotherState.video.currentVideoName =
        configData['videoOptions'][0]['name'];
      const anotherStore = configureStore<any>({
        reducer: { video: videoReducer },
        preloadedState: anotherState,
      });

      render(
        <Provider store={anotherStore}>
          <ControlBar />
        </Provider>
      );

      await waitFor(() => {});

      const halfFilmIcons = await screen.findAllByAltText('short-icon');
      const fullFilmIcons = await screen.findAllByAltText('long-icon');

      act(() => {
        userEvent.click(fullFilmIcons[0]);
      });

      await waitFor(() => {});

      let videoTitle = await screen.findByText(
        configData['videoOptions'][2]['name']
      );
      expect(videoTitle).toBeInTheDocument();

      act(() => {
        userEvent.click(halfFilmIcons[1]);
      });

      await waitFor(() => {});

      videoTitle = await screen.findByText(
        configData['videoOptions'][3]['name']
      );
      expect(videoTitle).toBeInTheDocument();

      act(() => {
        userEvent.click(halfFilmIcons[0]);
      });

      await waitFor(() => {});

      videoTitle = await screen.findByText(
        configData['videoOptions'][0]['name']
      );
      expect(videoTitle).toBeInTheDocument();
    });
  });
});
