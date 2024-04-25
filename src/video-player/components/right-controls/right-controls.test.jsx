import { Provider } from 'react-redux';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import videoStore from './../../app/store';
import wait from '../../common/test-utils/wait';

describe('Right controls (buttons)', () => {
  const checkVideoUrlObj = require('./../../common/utils/checkVideoUrl');
  const mockCheckVideoUrl = jest.spyOn(checkVideoUrlObj, 'default');

  const VideoPlayer = require('./../video-player/video-player').default;

  it('should have the fullscreen button', async () => {
    mockCheckVideoUrl.mockReturnValue(null);

    render(
      <Provider store={videoStore}>
        <VideoPlayer width='630' url='some-url' />
      </Provider>
    );

    await waitFor(() => {});
    await wait();

    const fullScreenBtn = await screen.findByAltText('fullscreen');
    expect(fullScreenBtn).toBeInTheDocument();
  });

  it('should toggle between full screen and small screen icon when clicked', async () => {
    mockCheckVideoUrl.mockReturnValue(null);

    render(
      <Provider store={videoStore}>
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
