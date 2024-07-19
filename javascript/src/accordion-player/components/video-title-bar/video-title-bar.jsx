import { useRef } from 'react';
import { useSelector } from 'react-redux';

import VideoTitle from './video-title/video-title';
import VideoProgress from './video-progress/video-progress';
import styles from './video-title-bar.module.scss';
import {
  selectVideoWidth,
  selectIsVolumeSliderVisible,
  selectCurrentVideoName,
  selectCurrentVideoLabel,
  selectUserSelection,
} from '../../app/videoReducer';
import getScaledDimension from '../../common/utils/getScaledDimension';
import {
  TITLE_BAR_HEIGHT_LARGE,
  TITLE_BAR_HEIGHT_SMALL,
  TITLE_BAR_FONT_LARGE,
  TITLE_BAR_FONT_SMALL,
  LEFT_BUTTONS_HEIGHT_LARGE,
  LEFT_BUTTONS_HEIGHT_SMALL,
  TITLE_BAR_LEFT_PADDING_LARGE,
  TITLE_BAR_LEFT_PADDING_SMALL,
  TITLE_BAR_RIGHT_PADDING_LARGE,
  TITLE_BAR_RIGHT_PADDING_SMALL,
  LEFT_BUTTONS_LEFT_MARGIN_LARGE,
  LEFT_BUTTONS_LEFT_MARGIN_SMALL,
  LEFT_BUTTONS_WIDTH_LARGE,
  LEFT_BUTTONS_WIDTH_SMALL,
  LEFT_BUTTON_LEFT_MARGIN_LARGE,
  LEFT_BUTTON_LEFT_MARGIN_SMALL,
  RIGHT_CONTROL_BTNS_RIGHT_MARGIN_LARGE,
  RIGHT_CONTROL_BTNS_RIGHT_MARGIN_SMALL,
  VOLUME_SLIDER_WIDTH_LARGE,
  VOLUME_SLIDER_WIDTH_SMALL,
  TIME_LEFT_DEFAULT_WIDTH_LARGE,
  TIME_LEFT_DEFAULT_WIDTH_SMALL,
  LONG_VIDEO_WIDTH_LARGE,
  LONG_VIDEO_WIDTH_SMALL,
  SHORT_VIDEO_WIDTH_LARGE,
  SHORT_VIDEO_WIDTH_SMALL,
  VIDEO_BTN_MARGIN_LARGE,
  VIDEO_BTN_MARGIN_SMALL,
} from '../../common/constants';

/**
 * Displays title of video and video time
 *
 * @returns {ReactNode} Container with video title and video time
 */
