import { useSelector, useDispatch } from 'react-redux';

import {
  selectVideoWidth,
  selectUserSelection,
  selectVideoData,
  selectCurrentVideoLabel,
  setCurrentVideoLabel,
  setVideoUrl,
  setCurrentVideoName,
  playPauseVideo,
} from '../../../app/videoReducer';
import {
  CONTINUE_BTN_WIDTH_LARGE,
  CONTINUE_BTN_WIDTH_SMALL,
  CONTINUE_BTN_HEIGHT_LARGE,
  CONTINUE_BTN_HEIGHT_SMALL,
  CONTINUE_BTN_SPACE_BELOW_SMALL,
  CONTINUE_BTN_SPACE_BELOW_LARGE,
  SELECT_TEXT_FONT_LARGE,
  SELECT_TEXT_FONT_SMALL,
} from '../../../common/constants';
import getScaledDimension from '../../../common/utils/getScaledDimension';
import getNextVideoData from '../../../common/utils/getNextVideoData';
import continueBtn from './../../../assets/images/continue_button.svg';
import styles from './continue-button.module.scss';

export default function ContinueButton() {
  const dispatch = useDispatch();
  const videoWidth = useSelector(selectVideoWidth);
  const userSelection = useSelector(selectUserSelection);
  const videoData = useSelector(selectVideoData);
  const currentVideoLabel = useSelector(selectCurrentVideoLabel);

  const btnWidth = getScaledDimension({
    smallDim: CONTINUE_BTN_WIDTH_SMALL,
    largeDim: CONTINUE_BTN_WIDTH_LARGE,
    videoWidth,
  });

  const btnHeight = getScaledDimension({
    smallDim: CONTINUE_BTN_HEIGHT_SMALL,
    largeDim: CONTINUE_BTN_HEIGHT_LARGE,
    videoWidth,
  });

  const btnSpaceBelow = getScaledDimension({
    smallDim: CONTINUE_BTN_SPACE_BELOW_SMALL,
    largeDim: CONTINUE_BTN_SPACE_BELOW_LARGE,
    videoWidth,
  });

  const selectedTextSize = getScaledDimension({
    smallDim: SELECT_TEXT_FONT_SMALL,
    largeDim: SELECT_TEXT_FONT_LARGE,
    videoWidth,
  });

  const btnLeftSpace = (window.innerWidth - btnWidth) / 2;

  const disableBtn = userSelection.includes(null);

  const noOfItems =
    userSelection.length - userSelection.filter((el) => el === null).length;

  const btnStyle = {
    width: `${btnWidth}px`,
    height: `${btnHeight}px`,
    bottom: `${btnSpaceBelow}px`,
    left: `${btnLeftSpace}px`,
  };

  const selectedTextStyle = {
    ...btnStyle,
    fontSize: `${selectedTextSize}px`,
  };

  /**
   * Continue with the user choice videos
   */
  const continueHandler = () => {
    const nextVideoData = getNextVideoData(
      videoData,
      currentVideoLabel,
      userSelection
    );
    if (nextVideoData !== null) {
      dispatch(setCurrentVideoLabel(nextVideoData.label));
      dispatch(setVideoUrl(nextVideoData.url));
      dispatch(setCurrentVideoName(nextVideoData.name));
      dispatch(playPauseVideo('paused'));
    }
  };

  return (
    <div className={styles.ContinueButton} style={btnStyle}>
      {disableBtn ? (
        <button className={styles.SelectButton} style={selectedTextStyle}>
          {noOfItems}/{userSelection.length} Selected
        </button>
      ) : (
        <img
          src={continueBtn}
          alt='continue-button'
          onClick={continueHandler}
        />
      )}
    </div>
  );
}
