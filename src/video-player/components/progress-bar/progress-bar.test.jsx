import { render, waitFor, screen } from '@testing-library/react';

/**
 * Test for the Progress Bar to be
 * - one unit square from the top of the control bar
 * - and have one unit square space on either side
 */
describe('ProgressBar', () => {
  jest.mock('./../../common/utils/checkVideoUrl', () => {
    return () => Promise.resolve(null);
  });

  const AccordionPlayer =
    require('./../accordion-player/accordion-player').default;

  it('should be placed at the top of the control bar', async () => {
    render(<AccordionPlayer width='630' url='some-url' />);

    await waitFor(() => {});

    const progressBarEl = await screen.findByTestId('test-progress-bar');
    expect(progressBarEl).toBeInTheDocument();
    expect(progressBarEl).toHaveStyle('margin-left: 15.75px');
    expect(progressBarEl).toHaveStyle('margin-right: 15.75px');
  });
});
