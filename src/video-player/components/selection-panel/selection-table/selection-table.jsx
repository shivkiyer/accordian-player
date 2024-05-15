import { useSelector } from 'react-redux';

import SelectionTableRow from './selection-table-row/selection-table-row';
import { selectVideoWidth } from '../../../app/videoReducer';
import {
  SELECT_TABLE_TOP_MARGIN_LARGE,
  SELECT_TABLE_TOP_MARGIN_SMALL,
  SELECT_TABLE_PADDING_LARGE,
  SELECT_TABLE_PADDING_SMALL,
} from '../../../common/constants';
import getScaledDimension from '../../../common/utils/getScaledDimension';
import styles from './selection-table.module.scss';

export default function SelectionTable() {
  const videoWidth = useSelector(selectVideoWidth);

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
    paddingBottom: `${tablePadding}px`,
    paddingLeft: `${tablePadding}px`,
    paddingRight: `${tablePadding}px`,
  };

  return (
    <div className={styles.Table} style={tableStyle}>
      <SelectionTableRow title='true' />
    </div>
  );
}
