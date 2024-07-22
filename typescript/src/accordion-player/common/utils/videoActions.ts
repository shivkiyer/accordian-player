/**
 * Loads a video into DOM
 * @param {HTMLElement} video
 */
export function loadVideo(video: HTMLVideoElement) {
  video.load();
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
export function pauseVideo(video: HTMLVideoElement) {
  video.pause();
}

/**
 * Request fullscreen on a HTML element
 * @param {HTMLElement} element
 * @returns Promise
 */
export function goFullscreen(element: HTMLElement) {
  return element.requestFullscreen();
}

const HTMLElementExitFullScreen: any = document.documentElement as HTMLElement & {
    mozExitFullScreen(): Promise<void>;   
}

/**
 * Request exit fullscreen on a HTML element
 * @param {HTMLElement} element
 * @returns Promise
 */
export function exitFullscreen(element: typeof HTMLElementExitFullScreen) {
  return element.exitFullscreen();
}
