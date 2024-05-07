import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';

import wait from '../../common/test-utils/wait';

describe('VideoTitleBar', () => {
  const checkVideoUrlObj = require('./../../common/utils/checkVideoUrl');
  const mockCheckVideoUrl = jest.spyOn(checkVideoUrlObj, 'default');

  const AccordionPlayer =
    require('./../accordion-player/accordion-player').default;

  it('should display the video title and video progress', async () => {
    mockCheckVideoUrl.mockReturnValue(
      Promise.resolve({ errMsg: null, data: 'some-url' })
    );

    render(<AccordionPlayer width='630' url='some-url' />);

    await waitFor(() => {});

    // Control bar will show only when mouse enters video
    const videoEl = await screen.findByTestId('test-video');
    act(() => {
      fireEvent.mouseMove(videoEl)
    });

    await wait();

    const videoTitleEl = await screen.findByTestId('test-video-title');
    expect(videoTitleEl).toBeInTheDocument();
    const videoProgressEl = screen.getByTestId('test-video-progress');
    expect(videoProgressEl).toBeInTheDocument();
  });
});
