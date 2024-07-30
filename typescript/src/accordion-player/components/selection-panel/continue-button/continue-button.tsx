import { useAppSelector, useAppDispatch } from '../../../app/hooks';
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
import styles from './continue-button.module.css';

export default function ContinueButton() {
  const dispatch = useAppDispatch();
  const videoWidth = useAppSelector(selectVideoWidth);
  const userSelection = useAppSelector(selectUserSelection);
  const videoData = useAppSelector(selectVideoData);
  const currentVideoLabel = useAppSelector(selectCurrentVideoLabel);

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

  const disableBtn = userSelection === null || userSelection?.includes(null);

  const totalNoOfItems = userSelection !== null ? userSelection.length : 0;
  const unselectedItems =
    userSelection !== null
      ? userSelection.filter((el: string | null) => el === null).length
      : 0;
  const noOfItems = totalNoOfItems - unselectedItems;

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
      dispatch(setCurrentVideoLabel(nextVideoData.label || ''));
      dispatch(setVideoUrl(nextVideoData.url || ''));
      dispatch(setCurrentVideoName(nextVideoData.name || ''));
      dispatch(playPauseVideo('paused'));
    }
  };

  return (
    <div className={styles.ContinueButton} style={btnStyle}>
      {disableBtn ? (
        <button className={styles.SelectButton} style={selectedTextStyle}>
          {noOfItems}/{totalNoOfItems} Selected
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
