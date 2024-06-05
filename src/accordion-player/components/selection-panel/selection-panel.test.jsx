import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen, waitFor } from '@testing-library/react';

import getInitStore from '../../common/test-utils/getInitStore';
import videoReducer from '../../app/videoReducer';
import generateConfigData from '../../common/test-utils/getConfigData';

/**
 * Test for selection panel for user to customize playlist
 */
describe('SelectionPanel', () => {
  let VideoPlayer;
  let mockStore;
  beforeEach(async () => {
    const initStoreState = getInitStore();
    initStoreState.video.isSelectPanelVisible = true;

    mockStore = configureStore({
      reducer: { video: videoReducer },
      preloadedState: initStoreState,
    });

    const mockCheckVideoPlayable = (url) =>
      Promise.resolve({ data: url, errMsg: null });
    jest.mock('./../../common/utils/checkVideoPlayable', () => {
      return mockCheckVideoPlayable;
    });

    const readCsv = require('./../../common/utils/readCsvFile').default;
    const mockConfigData = await readCsv(generateConfigData());

    const mockCheckVideoUrl = (_) =>
      Promise.resolve({ data: mockConfigData, errMsg: null });
    jest.mock('./../../common/utils/checkVideoUrl', () => {
      return mockCheckVideoUrl;
    });

    jest.mock('./../../common/utils/videoActions', () => {
      return {
        loadVideo: jest.fn(),
      };
    });

    VideoPlayer = require('./../video-player/video-player').default;
  });

  it('should display selection table', async () => {
    render(
      <Provider store={mockStore}>
        <VideoPlayer url='some-url' />
      </Provider>
    );

    await waitFor(() => {});

    const tableHeading = await screen.findByText('CHOOSE VIDEOS');
    expect(tableHeading).toBeInTheDocument();
  });
});
