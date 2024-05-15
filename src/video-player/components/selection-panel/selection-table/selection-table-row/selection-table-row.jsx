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
} from '../../../../common/constants';
import styles from './selection-table-row.module.scss';

export default function SelectionTableRow({ title }) {
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

  return title ? titleRow : null;
}
