import { useState, useEffect } from 'react';

/** Returns the innerWidth and innerHeight of the browser window  */
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

/** Fetches and returns browser window size when browser is resized */
export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    /** Updates browser window dimensions */
    function handleWindowResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleWindowResize);
  }, []);

  return windowDimensions;
}
