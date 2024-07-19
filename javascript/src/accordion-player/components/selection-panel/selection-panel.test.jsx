import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import getInitStore from '../../common/test-utils/getInitStore';
import videoReducer from '../../app/videoReducer';
import generateConfigData from '../../common/test-utils/getConfigData';

/**
 * Test for selection panel for user to customize playlist
 */
describe('SelectionPanel', () => {
  let VideoPlayer;
  let mockStore;
  let mockConfigData;

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
    mockConfigData = await readCsv(generateConfigData());

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

    render(
      <Provider store={mockStore}>
        <VideoPlayer url='some-url' />
      </Provider>
    );

    await waitFor(() => {});
  });

  it('should display selection table', async () => {
    const tableHeading = await screen.findByText('CHOOSE VIDEOS');
    expect(tableHeading).toBeInTheDocument();
    const table = await screen.findByTestId('selection-table');
  });

  it('should have same number of rows as video options in config file', async () => {
    const table = await screen.findByTestId('selection-table');

    await waitFor(() => {
      const tableRows = screen.getAllByTestId('selection-table-row');
      expect(tableRows.length).toBe(mockConfigData['videoOptions'].length);
    });
  });

  it('continue button should initially show zero videos selected', async () => {
    const continueBtn = screen.getByRole('button', { name: /Selected/ });
    const continueBtnText = continueBtn.innerHTML;
    expect(continueBtnText).toBe(
      `0/${mockConfigData['videoOptions'].length} Selected`
    );
  });

  it('should change the radio button of a very interested choice to ON when clicked', async () => {
    const veryInterestedBtns = await screen.findAllByAltText(
      'very-interested-btn'
    );

    act(() => {
      userEvent.click(veryInterestedBtns[0]);
    });

    await waitFor(() => {});

    expect(veryInterestedBtns[0]).toHaveAttribute('src', 'radio_btn_on.svg');
    expect(veryInterestedBtns[1]).toHaveAttribute('src', 'radio_btn_off.svg');
    expect(veryInterestedBtns[2]).toHaveAttribute('src', 'radio_btn_off.svg');
    expect(veryInterestedBtns[3]).toHaveAttribute('src', 'radio_btn_off.svg');

    act(() => {
      userEvent.click(veryInterestedBtns[1]);
    });

    await waitFor(() => {});

    expect(veryInterestedBtns[0]).toHaveAttribute('src', 'radio_btn_on.svg');
    expect(veryInterestedBtns[1]).toHaveAttribute('src', 'radio_btn_on.svg');
    expect(veryInterestedBtns[2]).toHaveAttribute('src', 'radio_btn_off.svg');
    expect(veryInterestedBtns[3]).toHaveAttribute('src', 'radio_btn_off.svg');

    act(() => {
      userEvent.click(veryInterestedBtns[2]);
    });

    await waitFor(() => {});

    expect(veryInterestedBtns[0]).toHaveAttribute('src', 'radio_btn_on.svg');
    expect(veryInterestedBtns[1]).toHaveAttribute('src', 'radio_btn_on.svg');
    expect(veryInterestedBtns[2]).toHaveAttribute('src', 'radio_btn_on.svg');
    expect(veryInterestedBtns[3]).toHaveAttribute('src', 'radio_btn_off.svg');

    act(() => {
      userEvent.click(veryInterestedBtns[3]);
    });

    await waitFor(() => {});

    expect(veryInterestedBtns[0]).toHaveAttribute('src', 'radio_btn_on.svg');
    expect(veryInterestedBtns[1]).toHaveAttribute('src', 'radio_btn_on.svg');
    expect(veryInterestedBtns[2]).toHaveAttribute('src', 'radio_btn_on.svg');
    expect(veryInterestedBtns[3]).toHaveAttribute('src', 'radio_btn_on.svg');
  });

  it('should change the radio button of an interested choice to ON when clicked', async () => {
    const interestedBtns = await screen.findAllByAltText('interested-btn');

    act(() => {
      userEvent.click(interestedBtns[0]);
    });

    await waitFor(() => {});

    expect(interestedBtns[0]).toHaveAttribute('src', 'radio_btn_on.svg');
    expect(interestedBtns[1]).toHaveAttribute('src', 'radio_btn_off.svg');
    expect(interestedBtns[2]).toHaveAttribute('src', 'radio_btn_off.svg');
    expect(interestedBtns[3]).toHaveAttribute('src', 'radio_btn_off.svg');

    act(() => {
      userEvent.click(interestedBtns[1]);
    });

    await waitFor(() => {});

    expect(interestedBtns[0]).toHaveAttribute('src', 'radio_btn_on.svg');
    expect(interestedBtns[1]).toHaveAttribute('src', 'radio_btn_on.svg');
    expect(interestedBtns[2]).toHaveAttribute('src', 'radio_btn_off.svg');
    expect(interestedBtns[3]).toHaveAttribute('src', 'radio_btn_off.svg');

    act(() => {
      userEvent.click(interestedBtns[2]);
    });

    await waitFor(() => {});

    expect(interestedBtns[0]).toHaveAttribute('src', 'radio_btn_on.svg');
    expect(interestedBtns[1]).toHaveAttribute('src', 'radio_btn_on.svg');
    expect(interestedBtns[2]).toHaveAttribute('src', 'radio_btn_on.svg');
    expect(interestedBtns[3]).toHaveAttribute('src', 'radio_btn_off.svg');

    act(() => {
      userEvent.click(interestedBtns[3]);
    });

    await waitFor(() => {});

    expect(interestedBtns[0]).toHaveAttribute('src', 'radio_btn_on.svg');
    expect(interestedBtns[1]).toHaveAttribute('src', 'radio_btn_on.svg');
    expect(interestedBtns[2]).toHaveAttribute('src', 'radio_btn_on.svg');
    expect(interestedBtns[3]).toHaveAttribute('src', 'radio_btn_on.svg');
  });

  it('should change the radio button of a not interested choice to ON when clicked', async () => {
    const notInterestedBtns = await screen.findAllByAltText(
      'not-interested-btn'
    );

    act(() => {
      userEvent.click(notInterestedBtns[0]);
    });

    await waitFor(() => {});

    expect(notInterestedBtns[0]).toHaveAttribute('src', 'radio_btn_on.svg');
    expect(notInterestedBtns[1]).toHaveAttribute('src', 'radio_btn_off.svg');
    expect(notInterestedBtns[2]).toHaveAttribute('src', 'radio_btn_off.svg');
    expect(notInterestedBtns[3]).toHaveAttribute('src', 'radio_btn_off.svg');

    act(() => {
      userEvent.click(notInterestedBtns[1]);
    });

    await waitFor(() => {});

    expect(notInterestedBtns[0]).toHaveAttribute('src', 'radio_btn_on.svg');
    expect(notInterestedBtns[1]).toHaveAttribute('src', 'radio_btn_on.svg');
    expect(notInterestedBtns[2]).toHaveAttribute('src', 'radio_btn_off.svg');
    expect(notInterestedBtns[3]).toHaveAttribute('src', 'radio_btn_off.svg');

    act(() => {
      userEvent.click(notInterestedBtns[2]);
    });

    await waitFor(() => {});

    expect(notInterestedBtns[0]).toHaveAttribute('src', 'radio_btn_on.svg');
    expect(notInterestedBtns[1]).toHaveAttribute('src', 'radio_btn_on.svg');
    expect(notInterestedBtns[2]).toHaveAttribute('src', 'radio_btn_on.svg');
    expect(notInterestedBtns[3]).toHaveAttribute('src', 'radio_btn_off.svg');

    act(() => {
      userEvent.click(notInterestedBtns[3]);
    });

    await waitFor(() => {});

    expect(notInterestedBtns[0]).toHaveAttribute('src', 'radio_btn_on.svg');
    expect(notInterestedBtns[1]).toHaveAttribute('src', 'radio_btn_on.svg');
    expect(notInterestedBtns[2]).toHaveAttribute('src', 'radio_btn_on.svg');
    expect(notInterestedBtns[3]).toHaveAttribute('src', 'radio_btn_on.svg');
  });

  it('should increment the counter in the select btn when selections are made', async () => {
    const veryInterestedBtns = await screen.findAllByAltText(
      'very-interested-btn'
    );
    const interestedBtns = await screen.findAllByAltText('interested-btn');
    const notInterestedBtns = await screen.findAllByAltText(
      'not-interested-btn'
    );

    act(() => {
      userEvent.click(veryInterestedBtns[0]);
    });

    await waitFor(() => {});

    let continueBtn, continueBtnText;

    continueBtn = screen.getByRole('button', { name: /Selected/ });
    continueBtnText = continueBtn.innerHTML;
    expect(continueBtnText).toBe(
      `1/${mockConfigData['videoOptions'].length} Selected`
    );

    act(() => {
      userEvent.click(veryInterestedBtns[1]);
    });

    await waitFor(() => {});

    continueBtn = screen.getByRole('button', { name: /Selected/ });
    continueBtnText = continueBtn.innerHTML;
    expect(continueBtnText).toBe(
      `2/${mockConfigData['videoOptions'].length} Selected`
    );

    act(() => {
      userEvent.click(interestedBtns[1]);
    });

    await waitFor(() => {});

    continueBtn = screen.getByRole('button', { name: /Selected/ });
    continueBtnText = continueBtn.innerHTML;
    expect(continueBtnText).toBe(
      `2/${mockConfigData['videoOptions'].length} Selected`
    );

    act(() => {
      userEvent.click(notInterestedBtns[1]);
    });

    await waitFor(() => {});

    continueBtn = screen.getByRole('button', { name: /Selected/ });
    continueBtnText = continueBtn.innerHTML;
    expect(continueBtnText).toBe(
      `2/${mockConfigData['videoOptions'].length} Selected`
    );
  });

  it('should replace select btn with continue btn when all selections are made', async () => {
    const veryInterestedBtns = await screen.findAllByAltText(
      'very-interested-btn'
    );
    const interestedBtns = await screen.findAllByAltText('interested-btn');
    const notInterestedBtns = await screen.findAllByAltText(
      'not-interested-btn'
    );

    act(() => {
      userEvent.click(notInterestedBtns[0]);
    });

    await waitFor(() => {});

    act(() => {
      userEvent.click(interestedBtns[1]);
    });

    await waitFor(() => {});

    act(() => {
      userEvent.click(veryInterestedBtns[2]);
    });

    await waitFor(() => {});

    act(() => {
      userEvent.click(notInterestedBtns[3]);
    });

    await waitFor(() => {});

    const continueBtn = await screen.findByAltText('continue-button');
    expect(continueBtn).toBeInTheDocument();
  });

  it('should store user selections in redux state', async () => {
    const veryInterestedBtns = await screen.findAllByAltText(
      'very-interested-btn'
    );
    const interestedBtns = await screen.findAllByAltText('interested-btn');
    const notInterestedBtns = await screen.findAllByAltText(
      'not-interested-btn'
    );

    act(() => {
      userEvent.click(notInterestedBtns[0]);
    });

    await waitFor(() => {});

    act(() => {
      userEvent.click(interestedBtns[1]);
    });

    await waitFor(() => {});

    act(() => {
      userEvent.click(veryInterestedBtns[2]);
    });

    await waitFor(() => {});

    act(() => {
      userEvent.click(notInterestedBtns[3]);
    });

    await waitFor(() => {});

    const updatedState = mockStore.getState();
    const userSelectedVideos = updatedState.video.userSelection;
    expect(userSelectedVideos[0]).toBe('no');
    expect(userSelectedVideos[1]).toBe('short');
    expect(userSelectedVideos[2]).toBe('long');
    expect(userSelectedVideos[3]).toBe('no');
  });
});
