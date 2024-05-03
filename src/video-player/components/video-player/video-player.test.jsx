import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import wait from '../../common/test-utils/wait';

/**
 * Test for VideoPlayer container
 */
describe('VideoPlayer', () => {
  const checkVideoUrlObj = require('./../../common/utils/checkVideoUrl');
  const mockCheckVideoUrl = jest.spyOn(checkVideoUrlObj, 'default');

  const AccordionPlayer =
    require('./../accordion-player/accordion-player').default;

  it('should be rendered', async () => {
    mockCheckVideoUrl.mockReturnValue(null);

    const { container } = render(<AccordionPlayer width='300' />);

    await waitFor(() => {});
    await wait();

    const videoPlayer = container.querySelector('.videoPlayer');
    expect(videoPlayer).toBeDefined();
  });

  it('should prompt user for video URL and then start with video', async () => {
    mockCheckVideoUrl.mockReturnValue(null);

    render(<AccordionPlayer />);

    await waitFor(() => {});
    await wait();

    const videoUrlEl = await screen.findByPlaceholderText('Enter URL here');
    expect(videoUrlEl).toBeInTheDocument();

    await act(async () => {
      await userEvent.type(videoUrlEl, 'some-url');
    });

    await waitFor(() => {});
    await wait();

    const fullScreenBtn = await screen.findByAltText('fullscreen');
    expect(fullScreenBtn).toBeInTheDocument();
  });
});