export default function VideoTitleBar() {
  const progressRef = useRef();
  const videoWidth = useSelector(selectVideoWidth);
  const isVolumeSliderVisible = useSelector(selectIsVolumeSliderVisible);
  const currentVideoName = useSelector(selectCurrentVideoName);
  const currentVideoLabel = useSelector(selectCurrentVideoLabel);
  const userSelection = useSelector(selectUserSelection);

  const barHeight = getScaledDimension({
    smallDim: TITLE_BAR_HEIGHT_SMALL,
    largeDim: TITLE_BAR_HEIGHT_LARGE,
    videoWidth,
  });

  const fontSize = getScaledDimension({
    smallDim: TITLE_BAR_FONT_SMALL,
    largeDim: TITLE_BAR_FONT_LARGE,
    videoWidth,
  });

  const controlBarHeight = getScaledDimension({
    smallDim: LEFT_BUTTONS_HEIGHT_SMALL,
    largeDim: LEFT_BUTTONS_HEIGHT_LARGE,
    videoWidth,
  });

  const leftPadding = getScaledDimension({
    smallDim: TITLE_BAR_LEFT_PADDING_SMALL,
    largeDim: TITLE_BAR_LEFT_PADDING_LARGE,
    videoWidth,
  });

  const rightPadding = getScaledDimension({
    smallDim: TITLE_BAR_RIGHT_PADDING_SMALL,
    largeDim: TITLE_BAR_RIGHT_PADDING_LARGE,
    videoWidth,
  });

  const controlBtnWidth = getScaledDimension({
    smallDim: LEFT_BUTTONS_WIDTH_SMALL,
    largeDim: LEFT_BUTTONS_WIDTH_LARGE,
    videoWidth,
  });

  const leftControlsLeftMargin = getScaledDimension({
    smallDim: LEFT_BUTTONS_LEFT_MARGIN_SMALL,
    largeDim: LEFT_BUTTONS_LEFT_MARGIN_LARGE,
    videoWidth,
  });

  const leftControlBtnLeftMargin = getScaledDimension({
    smallDim: LEFT_BUTTON_LEFT_MARGIN_SMALL,
    largeDim: LEFT_BUTTON_LEFT_MARGIN_LARGE,
    videoWidth,
  });

  const volumeSliderWidth = getScaledDimension({
    smallDim: VOLUME_SLIDER_WIDTH_SMALL,
    largeDim: VOLUME_SLIDER_WIDTH_LARGE,
    videoWidth,
  });

  const rightControlsRightMargin = getScaledDimension({
    smallDim: RIGHT_CONTROL_BTNS_RIGHT_MARGIN_SMALL,
    largeDim: RIGHT_CONTROL_BTNS_RIGHT_MARGIN_LARGE,
    videoWidth,
  });

  const progressDefaultWidth = getScaledDimension({
    smallDim: TIME_LEFT_DEFAULT_WIDTH_SMALL,
    largeDim: TIME_LEFT_DEFAULT_WIDTH_LARGE,
    videoWidth,
  });

  const fontSpaceCorrection = 4.0;
  const topMargin = (controlBarHeight - barHeight) / 2;
  const topPadding = (barHeight - fontSize - fontSpaceCorrection) / 2;

  let totalElWidth = 0;
  totalElWidth += leftControlsLeftMargin;
  totalElWidth += leftControlBtnLeftMargin + controlBtnWidth; // play button
  totalElWidth += leftControlBtnLeftMargin + controlBtnWidth; // rewind button
  totalElWidth += leftControlBtnLeftMargin + controlBtnWidth; // volume button
  if (isVolumeSliderVisible) {
    totalElWidth += volumeSliderWidth; // volume slider
  }
  totalElWidth += leftControlBtnLeftMargin / 2; // left margin for title bar
  totalElWidth += leftControlBtnLeftMargin + controlBtnWidth; // fullscreen button
  totalElWidth += rightControlsRightMargin; // right margin for right controls button

  if (
    currentVideoLabel !== null &&
    currentVideoLabel.includes('videoOptions')
  ) {
    const noOfLongVideos = userSelection.filter((el) => el === 'long').length;
    const noOfShortVideos = userSelection.filter((el) => el === 'short').length;

    let selectorWidthLarge = 0;
    let selectorWidthSmall = 0;

    selectorWidthLarge += noOfLongVideos * LONG_VIDEO_WIDTH_LARGE;
    selectorWidthSmall += noOfLongVideos * LONG_VIDEO_WIDTH_SMALL;
    selectorWidthLarge += noOfShortVideos * SHORT_VIDEO_WIDTH_LARGE;
    selectorWidthSmall += noOfShortVideos * SHORT_VIDEO_WIDTH_SMALL;

    selectorWidthLarge +=
      (noOfLongVideos + noOfShortVideos) * VIDEO_BTN_MARGIN_LARGE;
    selectorWidthSmall +=
      (noOfLongVideos + noOfShortVideos) * VIDEO_BTN_MARGIN_SMALL;

    selectorWidthLarge += VIDEO_BTN_MARGIN_LARGE;
    selectorWidthSmall += VIDEO_BTN_MARGIN_SMALL;

    const selectorWidth = getScaledDimension({
      smallDim: selectorWidthSmall,
      largeDim: selectorWidthLarge,
      videoWidth,
    });

    totalElWidth += selectorWidth;
  }

  let progressWidth = 0;
  if (progressRef.current) {
    // Width of video time + right/left margin of time div
    // + margin between title and time
    progressWidth =
      2.5 * leftControlBtnLeftMargin + progressRef.current.clientWidth;
  } else {
    progressWidth = progressDefaultWidth;
  }

  const maxWidth = videoWidth - totalElWidth;

  const maxTitleWidth = maxWidth - progressWidth;

  const style = {
    marginTop: `${topMargin}px`,
    marginBottom: `${topMargin}px`,
    padding: `${topPadding}px ${rightPadding}px ${topPadding}px ${leftPadding}px`,
    fontSize: `${fontSize}px`,
    maxWidth: `${maxWidth}px`,
  };

  const videoTitle = currentVideoName ? currentVideoName : '';

  const isSelectVideo = currentVideoLabel === 'selectInfo';

  return !isSelectVideo ? (
    <div className={styles.VideoTitleBar} style={style}>
      <VideoTitle title={videoTitle} width={maxTitleWidth} />
      <VideoProgress ref={progressRef} />
    </div>
  ) : null;
}
