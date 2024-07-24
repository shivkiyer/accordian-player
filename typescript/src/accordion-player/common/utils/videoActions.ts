/**
 * Loads a video into DOM
 * @param {HTMLElement} video
 */
export function loadVideo(video: HTMLVideoElement | null) {
  video?.load();
}

/**
 * Plays a video
 * @param {HTMLElement} video
 */
export function playVideo(video: HTMLVideoElement) {
  video.play();
}

/**
 * Pauses a video
 * @param {HTMLElement} video
 */
export function pauseVideo(video: HTMLVideoElement | null) {
  video?.pause();
}

/**
 * Request fullscreen on a HTML element
 * @param {HTMLElement} element
 * @returns Promise
 */
export function goFullscreen(element: HTMLElement | null) {
  if (element !== null) {
    return element.requestFullscreen();
  }
  return Promise.reject();
}

const HTMLElementExitFullScreen: any =
  document.documentElement as HTMLElement & {
    mozExitFullScreen(): Promise<void>;
  };

/**
 * Request exit fullscreen on a HTML element
 * @param {HTMLElement} element
 * @returns Promise
 */
export function exitFullscreen(element: typeof HTMLElementExitFullScreen) {
  return element.exitFullscreen();
}
