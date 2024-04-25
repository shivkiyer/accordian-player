import { render, waitFor, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import videoStore from './../../app/store';

/**
 * Test for the Progress Bar to be
 * - one unit square from the top of the control bar
 * - and have one unit square space on either side
 */
describe('ProgressBar', () => {
  const checkVideoUrlObj = require('./../../common/utils/checkVideoUrl');
  const mockCheckVideoUrl = jest.spyOn(checkVideoUrlObj, 'default');

  const VideoPlayer = require('./../video-player/video-player').default;

  it('should be placed at the top of the control bar', async () => {
    mockCheckVideoUrl.mockReturnValue(null);

    render(
      <Provider store={videoStore}>
        <VideoPlayer width='630' url='some-url' />
      </Provider>
    );

    await waitFor(() => {});

    const progressBarEl = await screen.findByTestId('test-progress-bar');
    expect(progressBarEl).toBeInTheDocument();
    expect(progressBarEl).toHaveStyle('margin-top: 12.75px');
    expect(progressBarEl).toHaveStyle('margin-left: 15.75px');
    expect(progressBarEl).toHaveStyle('margin-right: 15.75px');
  });
});
