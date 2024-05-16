import { useSelector } from 'react-redux';

import { selectVideoWidth } from '../../../../app/videoReducer';
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
import styles from './selection-table-row.module.scss';
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
export default function SelectionTableRow({ title, row, data }) {
  const videoWidth = useSelector(selectVideoWidth);

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
    textTransform: 'uppercase',
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
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: '#a19f9f',
  };

  const choiceHeadingStyle = {
    ...colStyle,
    fontWeight: 'bold',
    color: 'white',
  };

  const veryInterestedHeadingStyle = {
    ...choiceHeadingStyle,
    backgroundColor: '#2d9600',
  };

  const interestedHeadingStyle = {
    ...choiceHeadingStyle,
    backgroundColor: '#18330c',
  };

  const notInterestedHeadingStyle = {
    ...choiceHeadingStyle,
    backgroundColor: '#292929',
  };

  const radioBtnStyle = {
    height: `${radioBtnSize}px`,
    width: `${radioBtnSize}px`,
  };

  const radioBtnColStyle = {
    ...colStyle,
  };

  const titleRow = (
    <div style={rowStyle}>
      <div className={styles.TableColumn} style={titleHeadingStyle}>
        <span>Video Segment Title</span>
      </div>
      <div className={styles.ChoiceColumns}>
        <div className={styles.TableColumn} style={veryInterestedHeadingStyle}>
          <span>very interested</span>
        </div>
        <div className={styles.TableColumn} style={interestedHeadingStyle}>
          <span>interested</span>
        </div>
        <div
          className={styles.TableColumn}
          style={{ ...notInterestedHeadingStyle, marginRight: '0px' }}
        >
          <span>not interested</span>
        </div>
      </div>
    </div>
  );

  let dataRow = null;
  if (data !== null && data !== undefined) {
    dataRow = (
      <div style={rowStyle}>
        <div className={styles.TableColumn} style={titleStyle}>
          {data[row]['name']}
        </div>
        <div className={styles.ChoiceColumns}>
          <div className={styles.TableColumn} style={radioBtnColStyle}>
            <img
              className={styles.ChoiceButton}
              style={radioBtnStyle}
              src={radioBtnOff}
              alt='radio-btn'
            />
          </div>
          <div className={styles.TableColumn} style={radioBtnColStyle}>
            <img
              className={styles.ChoiceButton}
              style={radioBtnStyle}
              src={radioBtnOn}
              alt='radio-btn'
            />
          </div>
          <div
            className={styles.TableColumn}
            style={{ ...radioBtnColStyle, marginRight: '0px' }}
          >
            <img
              className={styles.ChoiceButton}
              style={radioBtnStyle}
              src={radioBtnOff}
              alt='radio-btn'
            />
          </div>
        </div>
      </div>
    );
  }

  return title ? titleRow : dataRow;
}
