import { render, waitFor, screen, fireEvent } from '@testing-library/react';

/**
 * Test for creation of control bar
 * within the video player container
 */
describe('ControlBar', () => {
  const checkVideoUrlObj = require('./../../common/utils/checkVideoUrl');
  const mockCheckVideoUrl = jest.spyOn(checkVideoUrlObj, 'default');

  jest.mock('./../../common/utils/videoActions', () => {
    return {
      loadVideo: jest.fn(),
    };
  });

  const AccordionPlayer =
    require('./../accordion-player/accordion-player').default;

  it('should produce a control bar of 64px height if video is 630px wide (design)', async () => {
    // Url checking method will not return error message
    mockCheckVideoUrl.mockReturnValue(
      Promise.resolve({ errMsg: null, data: 'some-url' })
    );
    render(<AccordionPlayer width='630' url='some-url' />);

    await waitFor(() => {});

    // Control bar will show only when mouse enters video
    const videoEl = await screen.findByTestId('test-video');

    await waitFor(() => {
      fireEvent.mouseEnter(videoEl);
      fireEvent.mouseMove(videoEl);
      const controlBar = screen.getByTestId('test-control-bar');
      expect(controlBar).toBeInTheDocument();
      expect(controlBar).toHaveStyle('height: 64px');
    });
  });

  it('should not produce a control bar if video url is not a url', async () => {
    // Url checking method will return error message
    mockCheckVideoUrl.mockReturnValue(
      Promise.reject({ errMsg: 'Not a url', data: null })
    );
    render(<AccordionPlayer width='630' url='some-url' />);

    await waitFor(() => {});

    const controlBar = screen.queryByTestId('test-control-bar');
    expect(controlBar).not.toBeInTheDocument();

    const errorMessage = await screen.findByText('Not a url');
    expect(errorMessage).toBeInTheDocument();
  });

  it('should not produce a control bar if video url cannot be fetched', async () => {
    // Url checking method will return error message
    mockCheckVideoUrl.mockReturnValue(
      new Promise((resolve, reject) => {
        setTimeout(
          () => reject({ errMsg: 'Cannot be fetched', data: null }),
          300
        );
      })
    );
    render(<AccordionPlayer width='630' url='some-url' />);

    await waitFor(() => {});

    const controlBar = screen.queryByTestId('test-control-bar');
    expect(controlBar).not.toBeInTheDocument();

    const errorMessage = await screen.findByText('Cannot be fetched');
    expect(errorMessage).toBeInTheDocument();
  });
});
