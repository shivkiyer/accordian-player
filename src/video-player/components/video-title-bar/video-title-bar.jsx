import { useSelector } from 'react-redux';

import VideoTitle from './video-title/video-title';
import VideoProgress from './video-progress/video-progress';
import styles from './video-title.module.scss';
import { selectVideoWidth } from '../../app/videoReducer';
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
} from '../../common/constants';

export default function VideoTitleBar() {
  const videoWidth = useSelector(selectVideoWidth);

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

  const fontSpaceCorrection = 4.0;
  const topMargin = (controlBarHeight - barHeight) / 2;
  const topPadding = (barHeight - fontSize - fontSpaceCorrection) / 2;

  const style = {
    marginTop: `${topMargin}px`,
    marginBottom: `${topMargin}px`,
    padding: `${topPadding}px ${rightPadding}px ${topPadding}px ${leftPadding}px`,
    fontSize: `${fontSize}px`,
  };

  return (
    <div className={styles.VideoTitleBar} style={style}>
      <VideoTitle title='Some title' />
      <VideoProgress />
    </div>
  );
}
