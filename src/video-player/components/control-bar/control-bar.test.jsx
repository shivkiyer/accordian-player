import { render, waitFor, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import videoStore from '../../app/store';

/**
 * Test for creation of control bar
 * within the video player container
 */
describe('ControlBar', () => {
  const checkVideoUrlObj = require('./../../common/utils/checkVideoUrl');
  const mockCheckVideoUrl = jest.spyOn(checkVideoUrlObj, 'default');

  const VideoPlayer = require('../video-player/video-player').default;

  it('should produce a control bar of 64px height if video is 630px wide (design)', async () => {
    // Url checking method will not return error message
    mockCheckVideoUrl.mockReturnValue(null);
    render(
      <Provider store={videoStore}>
        <VideoPlayer width='630' url='some-url' />
      </Provider>
    );

    await waitFor(() => {});

    const controlBar = await screen.findByTestId('test-control-bar');
    expect(controlBar).toBeInTheDocument();
    expect(controlBar).toHaveStyle('height: 64px');
  });

  it('should not produce a control bar if video url is not a url', async () => {
    // Url checking method will return error message
    mockCheckVideoUrl.mockReturnValue('Not a url');
    render(
      <Provider store={videoStore}>
        <VideoPlayer width='630' url='some-url' />
      </Provider>
    );

    await waitFor(() => {});

    const controlBar = screen.queryByTestId('test-control-bar');
    expect(controlBar).not.toBeInTheDocument();

    const errorMessage = await screen.findByText('Not a url');
    expect(errorMessage).toBeInTheDocument();
  });

  it('should not produce a control bar if video url cannot be fetched', async () => {
    // Url checking method will return error message
    mockCheckVideoUrl.mockReturnValue(
      new Promise((reject) => {
        setTimeout(() => reject('Cannot be fetched'), 300);
      })
    );
    render(
      <Provider store={videoStore}>
        <VideoPlayer width='630' url='some-url' />
      </Provider>
    );

    await waitFor(() => {});

    const controlBar = screen.queryByTestId('test-control-bar');
    expect(controlBar).not.toBeInTheDocument();

    const errorMessage = await screen.findByText('Cannot be fetched');
    expect(errorMessage).toBeInTheDocument();
  });
});
