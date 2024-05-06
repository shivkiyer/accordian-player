import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ControlBar from '../control-bar/control-bar';
import wait from '../../common/test-utils/wait';

describe('Right controls (buttons)', () => {
  const mockVideoPlayer = (props) => {
    return <ControlBar />
  }
  jest.mock('./../video-player/video-player', () => mockVideoPlayer);

  const AccordionPlayer = require('./../accordion-player/accordion-player').default;

  it('should have the fullscreen button', async () => {
    render(
      <AccordionPlayer width='630' url='some-url' />
    );

    await waitFor(() => {});
    await wait();

    const fullScreenBtn = await screen.findByAltText('fullscreen');
    expect(fullScreenBtn).toBeInTheDocument();
  });

  it('should toggle between full screen and small screen icon when clicked', async () => {
    render(
      <AccordionPlayer width='630' url='some-url' />
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
