import styles from './progress-bar.module.scss';
import {
  PROGRESS_BAR_HEIGHT_LARGE,
  PROGRESS_BAR_HEIGHT_SMALL,
  PROGRESS_BAR_POSITION_LARGE,
  PROGRESS_BAR_POSITION_SMALL,
  PROGRESS_BAR_MARGIN_SIDE_LARGE,
  PROGRESS_BAR_MARGIN_SIDE_SMALL
} from '../../common/constants';

export default function ProgressBar() {
  
  return (
    <div
      style={{
        height: '5px',
        marginLeft: '24px',
        marginRight: '24px',
        marginTop: '19px',
        backgroundColor: 'white',
      }}
    >
      <div
        style={{ width: '50%', height: '100%', backgroundColor: 'red' }}
      ></div>
    </div>
  );
}
