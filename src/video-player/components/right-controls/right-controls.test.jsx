import { Provider } from 'react-redux';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import VideoPlayer from './../video-player/video-player';
import videoStore from './../../app/store';

describe('Right controls (buttons)', () => {
  it('should have the fullscreen button', () => {
    render(
      <Provider store={videoStore}>
        <VideoPlayer width='630' url='some-url' />
      </Provider>
    );

    const fullScreenBtn = screen.getByAltText('fullscreen');
    expect(fullScreenBtn).toBeInTheDocument();
  });

  it('should toggle between full screen and small screen icon when clicked', async () => {
    render(
      <Provider store={videoStore}>
        <VideoPlayer width='630' url='some-url' />
      </Provider>
    );

    const fullScreenBtn1 = screen.getByAltText('fullscreen');
    act(() => {
      userEvent.click(fullScreenBtn1);
    });

    const smallScreenBtn1 = await screen.findByAltText('fullscreen');
    expect(smallScreenBtn1).toHaveAttribute('src', 'small_screen_icon.svg');

    act(() => {
      userEvent.click(smallScreenBtn1);
    });

    const fullScreenBtn2 = await screen.findByAltText('fullscreen');
    expect(fullScreenBtn2).toHaveAttribute('src', 'full_screen_icon.svg');
  });
});
