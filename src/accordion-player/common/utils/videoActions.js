/**
 * Loads a video into DOM
 * @param {HTMLElement} video
 */
export function loadVideo(video) {
  video.load();
}

/**
 * Plays a video
 * @param {HTMLElement} video
 */
export function playVideo(video) {
  video.play();
}

/**
 * Pauses a video
 * @param {HTMLElement} video
 */
export function pauseVideo(video) {
  video.pause();
}

/**
 * Request fullscreen on a HTML element
 * @param {HTMLElement} element
 * @returns Promise
 */
export function goFullscreen(element) {
  return element.requestFullscreen();
}

/**
 * Request exit fullscreen on a HTML element
 * @param {HTMLElement} element
 * @returns Promise
 */
export function exitFullscreen(element) {
  return element.exitFullscreen();
}
