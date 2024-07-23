import { useAppSelector } from '../../../app/hooks';
import SelectionTableRow from './selection-table-row/selection-table-row';
import { selectVideoWidth, selectVideoData } from '../../../app/videoReducer';
import {
  SELECT_TABLE_TOP_MARGIN_LARGE,
  SELECT_TABLE_TOP_MARGIN_SMALL,
  SELECT_TABLE_PADDING_LARGE,
  SELECT_TABLE_PADDING_SMALL,
} from '../../../common/constants';
import getScaledDimension from '../../../common/utils/getScaledDimension';
import styles from './selection-table.module.css';

/**
 * Generates table for user to choose videos
 *
 * @returns {ReactNode} Table with heading and video options
 */
export default function SelectionTable() {
  const videoWidth = useAppSelector(selectVideoWidth);
  const videoData = useAppSelector(selectVideoData);

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
    <div
      className={styles.Table}
      style={tableStyle}
      data-testid='selection-table'
    >
      <SelectionTableRow title='true' />
      {videoOptions &&
        videoOptions.map((_: any, opIndex: number) => (
          <SelectionTableRow key={opIndex} row={opIndex} data={videoOptions} />
        ))}
    </div>
  );
}
