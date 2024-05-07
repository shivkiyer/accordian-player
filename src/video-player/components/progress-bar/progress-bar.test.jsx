import { render, waitFor, screen, act, fireEvent } from '@testing-library/react';

import wait from '../../common/test-utils/wait';

/**
 * Test for the Progress Bar to be
 * - one unit square from the top of the control bar
 * - and have one unit square space on either side
 */
describe('ProgressBar', () => {
  jest.mock('./../../common/utils/checkVideoUrl', () => {
    return () =>
      Promise.resolve({
        errMsg: null,
        data: 'some-url',
      });
  });

  const AccordionPlayer =
    require('./../accordion-player/accordion-player').default;

  it('should be placed at the top of the control bar', async () => {
    render(<AccordionPlayer width='630' url='some-url' />);

    await waitFor(() => {});

    // Control bar will show only when mouse enters video
    const videoEl = await screen.findByTestId('test-video');
    act(() => {
      fireEvent.mouseMove(videoEl)
    });

    await wait();

    const progressBarEl = await screen.findByTestId('test-progress-bar');
    expect(progressBarEl).toBeInTheDocument();
    expect(progressBarEl).toHaveStyle('margin-left: 15.75px');
    expect(progressBarEl).toHaveStyle('margin-right: 15.75px');
  });
});
