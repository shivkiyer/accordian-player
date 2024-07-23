import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import {
  selectVideoWidth,
  selectUserSelection,
  setUserSelection,
} from '../../../../app/videoReducer';
import getScaledDimension from '../../../../common/utils/getScaledDimension';
import {
  SELECT_PANEL_ROW_HEIGHT_LARGE,
  SELECT_PANEL_ROW_HEIGHT_SMALL,
  SELECT_PANEL_COLUMN_WIDTH_LARGE,
  SELECT_PANEL_COLUMN_WIDTH_SMALL,
  SELECT_PANEL_COLUMN_MARGIN_LARGE,
  SELECT_PANEL_COLUMN_MARGIN_SMALL,
  SELECT_PANEL_SIDE_MARGIN_LARGE,
  SELECT_PANEL_SIDE_MARGIN_SMALL,
  SELECT_TABLE_FONT_LARGE,
  SELECT_TABLE_FONT_SMALL,
  SELECT_TABLE_TITLE_LEFT_PADDING_LARGE,
  SELECT_TABLE_TITLE_LEFT_PADDING_SMALL,
  SELECT_TABLE_RADIO_BTN_LARGE,
  SELECT_TABLE_RADIO_BTN_SMALL,
} from '../../../../common/constants';
import styles from './selection-table-row.module.css';
import radioBtnOff from './../../../../assets/images/radio_btn_off.svg';
import radioBtnOn from './../../../../assets/images/radio_btn_on.svg';

/**
 * Generates a row of the selection table from which
 * the user can choose videos to customize playlist
 *
 * @param {string} title Name of video
 * @param {number} row Index of option in video data collection
 * @param {object} data Video option data
 *
 * @returns {ReactNode} Row containing video title and buttons for selection
 */
