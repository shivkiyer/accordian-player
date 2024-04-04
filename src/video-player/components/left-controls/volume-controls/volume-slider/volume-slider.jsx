import { useSelector } from 'react-redux';

import volumeRail from './../../../../assets/images/volume_rail.svg';
import volumeHandle from './../../../../assets/images/volume_handle.svg';
import {
  VOLUME_RAIL_HEIGHT_LARGE,
  VOLUME_RAIL_HEIGHT_SMALL,
  VOLUME_RAIL_WIDTH_LARGE,
  VOLUME_RAIL_WIDTH_SMALL,
  VOLUME_RAIL_PADDING_LARGE,
  VOLUME_RAIL_PADDING_SMALL,
  VOLUME_HANDLE_HEIGHT_LARGE,
  VOLUME_HANDLE_HEIGHT_SMALL,
  VOLUME_HANDLE_WIDTH_LARGE,
  VOLUME_HANDLE_WIDTH_SMALL,
  LEFT_BUTTONS_HEIGHT_LARGE,
  LEFT_BUTTONS_HEIGHT_SMALL,
} from '../../../../common/constants';
import getScaledDimension from '../../../../common/utils/getScaledDimension';
import { selectVideoWidth } from '../../../../app/videoReducer';
import styles from './volume-slider.module.scss';

export default function VolumeSlider() {
  const videoWidth = useSelector(selectVideoWidth);

  const volumeLevel = Math.random();

  const volumeRailWidth = getScaledDimension({
    smallDim: VOLUME_RAIL_WIDTH_SMALL,
    largeDim: VOLUME_RAIL_WIDTH_LARGE,
    videoWidth,
  });
  const volumeRailHeight = getScaledDimension({
    smallDim: VOLUME_RAIL_HEIGHT_SMALL,
    largeDim: VOLUME_RAIL_HEIGHT_LARGE,
    videoWidth,
  });
  const volumeRailPadding = getScaledDimension({
    smallDim: VOLUME_RAIL_PADDING_SMALL,
    largeDim: VOLUME_RAIL_PADDING_LARGE,
    videoWidth,
  });
  const totalHeight = getScaledDimension({
    smallDim: LEFT_BUTTONS_HEIGHT_SMALL,
    largeDim: LEFT_BUTTONS_HEIGHT_LARGE,
    videoWidth,
  });
  const volumeRailMarginTop = totalHeight / 2.0 - volumeRailHeight / 2.0;

  const volumeHandleWidth = getScaledDimension({
    smallDim: VOLUME_HANDLE_WIDTH_SMALL,
    largeDim: VOLUME_HANDLE_WIDTH_LARGE,
    videoWidth,
  });
  const volumeHandleHeight = getScaledDimension({
    smallDim: VOLUME_HANDLE_HEIGHT_SMALL,
    largeDim: VOLUME_HANDLE_HEIGHT_LARGE,
    videoWidth,
  });
  const volumeHandleTopPosition = totalHeight / 2.0 - volumeHandleHeight / 2.0;

  const darkHandleWidth = volumeLevel * volumeRailWidth;
  const volumeHandleLeftPosition = volumeRailPadding + darkHandleWidth;

  return (
    <>
      <img
        src={volumeRail}
        alt='volume-rail-default'
        className={`${styles.VolumeRail} ${styles.VolumeRailLight}`}
        style={{
          width: `${volumeRailWidth}px`,
          height: `${volumeRailHeight}px`,
          left: `${volumeRailPadding}px`,
          top: `${volumeRailMarginTop}px`,
        }}
      />
      <img
        src={volumeRail}
        alt='volume-rail'
        className={`${styles.VolumeRail} ${styles.VolumeRailDark}`}
        style={{
          width: `${darkHandleWidth}px`,
          height: `${volumeRailHeight}px`,
          left: `${volumeRailPadding}px`,
          top: `${volumeRailMarginTop}px`,
        }}
      />
      <img
        src={volumeHandle}
        alt='volume-handle'
        className={`${styles.VolumeHandle}`}
        style={{
          width: `${volumeHandleWidth}px`,
          height: `${volumeHandleHeight}px`,
          top: `${volumeHandleTopPosition}px`,
          left: `${volumeHandleLeftPosition}px`,
        }}
      />
    </>
  );
}
