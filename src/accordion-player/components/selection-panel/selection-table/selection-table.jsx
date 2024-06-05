import { useSelector } from 'react-redux';

import SelectionTableRow from './selection-table-row/selection-table-row';
import { selectVideoWidth, selectVideoData } from '../../../app/videoReducer';
import {
  SELECT_TABLE_TOP_MARGIN_LARGE,
  SELECT_TABLE_TOP_MARGIN_SMALL,
  SELECT_TABLE_PADDING_LARGE,
  SELECT_TABLE_PADDING_SMALL,
} from '../../../common/constants';
import getScaledDimension from '../../../common/utils/getScaledDimension';
import styles from './selection-table.module.scss';

/**
 * Generates table for user to choose videos
 *
 * @returns {ReactNode} Table with heading and video options
 */
export default function SelectionTable() {
  const videoWidth = useSelector(selectVideoWidth);
  const videoData = useSelector(selectVideoData);

  const tableTopMargin = getScaledDimension({
    smallDim: SELECT_TABLE_TOP_MARGIN_SMALL,
    largeDim: SELECT_TABLE_TOP_MARGIN_LARGE,
    videoWidth,
  });

  const tablePadding = getScaledDimension({
    smallDim: SELECT_TABLE_PADDING_SMALL,
    largeDim: SELECT_TABLE_PADDING_LARGE,
    videoWidth,
  });

  const tableStyle = {
    marginTop: `${tableTopMargin}px`,
    paddingTop: `${tablePadding}px`,
    paddingLeft: `${tablePadding}px`,
    paddingRight: `${tablePadding}px`,
  };

  const videoOptions = videoData?.videoOptions;

  return (
    <div className={styles.Table} style={tableStyle}>
      <SelectionTableRow title='true' />
      {videoOptions &&
        videoOptions.map((_, opIndex) => (
          <SelectionTableRow key={opIndex} row={opIndex} data={videoOptions} />
        ))}
    </div>
  );
}