export default function SelectionTableRow({
  title,
  row,
  data,
}: {
  title?: string;
  row?: number;
  data?: any;
}) {
  const dispatch = useAppDispatch();
  const videoWidth = useAppSelector(selectVideoWidth);
  const userSelection = useAppSelector(selectUserSelection);

  let selectPanelSideMargin = getScaledDimension({
    smallDim: SELECT_PANEL_SIDE_MARGIN_SMALL,
    largeDim: SELECT_PANEL_SIDE_MARGIN_LARGE,
    videoWidth,
  });

  if (videoWidth < 1000) {
    selectPanelSideMargin = selectPanelSideMargin / 2;
  }

  const rowHeight = getScaledDimension({
    smallDim: SELECT_PANEL_ROW_HEIGHT_SMALL,
    largeDim: SELECT_PANEL_ROW_HEIGHT_LARGE,
    videoWidth,
  });

  const columnWidth = getScaledDimension({
    smallDim: SELECT_PANEL_COLUMN_WIDTH_SMALL,
    largeDim: SELECT_PANEL_COLUMN_WIDTH_LARGE,
    videoWidth,
  });

  const columnMargin = getScaledDimension({
    smallDim: SELECT_PANEL_COLUMN_MARGIN_SMALL,
    largeDim: SELECT_PANEL_COLUMN_MARGIN_LARGE,
    videoWidth,
  });

  const textFont = getScaledDimension({
    smallDim: SELECT_TABLE_FONT_SMALL,
    largeDim: SELECT_TABLE_FONT_LARGE,
    videoWidth,
  });

  const textLeftPadding = getScaledDimension({
    smallDim: SELECT_TABLE_TITLE_LEFT_PADDING_SMALL,
    largeDim: SELECT_TABLE_TITLE_LEFT_PADDING_LARGE,
    videoWidth,
  });

  const radioBtnSize = getScaledDimension({
    smallDim: SELECT_TABLE_RADIO_BTN_SMALL,
    largeDim: SELECT_TABLE_RADIO_BTN_LARGE,
    videoWidth,
  });

  const rowStyle = {
    fontSize: `${textFont}px`,
  };

  const basicColStyle = {
    paddingTop: `${(rowHeight - textFont) / 2}px`,
    paddingBottom: `${(rowHeight - textFont) / 2}px`,
  };

  const titleStyle = {
    width: `${
      videoWidth -
      3 * columnWidth -
      2 * selectPanelSideMargin -
      textLeftPadding -
      5 * columnMargin -
      1
    }px`,
    paddingLeft: `${textLeftPadding}px`,
    ...basicColStyle,
  };

  const colStyle = {
    width: `${columnWidth}px`,
    marginRight: `${columnMargin}px`,
    ...basicColStyle,
  };

  const titleHeadingStyle = {
    ...titleStyle,
    marginRight: `${columnMargin}px`,
  };

  const radioBtnStyle = {
    height: `${radioBtnSize}px`,
    width: `${radioBtnSize}px`,
  };

  const titleRow = (
    <div style={rowStyle}>
      <div
        className={`${styles.TableColumn} ${styles.TitleColumn} ${styles.TitleHeadingCell}`}
        style={titleHeadingStyle}
      >
        <span>Video Segment Title</span>
      </div>
      <div className={`${styles.ChoiceColumns} ${styles.ChoiceHeading}`}>
        <div
          className={`${styles.TableColumn} ${styles.VeryInterestedCell}`}
          style={colStyle}
        >
          <span>very interested</span>
        </div>
        <div
          className={`${styles.TableColumn} ${styles.InterestedCell}`}
          style={colStyle}
        >
          <span>interested</span>
        </div>
        <div
          className={`${styles.TableColumn} ${styles.NotInterestedCell}`}
          style={{ ...colStyle, marginRight: '0px' }}
        >
          <span>not interested</span>
        </div>
      </div>
    </div>
  );

  /**
   * Setting user choice on long video
   */
  const longChoiceHandler = () => {
    const selected = userSelection.slice();
    if (row !== undefined && row !== null) {
      selected[row] = 'long';
    }
    dispatch(setUserSelection(selected));
  };

  /**
   * Setting user choice on short video
   */
  const shortChoiceHandler = () => {
    const selected = userSelection.slice();
    if (row !== undefined && row !== null) {
      selected[row] = 'short';
    }
    dispatch(setUserSelection(selected));
  };

  /**
   * Setting user choice on not interested
   */
  const noChoiceHandler = () => {
    const selected = userSelection.slice();
    if (row !== undefined && row !== null) {
      selected[row] = 'no';
    }
    dispatch(setUserSelection(selected));
  };

  let videoChoice = null;
  const userSelectionRow =
    userSelection === null || row === undefined ? null : userSelection[row];
  switch (userSelectionRow) {
    case 'long':
      videoChoice = 'long';
      break;
    case 'short':
      videoChoice = 'short';
      break;
    case 'no':
      videoChoice = 'no';
      break;
    default:
      videoChoice = null;
  }

  let dataRow = null;
  if (
    data !== null &&
    data !== undefined &&
    row !== null &&
    row !== undefined
  ) {
    dataRow = (
      <div style={rowStyle} data-testid='selection-table-row'>
        <div
          className={`${styles.TableColumn} ${styles.TitleColumn}`}
          style={titleStyle}
        >
          {data[row]['name']}
        </div>
        <div className={styles.ChoiceColumns}>
          <div
            className={
              videoChoice === 'long'
                ? `${styles.TableColumn} ${styles.VeryInterestedCell}`
                : styles.TableColumn
            }
            style={colStyle}
            onClick={longChoiceHandler}
          >
            <img
              className={styles.ChoiceButton}
              style={radioBtnStyle}
              src={videoChoice === 'long' ? radioBtnOn : radioBtnOff}
              alt='very-interested-btn'
            />
          </div>
          <div
            className={
              videoChoice === 'short'
                ? `${styles.TableColumn} ${styles.InterestedCell}`
                : styles.TableColumn
            }
            style={colStyle}
            onClick={shortChoiceHandler}
          >
            <img
              className={styles.ChoiceButton}
              style={radioBtnStyle}
              src={videoChoice === 'short' ? radioBtnOn : radioBtnOff}
              alt='interested-btn'
            />
          </div>
          <div
            className={
              videoChoice === 'no'
                ? `${styles.TableColumn} ${styles.NotInterestedCell}`
                : styles.TableColumn
            }
            style={{ ...colStyle, marginRight: '0px' }}
            onClick={noChoiceHandler}
          >
            <img
              className={styles.ChoiceButton}
              style={radioBtnStyle}
              src={videoChoice === 'no' ? radioBtnOn : radioBtnOff}
              alt='not-interested-btn'
            />
          </div>
        </div>
      </div>
    );
  }

  return title ? titleRow : dataRow;
}
