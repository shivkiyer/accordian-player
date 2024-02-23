import { render, fireEvent, screen } from '@testing-library/react';

import useWindowDimensions from '../useWindowDimensions';

/**
 * Test for the custom hook useWindowDimensions
 * which returns the dimensions of the browser window
 */
describe('useWindowDimensions', () => {
  let TestComponent;

  beforeEach(() => {
    TestComponent = () => {
      const dimensions = useWindowDimensions();

      return (
        <div data-testid='test-video-player' style={{ ...dimensions }}></div>
      );
    };
  });

  it('should produce a default window of 1024px x 768px', () => {
    render(<TestComponent />);

    const videoWindow = screen.getAllByTestId('test-video-player');
    expect(videoWindow[0]).toHaveStyle('width: 1024px');
    expect(videoWindow[0]).toHaveStyle('height: 768px');
  });

  it('should return latest window dimensions when window is resized', () => {
    render(<TestComponent />);

    let videoWindow;

    window = Object.assign(window, { innerWidth: 2000 });
    fireEvent(window, new Event('resize'));
    videoWindow = screen.getAllByTestId('test-video-player');
    expect(videoWindow[0]).toHaveStyle('width: 2000px');
    expect(videoWindow[0]).toHaveStyle('height: 768px');

    window = Object.assign(window, { innerHeight: 1000 });
    fireEvent(window, new Event('resize'));
    videoWindow = screen.getAllByTestId('test-video-player');
    expect(videoWindow[0]).toHaveStyle('width: 2000px');
    expect(videoWindow[0]).toHaveStyle('height: 1000px');
  });
});
