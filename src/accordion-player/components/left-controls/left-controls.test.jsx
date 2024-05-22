import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';

import videoStore from './../../app/store';
import videoReducer from '../../app/videoReducer';
import wait from '../../common/test-utils/wait';

describe('LeftControls (buttons)', () => {
  jest.mock('./../../common/utils/videoActions', () => {
    return {
      loadVideo: jest.fn(),
      playVideo: jest.fn(),
    };
  });

  jest.mock('./../../common/utils/checkVideoUrl', () => {
    return () => Promise.resolve({ errMsg: null, data: 'some-url' });
  });

  let updatedState = JSON.parse(JSON.stringify(videoStore.getState()));
  updatedState.video.isControlBarVisible = true;
  const updatedStore = configureStore({
    reducer: { video: videoReducer },
    preloadedState: updatedState,
  });

  const VideoPlayer = require('./../video-player/video-player').default;

  it('should display the left control buttons', async () => {
    render(
      <Provider store={updatedStore}>
        <VideoPlayer width='630' url='some-url' />
      </Provider>
    );

    const playBtn = await screen.findByAltText('play');
    expect(playBtn).toBeInTheDocument();
    const rewindBtn = await screen.findByAltText('rewind');
    expect(rewindBtn).toBeInTheDocument();
    const volumeBtn = await screen.findByAltText('volume');
    expect(volumeBtn).toBeInTheDocument();
  });

  it('should toggle between play btn and pause btn upon click', async () => {
    render(
      <Provider store={updatedStore}>
        <VideoPlayer width='630' url='some-url' />
      </Provider>
    );

    await waitFor(() => {});

    const playBtn1 = await screen.findByAltText('play');

    await act(async () => {
      await userEvent.click(playBtn1);
    });

    await waitFor(() => {});
    await wait();

    const pauseBtn1 = await screen.findByAltText('pause');
    expect(pauseBtn1).toBeInTheDocument();

    await act(async () => {
      await userEvent.click(pauseBtn1);
    });

    await waitFor(() => {});
    await wait();

    const playBtn2 = await screen.findByAltText('play');
    expect(playBtn2).toBeInTheDocument();
  });

  it('should toggle volume controls upon hover the volume icon', async () => {
    render(
      <Provider store={updatedStore}>
        <VideoPlayer width='630' url='some-url' />
      </Provider>
    );

    await waitFor(() => {});

    const volumeBtn = await screen.findByAltText('volume');
    await act(async () => {
      await userEvent.hover(volumeBtn);
    });

    await waitFor(() => {});
    await wait();

    const volumeRail1 = await screen.findByAltText('volume-rail');
    expect(volumeRail1).toBeInTheDocument();
    const volumeHandle1 = await screen.findByAltText('volume-handle');
    expect(volumeHandle1).toBeInTheDocument();

    await act(async () => {
      await userEvent.unhover(volumeBtn);
    });

    await waitFor(() => {});
    await wait();

    let volumeRail2 = null;
    try {
      volumeRail2 = await screen.findByAltText('volume-rail');
    } catch (error) {}
    expect(volumeRail2).toBeNull();

    let volumeHandle2 = null;
    try {
      volumeHandle2 = await screen.findByAltText('volume-handle');
    } catch (error) {}
    expect(volumeHandle2).toBeNull();
  });

  it('should toggle volume icon to mute and back when volume icon is clicked', async () => {
    render(
      <Provider store={updatedStore}>
        <VideoPlayer width='630' url='some-url' />
      </Provider>
    );

    await waitFor(() => {});

    const volumeBtn1 = await screen.findByAltText('volume');
    await act(async () => {
      await userEvent.click(volumeBtn1);
    });

    await waitFor(() => {});
    await wait();

    const volumeMuteBtn1 = await screen.findByAltText('volume');
    expect(volumeMuteBtn1).toHaveAttribute('src', 'volume_icon_mute.svg');

    await act(async () => {
      await userEvent.click(volumeMuteBtn1);
    });

    await waitFor(() => {});
    await wait();

    const volumeBtn2 = await screen.findByAltText('volume');
    expect(volumeBtn2).toHaveAttribute('src', 'volume_icon.svg');
  });
});
