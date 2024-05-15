import { useSelector } from 'react-redux';

import SelectionTable from './selection-table/selection-table';
import {
  SELECT_PANEL_HEADING_HEIGHT_LARGE,
  SELECT_PANEL_HEADING_HEIGHT_SMALL,
  SELECT_PANEL_SIDE_MARGIN_LARGE,
  SELECT_PANEL_SIDE_MARGIN_SMALL,
  SELECT_PANEL_HEADING_FONT_LARGE,
  SELECT_PANEL_HEADING_FONT_SMALL,
} from '../../common/constants';
import { selectVideoWidth, selectVideoData } from './../../app/videoReducer';
import getScaledDimension from './../../common/utils/getScaledDimension';
import styles from './selection-panel.module.scss';

export default function SelectionPanel() {
  const videoWidth = useSelector(selectVideoWidth);
  const videoData = useSelector(selectVideoData);

  const selectPanelHeadingHeight = getScaledDimension({
    smallDim: SELECT_PANEL_HEADING_HEIGHT_SMALL,
    largeDim: SELECT_PANEL_HEADING_HEIGHT_LARGE,
    videoWidth,
  });

  const selectPanelHeadingFont = getScaledDimension({
    smallDim: SELECT_PANEL_HEADING_FONT_SMALL,
    largeDim: SELECT_PANEL_HEADING_FONT_LARGE,
    videoWidth,
  });

  let selectPanelSideMargin = getScaledDimension({
    smallDim: SELECT_PANEL_SIDE_MARGIN_SMALL,
    largeDim: SELECT_PANEL_SIDE_MARGIN_LARGE,
    videoWidth,
  });

  if (videoWidth < 1000) {
    selectPanelSideMargin = selectPanelSideMargin / 2;
  }

  const selectPanelStyle = {
    marginLeft: `${selectPanelSideMargin}px`,
    marginRight: `${selectPanelSideMargin}px`,
    width: `${videoWidth - 2 * selectPanelSideMargin}px`,
  };

  const headingStyle = {
    paddingTop: `${(selectPanelHeadingHeight - selectPanelHeadingFont) / 2}px`,
    paddingBottom: `${
      (selectPanelHeadingHeight - selectPanelHeadingFont) / 2
    }px`,
    fontSize: `${selectPanelHeadingFont}px`,
  };

  return (
    <div className={styles.SelectionPanel} style={selectPanelStyle}>
      <h1 className={styles.SelectionPanelHeading} style={headingStyle}>
        {videoData['selectInfo']['selectText']}
      </h1>

      <SelectionTable />
    </div>
  );
}
