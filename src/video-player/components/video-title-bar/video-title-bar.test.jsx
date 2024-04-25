import { Provider } from 'react-redux';
import { render, screen, waitFor } from '@testing-library/react';

import videoStore from './../../app/store';

describe('VideoTitleBar', () => {
  const checkVideoUrlObj = require('./../../common/utils/checkVideoUrl');
  const mockCheckVideoUrl = jest.spyOn(checkVideoUrlObj, 'default');

  const VideoPlayer = require('./../video-player/video-player').default;

  it('should display the video title and video progress', async () => {
    mockCheckVideoUrl.mockReturnValue(null);

    render(
      <Provider store={videoStore}>
        <VideoPlayer width='630' url='some-url' />
      </Provider>
    );

    await waitFor(() => {});

    const videoTitleEl = await screen.findByTestId('test-video-title');
    expect(videoTitleEl).toBeInTheDocument();
    const videoProgressEl = screen.getByTestId('test-video-progress');
    expect(videoProgressEl).toBeInTheDocument();
  });
});
