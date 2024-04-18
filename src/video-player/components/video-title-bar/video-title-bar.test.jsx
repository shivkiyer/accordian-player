import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';

import VideoPlayer from './../video-player/video-player';
import videoStore from './../../app/store';

describe('VideoTitleBar', () => {
  it('should display the video title and video progress', () => {
    render(
      <Provider store={videoStore}>
        <VideoPlayer width='630' />
      </Provider>
    );
    const videoTitleEl = screen.getByTestId('test-video-title');
    expect(videoTitleEl).toBeInTheDocument();
    const videoProgressEl = screen.getByTestId('test-video-progress');
    expect(videoProgressEl).toBeInTheDocument();
  });
});
