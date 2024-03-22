import { Provider } from 'react-redux';

import VideoPlayer from '../video-player/video-player';
import videoStore from './../../app/store';

/**
 * Root Accordion Player component
 * 
 * @returns {ReactNode} The Accordion Video Player
 */
export default function AccordionPlayer() {
  return (
    <Provider store={videoStore}>
      <VideoPlayer />
    </Provider>
  );
}
