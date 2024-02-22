import { useState, useEffect } from 'react';

function getWindowDimensions() {
  /** Returns the innerWidth and innerHeight of the browser window  */
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export default function useWindowDimensions() {
  /** Fetches and returns browser window size when browser is resized */
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleWindowResize() {
      /** Updates browser window dimensions */
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleWindowResize);
  }, []);

  return windowDimensions;
}