import { useEffect, useState, useRef } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import getVideoDimensions from '../../common/utils/getVideoDimensions';
import getScaledDimension from '../../common/utils/getScaledDimension';
import checkVideoUrl from '../../common/utils/checkVideoUrl';
import ControlBar from '../control-bar/control-bar';
import PlayerConfig from '../player-config/player-config';
import Video from './video/video';
import SelectionPanel from '../selection-panel/selection-panel';
import PlayerProps from '../../models/player';
import {
  setDimensions,
  setIsVolumeChanging,
  setVideoUrl,
  setIsVideoPositionChanging,
  setVolumeMousePositionX,
  setProgressMousePositionX,
  setControlBarVisible,
  toggleFullScreen,
  setIsButtonFullScreen,
  playPauseVideo,
  setCurrentVideoLabel,
  setBackgroundImageUrl,
  setCurrentVideoName,
  setVideoData,
  setIsMobile,
  selectVideoUrl,
  selectIsControlBarVisible,
  selectIsControlBarActive,
  selectIsVolumeChanging,
  selectIsVideoPositionChanging,
  selectPrevIsPlaying,
  selectIsFullScreen,
  selectIsBtnFullScreen,
  selectIsSelectPanelVisible,
} from '../../app/videoReducer';
import { goFullscreen, exitFullscreen } from '../../common/utils/videoActions';
import {
  CONFIG_TEXT_SMALL,
  CONFIG_TEXT_LARGE,
  MOBILE_DEVICE_WIDTH,
} from '../../common/constants';
import styles from './video-player.module.css';

/**
 * Container for the video and user controls that has either
 * a specified width or height, or scales according to the
 * browser window size. Will either take the video URL as an
 * input or will display a text input to the user to enter a URL.
 *
 * @param {number} width The width of the container (optional)
 * @param {number} height The height of the container (optional)
 * @param {string} url The URL of the video (optional)
 * @param {string} name Title of the video
 *
 * @returns {ReactNode} A react element with fixed height and width
 *
 * @component
 * @example
 * Use with only width to produce container of fixed width
 * <Video Player width="300" />
 *
 * @component
 * @example
 * Use with only height to produce container of fixed height
 * <Video Player height="300" />
 *
 * @component
 * @example
 * Use without any inputs to scale to browser window
 * <Video Player />
 *
 */
export default function VideoPlayer({ width, height, url, name }: PlayerProps) {
  return <p>Video Player</p>;
}
