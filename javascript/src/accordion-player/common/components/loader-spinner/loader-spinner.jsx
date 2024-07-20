import { useSelector } from 'react-redux';

import styles from './loader-spinner.module.css';
import { selectVideoHeight } from '../../../app/videoReducer';

export default function LoaderSpinner() {
  const videoHeight = useSelector(selectVideoHeight);

  const outerStyle = {
    height: `${0.5 * videoHeight}px`,
    width: `${0.5 * videoHeight}px`,
  };

  const innerStyle = {
    height: `${0.4 * videoHeight}px`,
    width: `${0.4 * videoHeight}px`,
  };
  return (
    <>
      <div className={styles['lds-ring']} style={outerStyle}>
        <div style={innerStyle}></div>
      </div>
    </>
  );
}
