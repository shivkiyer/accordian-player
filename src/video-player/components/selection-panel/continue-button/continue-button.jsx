import { useSelector } from 'react-redux';

import {
  selectVideoWidth,
  selectUserSelection,
} from '../../../app/videoReducer';
import {
  CONTINUE_BTN_WIDTH_LARGE,
  CONTINUE_BTN_WIDTH_SMALL,
  CONTINUE_BTN_HEIGHT_LARGE,
  CONTINUE_BTN_HEIGHT_SMALL,
  CONTINUE_BTN_SPACE_BELOW_SMALL,
  CONTINUE_BTN_SPACE_BELOW_LARGE,
} from '../../../common/constants';
import getScaledDimension from '../../../common/utils/getScaledDimension';
import continueBtn from './../../../assets/images/continue_button.svg';
import styles from './continue-button.module.scss';

export default function ContinueButton() {
  const videoWidth = useSelector(selectVideoWidth);
  const userSelection = useSelector(selectUserSelection);

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

  const btnLeftSpace = (window.innerWidth - btnWidth) / 2;

  const disableBtn = userSelection.includes(null);
  const disabledStyle = {
    opacity: 0.5,
  };

  const btnStyle = {
    width: `${btnWidth}px`,
    height: `${btnHeight}px`,
    bottom: `${btnSpaceBelow}px`,
    left: `${btnLeftSpace}px`,
  };

  const continueHandler = () => {};

  return (
    <div
      className={styles.ContinueButton}
      style={btnStyle}
      onClick={continueHandler}
    >
      <img
        src={continueBtn}
        alt='continue-button'
        style={disableBtn ? disabledStyle : null}
      />
    </div>
  );
}
