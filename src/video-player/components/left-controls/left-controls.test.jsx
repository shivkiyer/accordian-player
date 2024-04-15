import { Provider } from 'react-redux';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';

import VideoPlayer from '../video-player/video-player';
import videoStore from './../../app/store';

describe('LeftControls (buttons)', () => {
  it('should display the left control buttons', () => {
    render(
      <Provider store={videoStore}>
        <VideoPlayer width='630' />
      </Provider>
    );

    const playBtn = screen.getByAltText('play');
    expect(playBtn).toBeInTheDocument();
    const rewindBtn = screen.getByAltText('rewind');
    expect(rewindBtn).toBeInTheDocument();
    const volumeBtn = screen.getByAltText('volume');
    expect(volumeBtn).toBeInTheDocument();
  });

    it('should toggle between play btn and pause btn upon click', async () => {
      render(
        <Provider store={videoStore}>
          <VideoPlayer width='630' />
        </Provider>
      );

      const playBtn1 = screen.getByAltText('play');

      act(() => {
        userEvent.click(playBtn1);
      });


      const pauseBtn1 = await screen.findByAltText('pause');
      expect(pauseBtn1).toBeInTheDocument();

      act(() => {
        userEvent.click(pauseBtn1);
      });

      const playBtn2 = await screen.findByAltText('play');
      expect(playBtn2).toBeInTheDocument();
    });

  it('should toggle volume controls upon hover the volume icon', async () => {
    render(
      <Provider store={videoStore}>
        <VideoPlayer width='630' />
      </Provider>
    );

    const volumeBtn = screen.getByAltText('volume');
    act(() => {
      userEvent.hover(volumeBtn);
    });

    const volumeRail1 = await screen.findByAltText('volume-rail');
    expect(volumeRail1).toBeInTheDocument();
    const volumeHandle1 = await screen.findByAltText('volume-handle');
    expect(volumeHandle1).toBeInTheDocument();

    act(() => {
      userEvent.unhover(volumeBtn);
    });

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
      <Provider store={videoStore}>
        <VideoPlayer width='630' />
      </Provider>
    );
    const volumeBtn1 = screen.getByAltText('volume');
    act(() => {
      userEvent.click(volumeBtn1);
    });

    const volumeMuteBtn1 = await screen.findByAltText('volume');
    expect(volumeMuteBtn1).toHaveAttribute('src', 'volume_icon_mute.svg');

    act(() => {
      userEvent.click(volumeMuteBtn1);
    });

    const volumeBtn2 = await screen.findByAltText('volume');
    expect(volumeBtn2).toHaveAttribute('src', 'volume_icon.svg');
  });
});
