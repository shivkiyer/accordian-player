import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import VideoPlayer from './../video-player/video-player';
import videoStore from './../../app/store';

/**
 * Test for the Progress Bar to be
 * - one unit square from the top of the control bar
 * - and have one unit square space on either side
 */
describe('ProgressBar', () => {
  it('should be placed at the top of the control bar', () => {
    const { container } = render(
      <Provider store={videoStore}>
        <VideoPlayer width='630' />
      </Provider>
    );

    const progressBarEl = container.querySelector('.ProgressBar');
    expect(progressBarEl).toBeDefined();
    expect(progressBarEl).toHaveStyle('margin-top: 12.75px');
    expect(progressBarEl).toHaveStyle('margin-left: 15.75px');
    expect(progressBarEl).toHaveStyle('margin-right: 15.75px');
  });
});
