import { Provider } from 'react-redux';

import VideoPlayer from './components/video-player/video-player';
import videoStore from './app/store';
import './assets/styles/index.css';

/**
 * Root Accordion Player component
 *
 * @param {number} width Width of the player in px (optional)
 * @param {number} height Height of the player in px (optional)
 * @param {string} url URL of video or config file (optional)
 *
 * @returns {ReactNode} The Accordion Video Player
 *
 * @example
 * <AccordionPlayer />
 *
 * @example
 * <AccordionPlayer width='480' />
 *
 * @example
 * <AccordionPlayer height='520' />
 *
 * @example
 * <AccordionPlayer url='http://someurl.com' />
 *
 * @example
 * <AccordionPlayer width='630' url='http://someurl.com' />
 *
 */
export default function AccordionPlayer({ width, height, url }) {
  return (
    <Provider store={videoStore}>
      <VideoPlayer width={width} height={height} url={url} />
    </Provider>
  );
}
