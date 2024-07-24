import { useEffect, useRef, useCallback } from 'react';

import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import volumeRail from './../../../../assets/images/volume_rail.svg';
import volumeHandle from './../../../../assets/images/volume_handle.svg';
import {
  VOLUME_SLIDER_HEIGHT_LARGE,
  VOLUME_SLIDER_HEIGHT_SMALL,
  VOLUME_SLIDER_WIDTH_LARGE,
  VOLUME_SLIDER_WIDTH_SMALL,
  VOLUME_RAIL_HEIGHT_LARGE,
  VOLUME_RAIL_HEIGHT_SMALL,
  VOLUME_RAIL_WIDTH_LARGE,
  VOLUME_RAIL_WIDTH_SMALL,
  VOLUME_HANDLE_HEIGHT_LARGE,
  VOLUME_HANDLE_HEIGHT_SMALL,
  VOLUME_HANDLE_WIDTH_LARGE,
  VOLUME_HANDLE_WIDTH_SMALL,
  LEFT_BUTTONS_HEIGHT_LARGE,
  LEFT_BUTTONS_HEIGHT_SMALL,
} from '../../../../common/constants';
import getScaledDimension from '../../../../common/utils/getScaledDimension';
import {
  selectVideoWidth,
  selectVolume,
  selectIsVolumeChanging,
  selectVolumeMousePositionX,
  setVolumeLevel,
  setIsVolumeChanging,
} from '../../../../app/videoReducer';
import styles from './volume-slider.module.css';

/**
 * Volume adjustment slider
 *
 * @returns {ReactNode} A slider for adjusting video volume
 *
 * @example
 * <VolumeSlider className='VolumeControls' />
 *
 */
export default function VolumeSlider() {
  const videoWidth = useAppSelector(selectVideoWidth);
  const volumeLevel = useAppSelector(selectVolume);
  const isVolumeChanging = useAppSelector(selectIsVolumeChanging);
  const volumeMousePositionX = useAppSelector(selectVolumeMousePositionX);
  const dispatch = useAppDispatch();
  const sliderRef = useRef<HTMLImageElement | null>(null);

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
  const volumeHandleLeftPosition = darkHandleWidth - volumeHandleWidth / 2.0;

  const volWidth = getScaledDimension({
    smallDim: VOLUME_SLIDER_WIDTH_SMALL,
    largeDim: VOLUME_SLIDER_WIDTH_LARGE,
    videoWidth,
  });

  const volHeight = getScaledDimension({
    smallDim: VOLUME_SLIDER_HEIGHT_SMALL,
    largeDim: VOLUME_SLIDER_HEIGHT_LARGE,
    videoWidth,
  });

  /**
   * Calculate volume level from X positon of mouse
   * @param {number} mousePosition X-coordinate of mouse on screen
   * @returns Volume level between 0 and 1
   */
  const calculateVolumeLevel = useCallback((mousePosition: number) => {
    let xMin, width: number | undefined = 0;
    if (sliderRef.current !== null) {
      ({ x: xMin, width } = sliderRef.current.getBoundingClientRect());
    }
    let volPos = mousePosition;
    if (xMin !== undefined) {
      volPos -= xMin;
    }
    if (volPos < 0) {
      volPos = 0;
    }
    if (volPos > width) {
      volPos = width;
    }
    let volLevel;
    if (width > 0) {
      volLevel = volPos / width;
    } else {
      volLevel = null;
    }
    return volLevel;
  }, []);

  /**
   * Convert mouse position on slider to volume level
   *
   * @param {object} mouseEvent
   * @returns {number} Volume level between 0 and 1
   */
  const detectVolume = (mouseEvent: React.MouseEvent<HTMLElement>) => {
    const { clientX } = mouseEvent;
    return calculateVolumeLevel(clientX);
  };

  /**
   * Starts tracking volume change when mouse is
   * pressed in volume slider element
   *
   * @param {object} event
   */
  const mouseDownHandler = (event: React.MouseEvent<HTMLElement>) => {
    dispatch(setIsVolumeChanging(true));
    const newVolume = detectVolume(event);
    if (newVolume) {
      dispatch(setVolumeLevel(newVolume));
    }
  };

  /**
   * Tracks volume change as mouse is moved
   * in volume slider element
   *
   * @param {object} event
   */
  const mouseMoveHandler = (event: React.MouseEvent<HTMLElement>) => {
    if (isVolumeChanging) {
      const varyingVolume = detectVolume(event);
      if (varyingVolume) {
        dispatch(setVolumeLevel(varyingVolume));
      }
    }
  };

  /**
   * Ends volume change when mouse button
   * is released in volume slider.
   */
  const mouseUpHandler = () => {
    dispatch(setIsVolumeChanging(false));
  };

  /**
   * Calculate volume level is mouse position is changing
   */
  useEffect(() => {
    if (volumeMousePositionX) {
      const volLevel = calculateVolumeLevel(volumeMousePositionX);
      if (volLevel) {
        dispatch(setVolumeLevel(volLevel));
      }
    }
  }, [volumeMousePositionX, calculateVolumeLevel, dispatch]);

  return (
    <div
      style={{ width: `${volWidth}px`, height: `${volHeight}px` }}
      onMouseDown={mouseDownHandler}
      onMouseMove={mouseMoveHandler}
      onMouseUp={mouseUpHandler}
    >
      <img
        ref={sliderRef}
        src={volumeRail}
        alt='volume-rail-default'
        className={`${styles.VolumeRail} ${styles.VolumeRailLight}`}
        style={{
          width: `${volumeRailWidth}px`,
          height: `${volumeRailHeight}px`,
          top: `${volumeRailMarginTop}px`,
        }}
        draggable='false'
      />
      <img
        src={volumeRail}
        alt='volume-rail'
        className={`${styles.VolumeRail} ${styles.VolumeRailDark}`}
        style={{
          width: `${darkHandleWidth}px`,
          height: `${volumeRailHeight}px`,
          top: `${volumeRailMarginTop}px`,
        }}
        draggable='false'
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
        draggable='false'
      />
    </div>
  );
}
