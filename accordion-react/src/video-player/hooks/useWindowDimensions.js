import { useState, useEffect } from 'react';

/**
 * Returns the innerWidth and innerHeight of the browser window
 *
 * @returns {object} Having properties width and height
 *
 */
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

/**
 * A hook that fetches and returns browser window size
 * when browser is resized.
 *
 * @returns {object} Having properties width and height
 */
export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    /**
     * Window resize event handler that sets the new
     * window dimensions to the hook state.
     */
    function handleWindowResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleWindowResize);

    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return windowDimensions;
}
